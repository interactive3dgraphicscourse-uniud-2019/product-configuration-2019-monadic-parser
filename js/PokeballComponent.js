"use strict";

let uniforms;

function PokeballComponent(geometry){
    
    this.material;
    this.geometry = geometry;
    this.object = new THREE.Object3D();

    this.applyMaterial = function(material){
        if(material.isFromTexture){
            uniforms = material.createUniforms();
            this.material = new THREE.ShaderMaterial({uniforms:uniforms,
                vertexShader: TEXTURE_VERTEX_SHADER, 
                fragmentShader: TEXTURE_FRAGMENT_SHADER 
            });
        } else {
            uniforms = material.createUniforms();
            this.material = new THREE.ShaderMaterial({uniforms:uniforms,
                vertexShader:   VALUE_VERTEX_SHADER, 
                fragmentShader: VALUE_FRAGMENT_SHADER 
                //vertexShader:   VALUE_ENV_VERTEX_SHADER, 
                //fragmentShader: VALUE_ENV_FRAGMENT_SHADER 
            });
        }

        this.object = new THREE.Mesh(this.geometry, this.material);
        THREE.BufferGeometryUtils.computeTangents(this.object.geometry);
    }


}