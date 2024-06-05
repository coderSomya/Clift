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
  lift.box.waiting_queues[3].push(new People(3,5));
  console.log("added to wq", lift.box.waiting_queues)
})

var test = document.getElementById("test");
test.addEventListener('click', ()=>{
})