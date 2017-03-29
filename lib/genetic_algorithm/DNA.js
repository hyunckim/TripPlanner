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
  constructor(destinations, tours) {
    this.genes = [];
    this.fitness = 0;
    this.duration = 0;
    this.tours = tours;
    for (let i = 0; i < destinations.length; i++) {
      this.genes.push(destinations[i]);
    }
    this.genes.shuffle();
    this.calcDistance();
    this.calcFitness();
  }

  calcFitness() {
    this.fitness = 1 / this.duration;
  }

  calcDistance() {
    for (let i = 0; i < this.genes.length - 1; i++) {
      let from = this.genes[i];
      let to = this.genes[i + 1];
      this.duration += parseInt(this.tours[from][to].duration);
    }

  }
}

export default DNA;
