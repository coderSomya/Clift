class Lift{   

    constructor(height = 600, floors = 5, width = 150, capacity = 6){
        this.y = 0;
        this.box = new Box;
        this.height = height;
        this.floors = floors;
        this.order = [];
        this.width = width;
    }


    async draw(ctx){
        ctx.fillStyle = 'grey';
        ctx.fillRect(20, 0, this.width, this.height);
        this.draw_floors(ctx);
        this.box.draw(ctx);

    }

    new_request(person){
        let src = Number(person.src);
        let dest = Number(person.dest);
        this.box.waiting_queues[src].push(dest);
    }

    draw_floors(ctx){
        for(let i=0; i<=this.floors; i++){
            ctx.beginPath();
            ctx.moveTo(20, i*this.height/(this.floors+1));
            ctx.lineTo(20+this.width, i*this.height/(this.floors+1));
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

}
