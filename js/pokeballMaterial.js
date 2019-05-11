"use strict";

/**
 * Loads texture from a file 
 * @param {path} file
 */
function loadTexture(file) {
    let texture = new THREE.TextureLoader().load(file, function (texture) {
        texture.minFilter = THREE.LinearMipMapLinearFilter;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.needsUpdate = true;
        render();
    })
    return texture;
}

/**
 * Loads environment map from a cube map
 * @param {path} path 
 * returns the loaded envMap
 */
function loadEnvMap(path){
    return new THREE.CubeTextureLoader()
	.setPath( path )
	.load( [
		'px.jpg',
		'nx.jpg',
		'py.jpg',
		'ny.jpg',
		'pz.jpg',
		'nz.jpg'
	] );
}

/**
 * Prepare the shader uniforms for an object using textures 
 * @param {texture} diffuse   
 * @param {texture} specular  
 * @param {texture or number} roughness 
 * @param {texture} normal    
 * @param {texture} env       
 */
let TextureUniforms = function(diffuse, specular, roughness, normal, env){ 
    self.diffuseMap  = { type: "t", value: diffuse };
    self.specularMap = { type: "t", value: specular};
    if(typeof roughness === 'number'){
        self.rougMap   = { type: "t", value: null};  // unused
        self.rougVal   = { type: "f", value: roughness};
        self.isRougMap = { value: 0 };
    }else{
        self.rougMap   = { type: "t", value: roughness};
        self.rougVal   = { type: "f", value: 0.};
        self.isRougMap = { value: 1 };
    }
    self.normalMap   = { type: "t", value: normal};
    self.envMap   = { type: "t", value: env};
}

/**
 * Prepare the shader uniforms for an object using materials built from their specification
 * @param {Vector3} color RBG color 
 * @param {number} metalness in [0,1] 
 * @param {texture or number} roughness 
 * @param {texture} normal 
 * @param {texture} env 
 */
let ValueUniforms = function(color, metalness, roughness, normal, env){
    let cparams = convertColorAndMetalnessToCdiffAndCspec(color,metalness);
    self.diffuse = { type: "v3", value: cparams.cdiff };
    self.specular = { type: "v3", value: cparams.cspec };
    if(typeof roughness === 'number'){
        self.rougMap   = { type: "t", value: null};  // unused
        self.rougVal   = { type: "f", value: roughness};
        self.isRougMap = { value: 0 };
    }else{
        self.rougMap   = { type: "t", value: roughness};
        self.rougVal   = { type: "f", value: 0.};
        self.isRougMap = { value: 1 };
    }
    self.normalMap   = { type: "t", value: normal};
    self.envMap      = { type: "t", value: env};
}

/**
 * Default procedure to convert color and metalness to cspec and cdiff
 * @param {Vector3} color RGB color 
 * @param {number} metalness in [0,1]
 * returns the pair cdiff, cspec in an object 
 */
let convertColorAndMetalnessToCdiffAndCspec = function(color, metalness){
    let cdiff = new THREE.Vector3(0.,0.,0.);
    let cspec = new THREE.Vector3(0.,0.,0.);

    cdiff.x = Math.max( color.x - metalness, 0.0 );
    cdiff.y = Math.max( color.y - metalness, 0.0 );
    cdiff.z = Math.max( color.z - metalness, 0.0 );
    
    cspec.x = THREE.Math.mapLinear( material_color.x * metalness, 0.0, 1.0, 0.04, 1.0 );
    cspec.y = THREE.Math.mapLinear( material_color.y * metalness, 0.0, 1.0, 0.04, 1.0 );
    cspec.z = THREE.Math.mapLinear( material_color.z * metalness, 0.0, 1.0, 0.04, 1.0 );

    return { cdiff:cdiff, cspec:cspec };
}


