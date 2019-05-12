"use strict";

let renderer = new THREE.WebGLRenderer({ antialias: true });
let camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
let controls = new THREE.OrbitControls(camera, renderer.domElement);
let scene = new THREE.Scene();

let stats = new Stats();
let gui;

let pokeball;
let pokeballDefaultMaterial;

let pokeballParameters = {
    isWorn: false,
    isStock: true,
    stockTexture: "pokeball",
    top: {kind: "metal", metalColor: "---", plasticColor: "---", otherTexture: "---"},
    bottom: {kind: "metal", metalColor: "---", plasticColor: "---", otherTexture: "---"},
    ring: {kind: "metal", metalColor: "---", plasticColor: "---", otherTexture: "---"},
    button: {kind: "metal", metalColor: "---", plasticColor: "--", otherTexture: "---"},
}

function clearGui() {
    if (gui) gui.destroy();
    gui = new dat.GUI();
    gui.open();
}

function buildGui() {
    clearGui();

    gui.add( pokeballParameters, 'isWorn', false ).onChange( function() {
        let mat = new PokeballMaterial();
        //not correct, must be set checking isStock
        mat.materialFromTexture(STOCK_BALLS_RESOURCES_PATH, pokeballParameters.stockTexture, pokeballParameters.isWorn);
        pokeball.applyMaterial(mat);
        render();
    });

    gui.add(pokeballParameters, 'stockTexture', ["pokeball", "greatball", "ultraball", "fastball", "safariball"]).onChange(
        function(newVal) {
            pokeballParameters.isStock = true;
            let mat = new PokeballMaterial();
            mat.materialFromTexture(STOCK_BALLS_RESOURCES_PATH, newVal, pokeballParameters.isWorn);
            pokeball.applyMaterial(mat);
            render();
        }
    );

    let topSettings = gui.addFolder('Top');
    let bottomSettings = gui.addFolder('Bottom');
    let ringSettings = gui.addFolder('Ring');
    let buttonSettings = gui.addFolder('Button');

    topSettings.add(pokeballParameters.top, 'metalColor', ["red", "green", "blue", "black", "white"]).onChange(
        function(newVal) {
            pokeballParameters.isStock = false;
            pokeballParameters.top.kind = "metal";
            let mat = new PokeballMaterial();
            mat.materialFromValue( colorToVector3(newVal) , 1 , pokeballParameters.isWorn);
            pokeball.applyMaterialPart("top", mat);
            render();
        }
    );

    topSettings.add(pokeballParameters.top, 'plasticColor', ["red", "green", "blue", "black", "white"]).onChange(
        function(newVal) {
            pokeballParameters.isStock = false;
            pokeballParameters.top.kind = "plastic";
            let mat = new PokeballMaterial();
            mat.materialFromValue( colorToVector3(newVal) , 0 , pokeballParameters.isWorn);
            pokeball.applyMaterialPart("top", mat);
            render();
        }
    );

}



function init() {

    renderer.setClearColor(0xf0f0f0);
    camera.position.set(0, 0, 10);
    scene.add(camera);

    document.body.appendChild(renderer.domElement);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    controls.minDistance = 1;
    controls.maxDistance = 100;
    controls.enablePan = false;
    controls.update();

    window.addEventListener('resize', onResize, false);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);

    pokeball = new Pokeball(POKEBALL_OBJECT_PATH);
    pokeballDefaultMaterial = new PokeballMaterial();
    console.log(pokeball);
    pokeballDefaultMaterial.materialFromTexture(STOCK_BALLS_RESOURCES_PATH, pokeballParameters.stockTexture, pokeballParameters.isWorn);
    //pokeballDefaultMaterial.materialFromValue(new THREE.Vector3(1,1,1),  1, false);
    scene.add(pokeball.pivot);

}

function onResize() {

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = (window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();

}

function update() {
    if(pokeballLoaded && !pokeballReady){
        pokeball.linkParts();
        pokeball.applyMaterial(pokeballDefaultMaterial);
    }
    requestAnimationFrame(update);
    stats.update();
    render();
}

function render() {
    renderer.render(scene, camera);
}

init();
buildGui();
update();