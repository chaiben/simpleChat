module.exports = class Dice {
  sides = 6
  constructor (sides) {
    if (sides) { this.sides = sides }
  }

  roll () {
    return Math.floor(Math.random() * this.sides) + 1
  }
}
