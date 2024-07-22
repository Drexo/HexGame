// src/utils/honeycombGrid.ts
import { drawHexagon, isPointInHexagon } from './hexagonUtils';

interface Hexagon {
  xOffset: number;
  yOffset: number;
  color: string;
  scale?: number;
  backgroundImage?: HTMLImageElement;
  styles?: any;
  initialYOffset: number;
  direction: number;
  animate?: boolean;
}

export async function drawHoneycombGrid(onHexClick: (index: number) => void, imageSrc: string) {
  const canvas = document.getElementById("hexGrid") as HTMLCanvasElement;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const hexRadius = 50;
  const hexHeight = Math.sqrt(3) * hexRadius;
  const hexWidth = 2 * hexRadius;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // Calculate center of canvas
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  // Image for background hexagon
  const image = new Image();
  image.src = imageSrc;

  // Define hexagons with positions, colors, and styles
  const hexagons: Hexagon[] = [
    { xOffset: -hexWidth * 0.75, yOffset: -hexHeight * 1.5, color: 'red', styles: { lineWidth: 2, strokeStyle: 'black', fillStyle: 'rgba(255, 0, 0, 0.5)', transform: false }, initialYOffset: -hexHeight * 1.5, direction: 1, animate: true },
    { xOffset: hexWidth * 0.75, yOffset: -hexHeight * 1.5, color: 'green', styles: { lineWidth: 2, strokeStyle: 'black', fillStyle: 'rgba(0, 255, 0, 0.5)', transform: false }, initialYOffset: -hexHeight * 1.5, direction: 1, animate: true },
    { xOffset: -hexWidth * 1.5, yOffset: 0, color: 'blue', styles: { lineWidth: 2, strokeStyle: 'black', fillStyle: 'rgba(0, 0, 255, 0.5)', transform: false }, initialYOffset: 0, direction: 1, animate: true },
    { xOffset: hexWidth * 1.5, yOffset: 0, color: 'yellow', styles: { lineWidth: 2, strokeStyle: 'black', fillStyle: 'rgba(255, 255, 0, 0.5)', transform: false }, initialYOffset: 0, direction: 1, animate: true },
    { xOffset: 0, yOffset: 0, color: 'purple', scale: 1.4, backgroundImage: image, styles: { lineWidth: 2, strokeStyle: 'black', transform: false }, initialYOffset: 0, direction: 1, animate: false },
    { xOffset: -hexWidth * 0.75, yOffset: hexHeight * 1.5, color: 'cyan', styles: { lineWidth: 2, strokeStyle: 'black', fillStyle: 'rgba(0, 255, 255, 0.5)', transform: false }, initialYOffset: hexHeight * 1.5, direction: 1, animate: true },
    { xOffset: hexWidth * 0.75, yOffset: hexHeight * 1.5, color: 'magenta', styles: { lineWidth: 2, strokeStyle: 'black', fillStyle: 'rgba(255, 0, 255, 0.5)', transform: false }, initialYOffset: hexHeight * 1.5, direction: 1, animate: true },
  ];

  const hexagonsWithAbsoluteCoords = hexagons.map(hex => ({
    ...hex,
    x: centerX + hex.xOffset,
    y: centerY + hex.yOffset,
    radius: hexRadius * (hex.scale || 1)
  }));

  function animate() {
    if (!ctx) return; // Ensure ctx is not null
    
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const pattern = ctx.createPattern(image, 'repeat');
    if (!pattern) return; // Ensure pattern is not null or undefined
    
    hexagonsWithAbsoluteCoords.forEach((hex, index) => {
      // Update the position only if animation is enabled
      if (hex.animate) {
        if (hex.direction === 1) {
          hex.yOffset += 0.03; // Speed of moving up
        } else {
          hex.yOffset -= 0.03; // Speed of moving down
        }

        // Check if the hexagon has moved to a certain distance
        if (hex.yOffset > hex.initialYOffset + 4) {
          hex.direction = -1;
        } else if (hex.yOffset < hex.initialYOffset - 3) {
          hex.direction = 1;
        }
      }

      hex.y = centerY + hex.yOffset;
      const hexPattern = hex.backgroundImage ? pattern : null;
      drawHexagon(ctx, hex.x, hex.y, hexRadius, hex.color, hex.scale, hexPattern, hex.styles);
    });

    requestAnimationFrame(animate);
  }

  image.onload = () => {
    animate();
  };

  canvas.onclick = (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const canvasX = event.clientX - rect.left;
    const canvasY = event.clientY - rect.top;

    hexagonsWithAbsoluteCoords.forEach((hex, index) => {
      if (isPointInHexagon(canvasX, canvasY, hex.x, hex.y, hex.radius)) {
        onHexClick(index); // Pass index of clicked hexagon
      }
    });
  };
}
