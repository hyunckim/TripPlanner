import Population from './population.js';

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// Demonstration of using a genetic algorithm to perform a search

// setup()
//  # Step 1: The Population
//    # Create an empty population (an array or ArrayList)
//    # Fill it with DNA encoded objects (pick random values to start)

// draw()
//  # Step 1: Selection
//    # Create an empty mating pool (an empty ArrayList)
//    # For every member of the population, evaluate its fitness based on some criteria / function,
//      and add it to the mating pool in a manner consistant with its fitness, i.e. the more fit it
//      is the more times it appears in the mating pool, in order to be more likely picked for reproduction.

//  # Step 2: Reproduction Create a new empty population
//    # Fill the new population by executing the following steps:
//       1. Pick two "parent" objects from the mating pool.
//       2. Crossover -- create a "child" object by mating these two parents.
//       3. Mutation -- mutate the child's DNA based on a given probability.
//       4. Add the child object to the new population.
//    # Replace the old population with the new population
//
//   # Rinse and repeat

class GeneticAlgorithm {
  constructor(destinations, tours, maxGeneration = 50) {
    this.destinations = destinations;
    this.population;
    this.tours = tours;
    this.maxGeneration = maxGeneration;
  }

  setup() {
    this.population = new Population(this.destinations, this.tours, 10);
  }

  draw(completedCallback) {
    while ( this.population.generations < 50 ) {
      this.population.calcFitness();
      this.population.generate();
    }
    this.population.calcFitness();

    if (completedCallback) {
      completedCallback(this.population.getFittest());
    }
  }
}

export default GeneticAlgorithm;
