"use strict";

let Pokeball = function(resourceURL){

    /* pokeball components */
    self.top = top;
    self.bottom = bottom;
    self.button = button;
    self.ring = ring;

    /* prepare pivot for rotations */
    self.pivot = new THREE.Object3D();
    self.pivot.add(self.top);
    self.pivot.add(self.bottom);
    self.pivot.add(self.button);
    self.pivot.add(self.ring);


    let loader = new THREE.OBJLoader2();
    loader.useIndices = true;
    loader.load(resourceURL, function (obj) {
        topGeometry = obj.detail.loaderRootNode.children[2].geometry;
        topMesh = new THREE.Mesh(topGeometry, topMaterial);
        //topMesh.scale.multiplyScalar(0.9);
        THREE.BufferGeometryUtils.computeTangents(topGeometry);
        scene.add(topMesh);
    
        bottomGeometry = obj.detail.loaderRootNode.children[1].geometry;
        bottomMesh = new THREE.Mesh(bottomGeometry, bottomMaterial);
        //bottomMesh.scale.multiplyScalar(0.9);
        THREE.BufferGeometryUtils.computeTangents(bottomGeometry);
        scene.add(bottomMesh);
    
        ringGeometry = obj.detail.loaderRootNode.children[3].geometry;
        ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
        //ringMesh.scale.multiplyScalar(0.9);
        THREE.BufferGeometryUtils.computeTangents(ringGeometry);
        scene.add(ringMesh);
    
        buttonGeometry = obj.detail.loaderRootNode.children[0].geometry;
        buttonMesh = new THREE.Mesh(buttonGeometry, buttonMaterial);
        //buttonMesh.scale.multiplyScalar(0.9);
        THREE.BufferGeometryUtils.computeTangents(buttonGeometry);
        scene.add(buttonMesh);
    });

}