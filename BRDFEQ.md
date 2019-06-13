## Eq di rendering

 $$ L(l, geometry, material) = $$
 $$\pi(irradiance*BRDF_{specularGGX}(roughness, c_{spec}, l, v, n)+irradiance*BRDF_{lambert}(c_{diff})) $$

### BRDF lambert

$$ BRDF_{lambert} (c_{diff}) = c_{diff}/\pi$$

### BRDF specular GGX

$$ BRDF_{specularGGX} = F_{Schlick}(c_{spec}, l*h) * G_{GGX}(\alpha, n*l, n*v) * D_{GGX}(\alpha, n*h) $$

$$ h = l*v $$
### Schhlick approximation
$$  F_{Schlick}(c_{spec}, l*h) = (1-c_{spec})(2^{(l*h)(-5.55(l*h)-6.98)})+ c_{spec}  $$ 

### G

$$ G_{GGX}(\alpha, n*l, n*v) = \frac{1}{2*max(gv+gl, \epsilon)}$$

$$ gv = (n*l)\sqrt{2^{\alpha + (1-2^\alpha)*(n*v)} } $$
$$ gl = (n*v)\sqrt{2^{\alpha + (1-2^\alpha)*(n*l)} } $$

### D

$$ D_{GGX}(\alpha, n*h) = \frac{2^{\alpha}  }{\pi2^{2^{(n*h)}2^{\alpha}+1}}$$


