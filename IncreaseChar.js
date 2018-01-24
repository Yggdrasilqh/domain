

module.exports = class IncreaseChar {
  constructor() {
    this.charArray = ['a']
  }

  add(num, position) {
    if (!position) position = 0
    this.charArray[position] = IncreaseChar.charAdd(this.charArray[position], num)
    if (this.charArray[position] > 'z') {
      this.charArray[position] = 'a'
      if (this.charArray.length <= position + 1) this.charArray.push('a')
      else this.add(num, position + 1)
    }
  }

  firstElem() {
    return this.charArray[0]
  }

  lastElem() {
    return this.charArray[this.charArray.length]
  }

  static charAdd(char, num) {
    return (String.fromCharCode(char.charCodeAt(0) + num))
  }
  
  toString() {
    const a = Object.assign([], this.charArray)
    return a.reverse().toString().replace(/,/g, '')
  }
}
