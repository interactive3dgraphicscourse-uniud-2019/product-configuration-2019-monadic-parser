## Full Rendering Equation

In our project we used `THREE.MeshStandardMaterial`, looking at `bsdfs.glsl.js` the rendering equation used for this material is:

 $$ L(l, geometry, material) = $$
 $$\pi(irradiance*BRDF_{specularGGX}(roughness, c_{spec}, l, v, n)+irradiance*BRDF_{lambert}(c_{diff})) $$

### BRDF lambert

This is the diffuse component of the BRDF:

$$ BRDF_{lambert} (c_{diff}) = c_{diff}/\pi$$

### BRDF specular GGX

This is the specular component of the BRDF:

$$ BRDF_{specularGGX} = F_{Schlick}(c_{spec}, l*h) * G_{GGX}(\alpha, n*l, n*v) * D_{GGX}(\alpha, n*h) $$

$$ h = l*v $$
### Fresnel term (Schhlick approximation)
$$  F_{Schlick}(c_{spec}, l*h) = (1-c_{spec})(2^{(l*h)(-5.55(l*h)-6.98)})+ c_{spec}  $$ 

### Geometry function ( Smith )

$$ G_{GGX}(\alpha, n*l, n*v) = \frac{1}{2*max(gv+gl, \epsilon)}$$

$$ gv = (n*l)\sqrt{2^{\alpha + (1-2^\alpha)*(n*v)} } $$
$$ gl = (n*v)\sqrt{2^{\alpha + (1-2^\alpha)*(n*l)} } $$

$$ \alpha = roughness^2 $$

### Normal distribution function

$$ D_{GGX}(\alpha, n*h) = \frac{2^{\alpha}  }{\pi2^{2^{(n*h)}2^{\alpha}+1}}$$


