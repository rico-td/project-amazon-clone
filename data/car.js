class Car {

    #brand;
    #model;
    speed = 0;  
    isTrunkOpen = false;   

    constructor(details) {
        this.#brand = details.brand;
        this.#model = details.model;
    }

    displayInfo() { 
        console.log(`${this.#brand} ${this.#model} Speed: ${this.speed} isTrunkOpen: ${this.isTrunkOpen}`)
    }


    go() {
        if (this.speed <= 195 && !this.isTrunkOpen) {
            this.speed += 15;
        }
    }

    break() {   
        if (this.speed >= 5) {  
        this.speed -= 5
        }
    }


    openTrunk() {
        if (this.speed > 0) {
            this.isTrunkOpen = true;
        }
    }

    closeTrunk() {
        this.isTrunkOpen = false;
        
    }
}


const car1 = new Car({
    brand: 'BMW', 
    model: 'X5'
});

const car2 = new Car({
    brand: 'Audi',
    model: 'A4'
}); 

// car1.displayInfo();

// for (let i = 0; i < 40; i++) {
//     car1.go();
// }

// car1.break();
// car1.displayInfo();

//  exaple 2
car2.displayInfo();
car2.go();
car2.openTrunk(); 
car2.displayInfo();  
car2.go();
car2.closeTrunk();
car2.go();
car2.go();
car2.displayInfo();

console.log(car1, car2);


class RaceCar extends Car{

    acceleration;

    constructor(details) {
        super(details);
        this.acceleration = details.acceleration;
    }

    go() {
        if (this.speed <= 295 && !this.isTrunkOpen) {
            this.speed += this.acceleration
        }
    }
}

const raceCar1 = new RaceCar({
    brand: 'BMW', 
    model: 'M5',
    acceleration: 50
});

raceCar1.displayInfo();
raceCar1.go();  
raceCar1.go();  
raceCar1.go();   
raceCar1.openTrunk()
raceCar1.go();  
raceCar1.go();  
raceCar1.go();  
raceCar1.displayInfo();
