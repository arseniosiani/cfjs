const assert = require('assert')
const cfjs = require('../index')

// eslint-disable-next-line no-undef
describe('parse', function () {
  it('parse codice fiscale valido', function () {
    const infos = cfjs.parse('RSSMRA72L09H501S')
    assert.strictEqual(infos.nome, 'MRA')
    assert.strictEqual(infos.cognome, 'RSS')
    assert.strictEqual(infos.sesso, 'M')
    assert.strictEqual(infos.data_nascita, '1972-07-09')
    assert.strictEqual(infos.cap_nascita, '00118')
    assert.strictEqual(infos.cod_catastale_nascita, 'H501')
  })
  it('parse codice fiscale valido estero', function () {
    const infos = cfjs.parse('RSSMRA72L09Z247X')
    assert.strictEqual(infos.nome, 'MRA')
    assert.strictEqual(infos.cognome, 'RSS')
    assert.strictEqual(infos.sesso, 'M')
    assert.strictEqual(infos.data_nascita, '1972-07-09')
    // assert.strictEqual(infos.cap_nascita, '00118')
    assert.strictEqual(infos.cod_catastale_nascita, 'Z247')
  })
  it('check codice fiscale valido', function () {
    const valid = cfjs.check('RSSMRA72L09H501S')
    assert.strictEqual(valid, true)
  })
  it('check codice fiscale NON valido', function () {
    const valid = cfjs.check('RSSMRA72L09H501B')
    assert.strictEqual(valid, false)
  })
  it('stringify anagrafica', function () {
    const infos = {
      nome: 'MARIO',
      cognome: 'ROSSI',
      sesso: 'M',
      data_nascita: '1972-07-09',
      comune_nascita: 'Roma',
      provincia_nascita: 'RM',
      cap_nascita: '00118',
      cod_catastale_nascita: 'H501'
    }
    const cf = cfjs.stringify(infos)
    assert.strictEqual(cf, 'RSSMRA72L09H501S')
  })
  it('stringify anagrafica con solo codice catastale', function () {
    const infos = {
      nome: 'MARIO',
      cognome: 'ROSSI',
      sesso: 'M',
      data_nascita: '1972-07-09',
      cod_catastale_nascita: 'H501'
    }
    const cf = cfjs.stringify(infos)
    assert.strictEqual(cf, 'RSSMRA72L09H501S')
  })
  it('stringify anagrafica con solo CAP', function () {
    const infos = {
      nome: 'MARIO',
      cognome: 'ROSSI',
      sesso: 'M',
      data_nascita: '1972-07-09',
      cap_nascita: '00118',
    }
    const cf = cfjs.stringify(infos)
    assert.strictEqual(cf, 'RSSMRA72L09H501S')
  })
  it('stringify anagrafica con provincia e comune', function () {
    const infos = {
      nome: 'MARIO',
      cognome: 'ROSSI',
      sesso: 'M',
      data_nascita: '1972-07-09',
      comune_nascita: 'Roma',
      provincia_nascita: 'RM',
    }
    const cf = cfjs.stringify(infos)
    assert.strictEqual(cf, 'RSSMRA72L09H501S')
  })
  it('stringify anagrafica con solo comune', function () {
    const infos = {
      nome: 'MARIO',
      cognome: 'ROSSI',
      sesso: 'M',
      data_nascita: '1972-07-09',
      comune_nascita: 'Roma'
    }
    const cf = cfjs.stringify(infos)
    assert.strictEqual(cf, 'RSSMRA72L09H501S')
  })
  it('stringify anagrafica con provincia e comune errati', function () {
    const infos = {
      nome: 'MARIO',
      cognome: 'ROSSI',
      sesso: 'M',
      data_nascita: '1972-07-09',
      comune_nascita: 'Firenzesex'
    }
    const cf = cfjs.stringify(infos)
    assert.strictEqual(cf, false)
  })
  it('stringify anagrafica con solo codice catastale estero', function () {
    const infos = {
      nome: 'MARIO',
      cognome: 'ROSSI',
      sesso: 'M',
      data_nascita: '1972-07-09',
      cod_catastale_nascita: 'Z247'
    }
    const cf = cfjs.stringify(infos)
    assert.strictEqual(cf, 'RSSMRA72L09Z247X')
  })

})
