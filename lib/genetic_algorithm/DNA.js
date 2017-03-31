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
  constructor(destinations, shuffle = true) {
    this.genes = [];
    this.fitness = 0;
    this.duration = 0;
    this.distance = 0;
    for (let i = 0; i < destinations.length; i++) {
      this.genes.push(destinations[i]);
    }
    if (shuffle) {
      this.genes.shuffle();
    }
  }

  calcFitness(tours) {
    this.fitness = 0;
    this.calcDuration(tours);
    this.fitness = 1 / this.duration;
  }

  calcDuration(tours) {
    this.duration = 0;
    this.distance = 0;
    for (let i = 0; i < this.genes.length - 1; i++) {
      let from = this.genes[i];
      let to = this.genes[i + 1];
      if (tours[from][to] === undefined) {
        alert("error! try again!");
      } else {
        this.duration += parseFloat(tours[from][to].duration);
        this.distance += parseFloat(tours[from][to].distance);
      }
    }
  }

  setDNA(destinations) {
    this.destinations = destinations;
  }

  crossover(partner) {
    let child = [];
    child[0] = this.genes[0];
    child[this.genes.length - 1] = this.genes[this.genes.length - 1];
    let startPos = Math.floor(Math.random() * (this.genes.length - 2) + 1);
    let endPos = Math.floor(Math.random() * (this.genes.length - 2) + 1);

    let i = startPos;

    while (i != endPos) {
      child[i] = this.genes[i];
      i++;

      if (i >= this.genes.length) {
        i = 1;
      }
    }

    for (let j = 1; j < partner.genes.length; j++) {
      let gene = partner.genes[j];
      if (child.includes(gene)) { continue; }
      else {
        for (let k = 0; k < this.genes.length; k++) {
          if (child[k] === undefined) {
            child[k] = gene;
            break;
          }
        }
      }
    }
    let dnaChild = new DNA(child, false);
    return dnaChild;
  }

  mutate(mutationRate) {
    for (let i = 1; i < this.genes.length - 1; i++) {
      if (Math.random() < mutationRate) {
        let randomIndex = Math.floor(Math.random() * (this.genes.length - 2) + 1);
        let tempGene = this.genes[randomIndex];
        this.genes[randomIndex] = this.genes[i];
        this.genes[i] = tempGene;
      }
    }
  }
}

export default DNA;
