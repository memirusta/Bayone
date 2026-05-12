const fs = require('fs');

class DB {
  constructor() {}

  yaz(veri, değer) {
    const dosya = JSON.parse(fs.readFileSync('database.json', 'utf-8'));
    dosya[veri] = değer;
    fs.writeFileSync('database.json', JSON.stringify(dosya, null, 2));
  }

  bul(veri) {
    const dosya = JSON.parse(fs.readFileSync('database.json', 'utf-8'));
    if (!dosya[veri]) return;
    return dosya[veri];
  }

  kontrol(veri) {
    const dosya = JSON.parse(fs.readFileSync('database.json', 'utf-8'));
    return !!dosya[veri];
  }

  sil(veri) {
    const dosya = JSON.parse(fs.readFileSync('database.json', 'utf-8'));
    if (!dosya[veri]) return;
    delete dosya[veri];
    fs.writeFileSync('database.json', JSON.stringify(dosya, null, 2));
  }

  topla(veri, değer) {
    if (!veri) return;
    const dosya = JSON.parse(fs.readFileSync('database.json', 'utf-8'));
    if (typeof değer !== 'number') return;
    if (!this.kontrol(veri)) return;
    if (typeof this.bul(veri) !== 'number') return;
    dosya[veri] += değer;
    fs.writeFileSync('database.json', JSON.stringify(dosya, null, 2));
  }

  çıkar(veri, değer) {
    if (!veri) return;
    const dosya = JSON.parse(fs.readFileSync('database.json', 'utf-8'));
    if (typeof değer !== 'number') return;
    if (!this.kontrol(veri)) return;
    if (typeof this.bul(veri) !== 'number') return;
    dosya[veri] -= değer;
    fs.writeFileSync('database.json', JSON.stringify(dosya, null, 2));
  }
}

const db = new DB();
module.exports = db;
