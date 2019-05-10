"use strict";

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
    materialFromTexture = function(path, basename, isWorn){
        
    }

    /**
     * initializes this object from values 
     * 
     * color     = RGB vector3 color of the object
     * metalness = [0,1] 
     * isWorn    = if the object is of "second hand"
     */
    materialFromValue = function(color, metalness, isWorn){

    }

    /**
     * Prepares the structures for the shaders
     * returns the prepared struct
     */
    createUniforms = function(){

    }



}