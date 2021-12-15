export function distance(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2);
}

export function lineEnd(x, y, angle, length) {
  return [
    Math.cos(angle) * length + x,
    Math.sin(angle) * length + y
  ];
}

export function angle(cx, cy, ex, ey) {
  return Math.atan2(ey - cy, ex - cx);
}