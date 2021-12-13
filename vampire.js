class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    vampire.creator = this;
    this.offspring.push(vampire);
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    let vampFamilyLength = this.offspring.length;
    if(vampFamilyLength === undefined || vampFamilyLength === null){
      return 0;
    }
    return vampFamilyLength;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;
    while (currentVampire.creator){
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if(this.offspring === null)
      return false;

    for(let i = 0; i < this.numberOfOffspring; i++){
      if(vampire.name === this.offspring[i].name)
        return true;
    }

    /*NOT CHECKING: offspring of offspring*/

    return false;
  }
  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (name === this.name){
      return this;
   }

   for (let vamp of this.offspring) {
    let search = vamp.vampireWithName(name);

    if(search){
      return search;
    }
   }

   return null; 
 }


  // Returns the total number of vampires that exist
  get totalDescendents() {
    let vampSum = 0;

    for (let vamp of this.offspring) {
      vampSum += vamp.totalDescendents + 1;
    }

    return vampSum;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenialVamps = []; // 1

    if (this.yearConverted > 1980) {
      millenialVamps.push(this); // 2
    }

    for (let vamp of this.offspring) {
      millenialVamps = millenialVamps.concat(vamp.allMillennialVampires);
    }

    return millenialVamps;

  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }

}

module.exports = Vampire;

