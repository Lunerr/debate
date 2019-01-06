class Random {
  nextInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  nextFloat(min, max) {
    return this.nextInt(min * 100, max * 100 + 1) / 100;
  }

  roll() {
    return this.nextFloat(0, 100);
  }

  arrayElement(array) {
    return array[this.nextInt(0, array.length)];
  }

  objectProp(object) {
    return Object.keys(object)[Math.floor(Math.random() * Object.keys(object).length)];
  }

  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}

module.exports = new Random();
