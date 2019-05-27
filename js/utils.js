
/* utility functions */

/* loads the cubemap into the global variable */
loadHDRCubeMap = function () {
    var hdrUrls = ['px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr'];
    globalHDRCubeMap = new THREE.HDRCubeTextureLoader()
        .setPath(ENVMAP_PATH)
        .load(THREE.UnsignedByteType, hdrUrls, function () {

            var pmremGenerator = new THREE.PMREMGenerator(globalHDRCubeMap);
            pmremGenerator.update(renderer);

            var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker(pmremGenerator.cubeLods);
            pmremCubeUVPacker.update(renderer);

            globalHDRCubeRenderTarget = pmremCubeUVPacker.CubeUVRenderTarget;

            globalHDRCubeMap.magFilter = THREE.LinearFilter;
            globalHDRCubeMap.needsUpdate = true;

            pmremGenerator.dispose();
            pmremCubeUVPacker.dispose();

            globalEnvMapLoaded = true;
        });
}

/* loads the input texture image from the @file path and returns the loaded texture */
function loadTexture(file) {
    let texture = new THREE.TextureLoader().load(file, function (texture) {
        texture.minFilter = THREE.LinearMipMapLinearFilter;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.offset.set(0, 0);
        texture.needsUpdate = true;
    })
    return texture;
}