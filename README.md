
# cfjs

Modulo nodejs che il effettua il check/creazione/parsing del Codice Fiscale italiano, l'elenco dei comuni italiani viene aggiornato [dal repo di matteocontrini](https://github.com/matteocontrini/comuni-json); buona parte della logica proviene [dal repo di lucavandro](https://github.com/lucavandro/CodiceFiscaleJS)
Semplice e diretto!

# Intallation

    npm i @arseniosiani/cfjs --save

# Usage

```javascript
const  cfjs  =  require('@arseniosiani/cfjs');
let  infos  =  cfjs.parse("RSSMRA72L09H501S");
console.log(infos);
// {
// nome: 'MARIO',
// cognome: 'ROSSI',
// sesso: 'M',
// data_nascita: '1972-07-09',
// comune_nascita: 'Roma',
// provincia_nascita: 'RM',
// cap_nascita: '00118',
// cod_catastale_nascita: 'H501'
// }

let cf = cfjs.stringify({
  nome: 'MARIO',
  cognome: 'ROSSI',
  sesso: 'M',
  data_nascita: '1972-07-09',
  comune_nascita: 'Roma',
  provincia_nascita: 'RM',
  cap_nascita: '00118',
  cod_catastale_nascita: 'H501'
});
console.log(cf);  // RSSMRA72L09H501S

let is_valid = cfjs.check("RSSMRA72L09H501S");
console.log(is_valid);  // true
```

È possibile calcolare il Codice fiscale indicando anche solo alcune informazioni del luogo di nascita:
```javascript
let cf = cfjs.stringify({
  nome: 'MARIO',
  cognome: 'ROSSI',
  sesso: 'M',
  data_nascita: '1972-07-09',
  cap_nascita: '00118', // solo CAP
});
console.log(cf);  // RSSMRA72L09H501S

let cf = cfjs.stringify({
  nome: 'MARIO',
  cognome: 'ROSSI',
  sesso: 'M',
  data_nascita: '1972-07-09',
  cod_catastale_nascita: 'H501' // solo codice catastale
});
console.log(cf);  // RSSMRA72L09H501
```
