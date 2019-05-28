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
* aumento del numero di poligoni del modello

### Proposte e valutazione
#### Ricerca di un modello adeguato
Il modello per la Pokèball trovato non divide le componenti, non consentendo così di assegnare materiali alle varie parti in modo indipendente.
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
* Creazione prototipo con cui è possibile assegnare le texture alle varie componenti, utilizzando uno shader personalizzato
<img src="https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto2/journal/1st_try.jpg" width="40%">

#### 17/05/2019
* Introduzione delle opzioni per selezionare il materiale da utilizzare sulle componenti
* Scelta dei materiali da utilizzare nel configuratore (predefiniti, metallici, ceramici e vari)
<img src="https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto2/journal/metallic_reflections.jpg" width="70%">

#### 24/05/2019
In seguito ad una valutazione del risultato atteso ci siamo accorti che è necessario implementare le riflessioni ambientali tramite environment map sui materiali ceramici utilizzati, a questo fine si è deciso di non utilizzare gli shader personalizzati ma di sfruttare MeshStandardMaterial e di riscrivere il codice di conseguenza.
* Riscrittura del codice secondo le convenzioni ES6, organizzando il codice in classi per un più facile utilizzo
* Implementazione di riflessi ambientali tramite environment map su superfici non metalliche, secondo l'esempio https://threejs.org/examples/?q=env#webgl_materials_envmaps_hdr
* Implementazione di una interfaccia tramite dat.gui a fine di testing.
<img src="https://raw.githubusercontent.com/redsnic/I3DG_Uniud/master/images/progetto2/journal/reflects.jpg" width="70%">

#### 25/05/2019
* Realizzazione del sito web con le opzioni per configurare l'oggetto
* Realizzazione delle thumbnail di anteprima dei materiali

#### 26/05/2019
* Modifica delle thumbnail del sito e dell'esposizione della scena


## Problemi e soluzioni
#### Componenti
Il modello trovato non divide la componenti della Pokèball, non fornendo così la possibilità di modificare indipendentemente le parti. Per risolverlo abbiamo modificato il modello tramite Blender.
#### Sito web
Il sito, realizzato utilizzando Bootstrap non mantiene un layout corretto modificando la risoluzione del display. Per risolverlo abbiamo forzato la dimensione relativa delle componenti.
#### Riflessioni
L'implementazione delle riflessioni della environment map su materiali ceramici e su metallici non perfettamente lisci tramite shader risulta problematica, abbiamo quindi utilizzato il materiale meshStandardMaterial con il generatore di PMREM.
