import Population from './population.js';

class GeneticAlgorithm {
  constructor(destinations, tours, maxGeneration = 50, map) {
    this.destinations = destinations;
    this.population;
    this.tours = tours;
    this.maxGeneration = maxGeneration;
    this.map = map;
    this.polyLine;
  }

  setup() {
    let popSize = parseInt(document.getElementsByClassName("population")[0].value);
    this.population = new Population(this.destinations, this.tours, popSize);
  }

  draw(completedCallback) {
    this.population.calcFitness();
    let drawInterval = setInterval(() => {
      let gen = document.getElementsByClassName("gen")[0];
      this.population.generate();
      gen.innerHTML = `Generation: ${this.population.generations}`;
      this.population.calcFitness();
      let fittest = this.population.getFittest();
      let fittestCoord = fittest.genes.map(destination => {
        let split = destination.split(",");
        return {lat: parseFloat(split[0]), lng: parseFloat(split[1])};
      });

      if (this.polyLine != undefined) {
        this.polyLine.setMap(null);
      }
      this.polyLine = new google.maps.Polyline({
        path: fittestCoord,
        strokeColor: "#0066ff",
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      this.polyLine.setMap(this.map);


      if (this.population.generations >= this.maxGeneration) {
        clearInterval(drawInterval);
        this.polyLine.setMap(null);
        if (completedCallback) {
          completedCallback(this.population.getFittest());
        }
      }
    }, 60);
  }
}

export default GeneticAlgorithm;
