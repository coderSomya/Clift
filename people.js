class People {
    constructor(src, dest, is_inside = false){
        this.src = src;
        this.dest = dest;
        this.is_inside = is_inside;
    }

    draw(ctx, x,y, width, height){

        if(!this.is_inside) return;
        ctx.strokeStyle = 'black';
        
        ctx.lineWidth = 1; 
        ctx.strokeRect(x, y, width,height);
        ctx.font = '15px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'black';
        ctx.fillText(`${this.src}-${this.dest}`, x+width / 2, y+height / 2);
    }
}