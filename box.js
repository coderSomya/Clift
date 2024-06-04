class Box {

    constructor(width = 150, height = 150, top_limit=-10, bottom_limit=500, velocity = 1, capacity = 6){
        this.width = width;
        this.height = height;
        this.people_inside = [];
        this.waiting_queues = [[], [], [], [], [], []];
        this.y = 0;
        this.velocity = velocity;
        this.MAX_VELOCITY = velocity;
        this.capacity = capacity;
        this.top_limit = top_limit;
        this.bottom_limit = bottom_limit;
        this.direction = 1;
        this.orders = [];
        this.is_moving = false;
    }

    start(){
        this.is_moving = true;
        this.velocity = this.y>=this.bottom_limit ? -this.MAX_VELOCITY : this.MAX_VELOCITY;
    }

    stop(){
        this.velocity = 0;
        this.is_moving = false;
    }

    pickup(from, people){
        console.log("trying to pick up ", people, " from ", from, "floor");

        while(people.length > 0 && this.people_inside.size<this.capacity){
            let to = people[0];
            this.people_inside.push(new People(from,to));
            people.splice(0, 1);
        }

        return people;
    }

    drop(current_floor){
        for(let i=0; i<this.people_inside.length; i++){
            if(Number(people_inside[i].dest) == Number(current_floor)){
                people_inside= this.people_inside.splice(i, 1);
            }
        }
    }

    async draw(ctx){
        this.velocity = 0;
        if(this.people_inside.length!=0){
            this.velocity = this.MAX_VELOCITY;
        }

        for(let i=0; i<this.waiting_queues.length; i++){
            let waiting_queue = this.waiting_queues[i];

            if(waiting_queue.length!=0){
                this.velocity = this.MAX_VELOCITY;
            }
        }

        //calculate which direction it should go
        if(!this.is_moving){
            if(this.people_inside.length!=0){
                let person = this.people_inside[0]; 
                //go drop him first
                console.log("inside dropping", person);
                this.is_moving = true;
                this.velocity = this.y > person.dest ? -this.MAX_VELOCITY : this.MAX_VELOCITY;
            }
            else{
                for(let i=0; i<this.waiting_queues.length; i++){
                    let waiting_queue = this.waiting_queues[i];
                    if(waiting_queue.length!=0){
                        console.log("inside waiign qq", i, waiting_queue);
                        this.velocity = this.y > i ? -this.MAX_VELOCITY: this.MAX_VELOCITY;
                        this.is_moving = true;
                    }
                }
            }
        }

        if(this.y <= this.top_limit){
            this.direction = this.MAX_VELOCITY;
        }
        if(this.y>= this.bottom_limit){
            this.velocity = -this.MAX_VELOCITY;
        }


        //currently calculating it naively
        this.y+=this.velocity;

        // console.log("box ki positon", this.y);

        ctx.strokeStyle = 'black';
        
        ctx.lineWidth = 5; 
        ctx.strokeRect(20, this.y, this.width, this.height);
        
        if(this.y%100 == 0){
            let current_floor = this.y/100;
            this.calculate_order();
            this.stop();
            //todo -> check if we can drop someone
            this.drop(this.y/100);

            //todo -> check if we can pickup someone
         
            this.waiting_queues[current_floor] = this.pickup(current_floor, this.waiting_queues[current_floor]);


            //simulating dropping time here
            await new Promise(r => setTimeout(r, 1500));
            this.start();
        }


    }

    calculate_order(){
        // console.log("box ",this);
        console.log("floor", this.y/100);

        // console.log("wating here", this.waiting_queues[this.y/100]);
        // console.log("inside", this.people_inside);
    }
}
