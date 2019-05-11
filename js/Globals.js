"use strict";

let SHARED_RESOURCES_PATH = "res/textures/shared/";
let STOCK_BALLS_RESOURCES_PATH = "res/textures/stock/";

let DEFAULT_ROUGHNESS = 0.3;
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
