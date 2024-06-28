import React, { useEffect, useState } from "react";
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

function drawHexagon(ctx, x, y, radius, color = "black", scale = 1, pattern = null) {
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
  if (pattern) {
    ctx.fillStyle = pattern;
    ctx.fill();
  } else {
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}

async function drawHoneycombGrid(onHexClick) {
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

  // Image for background hexagon
  const imageSrc = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/7QCEUGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAGgcAigAYkZCTUQwYTAwMGE2ZjAxMDAwMDg0MDIwMDAwMGEwNDAwMDA5ZDA0MDAwMDIyMDUwMDAwNTEwNjAwMDAyNDA4MDAwMDc4MDgwMDAwZjgwODAwMDA3YTA5MDAwMDhhMGMwMDAwAP/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/bAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/CABEIAGQAZAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQADBgIHAf/EABkBAAMBAQEAAAAAAAAAAAAAAAIDBAAFAf/aAAwDAQACEAMQAAABw1nRKerwVc8U9Oxfs8GME3K9bMbTpRQegofBOUqhMcn6QUbI+zUhOymR4n0yqmDD+leU+xbIEu0Qc/o5sZ3UNGXjWUg2YKDpRfqz19nP02fOzz1Z/wBU882O8ZLzqIGKgGy2a5NO5Q0qw9VRF9NqKs57dgoeFqqTcWJOvmaeROrCYDx3p4fGm7TvxbOar6UNm41vjdHnOBOGRyeaMSuzSxrg6ae58heHwG+ZxFXKLUEnjxjm7Vcc/j053ULSWJ9+8+H1JPMuukBgdMgdY3iTeOypH8a2iQ0p83I4dBJFM//EACYQAAICAgICAQMFAAAAAAAAAAIDAAEEERIhBRMQIzEyFCIkM0H/2gAIAQEAAQUC1KGUuCncDHuBiwsaEnUtc4SwljOMGpVRQxSYCYKISIaIxMtUsIYy6lBBGYy9xKevM5DMDFycvyGTPH+Ydi2ao1UbWpx3bFS190u4tcx0zHYHu83jjkYHtTVeSujNR+5LB3T1VBXq2BCDsAGLVUUvU8ZoFPHkoyq1u2YKD1JKMCXWoyF9xizuotuhwWrFZNY0ccMhI/onNyva4IB0YHcKNhfcRllQWyievY8MYZxrQrEYdVUrQMO4UOXXYhMUfflmvfj2jwxsQt/Bfjmbukvq1CfOrqEMsJQwQ9Lll/FzC+ljXqUyLLd5ahteeI0hW+WpdTj8ZQkSvZYmhTCwcZ5sYvqkXL7rzaNx/wCd7nc7m5v4YyliioV6FIVQTIXTFsr63CpwnG5TZRyy6ay3MXXGHe7G5Vy45ey43P8AeJQYNd5ZXV48qD/aP3q/3Q5lnYV7C2l5kH//xAAlEQACAQQCAQMFAAAAAAAAAAAAAQIDERIhBDFBEBMiIzNRYWL/2gAIAQMBAT8BjExsSqJEJpmKJRMCEUciduhfU7MnTejjV8tMm9lxp+Cr/RRfgrSs9lFvwLZYr8hwVomTffooZnH+LxkKSM0TjkKlq5Lj4q5P4vRKTHWPfLlCl7r/AES2ybvIfZYt6UftH5JdkybEz//EACARAAIBBAIDAQAAAAAAAAAAAAABAgMREiEQMQQTIiD/2gAIAQIBAT8BczPiV0exkahmTkU9j+ei2SK3yU53Lkmyj1oqa2QV1o8p2IVDMpUVJ7MbdcOWJ5dLP7QqJgQlZjmKR2KKFRPSYFvxcvw+xiEUloaR/8QALhAAAQMCBAQEBgMAAAAAAAAAAQACEQMSECExQSAiUaETMEJhBCMyYnGBM0BS/9oACAEBAAY/Av7zX0g2SYk7Jh+ZBGlMEBeD8a19Rk/UfqHlGiDL2iSiD6XB3dGkPQOmyL6bdDIlMqaXCeLXFz8jXqm7PdEIw3MhMpOyIdamUxo0R5FzjAG68TOLiG+4XKAE8OhwOzkypIyz/C5wHhXDiAOpTwTA0TLP4xk1fhZrlaBhykWu4nOfsCFXjU3Kk0faOxR94OGSc71ICpynYlZ5O6cLztf2KrNOzlSA/wBMGEYONouTL+Qvp3ftU51bvwus16dUQ5rucQRHdP8AEEVNkbWw2d8JnU4U+gyTY9uOSu5XdDLMYQUG74acP2jRR+yo6mEcbvVhEiek8Fu2NJFHHlV05qTC/8QAJRABAAICAQMEAwEBAAAAAAAAAQARITFBEFFhgZGx8HGhwdHh/9oACAEBAAE/IS3Qu1Hi0YmDJmUROEaL6t5yyYqI16xGEmvE8E3YnglHGJgzDqCTPOwRZcLJiHEe+txvSPW6iBm1mh9FIHbE8U4cVXHbqMR2kW8kAqJrAHWhnES36J7LBg02pwEVkIdw3iEMYdXi4fQC4TEWdhF8J3RApqU0DErk/BDu65hYVvNb9YhSl/PUHMRn0gsgs4p0mbk1eI7DylaJcRXhc3Y+Y1LXzHSYX/CUGN8Qx5eYZfgpSQcvp2hdYdLo0lD8SlY6dsZg1Wst3MZhNryqGIBPJLjIdiMuTGUiQ6DvnjoOZ9cpwGDsXG4Iy/MHBse6EqPs+vtDMCLZi0C1Dyetw0004FnxMZUd2+PHWMvQWtrN6P8Ast8pTv6/oLBY8Wnvn+zKDdZll4hkfa6mlwW48ZU1AKsaJSDKQlLRrtw7QKyXrLth8wpVhq7K18Qc2h7ftsyl3F8KYgv8xAwsvlNAeXtDXDFMvt6l5uIdZBLaq/Q8TbbC332iGigzDUZSe9yv0CWefWCNR4CEwHmCJuAK2ep7ygdv/CUHYzq/dk3RWVBomBXpDhmf70n0uArUGBA2alFFCa33zHZP5n6f9IkVjrMr2Nm4Kbqt3MgSvaf/2gAMAwEAAgADAAAAEByONUCAki4cCz//APWEiqAAT3iUWnPaRDaRjHAKsNZnNxyF/wCeD//EAB0RAQEBAQEAAwEBAAAAAAAAAAEAESExEEFRscH/2gAIAQMBAT8Q1gDvyHKGwTAFjm9KvQcgiJxYkHVoXVus5ME7G/AZ9Gwp0ru2ZNrstuX5C+LJv5ASAL7gqKXmvSUtQXyfV8exOfhaCwESB+DcHPz/AGP4f43teJOd+pM9v//EABwRAQEBAQEBAAMAAAAAAAAAAAEAESExQRBRcf/aAAgBAgEBPxCnUaygJyZhykx9vhE7J2OufgDy0e2kYjgU28Dh9mDGHlq/JAw8BbpFgybHX9zEOPJ+wHGV5ADt3B4xti0e2COEGBDgw0439xAngvF7i1y3PL//xAAlEAEAAgIBBAICAwEAAAAAAAABABEhMUFRYXGBkaGx0RDB8eH/2gAIAQEAAT8QLYmYxiYzowTBmPkNKvZUV3VviXkCdQg4wxAuozeJS86ezLwTCDEQRS9xwSxyPUlaj6xXTfBKhcYSMslw/KLdHqH0Iw0VAvGoMHWErEGCLAvh2YnEXUAKNK53ArWBBJmytve4R6yautU38Tk46R1/6Teta12iNBMGG7iCrUYkMlP4jhfXWoWjfSo5oUcNS3r2ltQlQW6GB18DcudwdBgYe1RFXOAQCq6MWKOQqLT5jnBUvKt3qombVjVyg0JKHtASie8SiKS2AvHMuETdZ/vXB0jIZatW6br3HEAs9WGxODd53KRDa9SL77jSqATYKirnMuFt9SgmCK7ogWgpcL0cxIx6qISB9KByzZSXxDWHGEXFiBauzDd/LKL1Y/FMvj6TjTheVxbRmVtA5/2kelThW10ZkV9xiMoiEO0vCyNgG1SgtXoGPmNZehNFAp6ufqI2UkKqPgW6eZZu35Nf9i03bARgAD2qLjjpWXjxGiCFRKzwOVyRraio9IG0ZTNdkKMo2cXGvgPmZsUgOoP1BNog9B91FAWxfin7+0PDUoOU6WNIGpaLVHBOThKmI9NQJi3XlruQ6jFHbPW1L3VLbxLbxLE6gBgzLNBKeMS/ST1L5UplwZH8xVyzKZpLH2RSUIp0KA9IPUu6OdkoN4oSjeKbHzW5qw6Lom1maEx5O8B4gdhoz9X9PEULvEab9RRuodQSwe4Ddnx2eI7KSMzKYM00A050kCacTQNO6PUU2zLF2a7U+gI10tLV2r/bKpeAFSmmrvfEMDoSl+FKxX+oEAip8Gr9XDVBo0syeM8DcK8gfMIsxSEZNdow9BflmDjTX1N+3L3o4jM4IDuaPlHpllheGbs/cY+MOXDkaunrKf5hZwDL+5ZVRPDGp4txe5SZtgQkKjA7w44gcfoQTsoO48PnMaxyR3pt+2ZOAH6kFi+f4BQsKv5WkQ5j4ZnW2mC3qd4g5o5IgbiR1YdUq4VAbrXa42lspfdjILD7rmJ96FA7v5YlsXBuo6Qd1NniKLFF8jcuWsymf//Z";  // Replace with your image path
  const image = new Image();
  image.src = imageSrc;

  // Define hexagons with positions and colors
  const hexagons = [
    { xOffset: -hexWidth * 0.75, yOffset: -hexHeight * 1.5, color: 'red' },
    { xOffset: hexWidth * 0.75, yOffset: -hexHeight * 1.5, color: 'green' },
    { xOffset: -hexWidth * 1.5, yOffset: 0, color: 'blue' },
    { xOffset: hexWidth * 1.5, yOffset: 0, color: 'yellow' },
    { xOffset: 0, yOffset: 0, color: 'purple', scale: 1.4, backgroundImage: image },
    { xOffset: -hexWidth * 0.75, yOffset: hexHeight * 1.5, color: 'cyan' },
    { xOffset: hexWidth * 0.75, yOffset: hexHeight * 1.5, color: 'magenta' },
  ];

  const hexagonsWithAbsoluteCoords = hexagons.map(hex => ({
    ...hex,
    x: centerX + hex.xOffset,
    y: centerY + hex.yOffset,
    radius: hexRadius * (hex.scale || 1)
  }));

  image.onload = () => {
    const pattern = ctx.createPattern(image, 'repeat');
    // Drawing hexagons
    hexagonsWithAbsoluteCoords.forEach((hex, index) => {
      const hexPattern = hex.backgroundImage ? pattern : null;
      drawHexagon(ctx, hex.x, hex.y, hexRadius, hex.color, hex.scale, hexPattern);
    });
  };

  canvas.onclick = (event) => {
    const rect = canvas.getBoundingClientRect();
    const canvasX = event.clientX - rect.left;
    const canvasY = event.clientY - rect.top;

    hexagonsWithAbsoluteCoords.forEach((hex, index) => {
      if (isPointInHexagon(canvasX, canvasY, hex.x, hex.y, hex.radius)) {
        onHexClick(index);
      }
    });
  };
}

function isPointInHexagon(px, py, hx, hy, radius) {
  const dx = Math.abs(px - hx) / radius;
  const dy = Math.abs(py - hy) / radius;
  return dy <= Math.sqrt(3) / 2 && dx <= 1 - dy / Math.sqrt(3);
}

function App() {
  const { network } = useTonConnect();

  useEffect(() => {
    drawHoneycombGrid((index) => {
      console.log(`Hexagon clicked: ${index}`);
    });
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
