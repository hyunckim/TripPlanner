/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__population_js__ = __webpack_require__(2);


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
    this.population = new __WEBPACK_IMPORTED_MODULE_0__population_js__["a" /* default */](this.destinations, this.tours, 10);
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

/* harmony default export */ __webpack_exports__["a"] = GeneticAlgorithm;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
    for (let i = 0; i < this.genes.length - 1; i++) {
      let from = this.genes[i];
      let to = this.genes[i + 1];
      if (tours[from][to] === undefined) {
        console.log(this.genes);
      } else {
        this.duration += parseInt(tours[from][to].duration);
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

/* harmony default export */ __webpack_exports__["a"] = DNA;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DNA_js__ = __webpack_require__(1);


class Population {
  constructor(destinations, tours, popMax) {
    this.population = [];
    this.generations = 0;
    this.mutateRate = 0.01;
    this.tours = tours;
    for (let i = 0; i < popMax; i++) {
      this.population.push(new __WEBPACK_IMPORTED_MODULE_0__DNA_js__["a" /* default */](destinations));
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

/* harmony default export */ __webpack_exports__["a"] = Population;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__genetic_algorithm_sketch_js__ = __webpack_require__(0);


document.addEventListener("DOMContentLoaded", () => {

  let markers = [];
  let destinations = [];
  const nodes = [];
  const tours = {};
  let map;
  let directionsDisplay = null;
  let directionsService;

  //Google Map Set Up
  function initMap() {
    let bayArea = { lat: 37.475136, lng: -121.503748 };
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: bayArea
    });

    //Event Listener to place marks when user clicks on the map
    map.addListener('click', e => {
      placeMarker(e.latLng, map);
      nodes.push(e.latLng);
    });
  }
  //Function to place marks on the map
  function placeMarker(latLng, map) {
    let marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    markers.push(marker);
  }

  function getDuration(callback) {
    let service = new google.maps.DistanceMatrixService();
    console.log(markers);
    service.getDistanceMatrix(
      {
        origins: nodes,
        destinations: nodes,
        travelMode: 'DRIVING',
        avoidHighways: false,
        avoidTolls: false
      }, parseOutput);

    function parseOutput(response, status) {
      let error = false;
      if (status == 'OK') {
       let origins = response.originAddresses;
       let dest = response.destinationAddresses;
       for (let i = 0; i < origins.length; i++) {
         let results = response.rows[i].elements;
         let from = origins[i];
         destinations.push(from);
         tours[from] = {};
         for (let j = 0; j < results.length; j++) {
           if (i === j) { continue; }
           let to = dest[j];
           let element = results[j];
           if (element.status === "OK") {
             tours[from][to] = {};
             tours[from][to]["distance"] = element.distance.value;
             tours[from][to]["duration"] = element.duration.value;
           } else {
             alert("Invalid Location!");
             j = results.length;
             i = origins.length;
             error = true;
           }
         }
       }
       destinations.push(destinations[0]);
       if (callback && !error) {
         callback();
       }
      }
    }
  }

  let button = document.getElementsByClassName('start')[0];
  button.addEventListener('click', (e) => {
    e.preventDefault();
    getDuration(function() {

      if (directionsDisplay != null) {
        directionsDisplay.setMap(null);
        directionsDisplay = null;
      }

      let ga = new __WEBPACK_IMPORTED_MODULE_0__genetic_algorithm_sketch_js__["a" /* default */](destinations, tours, 50);
      ga.setup();
      ga.draw((route) => {
        directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        let waypts = [];
        console.log(route);

        for (let i = 0; i < route.genes.length - 1; i++) {
          waypts.push({
            location: route.genes[i],
            stopover: true
          });
        }
        let request = {
          origin: route.genes[0],
          destination: route.genes[0],
          waypoints: waypts,
          travelMode: 'DRIVING',
          avoidHighways: false,
          avoidTolls: false
        };
        directionsService.route(request, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            clearMap();
            directionsDisplay.setDirections(response);
          } else{
            console.log(response);
            console.log(status);
            alert('Error: couldn\'t get a trip duration from API');
          }
        });
      });
    });
  });

  function setMapOnAll(newMap) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(newMap);
    }
  }

  function clearMap() {
    setMapOnAll(null);
    markers = [];
  }

  document.getElementsByClassName('clear')[0].addEventListener('click', e => {
    e.preventDefault();
    clearMap();
  });

  initMap();
});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map