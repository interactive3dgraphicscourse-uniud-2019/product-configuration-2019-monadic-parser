
/* Class for the pokeball component object */
export class PokeballComponent {

    constructor(geometrySource) {
        this._material;
        this._geometry = geometrySource;
        this._material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        this._object = new THREE.Mesh(this._geometry, this._material);
    }

    /* applies the input @material to this object  */
    applyMaterial(materialToApply) {
        this._material = materialToApply;
        this._object.material = this._material;
    }

}