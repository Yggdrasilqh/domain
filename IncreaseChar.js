

class increaseChar {
  constructor() {
    this.charArray = ['a']
  }

  add() {
    const result = this.charAdd(this.firstElem(), 1)
    if (result < 'z') {
      this.charArray[0] = this.charAdd(this.firstElem(), 1)
    }
  }

  firstElem() {
    return this.charArray[0]
  }

  lastElem() {
    return this.charArray[this.charArray.length]
  }

  charAdd = (char, num) => {
    return (String.fromCharCode(char.charCodeAt(0) + num))
  }
}