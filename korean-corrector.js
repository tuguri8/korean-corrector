const korrector = require('./src/korrector.js')

module.exports = {
  getDistance: korrector.getDistance,
  correct: korrector.correct,
  correctByDict: korrector.correctByDict,
}
