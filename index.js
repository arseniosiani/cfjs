

const check_code_odd = {
  0: 1, 1: 0, 2: 5, 3: 7, 4: 9, 5: 13, 6: 15, 7: 17, 8: 19, 9: 21, A: 1, B: 0, C: 5, D: 7, E: 9, F: 13, G: 15, H: 17, I: 19, J: 21, K: 2, L: 4, M: 18, N: 20,
  O: 11, P: 3, Q: 6, R: 8, S: 12, T: 14, U: 16, V: 10, W: 22, X: 25, Y: 24, Z: 23
};

const check_code_even = {
  0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J: 9, K: 10, L: 11, M: 12, N: 13, O: 14, P: 15, Q: 16, R: 17, S: 18,
  T: 19, U: 20, V: 21, W: 22, X: 23, Y: 24, Z: 25
};
const check_code_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const month_codes = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'T'];

const comuni = require('./comuni');
const moment = require('moment');

module.exports = {
  parse: function (cf) {
    cf = cf.toUpperCase();
    if (!this.check(cf))
      return false;
    let yearCode = cf.substr(6, 2);
    let year19XX = parseInt("19" + yearCode, 10);
    let year20XX = parseInt("20" + yearCode, 10);
    let current_year = new Date().getFullYear();
    let year = year20XX > current_year ? year19XX : year20XX;
    let monthChar = cf.substr(8, 1);
    let month = month_codes.indexOf(monthChar) + 1;
    let sesso = 'M';
    let day = parseInt(cf.substr(9, 2), 10);
    if (day > 31) {
      sesso = 'F';
      day = day - 40;
    }
    let data_nascita = year + "-" + month.toString().padStart(2, "0") + "-" + day.toString().padStart(2, "0")

    const codice_catastale = cf.substr(11, 4);
    let luogo_nascita = comuni.find(i => i.codiceCatastale === codice_catastale);
    return {
      nome: cf.substr(3, 3),
      cognome: cf.substr(0, 3),
      sesso: sesso,
      data_nascita: data_nascita,
      comune_nascita: luogo_nascita.nome,
      provincia_nascita: luogo_nascita.sigla,
      cap_nascita: luogo_nascita.cap[0],
      cod_catastale_nascita: luogo_nascita.codiceCatastale
    }
  },

  stringify: function (data) {
    let code = '';
    code += (data.cognome.replace(/[^BCDFGHJKLMNPQRSTVWXYZ]/gi, '') + data.cognome.replace(/[^AEIOU]/gi, '') + "XXX").substr(0, 3);
    code += (data.nome.replace(/[^BCDFGHJKLMNPQRSTVWXYZ]/gi, '') + data.nome.replace(/[^AEIOU]/gi, '') + "XXX").substr(0, 3);

    let data_nascita = moment(data.data_nascita, "YYYY-MM-DD");
    code += data_nascita.format("YY");
    code += month_codes[parseInt(data_nascita.format("M") - 1, 10)];

    let day = parseInt(data_nascita.format("D"));
    if (data.sesso.toUpperCase() === 'F') {
      day += 40;
    }
    code += day.toString().padStart(2, "0");

    let comune_nascita = null
    if (data.comune_nascita)
      comune_nascita = comuni.find(i => i.nome.toLowerCase() === data.comune_nascita.toLowerCase())
    if (data.cap_nascita)
      comune_nascita = comuni.find(i => i.cap.indexOf(data.cap_nascita) > -1)
    if (data.cod_catastale_nascita)
      comune_nascita = comuni.find(i => i.codiceCatastale.toLowerCase() === data.cod_catastale_nascita.toLowerCase())

    if (!comune_nascita) {
      return false;
    }

    code += comune_nascita.codiceCatastale;
    code += getCheckCode(code);
    return code;
  },

  check: function (cf) {
    if (typeof cf !== 'string') {
      return false;
    }
    cf = cf.toUpperCase();
    if (cf.length !== 16) {
      return false;
    }
    return getCheckCode(cf.slice(0, 15)) === cf.charAt(15);
  },

};
let getCheckCode = function (cf) {
  let val = 0;
  for (let i = 0; i < 15; i = i + 1) {
    const c = cf[i];
    val += i % 2 !== 0 ? check_code_even[c] : check_code_odd[c];
  }
  val = val % 26;
  return check_code_chars.charAt(val);
}

