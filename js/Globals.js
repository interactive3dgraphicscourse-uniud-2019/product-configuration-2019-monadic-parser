"use strict";

let SHARED_RESOURCES_PATH = "res/textures/shared/";
let STOCK_BALLS_RESOURCES_PATH = "res/textures/stock/";

let DEFAULT_ROUGHNESS = 0.05;
let POKEBALL_OBJECT_PATH = "res/models/pokeball.obj";

let TEXTURE_VERTEX_SHADER = document.getElementById("texturingVertex").textContent;
let TEXTURE_FRAGMENT_SHADER = document.getElementById("texturingFragment").textContent;

let VALUE_VERTEX_SHADER = document.getElementById("valueVertex").textContent;
let VALUE_FRAGMENT_SHADER = document.getElementById("valueFragment").textContent;

let VALUE_ENV_VERTEX_SHADER = document.getElementById("valueEnvVertex").textContent;
let VALUE_ENV_FRAGMENT_SHADER = document.getElementById("valueEnvFragment").textContent;

let top_,bottom_,ring_,button_; // global variables for pokeball components
let pokeballLoaded = false;     // pokeball loaded
let pokeballReady  = false;     // pokeball ready to be used


let colorToVector3 = function( color ) {
    switch (color) {
        case "red":
            return ( new THREE.Vector3(1,0,0) ); 
            break;
        case "green":
            return ( new THREE.Vector3(0,1,0) ); 
            break;
        case "blue":
            return ( new THREE.Vector3(0,0,1) ); 
            break;
        case "black":
            return ( new THREE.Vector3(0,0,0) ); 
            break;
        case "white":
            return ( new THREE.Vector3(1,1,1) ); 
            break;

    }
}