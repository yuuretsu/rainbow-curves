import { distance as dist, lineEnd, angle } from "./lib";

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
let width = canvas.width = 1024;
let height = canvas.height = 1024;
let center = [width / 2, height / 2];

const ctx = canvas.getContext('2d');

const mouse = [NaN, NaN];

window.addEventListener('mousemove', ({ clientX, clientY }) => {
  const rect = canvas.getBoundingClientRect();
  mouse[0] = clientX - rect.left;
  mouse[1] = clientY - rect.top;
});

ctx.lineWidth = 4;
ctx.lineCap = "round";

const brd = -200;

let vortex = -0.01;

window.addEventListener("wheel", ({ deltaY }) => {
  vortex += deltaY > 0 ? 0.1 : -0.1;
});

let t = 0;

void function loop() {
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = "screen";
  const stepY = height / 25;
  for (let y = -brd; y < height + brd; y += stepY) {
    const stepX = width / 25;
    for (let x = -brd; x < width + brd; x += stepX) {
      let pos = [x + stepX / 2, y + stepY / 2];
      ctx.lineWidth = Math.min(stepX, Math.max(5, (500 - dist(...pos, ...mouse)) / 10));
      // ctx.lineWidth = stepX;

      const start = [...pos];

      ctx.beginPath();
      ctx.moveTo(...pos);
      for (let i = 0; i < 25; i++) {
        const theta = angle(...mouse, ...pos);
        const distance = dist(...pos, ...mouse);
        const ang = theta + Math.PI / 2 + vortex + Math.sin((i - t * distance * 0.0005) * distance * 0.0001) * distance * 0.001;
        // const ang = theta + Math.PI / 2 + vortex;
        pos = lineEnd(...pos, ang, 5);
        ctx.lineTo(...pos);
      }
      // ctx.strokeStyle = `hsl(${pos[0] + pos[1]}, 100%, 10%)`;

      if (pos[0]) {

        const gradient = ctx.createLinearGradient(...start, ...pos);
        gradient.addColorStop(0, `transparent`);
        gradient.addColorStop(0.33, `hsl(${pos[0] + pos[1] + (mouse[0] * mouse[1]) * 0.001}, 100%, 10%)`);
        gradient.addColorStop(0.66, `hsl(${(pos[0] + pos[1]) * 2 + 90}, 100%, 10%)`);
        gradient.addColorStop(1, `hsl(${pos[0] + pos[1] + 180}, 100%, 10%)`);
        ctx.strokeStyle = gradient;
        ctx.stroke();
      }




      // pos = [x + stepX / 2, y + stepY / 2];
      // ctx.beginPath();
      // ctx.moveTo(...pos);
      // for (let i = 0; i < 50; i++) {
      //   const theta = angle(...mouse, ...pos);
      //   const ang = theta + Math.PI / 2 - 0.01;
      //   pos = lineEnd(...pos, ang, 5);
      //   ctx.lineTo(...pos);
      // }
      // ctx.lineWidth = ctx.lineWidth * 0.75;
      // ctx.strokeStyle = `hsl(${((pos[0] * pos[1]) / 1000) * 2}, 100%, 10%)`;
      // ctx.stroke();

      // ctx.beginPath();
      // ctx.arc(...pos, ctx.lineWidth / 2, 0, Math.PI * 2);
      // ctx.fillStyle = 'red';
      // ctx.fillStyle = `hsl(${(pos[0] * pos[1]) / 1000 + 180}, 100%, 10%)`;
      // ctx.fill();
    }
  }
  t += 1;
  requestAnimationFrame(loop);
}();
