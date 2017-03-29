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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__genetic_algorithm_sketch_js__ = __webpack_require__(1);


document.addEventListener("DOMContentLoaded", () => {

  const markers = [];
  let destinations = [];
  const tours = {};

  //Google Map Set Up
  function initMap() {
    let unitedStates = { lat: 38.4773736, lng: -100.563729 };
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: unitedStates
    });

    //Event Listener to place marks when user clicks on the map
    map.addListener('click', e => {
      placeMarker(e.latLng, map);
      markers.push(e.latLng);
    });
  }
  //Function to place marks on the map
  function placeMarker(latLng, map) {
    let marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }

  function getDuration(callback) {
    let service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: markers,
        destinations: markers,
        travelMode: 'DRIVING',
        avoidHighways: false,
        avoidTolls: false
      }, parseOutput);

    function parseOutput(response, status) {
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
           tours[from][to] = {};
           tours[from][to]["distance"] = element.distance.value;
           tours[from][to]["duration"] = element.duration.value;
         }
       }
       destinations.push(destinations[0]);
       if (callback) {
         callback();
       }
      }
    }
  }

  let button = document.createElement('button');
  button.innerHTML = "START";
  let body = document.getElementsByTagName('body')[0];
  body.appendChild(button);

  button.addEventListener('click', (e) => {
    e.preventDefault();
    getDuration(function() {
      let ga = new __WEBPACK_IMPORTED_MODULE_0__genetic_algorithm_sketch_js__["a" /* default */](destinations, tours, 50);
      ga.setup();
      console.log(ga);
    });
  });

  initMap();
});


/***/ }),
/* 1 */
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
  constructor(destinations, tours) {
    this.destinations = destinations;
    this.population;
    this.tours = tours;
  }

  setup() {
    this.population = new __WEBPACK_IMPORTED_MODULE_0__population_js__["a" /* default */](this.destinations, this.tours, 10);
  }

  draw() {

  }
}



function draw() {

}

/* harmony default export */ __webpack_exports__["a"] = GeneticAlgorithm;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DNA_js__ = __webpack_require__(3);


class Population {
  constructor(destinations, tours, popMax) {
    this.population = [];
    this.matingPool = [];
    this.generations = 0;
    this.finished = false;

    for (let i = 0; i < popMax; i++) {
      this.population.push(new __WEBPACK_IMPORTED_MODULE_0__DNA_js__["a" /* default */](destinations, tours));
    }
  }

  //calculate fitness of each element in population
  calcFitness() {

  }

  naturalSelection() {

  }
}

/* harmony default export */ __webpack_exports__["a"] = Population;


/***/ }),
/* 3 */
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

/* harmony default export */ __webpack_exports__["a"] = DNA;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map