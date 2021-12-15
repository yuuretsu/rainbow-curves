const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
let width = canvas.width = 1000;
let height = canvas.height = 1000;
let center = [width / 2, height / 2];

const ctx = canvas.getContext('2d');

const mouse = [NaN, NaN];

window.addEventListener('mousemove', ({ clientX, clientY }) => {
  const rect = canvas.getBoundingClientRect();
  mouse[0] = clientX - rect.left;
  mouse[1] = clientY - rect.top;
});

function dist(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2);
}

function lineEnd(x, y, angle, length) {
  return [
    Math.cos(angle) * length + x,
    Math.sin(angle) * length + y
  ];
}

function angle(cx, cy, ex, ey) {
  return Math.atan2(ey - cy, ex - cx);
}

ctx.lineWidth = 4;
ctx.lineCap = "round";

const brd = -100;

void function loop() {
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = "screen";
  const stepY = height / 10;
  for (let y = -brd; y < height + brd; y += stepY) {
    const stepX = width / 10;
    for (let x = -brd; x < width + brd; x += stepX) {
      let pos = [x + stepX / 2, y + stepY / 2];
      ctx.lineWidth = Math.max(1, (100 - dist(...pos, ...mouse)) / 10);
      ctx.lineWidth = stepX;

      ctx.beginPath();
      ctx.moveTo(...pos);
      for (let i = 0; i < 50; i++) {
        const theta = angle(...mouse, ...pos);
        const ang = theta + Math.PI / 2 - 0.01;
        pos = lineEnd(...pos, ang, 5);
        ctx.lineTo(...pos);
      }
      ctx.strokeStyle = `hsl(${pos[0] + pos[1]}, 100%, 10%)`;
      ctx.stroke();



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
  requestAnimationFrame(loop);
}();