let PokeballMaterial = function(){
    self.isWorn;            // bool (true if object is of "second hand", so roughess is a texture instead of afixed value) 
    self.isFromTexture;     // bool (true if cSpec and cDiff are loaded from texture)
    
    self.roughnessTexture;  // texture        (used if isWorn)
    self.roughnessValue;    // value (0,+inf) (used if not isWorn)

    self.envMap;            // texture  (always used)
    self.normalMap;         // texture  (always used)

    /* used if isfromTexture */
    self.specular;          // texture 
    self.diffuse            // texture

    /* used if not isfromTexture */
    self.metalness;         // [0,1] (use only 0 or 1)
    self.color;             // vec3  RGB

    /**
     * initializes this object from textures
     * 
     * path = path to resource folder
     * basename = texture name (without underscore) 
     * isWorn   = if the object is of "second hand" or not
     */
    self.materialFromTexture = function(path, basename, isWorn){
        self.isFromTexture = true;
        self.isWorn = isWorn;
        /* load textures */
        if(self.isWorn){
            self.roughnessTexture = loadTexture(SHARED_RESOURCES_PATH + "/textures" + "/" + "roughness.png");  // load default roughness texture
            self.roughnessValue = null;
        }else{
            self.roughnessValue = DEFAULT_ROUGHNESS;
            self.roughnessTexture = null;
        }

        let fileCheck = new File(path + "/" + basename + "/normal.png");
        if(fileCheck.exists()){
            self.normalMap = loadTexture(path + "/" + basename + "/normal.png");
        } else {
            self.normalMap = loadTexture(SHARED_RESOURCES_PATH + "/textures" + "/" + "normal.png");  // load default normal map
        }
        
        self.envMap = loadEnvMap(SHARED_RESOURCES_PATH + "/textures" + "/" + "env"); //load default environment map

        fileCheck = new File(path + "/" + basename + "/normal.png"); 
        if(fileCheck.exists()){
            self.specular = loadTexture(path + "/" + basename + "/specular.png");
        }else{
            self.specular = loadTexture(SHARED_RESOURCES_PATH + "/textures" + "/specular.png");
        }
        self.diffuse  = loadTexture(path + "/" + basename + "/diffuse.png");

    }

    /**
     * initializes this object from values 
     * 
     * color     = RGB vector3 color of the object
     * metalness = [0,1] 
     * isWorn    = if the object is of "second hand"
     */
    self.materialFromValue = function(color, metalness, isWorn){

        self.isFromTexture = false;
        self.isWorn = isWorn;
        /* load textures */
        if(self.isWorn){
            self.roughnessTexture = loadTexture(SHARED_RESOURCES_PATH + "/textures" + "/" + "roughness.png");  // load default roughness texture
        }else{
            self.roughnessValue = DEFAULT_ROUGHNESS;
        }

        let fileCheck = new File(path + "/" + basename + "/normal.png");
        if(fileCheck.exists()){
            self.normalMap = loadTexture(path + "/" + basename + "/normal.png");
        } else {
            self.normalMap = loadTexture(SHARED_RESOURCES_PATH + "/textures" + "/" + "normal.png");  // load default normal map
        }
        
        self.envMap = loadEnvMap(SHARED_RESOURCES_PATH + "/textures" + "/" + "env"); //load default environment map
        
        self.color = color;
        self.metalness = metalness;

    }

    /**
     * Prepares the structures for the shaders
     * returns the prepared struct
     */
    self.createUniforms = function(){
        if(self.isFromTexture){
            return self.createUniformsForTexture();
        }else{
            return self.createUniformsForValue();
        }
    }

    /**
     * creates uniforms for a material using textures
     */
    self.createUniformsForTexture = function(){
        if(self.isWorn){
            return TextureUniforms(self.diffuseMap, self.specularMap, self.roughnessTexture, self.normalMap, self.envMap);
        }else{
            return TextureUniforms(self.diffuseMap, self.specularMap, self.roughnessValue, self.normalMap, self.envMap);
        }
    }

    /**
     * creates uniforms for a material using values
     */
    self.createUniformsForValue = function(){
        if(self.isWorn){
            return TextureUniforms(self.color, self.metalness, self.roughnessTexture, self.normalMap, self.envMap);
        }else{
            return TextureUniforms(self.color, self.metalness, self.roughnessValue, self.normalMap, self.envMap);
        }
    }

}