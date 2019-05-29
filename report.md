# Report - Pokéball configurator
Students: Nicolò Rossi, Lorenzo Iuri, Simone Mezzavilla

<img src="https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto2/relazione/main.jpg" width="100%"> 

**Disclaimer:** Pokéball is a registered trademarks of Nintendo of America, Inc., used under fair, non commercial, use.

**Disclaimer:** the number of commits of each github account does not represent the actual amount of worktime and codelines of each member of the team; this is because most of the project was done while all the team members where working together in the same place, and usually the commit procedure was preceded by a code-merging phase, in which the various parts of the new codelines (already tested) were reviewed and merged.

## Introduction
The Pokéball configurator allows the user to customize a Pokéball starting from the classic designs or to choose from scratch the materials to apply at each component. The materials can be choose from a list of ceramic and metallic ones, offered in a few colors. In addition some custom materials can be selected, realized with PBR textures.

## Features
### Model
The object choosen for the configurator is a Pokéball. The model is made from four components: thw two halves, the ring and the central button. The configurator can change the material of the four components indipendently.

### Materials
The materials used in the configurator can be organized in four categories (as shown in the web interface).
* **stock**: these materials use the textures representing some of the original designs from the game: each variant uses diffuse, normal and roughness map in order to create a PBR visualization; the roughness of the material has been tweaked to confer to wanted appearance
* **metallic**: these materials use a base color and a `metalness` value of 1 along with a proper value of roughness
* **ceramic**: these materials use a base color and a `metalness` value of 0 along with a proper value of roughness
* **miscellaneous**: these materials use PBR textures simulating various materials (fabric, wood, marble, tiles, rubber, mirror-like surface).

Every material has enviroment reflections from a HDR cubemap.

### Web interface
The web interface shows on the left the model with the applied materials and to the right the menus which allows the user to select the component to customize and the material to apply to it. The menus are horizontally scrollable. The whole interface has a fixed dimensions on every display. 

## Planning steps
The materials are implemented through `MeshStandardMaterial`

## Files used

## Shading equations

## Credits
Pokéball model and stock textures: https://gamebanana.com/models/3162

PBR Textures: https://cc0textures.com/list.php

Environment map: https://hdrihaven.com

HTML framework: https://getbootstrap.com/
