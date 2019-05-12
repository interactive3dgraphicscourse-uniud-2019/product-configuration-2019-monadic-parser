"use strict";

function Pokeball(resourceURL){

    /* pokeball components */
    this.top = null;
    this.bottom = null;
    this.button = null;
    this.ring = null;

    /* prepare pivot for rotations */
    this.pivot = new THREE.Object3D();
 
    /* load pokeball components */
    let loader = new THREE.OBJLoader2();
    loader.useIndices = true;
    loader.load(resourceURL, function (obj) {
        top_    = new PokeballComponent(obj.detail.loaderRootNode.children[2].geometry);
        bottom_ = new PokeballComponent(obj.detail.loaderRootNode.children[1].geometry);
        ring_   = new PokeballComponent(obj.detail.loaderRootNode.children[3].geometry);
        button_ = new PokeballComponent(obj.detail.loaderRootNode.children[0].geometry);
        pokeballLoaded = true;
    });

    /**
     * connect the components to the pivot when loaded
     */
    this.linkParts = function(){
        this.top = top_;
        this.bottom = bottom_;
        this.button = button_;
        this.ring = ring_;
        this.updatePivot();
        pokeballReady = true;
    }

    /**
     * apply the same material to each component of the pokeball
     */
    this.applyMaterial = function(material){
        this.top.applyMaterial(material);
        this.bottom.applyMaterial(material);
        this.button.applyMaterial(material);
        this.ring.applyMaterial(material);
        this.updatePivot();
    }

    /**
     * apply the material to the selected component of the pokeball
     */
    this.applyMaterialPart = function(part, material){
        switch (part) {
            case "top":
                this.top.applyMaterial(material);
                this.updatePivot();
                break;
            case "bottom":
                this.bottom.applyMaterial(material);
                this.updatePivot();
                break;
            case "ring":
                this.ring.applyMaterial(material);
                this.updatePivot();
                break;
            case "button":
                this.button.applyMaterial(material);
                this.updatePivot();
                break;
        }
    }

    /**
     * Update the pivot references to the other pokeball components
     */
    this.updatePivot = function(){
        this.pivot.add(this.top.object);
        this.pivot.add(this.bottom.object);
        this.pivot.add(this.button.object);
        this.pivot.add(this.ring.object);
    }

}