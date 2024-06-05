class Box {

    constructor(width = 150, height = 60, top_limit=-10, bottom_limit=500, velocity = 1, capacity = 6){
        this.width = width;
        this.height = height;
        this.people_inside = [new People(2,5, true), new People(3, 2, true)];
        this.waiting_queues = [[], [], [], [], [], []];
        //this will be an array or array of people
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
        this.is_moving = true;
        this.velocity = this.y>=this.current_dest ? -this.MAX_VELOCITY : this.MAX_VELOCITY;
    }

    stop(){
        this.velocity = 0;
        this.is_moving = false;
    }

    pickup(people){

        while(people.length > 0 && this.people_inside.length<this.capacity){
            people[0].is_inside = true;
            this.people_inside.push(people[0]);
            people.splice(0, 1);
        }

        return people;
    }

    drop(current_floor){
        for(let i=0; i<this.people_inside.length; i++){
            if(this.people_inside[i].dest == current_floor){
                this.people_inside[i].is_inside = false;
            }
        }
        this.people_inside = this.people_inside.filter((person)=> person.is_inside);
    }

    async draw(ctx){

        //STRATEGY
        console.log("this ka y", this.y);


        //currently calculating it naively

        if(this.y%100 != 0){
            this.y+=this.velocity;
            this.y = Math.max(this.y, this.top_limit);
            this.y = Math.min(this.y, this.bottom_limit);
        }
        else{
            let current_floor = this.y/100;
            this.drop(this.y/100);

            this.waiting_queues[current_floor] = this.pickup(this.waiting_queues[current_floor]);
 

            let should_keep_moving = false; 
            for(let i = 0; i < this.waiting_queues.length; i++){
                if(this.waiting_queues[i].length>0) should_keep_moving = true;
            }
            
            should_keep_moving = should_keep_moving || (this.people_inside.length>0);
            if(!should_keep_moving) {
                this.stop();
            }
            else{
                let people = this.calculate_order();

                let first_to_cater = people[0];
                if(first_to_cater.is_inside){
                    this.current_dest = first_to_cater.dest;
                }
                else{
                    this.current_dest = first_to_cater.src;
                }

                this.velocity = this.y/100<this.current_dest ?this.MAX_VELOCITY : -this.MAX_VELOCITY;
                this.y+=this.velocity;
                this.y = Math.max(this.y, this.top_limit);
                this.y = Math.min(this.y, this.bottom_limit);
            }
        }
        
        ctx.strokeStyle = 'black';
        
        ctx.lineWidth = 5; 
        ctx.strokeRect(20, this.y, this.width, this.height);

        for(let i=0; i<this.people_inside.length; i++){
            let person = this.people_inside[i];
            person.draw(ctx, 20+this.width/3*(i%3), this.y+ (Math.floor(i/3))*(this.height/2), this.width/3, this.height/2);
        }
        
        if(this.y%100 == 0){
            //simulation
            await new Promise(r => setTimeout(r, 1500));
        }


    }

    calculate_order(){
        // console.log("box ",this);

        // console.log("wating here", this.waiting_queues[this.y/100]);
        // console.log("inside", this.people_inside);

        let shortest_time = 10000000;
        let best_guy = [new People(-1,-1)];

        for(let i=0; i<this.people_inside.length; i++){
            let trip_time = Math.abs(this.y/100 - this.people_inside[i].dest);
            if(trip_time < shortest_time){
                shortest_time = trip_time;
                best_guy[0]= this.people_inside[i];
            }
        }

        for(let i=0; i<this.waiting_queues.length ; i++){
            let waiting_queue = this.waiting_queues[i];

            for(let j=0; j<waiting_queue.length; j++){
                let trip_time = Math.abs(this.y/100 - waiting_queue[j].src) + Math.abs(waiting_queue[j].src - waiting_queue[j].dest);
                if(trip_time < shortest_time){
                    shortest_time = trip_time;
                    best_guy[0]= waiting_queue[j];
                }
            }
        }

        return best_guy;
    }
}
