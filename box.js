class Box {

    constructor(width = 150, height = 150, top_limit=-10, bottom_limit=500, velocity = 1, capacity = 6){
        this.width = width;
        this.height = height;
        this.people_inside = [new People(2,5)];
        this.waiting_queues = [[], [], [], [], [], []];
        this.y = -1;
        this.velocity = velocity;
        this.MAX_VELOCITY = velocity;
        this.capacity = capacity;
        this.top_limit = top_limit;
        this.bottom_limit = bottom_limit;
        this.orders = [];
        this.is_moving = false;
        this.current_dest = -1;
    }

    restart(){
        if(this.current_dest==-1){
            return;
        }
        this.is_moving = true;
        this.velocity = this.y>=this.current_dest ? -this.MAX_VELOCITY : this.MAX_VELOCITY;
    }

    stop(){
        this.current_dest =-1;
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

        if(this.people_inside.length>0){    
            this.current_dest = this.people_inside[0].dest;
            this.velocity = this.y/100 < this.current_dest ? this.MAX_VELOCITY : -this.MAX_VELOCITY;
        }

        return people;
    }

    drop(current_floor){
        console.log("trying to drop people at ", current_floor);
        this.people_inside = this.people_inside.filter((person)=> person.dest != current_floor);
    }

    async draw(ctx){

        //STRATEGY
        console.log("this ka y", this.y);

        //currently calculating it naively


        this.y+=this.velocity;
        
        ctx.strokeStyle = 'black';
        
        ctx.lineWidth = 5; 
        ctx.strokeRect(20, this.y, this.width, this.height);

        for(let i=0; i<this.people_inside.length; i++){
            let person = this.people_inside[i];
            person.draw(ctx, 20, this.y, this.width/3, this.height/3);
        }
        
        if(this.y%100 == 0){
            let current_floor = this.y/100;
            this.calculate_order();
            this.stop();
            //todo -> check if we can drop someone
            this.drop(this.y/100);

            //todo -> check if we can pickup someone
         
            this.waiting_queues[current_floor] = this.pickup(current_floor, this.waiting_queues[current_floor]);

            let should_keep_moving = false; 
            for(let i = 0; i < this.waiting_queues.length; i++){
                if(this.waiting_queues[i].length>0) should_keep_moving = true;
            }
            
            should_keep_moving = should_keep_moving || (this.people_inside.length>0);

            if(!should_keep_moving) {
               this.stop();
            }


            //simulating dropping time here
            await new Promise(r => setTimeout(r, 1500));
            this.restart();
        }


    }

    calculate_order(){
        // console.log("box ",this);
        console.log("floor", this.y/100);

        // console.log("wating here", this.waiting_queues[this.y/100]);
        // console.log("inside", this.people_inside);
    }
}
