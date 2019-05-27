let globalPokeball; // pokeball javascript object
let globalEnvMap, globalHDRCubeRenderTarget, globalHDRCubeMap; // environment map
let globalBackgroundSet = false;
let globalEnvMapLoaded = false;
let globalInitialMaterialSet = false;

let scene, camera, controls, stats, renderer, container, render;
let globalTopMaterial, globalBottomMaterial, globalRingMaterial, globalButtonMaterial;
let globalWornStatus = false;

let ENVMAP_PATH = "res/textures/shared/env_hdr/";
let SHARED_RESOURCES_PATH = "res/textures/shared/";
let STOCK_BALLS_RESOURCES_PATH = "res/textures/stock/";
let OTHERS_RESOURCES_PATH = "res/textures/others/";
let POKEBALL_OBJECT_PATH = "res/models/pokeball.obj";

let LOW_ROUGHNESS_METAL = 0.3; // roughness level for new metal materials
let HIGH_ROUGHNESS_METAL = 1.5; // roughness level for used metal material

let LOW_ROUGHNESS_CERAMIC = 0.01; // roughness level for new ceramic materials
let HIGH_ROUGHNESS_CERAMIC = 1.5;  // roughness level for used ceramic material


