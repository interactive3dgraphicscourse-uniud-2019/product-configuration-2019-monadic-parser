"use strict";

let renderer = new THREE.WebGLRenderer({ antialias: true });
let camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
let controls = new THREE.OrbitControls(camera, renderer.domElement);
let scene = new THREE.Scene();

let stats = new Stats();
let pokeball;
let pokeballDefaultMaterial;

/* GUI */
let gui;

function clearGui() {
    if (gui) gui.destroy();
    gui = new dat.GUI();
    gui.open();
}

function buildGui() {
    clearGui();

    let topSettings = gui.addFolder('Top');
    let bottomSettings = gui.addFolder('Bottom');
    let ringSettings = gui.addFolder('Ring');
    let buttonSettings = gui.addFolder('Button');


    let textureSettings = gui.addFolder('Texture parameters');
    textureSettings.add(textures, 'top', ["Pokeball", "Masterball", "Blue", "Rubber"]).onChange(
        function (newVal) {
            setTexture(newVal, "Top");
            topMaterial.needsUpdate = true;
            render()
        });
    textureSettings.add(textures, 'bottom', ["Pokeball", "Masterball", "Blue", "Rubber"]).onChange(
        function (newVal) {
            setTexture(newVal, "Bottom");
            bottomMaterial.needsUpdate = true;
            render()
        });
    textureSettings.add(textures, 'ring', ["Pokeball", "Masterball", "Blue", "Rubber"]).onChange(
        function (newVal) {
            setTexture(newVal, "Ring");
            bottomMaterial.needsUpdate = true;
            render()
        });
    textureSettings.add(textures, 'button', ["Pokeball", "Masterball", "Blue", "Rubber"]).onChange(
        function (newVal) {
            setTexture(newVal, "Button");
            bottomMaterial.needsUpdate = true;
            render()
        });
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
    pokeballDefaultMaterial.materialFromTexture(STOCK_BALLS_RESOURCES_PATH, "greatball", true);
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
update();