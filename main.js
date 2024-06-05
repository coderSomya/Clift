const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const transport = document.getElementById("transport")

function resizeCanvas() {
  canvas.width = 0.2*window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

createChildren();
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


function createChildren() {
  const transport = document.getElementById('transport');

  for (let i = 0; i < 6; i++) {
    const childDiv = document.createElement('div');
    childDiv.className = 'child-div';
    childDiv.style.top = `${i * 100}px`;
    
    for (let j = 0; j < 6; j++) {
      const button = document.createElement('button');
      button.className = 'child-button';
      button.textContent = `${i}-${j}`;
      
      button.addEventListener('click', function() {
        lift.box.waiting_queues[i].push(new People(i, j));
        
        button.style.transform = 'scale(1.2)';
        
        setTimeout(() => {
          button.style.transform = 'scale(1)';
        }, 200);
      });

      childDiv.appendChild(button);
    }

    transport.appendChild(childDiv);
  }
}

