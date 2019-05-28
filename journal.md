# Journal
Questo documento tiene traccia del processo di sviluppo del progetto di grafica 3D, elencando le modifiche effettuate e le soluzioni implementate.

## Decisioni di sviluppo
Questa sezione si occupa di elencare e descrivere le motivazioni delle varie decisioni implementative e di design prese per il progetto in questione.
Data la consegna, si è pensato di creare la pagina di un sito per la personalizzazione e configurazione di Pokéball. Quersto consenterà la visualizzazione di un modello 3D le cui componenti sono configurabili tramite delle opzioni poste nei menù.

### Requisiti base
Il progetto prevederà le seguenti attività funzionalità di base:
* la possibilità di selezionare una texture predefinita tra alcuni "top selling"
* la possibilità di applicare le colorazioni e texture alle singole parti della ball (top, bottom, ring, button)
* la selezione tra un prodotto nuovo e uno usato, che cambia l'aspetto del prodotto di conseguenza
* una environment map adatta al contesto
* la possibilità di ispezionare l'oggetto liberamente

### Requisiti aggiuntivi
Oltre ai requisiti base, questi sono stati inizialmente proposti:
* utilizzo di materiali metallici e ceramici
* utilizzo di un materiale specchiato e uno trasparente
* riepilogo delle scelte effettuate
* realizzazione di un sito mobile

### Proposte e valutazione
#### Environment map
Si è valutata la possibilità di utilizzare una environment map tratta da scene del gioco, questa non è stata realizzata perché tale environment map non è stata trovata.
#### Animazione
Si è valutata la possibilità di aggiungere una animazione per l'apertura della Pokèball e la personalizzazione dell'interno dell'oggetto, questa scelta è stata velocemente scartata in quanto il modello utilizzato non ha una parte interna.
#### Oggetti nella scena
Si è valutata la possibilità di inserire nella scena altri oggetti pertinenti al tema, come un oggetto su cui l'oggetto posa. Si è preferito evitare questa aggiunta per consentire una maggiore libertà nell'ispezione dell'oggetto.

## Progressi
#### 10/05/2019
* Discussione requisiti
* Ricerca modelli
* Decisione dei materiali da utilizzare

#### 11/05/2019
* Discussione sul design del sito web
* Decisione della environment map da utilizzare
* Implementazione del modello base
<img src="https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto2/journal/whiteboard_1.jpg" width="80%">

#### 12/05/2019
* Modifica del modello tramite blender per dividere le parti della ball in diversi oggetti
* Creazione prototipo con cui è possibile assegnare le texture alle varie componenti
<img src="https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto2/journal/1st_try.jpg" width="40%">

#### 17/05/2019
#### 18/05/2019

#### 24/05/2019
#### 25/05/2019

#### 26/05/2019
* Modifica delle thumbnail del sito


## Bug e soluzioni
#### Problema
Il modello trovato non divide la componenti della Pokèball, non fornendo così la possibilità di modificare indipendentemente le parti
#### Soluzione
Modifica del modello tramite Blender

## Crediti
Modello della Pokeball e le texture predefinite: https://gamebanana.com/models/3162

PBR Textures: https://cc0textures.com/list.php

Environment map: https://hdrihaven.com

HTML framework: https://getbootstrap.com/
