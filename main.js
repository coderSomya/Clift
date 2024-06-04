const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = 0.2*window.innerWidth;
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

var btn3 = document.getElementById("btn3");
btn3.addEventListener("click",()=>{
  console.log(lift);
  console.log("btn3 clicked");
  lift.box.waiting_queues[3].push(1);
  console.log(lift.waiting_queues);
})