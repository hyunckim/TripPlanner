import DNA from './DNA.js';

class Population {
  constructor(destinations, tours, popMax) {
    this.population = [];
    this.generations = 0;
    this.mutateRate = 0.01;
    this.tours = tours;
    for (let i = 0; i < popMax; i++) {
      this.population.push(new DNA(destinations));
    }
  }

  //calculate fitness of each element in population
  calcFitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(this.tours);
    }
  }

  acceptReject(maxFitness) {
    let r = (Math.random() * maxFitness);
    while (true) {
      let index = Math.floor(Math.random() * this.population.length);
      let partner  = this.population[index];
      if (r < partner.fitness) {
        return partner;
      } else { r -= partner.fitness; }
    }
  }

  generate() {
    let maxFitness = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }
    let newPopulation = [];
    for (let j = 0; j< this.population.length; j++) {
      let partnerA = this.acceptReject(maxFitness);
      let partnerB = this.acceptReject(maxFitness);
      let child = partnerA.crossover(partnerB);
      child.mutate(this.mutateRate);
      newPopulation[j] = child;
    }
    this.population = newPopulation;
    this.generations += 1;
  }

  getFittest() {
    return this.population[this.getFittestIndex()];
  }

  getFittestIndex() {
    let fittestIndex = 0;

    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > this.population[fittestIndex].fitness) {
        fittestIndex = i;
      }
    }
    return fittestIndex;
  }
}

export default Population;
