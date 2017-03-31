## Trip Planner
Traveling Salesperson Problem with Google Map API as visualizer.

[Live link](https://hyunckim.github.io/TripPlanner/)

![demo_2](/docs/trip_planner.gif)

### Background

Traveling Salesperson Problem describes a salesman who must travel between N cities. The order which he must travel does not matter as long as he visits each city once and finishes at the city he started. This optimization problem has (N - 1) ! / 2 possibilities for N cities. While there are many different optimization algorithms to solve TSP, I decided to utilize Genetic Algorithm to calculate the shortest trip for given destinations.

https://en.wikipedia.org/wiki/Travelling_salesman_problem

### Implementation
- JavaScript
- Google Map API

### Functionality
- [x] Genetic Algorithm
- [x] Mark Placing on Google Map
- [x] Calculating distance and duration using Google Distance Matrix API

### Genetic Algorithm

Genetic Algorithm offers a solution to find the shortest route without having to check every possible routes. Genetic Algorithms imitate some of the processes observed in natural evolution, specifically the principal by Charles Darwin, Survival of the Fittest. The algorithm first creates a population of P random samples, and repeatedly evolves the population towards optimal solution.

#### setup()
  Step 1: The Population
  1. Create an empty population.
  2. Fill it with DNA encoded objects (pick random values to start)

#### draw()
  Step 1: Selection
  1. Fitness is calculated for each DNA based on their total duration.
  2. Pick two "parent" using accept-reject selection.

```JavaScript
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
  ```

  Step 2: Reproduction Create a new empty population
  Fill the new population by executing the following steps:
  1. Crossover -- create a "child" object by mating these two parents.
    - when crossing over two parents, you do not want to randomly combine two parents, because there's a high chance of overlapping the same destination. So I came up with my own algorithm to cross over two parents.
```JavaScript
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
```
This algorithm prevents passing on same destinations to the child.

  2. Mutation -- mutate the child's DNA based on a given probability.
  3. Add the child object to the new population.
  4. Replace the old population with the new population
  5. Repeat

```Javascript
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
```

#### Future Development

- [ ] Add demo
- [ ] Allow users to search destination routes by landmark names.
