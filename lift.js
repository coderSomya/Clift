class Lift{   

    constructor(height = 1000, floors = 5, width = 150, capacity = 6){
        this.y = 0;
        this.box = new Box;
        this.height = height;
        this.floors = floors;
        this.order = [];
        this.width = width;
    }


    async draw(ctx){
        ctx.fillStyle = 'grey';
        ctx.fillRect(20, 10, this.width, this.height);
        this.box.draw(ctx);

    }

    new_request(person){
        let src = Number(person.src);
        let dest = Number(person.dest);
        this.box.waiting_queues[src].push(dest);
    }



}
