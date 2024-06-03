class Box {

    constructor(width = 150, height = 150, top_limit=-10, bottom_limit=500, velocity = 0.5, capacity = 6){
        this.width = width;
        this.height = height;
        this.people = [];
        this.y = 0;
        this.velocity = velocity;
        this.MAX_VELOCITY = velocity;
        this.capacity = capacity;
        this.top_limit = top_limit;
        this.bottom_limit = bottom_limit;
        this.direction = 1;
    }

    start(){
        this.velocity = this.MAX_VELOCITY;
    }

    stop(){
        this.velocity = 0;
    }

    async draw(ctx){
        this.y += this.direction*this.velocity;
        console.log("box ki positon", this.y);

        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5; 
        ctx.strokeRect(20, this.y, this.width, this.height);
        
        if(this.y%100 == 0){
            this.stop();
            await new Promise(r => setTimeout(r, 1500));
            this.start();
        }

        if(this.y <= this.top_limit){
            this.direction = 1;
        }
        if(this.y>= this.bottom_limit){
            this.direction = -1;
        }
    }
}
