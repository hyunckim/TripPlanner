Array.prototype.shuffle = function() {
  let counter = this.length - 1;

  // While there are elements in the array
  while (counter > 1) {
      // Pick a random index
      let index = Math.floor(Math.random() * (this.length - 2) + 1);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      [this[counter], this[index]] = [this[index], this[counter]];
  }

  return this;
};

class DNA {
  constructor(destinations) {
    this.genes = [];
    this.fitness = 0;
    this.distance = 0;
    for (let i = 0; i < destinations.length; i++) {
      this.genes.push(destinations[i]);
    }
    this.genes.shuffle();
  }

  calcFitness() {
    this.fitness = 1 / this.distance;
  }

  calcDistance() {
    //calculate distance using google map distance api
  }
}

export default DNA;
