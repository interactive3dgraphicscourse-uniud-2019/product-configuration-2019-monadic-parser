# Report - Pokéball configurator
Students: Nicolò Rossi, Lorenzo Iuri, Simone Mezzavilla

<img src="https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/product-configuration-2019-monadic-parser/master/images/report/main1.jpg" width="100%"> 

**Disclaimer:** Pokéball is a registered trademarks of Nintendo of America, Inc., used under fair, non commercial, use.

**Disclaimer:** the number of commits of each github account does not represent the actual amount of worktime and codelines of each member of the team; this is because most of the project was done while all the team members where working together in the same place, and usually the commit procedure was preceded by a code-merging phase, in which the various parts of the new codelines (already tested) were reviewed and merged.

## Introduction
The Pokéball configurator allows the user to customize a Pokéball starting from the classic designs or choosing from scratch the materials to apply to each component. The materials can be chosen from a list of ceramic and metallic ones, offered in a few colors. In addition some custom materials can be selected, created from PBR textures.

## Features
### Model
The object chosen for the configurator is a Pokéball. The model is made of four components: two halves, the ring and the central button. The configurator can apply the materials to the four components indipendently.


<img align="right" width="40%" src="https://raw.githubusercontent.com/interactive3dgraphicscourse-uniud-2019/product-configuration-2019-monadic-parser/master/images/report/materials1.jpg">

### Materials
The materials used in the configurator can be organized in four categories (as shown in the web interface):
* **stock**: these materials use the textures representing some of the original designs from the game: each variant uses diffuse, normal and roughness map in order to create a PBR visualization; the roughness of the material has been tweaked to confer the wanted appearance
* **metallic**: these materials use a base color and a `metalness` value of 1 along with a proper value of roughness
* **ceramic**: these materials use a base color and a `metalness` value of 0 along with a proper value of roughness
* **miscellaneous**: these materials use PBR textures simulating various materials (fabric, wood, marble, tiles, rubber, mirror-like surface).

Every material features enviroment reflections from the HDR cubemap.

The stock, metallic and ceramic materials can be chosen as used, this feature will apply a roughness map to the material providing it a worn appearance.

### Web interface
The web interface shows on the left the model with the applied materials and on the right the menus which allows the user to select the component to customize and the material to apply to it. The menus are horizontally scrollable. The whole interface has a fixed dimensions to appear the same on every display. 

## Planning steps
* Initially we decided the model to use upon consulting the online resources for 3D models, an important factor in the final decision was the availability of dedicated textures for the object. 
* Next we modified the found model in order to separate the components we wanted to customize indipendently; for this task we used Blender.
* Concurrently we started designing the web interface for the configurator.
* Once the model was modified we started experimenting with the materials in order to find the proper look to confer to the object in the configurator. Since we opted for environment reflections on every material we discarded the initial idea of using custom shaders and used implemented them through `MeshStandardMaterial`.
* Then we chose an environment map and all the materials and implemented the complete working configurator.
* Finally we implemented the web interface after searching for a framework that gave us some basic layout features.

## Files used
The web interface uses some thumbnails to allow the user to preview the material before applying it to the component.
The other resources used are the `obj` file for the model, the cubemap of the environment map, the set of textures for the diffuse color, roughness and normal map for the stock and special materials.

## Shading equations

## Credits
Pokéball model and stock textures: https://gamebanana.com/models/3162

PBR Textures: https://cc0textures.com/list.php

Environment map: https://hdrihaven.com

HTML framework: https://getbootstrap.com/
