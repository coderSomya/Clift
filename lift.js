class Lift{   

    constructor(height = 1000, floors = 5, width = 150, capacity = 6){
        this.y = 0;
        this.box = new Box;
        this.height = height;
        this.floors = floors;
        this.waiting_queues = [[], [], [], [], [], []];
        this.order = [];
        this.width = width;
    }




    async draw(ctx){
        ctx.fillStyle = 'grey';
        ctx.fillRect(20, 10, this.width, this.height);
        this.box.draw(ctx);

    }



    pickup(people){
        while(people.length > 0 && this.box.size<this.box.capacity){
            this.box.push(people[0]);
            people.splice(0, 1);
        }

        return people;
    }

    drop(people){
        for(let i=0; i<people.length; i++){
            this.box = this.box.filter(person => person!=people[i]);
        }
    }

    calculate_order(){

    }

}
