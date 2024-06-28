export function drawHexagon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string = "black",
  scale: number = 1,
  pattern: CanvasPattern | null = null,
  styles: any = {}  // Dodaj nowy parametr do stylów
) {
  const sides = 6;
  const angleStep = (2 * Math.PI) / sides;
  const scaledRadius = radius * scale;

  // Ustawienia stylów
  ctx.lineWidth = styles.lineWidth || 1;
  ctx.strokeStyle = styles.strokeStyle || color;
  ctx.fillStyle = pattern ? pattern : (styles.fillStyle || "transparent");

  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const theta = i * angleStep;
    const xOffset = scaledRadius * Math.cos(theta);
    const yOffset = scaledRadius * Math.sin(theta);
    if (i === 0) {
      ctx.moveTo(x + xOffset, y + yOffset);
    } else {
      ctx.lineTo(x + xOffset, y + yOffset);
    }
  }
  ctx.closePath();

  if (pattern) {
    ctx.fill();
  } else if (styles.fillStyle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

export function isPointInHexagon(px: number, py: number, hx: number, hy: number, radius: number) {
  const dx = Math.abs(px - hx) / radius;
  const dy = Math.abs(py - hy) / radius;
  return dy <= Math.sqrt(3) / 2 && dx <= 1 - dy / Math.sqrt(3);
}
