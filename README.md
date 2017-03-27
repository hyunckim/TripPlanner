## Trip Planner

Traveling Salesperson Problem with Google Map API as visualizer.

### Background

Traveling Salesperson Problem was first formulated in 1930 and is one of the most intensively studied problems in optimization. The Traveling Salesperson Problem describes a salesman who must travel between N cities. The order which he must travel does not matter as long as he visits each city once and finishes at the city he started.

Over the years, Mathematicians came up with many algorithm to solve the TSP. In this project, I will utilize Genetic Algorithm to calculate the shortest trip for given destinations, optimally.

### Functionality & MVP  

With this Trip Planner, users will be able to:

- [ ] Toggle around Google Map.
- [ ] Select destinations by clicking on a Google API Map

In addition, this project will include:

- [ ] A production Readme

### Wireframes

This app will consist of a single screen with google map, game controls, and nav links to the Github, my LinkedIn,
and the About modal.

![Wireframe](docs/wireframe.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jquery` for overall structure and game logic,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be two scripts involved in this project:
-  tspSolver.js: this script will handle the logic for Genetic Algorithm.
-  map.js: this script will handle the logic for user's interaction with the map.

### Implementation Timeline

**Day 1**: Setup all necessary Node modules, including getting webpack up and running.  Create `webpack.config.js` as well as `package.json`, and write a basic entry file and the bare bones of all. Goals for the day:

- Get a green bundle with `webpack`
- Learn the basics of Google Map API and Google Map Distance APIs.

**Day 2**: Dedicate this day to implementing the Google Map API. Goals for the day:

- Render a Google Map.
- Set up Google Map Distance API and be able to calculate the distance between two destinations.

**Day 3**: Dedicate this day to learn and implement the Genetic Algorithm.  Goals for the day:

- Apply the algorithm to find the shortest distance among multiple destinations.

**Day 4**: Install the controls for the user to interact with the map. Style the frontend, making it polished and professional.

### Bonus features

There are many directions this cellular automata engine could eventually go.  Some anticipated updates are:

- [ ] Add implementations of other algorithms
- [ ] Add a feature to let the user watch the computation of each step live.
