import DNA from './DNA.js';

class Population {
  constructor(destinations, popMax) {
    this.population = [];
    this.matingPool = [];
    this.generations = 0;
    this.finished = false;

    for (let i = 0; i < popMax; i++) {
      this.population.push(new DNA(destinations));
    }
  }

  //calculate fitness of each element in population
  calcFitness() {

  }

  naturalSelection() {

  }
}

export default Population;
