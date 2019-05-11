"use strict";
let PokeballComponent = function(geometry){
    
    self.material;
    self.geometry = geometry;
    self.object = new THREE.Object3D();
    

    self.applyMaterial = function(material){
        if(material.isFromTexture){
            self.material = THREE.ShaderMaterial({uniforms:material.createUniforms(),
                                                        vertexShader: TEXTURE_VERTEX_SHADER, 
                                                        fragmentShader: TEXTURE_FRAGMENT_SHADER });
        } else {
            self.material = THREE.ShaderMaterial({uniforms:material.createUniforms(),
                vertexShader:   VALUE_VERTEX_SHADER, 
                fragmentShader: VALUE_FRAGMENT_SHADER });
        }

        self.object = new THREE.Mesh(self.geometry, self.material);
        THREE.BufferGeometryUtils.computeTangents(self.object.geometry);
    }


}