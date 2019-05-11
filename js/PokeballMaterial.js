"use strict";

function FileExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    console.log("INFO: " + url + "  ==> " + (http.status!=404));
    return http.status!=404; 
}

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
 * Prepare the shader uniforms object for an object using textures 
 * @param {texture} diffuse   
 * @param {texture} specular  
 * @param {texture or number} roughness 
 * @param {texture} normal    
 * @param {texture} env       
 */
function TextureUniforms(diffuse, specular, roughness, normal, env){ 
    this.diffuseMap  = { type: "t", value: diffuse };
    this.specularMap = { type: "t", value: specular};
    if(typeof roughness === 'number'){
        this.rougMap   = { type: "t", value: null};  // unused
        this.rougVal   = { type: "f", value: roughness};
        this.isRougMap = { value: 0 };
    }else{
        this.rougMap   = { type: "t", value: roughness};
        this.rougVal   = { type: "f", value: 0.};
        this.isRougMap = { value: 1 };
    }
    this.normalMap   = { type: "t", value: normal};
    this.envMap      = { type: "t", value: env};
}

/**
 * Prepare the shader uniforms object for an object using materials built from their specification
 * @param {Vector3} color RBG color 
 * @param {number} metalness in [0,1] 
 * @param {texture or number} roughness 
 * @param {texture} normal 
 * @param {texture} env 
 */
function ValueUniforms(color, metalness, roughness, normal, env){
    let cparams = convertColorAndMetalnessToCdiffAndCspec(color,metalness);
    this.diffuse = { type: "v3", value: cparams.cdiff };
    this.specular = { type: "v3", value: cparams.cspec };
    if(typeof roughness === 'number'){
        this.rougMap   = { type: "t", value: null};  // unused
        this.rougVal   = { type: "f", value: roughness};
        this.isRougMap = { value: 0 };
    }else{
        this.rougMap   = { type: "t", value: roughness};
        this.rougVal   = { type: "f", value: 0.};
        this.isRougMap = { value: 1 };
    }
    this.normalMap   = { type: "t", value: normal};
    this.envMap      = { type: "t", value: env};
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
    
    cspec.x = THREE.Math.mapLinear( color.x * metalness, 0.0, 1.0, 0.04, 1.0 );
    cspec.y = THREE.Math.mapLinear( color.y * metalness, 0.0, 1.0, 0.04, 1.0 );
    cspec.z = THREE.Math.mapLinear( color.z * metalness, 0.0, 1.0, 0.04, 1.0 );

    return { cdiff:cdiff, cspec:cspec };
}


function PokeballMaterial(){
    this.isWorn;            // bool (true if object is of "second hand", so roughess is a texture instead of afixed value) 
    this.isFromTexture;     // bool (true if cSpec and cDiff are loaded from texture)
    
    this.roughnessTexture;  // texture        (used if isWorn)
    this.roughnessValue;    // value (0,+inf) (used if not isWorn)

    this.envMap;            // texture  (always used)
    this.normalMap;         // texture  (always used)

    /* used if isfromTexture */
    this.specular;          // texture 
    this.diffuse            // texture

    /* used if not isfromTexture */
    this.metalness;         // [0,1] (use only 0 or 1)
    this.color;             // vec3  RGB

    /**
     * initializes this object from textures
     * 
     * path = path to resource folder
     * basename = texture name (without underscore) 
     * isWorn   = if the object is of "second hand" or not
     */
    this.materialFromTexture = function(path, basename, isWorn){
        this.isFromTexture = true;
        this.isWorn = isWorn;
        /* load textures */
        if(this.isWorn){
            this.roughnessTexture = loadTexture(SHARED_RESOURCES_PATH + "roughness.png");  // load default roughness texture
            this.roughnessValue = null;
        }else{
            this.roughnessValue = DEFAULT_ROUGHNESS;
            this.roughnessTexture = null;
        }

        if(FileExists(path + "/" + basename + "/normal.png")){
            this.normalMap = loadTexture(path + "/" + basename + "/normal.png");
        } else {
            this.normalMap = loadTexture(SHARED_RESOURCES_PATH + "normal.png");  // load default normal map
        }
        
        this.envMap = loadEnvMap(SHARED_RESOURCES_PATH + "env"); //load default environment map

        if(FileExists(path + "/" + basename + "/specular.png")){
            this.specular = loadTexture(path + "/" + basename + "/specular.png");
        }else{
            this.specular = loadTexture(SHARED_RESOURCES_PATH + "/specular.png");
        }
        
        this.diffuse  = loadTexture(path + "/" + basename + "/diffuse.png");
        
    }

    /**
     * initializes this object from values 
     * 
     * color     = RGB vector3 color of the object
     * metalness = [0,1] 
     * isWorn    = if the object is of "second hand"
     */
    this.materialFromValue = function(color, metalness, isWorn){

        this.isFromTexture = false;
        this.isWorn = isWorn;
        /* load textures */
        if(this.isWorn){
            this.roughnessTexture = loadTexture(SHARED_RESOURCES_PATH + "roughness.png");  // load default roughness texture
        }else{
            this.roughnessValue = DEFAULT_ROUGHNESS;
        }
 
        this.normalMap = loadTexture(SHARED_RESOURCES_PATH + "normal.png");  // load default normal map
        
        this.envMap = loadEnvMap(SHARED_RESOURCES_PATH + "env"); //load default environment map
        
        this.color = color;
        this.metalness = metalness;

    }

    /**
     * Prepares the structures for the shaders
     * returns the prepared struct
     */
    this.createUniforms = function(){
        if(this.isFromTexture){
            return this.createUniformsForTexture();
        }else{
            return this.createUniformsForValue();
        }
    }

    /**
     * creates uniforms for a material using textures
     */
    this.createUniformsForTexture = function(){
        if(this.isWorn){
            return new TextureUniforms(this.diffuse, this.specular, this.roughnessTexture, this.normalMap, this.envMap);
        }else{
            return new TextureUniforms(this.diffuse, this.specular, this.roughnessValue, this.normalMap, this.envMap);
        }
    }

    /**
     * creates uniforms for a material using values
     */
    this.createUniformsForValue = function(){
        if(this.isWorn){
            return new ValueUniforms(this.color, this.metalness, this.roughnessTexture, this.normalMap, this.envMap);
        }else{
            return new ValueUniforms(this.color, this.metalness, this.roughnessValue, this.normalMap, this.envMap);
        }
    }

}