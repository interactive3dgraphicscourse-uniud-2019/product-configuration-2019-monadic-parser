"use strict";

let Pokeball = function(resourceURL){

    /* pokeball components */
    self.top;
    self.bottom;
    self.button;
    self.ring;

    /* prepare pivot for rotations */
    self.pivot = new THREE.Object3D();
 
    /* load pokeball components */
    let loader = new THREE.OBJLoader2();
    loader.useIndices = true;
    loader.load(resourceURL, function (obj) {
        self.top    = new PokeballComponent(obj.detail.loaderRootNode.children[2].geometry);
        self.bottom = new PokeballComponent(obj.detail.loaderRootNode.children[1].geometry);
        self.ring   = new PokeballComponent(obj.detail.loaderRootNode.children[3].geometry);
        self.button = new PokeballComponent(obj.detail.loaderRootNode.children[0].geometry);
        self.pivot.add(self.top.object);
        self.pivot.add(self.bottom.object);
        self.pivot.add(self.button.object);
        self.pivot.add(self.ring.object);
    });

}