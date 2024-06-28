// src/utils/hexagonUtils.ts
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

  // Zachowaj bieżący stan kontekstu
  ctx.save();

  // Sprawdź, czy transformacja macierzy jest zdefiniowana w stylach
  if (styles.transform !== false) {
    // Skonwertuj kąty do radianów
    const rotateX = 30 * Math.PI / 180;
    const rotateY = -20 * Math.PI / 180;

    // Zakładając, że transformacja macierzy dla obrotów w 3D jest uproszczona:
    const m11 = Math.cos(rotateY);
    const m12 = Math.sin(rotateX) * Math.sin(rotateY);
    const m21 = 0;
    const m22 = Math.cos(rotateX);

    ctx.setTransform(m11, m12, m21, m22, x, y);
  } else {
    ctx.setTransform(1, 0, 0, 1, x, y); // Brak transformacji, użyj standardowej macierzy
  }

  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const theta = i * angleStep;
    const xOffset = scaledRadius * Math.cos(theta);
    const yOffset = scaledRadius * Math.sin(theta);
    if (i === 0) {
      ctx.moveTo(xOffset, yOffset);
    } else {
      ctx.lineTo(xOffset, yOffset);
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

  // Przywróć stan kontekstu
  ctx.restore();
}

export function isPointInHexagon(px: number, py: number, hx: number, hy: number, radius: number) {
  const dx = Math.abs(px - hx) / radius;
  const dy = Math.abs(py - hy) / radius;
  return dy <= Math.sqrt(3) / 2 && dx <= 1 - dy / Math.sqrt(3);
}
