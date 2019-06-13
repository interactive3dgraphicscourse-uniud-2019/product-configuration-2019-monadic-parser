# Report - Pokéball configurator
Students: Nicolò Rossi, Lorenzo Iuri, Simone Mezzavilla

<img src="https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/product-configuration-2019-monadic-parser/master/images/report/main1.jpg" width="100%"> 

**Disclaimer:** Pokéball is a registered trademarks of Nintendo of America, Inc., used under fair, non commercial, use.

**Disclaimer:** The number of commits of each github account does not represent the actual amount of worktime and codelines of each member of the team; this is because most of the project was done while all the team members where working together in the same place, and usually the commit procedure was preceded by a code-merging phase, in which the various parts of the new codelines (already tested) were reviewed and merged.

## Introduction
The Pokéball configurator allows the user to customize a Pokéball starting from the classic designs, or by choosing from scratch the materials to apply to each component. The materials can be chosen from a list of ceramic and metallic ones, offered in a few colors. In addition, some additional special materials can be selected. These materials were created from PBR textures.

## Components
### Model
The object chosen for the configurator is a Pokéball. The model is made of four components: two halves, the ring and the central button. The configurator can apply the materials to the four components independently.


<img align="right" width="40%" src="https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/product-configuration-2019-monadic-parser/master/images/report/materials1.jpg">

### Materials
The materials used in the configurator can be organized in four categories (as shown in the web interface):
* **Stock**: these materials use the textures representing some of the original Pokéball designs from the games: each variant uses diffuse, normal and roughness map in order to create a PBR visualization; the roughness of the material has been set to obtain the wanted appearance;
* **Metallic**: these materials use a base color and a `metalness` value of 1 along with a proper value of roughness;
* **Ceramic**: these materials use a base color and a `metalness` value of 0 along with a proper value of roughness;
* **Miscellaneous**: these materials use PBR textures simulating various materials (fabric, wood, marble, tiles, rubber, mirror-like surface).

Every material features enviroment reflections from the HDR cubemap.

A 'used' filter can be applied to stock, metallic and ceramic materials. This feature applies a roughness map to the material which will give it a worn appearance.

### Web interface
The web interface shows the model with the applied materials on the left, while the menu on the right allows the user to select the component to customize and the material to apply to it. The various sections of the menu are horizontally scrollable. The whole interface is designed to have fixed dimensions, in order to appear the same on every display. 

## Planning steps
* Initially we decided the model to use upon consulting the online resources for 3D models; an important factor in the final decision was the availability of dedicated textures for the object. 
* Next we modified the found model in order to separate the components we wanted to be customizeable indipendently; for this task we used Blender.
* Concurrently we started designing the web interface for the configurator.
* Once the model was modified we started experimenting with the materials in order to find the proper look to confer to the object in the configurator. Since we opted for environment reflections on every material we discarded the initial idea of using custom shaders and instead implemented them through `MeshStandardMaterial`.
* We chose an environment map along with all the materials and then we implemented the complete configurator.
* After searching for a framework that gave us some basic layout features, we implemented the web interface.

## Files used
The web interface uses some thumbnails which show the user a preview of the material.
The other resources used are the `obj` file for the model, the cubemap of the environment map, the set of textures for the diffuse color, roughness and normal map for the stock and special materials.

## Shading equations


## Credits
Pokéball model and stock textures: https://gamebanana.com/models/3162

PBR Textures: https://cc0textures.com/list.php

Environment map: https://hdrihaven.com

HTML framework: https://getbootstrap.com/
