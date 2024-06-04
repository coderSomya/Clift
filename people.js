class People {
    constructor(src, dest){
        this.src = src;
        this.dest = dest;
    }

    draw(ctx, x,y, width, height){
        ctx.strokeStyle = 'black';
        
        ctx.lineWidth = 1; 
        ctx.strokeRect(x, y, width,height);
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'black';
        ctx.fillText(`${this.src}-${this.dest}`, x+width / 2, y+height / 2);
    }
}