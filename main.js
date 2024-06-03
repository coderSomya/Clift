const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();


const lift = new Lift();

function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lift.draw(ctx);
    requestAnimationFrame(update);
}

update();