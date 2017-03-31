## Trip Planner
Traveling Salesperson Problem with Google Map API as visualizer.

[Live link](https://hyunckim.github.io/TripPlanner/)

![demo_2](/docs/trip_planner.gif)

#### Background

Traveling Salesperson Problem

https://en.wikipedia.org/wiki/Travelling_salesman_problem

#### Implementation
- JavaScript
- Google Map API

#### Functionality
- [x] Genetic Algorithm
- [x] Mark Placing on Google Map
- [x] Calculating distance and duration using Google Distance Matrix API

#### Genetic Algorithm

setup()
  # Step 1: The Population
  # Create an empty population (an array or ArrayList)
  # Fill it with DNA encoded objects (pick random values to start)

draw()
  # Step 1: Selection
  # Create an empty mating pool (an empty ArrayList)
  # For every member of the population, evaluate its fitness based on some  criteria / function, and add it to the mating pool in a manner consistent with its fitness, i.e. the more fit it is the more times it appears in the mating pool, in order to be more likely picked for reproduction.

  # Step 2: Reproduction Create a new empty population
    # Fill the new population by executing the following steps:
      1. Pick two "parent" objects from the mating pool.
      2. Crossover -- create a "child" object by mating these two parents.
      3. Mutation -- mutate the child's DNA based on a given probability.
      4. Add the child object to the new population.
    # Replace the old population with the new population
  # Rinse and repeat


```JavaScript
spin(board, clockwise){
  let rotatedCoords = this.rotatedCoords(clockwise);

  if (this.validRotate(board, rotatedCoords)) {
    this.coords = rotatedCoords;
  }
}

validRotate(board, coords) {
  for (let i = 0; i < coords.length; i++) {
    if (board.filled(coords[i]) || !board.insideBoard(coords[i])) {
      return false;
    }
  }
  return true;
}

rotatedCoords(clockwise) {
  let newCoords = [];

  this.coords.forEach(coord =>
    newCoords.push(this.rotateCoord(coord, clockwise))
  );

  return newCoords;
}
```

#### Piece

The key to making rotation simple was to have each piece know where it is on the board and having a center point to rotate around. When a new piece is created it knows it's starting location and what it's center point is.

#### Future Development

- [ ] Add demo
- [ ] Allow users to search destination routes by landmark names.
