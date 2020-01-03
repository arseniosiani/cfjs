/* eslint-disable no-undef */
const chai = require('chai')
const cfjs = require('../index')

describe('parse', function () {
  it('parse codice fiscale valido', function () {
    const infos = cfjs.parse('RSSMRA72L09H501S')
    chai.assert.strictEqual(infos.nome, 'MRA')
    chai.assert.strictEqual(infos.cognome, 'RSS')
    chai.assert.strictEqual(infos.sesso, 'M')
    chai.assert.strictEqual(infos.data_nascita, '1972-07-09')
    chai.assert.strictEqual(infos.cap_nascita, '00118')
    chai.assert.strictEqual(infos.cod_catastale_nascita, 'H501')
  })

  it('parse codice fiscale valido estero', function () {
    const infos = cfjs.parse('RSSMRA72L09Z247X')
    chai.assert.strictEqual(infos.nome, 'MRA')
    chai.assert.strictEqual(infos.cognome, 'RSS')
    chai.assert.strictEqual(infos.sesso, 'M')
    chai.assert.strictEqual(infos.data_nascita, '1972-07-09')
    chai.assert.strictEqual(infos.cod_catastale_nascita, 'Z247')
    chai.assert.strictEqual(infos.comune_nascita, 'Malaysia')
    chai.assert.strictEqual(infos.provincia_nascita, 'EE')
  })

  it('check codice fiscale estero NON valido', function () {
    const valid = cfjs.check('RSSMRA72L09Z247R')
    chai.assert.strictEqual(valid, false)
  })

  it('check codice fiscale valido', function () {
    const valid = cfjs.check('RSSMRA72L09H501S')
    chai.assert.strictEqual(valid, true)
  })

  it('check codice fiscale NON valido', function () {
    const valid = cfjs.check('RSSMRA72L09H501B')
    chai.assert.strictEqual(valid, false)
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
    chai.assert.strictEqual(cf, 'RSSMRA72L09H501S')
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
    chai.assert.strictEqual(cf, 'RSSMRA72L09H501S')
  })

  it('stringify anagrafica con solo CAP', function () {
    const infos = {
      nome: 'MARIO',
      cognome: 'ROSSI',
      sesso: 'M',
      data_nascita: '1972-07-09',
      cap_nascita: '00118'
    }
    const cf = cfjs.stringify(infos)
    chai.assert.strictEqual(cf, 'RSSMRA72L09H501S')
  })

  it('stringify anagrafica con provincia e comune', function () {
    const infos = {
      nome: 'MARIO',
      cognome: 'ROSSI',
      sesso: 'M',
      data_nascita: '1972-07-09',
      comune_nascita: 'Roma',
      provincia_nascita: 'RM'
    }
    const cf = cfjs.stringify(infos)
    chai.assert.strictEqual(cf, 'RSSMRA72L09H501S')
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
    chai.assert.strictEqual(cf, 'RSSMRA72L09H501S')
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
    chai.assert.strictEqual(cf, false)
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
    chai.assert.strictEqual(cf, 'RSSMRA72L09Z247X')
  })

  it('cf corretto genera omocodes', function () {
    const omiocodes = cfjs.getOmocodes('RSSMRA72L09Z247X')
    chai.assert.include(omiocodes, 'RSSMRA72L09Z2QTG')
    chai.assert.include(omiocodes, 'RSSMRA72L09ZNQTV')
    chai.assert.include(omiocodes, 'RSSMRA72L0VZNQTK')
    chai.assert.include(omiocodes, 'RSSMRA72LLVZNQTV')
    chai.assert.include(omiocodes, 'RSSMRA7NLLVZNQTG')
    chai.assert.include(omiocodes, 'RSSMRATNLLVZNQTD')
    chai.assert.include(omiocodes, 'RSSMRA72L09Z24TU')
    chai.assert.include(omiocodes, 'RSSMRA72L09Z24TU')
  })

  it('omocodes passano check', function () {
    const omiocodes = cfjs.getOmocodes('RSSMRA72L09Z247X')
    const checks = omiocodes.map(cfjs.check)
    checks.forEach(check => chai.assert.isTrue(check))
  })

  it('stringify nascita all\'estero', function () {
    const cf = cfjs.stringify({
      nome: 'MARIO',
      cognome: 'ROSSI',
      sesso: 'M',
      data_nascita: '1972-07-09',
      comune_nascita: 'Germania' // stato estero
    })
    chai.assert.equal(cf, 'RSSMRA72L09Z112D')
  })
})
