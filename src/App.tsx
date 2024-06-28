import React, { useEffect } from "react";
import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "./components/Counter";
import { Jetton } from "./components/Jetton";
import { TransferTon } from "./components/TransferTon";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

function drawHexagon(ctx, x, y, radius, color = "black", scale = 1) {
  const sides = 6;
  const angleStep = (2 * Math.PI) / sides;
  const scaledRadius = radius * scale;
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
  ctx.strokeStyle = color;
  ctx.stroke();
}

function drawHoneycombGrid() {
  const canvas = document.getElementById("hexGrid");
  const ctx = canvas.getContext("2d");

  const hexRadius = 50;
  const hexHeight = Math.sqrt(3) * hexRadius;
  const hexWidth = 2 * hexRadius;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // Calculate center of canvas
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  // Define hexagons with positions and colors
  const hexagons = [
    { xOffset: -hexWidth * 0.75, yOffset: -hexHeight * 1.5, color: 'red' },
    { xOffset: hexWidth * 0.75, yOffset: -hexHeight * 1.5, color: 'green' },
    { xOffset: -hexWidth * 1.5, yOffset: 0, color: 'blue' },
    { xOffset: hexWidth * 1.5, yOffset: 0, color: 'yellow' },
    { xOffset: 0, yOffset: 0, color: 'purple', scale: 1.5 },
    { xOffset: -hexWidth * 0.75, yOffset: hexHeight * 1.5, color: 'cyan' },
    { xOffset: hexWidth * 0.75, yOffset: hexHeight * 1.5, color: 'magenta' },
  ];

  // Drawing hexagons
  hexagons.forEach((hex) => {
    const x = centerX + hex.xOffset;
    const y = centerY + hex.yOffset;
    const scale = hex.scale || 1;
    drawHexagon(ctx, x, y, hexRadius, hex.color, scale);
  });
}

function App() {
  const { network } = useTonConnect();

  useEffect(() => {
    drawHoneycombGrid();
  }, []);

  return (
    <StyledApp>
      <AppContainer>
        <FlexBoxCol>
          <FlexBoxRow>
            <TonConnectButton />
          </FlexBoxRow>
          <FlexBoxRow>
            <canvas id="hexGrid" width="600" height="600"></canvas>
          </FlexBoxRow>
          <Counter />
        </FlexBoxCol>
      </AppContainer>
    </StyledApp>
  );
}

export default App;
