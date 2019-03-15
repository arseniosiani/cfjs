let assert = require('assert');
const cfjs = require('../index');

describe('parse', function () {
  it('parse codice fiscale valido', function () {
    let infos = cfjs.parse("RSSMRA72L09H501S");
    assert.equal(infos.nome, "MRA");
    assert.equal(infos.cognome, "RSS");
    assert.equal(infos.sesso, "M");
    assert.equal(infos.data_nascita, "1972-07-09");
    assert.equal(infos.cap_nascita, "00118");
    assert.equal(infos.cod_catastale_nascita, "H501");
  });
  it('check codice fiscale valido', function () {
    let valid = cfjs.check("RSSMRA72L09H501S");
    assert.equal(valid, true);
  });
  it('check codice fiscale NON valido', function () {
    let valid = cfjs.check("RSSMRA72L09H501B");
    assert.equal(valid, false);
  });
  it('stringify anagrafica', function () {
    let infos = {
      nome: 'MARIO',
      cognome: 'ROSSI',
      sesso: 'M',
      data_nascita: '1972-07-09',
      comune_nascita: 'Roma',
      provincia_nascita: 'RM',
      cap_nascita: '00118',
      cod_catastale_nascita: 'H501'
    }
    let cf = cfjs.stringify(infos);
    assert.equal(cf, "RSSMRA72L09H501S");
  });
  it('stringify anagrafica con solo codice catastale', function () {
    let infos = {
      nome: 'MARIO',
      cognome: 'ROSSI',
      sesso: 'M',
      data_nascita: '1972-07-09',
      cod_catastale_nascita: 'H501'
    }
    let cf = cfjs.stringify(infos);
    assert.equal(cf, "RSSMRA72L09H501S");
  });
  it('stringify anagrafica con solo CAP', function () {
    let infos = {
      nome: 'MARIO',
      cognome: 'ROSSI',
      sesso: 'M',
      data_nascita: '1972-07-09',
      cap_nascita: '00118',
    }
    let cf = cfjs.stringify(infos);
    assert.equal(cf, "RSSMRA72L09H501S");
  });
  it('stringify anagrafica con provincia e comune', function () {
    let infos = {
      nome: 'MARIO',
      cognome: 'ROSSI',
      sesso: 'M',
      data_nascita: '1972-07-09',
      comune_nascita: 'Roma',
      provincia_nascita: 'RM',
    }
    let cf = cfjs.stringify(infos);
    assert.equal(cf, "RSSMRA72L09H501S");
  });
  it('stringify anagrafica con solo comune', function () {
    let infos = {
      nome: 'MARIO',
      cognome: 'ROSSI',
      sesso: 'M',
      data_nascita: '1972-07-09',
      comune_nascita: 'Roma'
    }
    let cf = cfjs.stringify(infos);
    assert.equal(cf, "RSSMRA72L09H501S");
  });
  it('stringify anagrafica con provincia e comune errati', function () {
    let infos = {
      nome: 'MARIO',
      cognome: 'ROSSI',
      sesso: 'M',
      data_nascita: '1972-07-09',
      comune_nascita: 'Firenzesex'
    }
    let cf = cfjs.stringify(infos);
    assert.equal(cf, false);
  });

});
