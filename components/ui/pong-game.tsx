"use client";

import { useEffect, useRef, useState } from "react";

export function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState({ player: 0, ai: 0 });
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas internal dimensions to match display size exactly for sharp pixels
    const updateSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    // Game state
    const gridSize = 20; // Size of the dot grid cells
    const paddleWidth = gridSize; // Match paddle width to grid
    const paddleHeight = gridSize * 4;
    const ballSize = gridSize;
    
    // Snap starting positions to grid
    let playerY = Math.floor(canvas.height / 2 / gridSize) * gridSize - paddleHeight / 2;
    let aiY = Math.floor(canvas.height / 2 / gridSize) * gridSize - paddleHeight / 2;
    let ballX = Math.floor(canvas.width / 2 / gridSize) * gridSize;
    let ballY = Math.floor(canvas.height / 2 / gridSize) * gridSize;
    let ballDX = 6;
    let ballDY = 6;
    let animationFrameId: number;

    // Input handling
    let upPressed = false;
    let downPressed = false;

    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === "Up" || e.key === "ArrowUp") { e.preventDefault(); upPressed = true; setIsInteractive(true); }
      else if (e.key === "Down" || e.key === "ArrowDown") { e.preventDefault(); downPressed = true; setIsInteractive(true); }
    };
    const keyUpHandler = (e: KeyboardEvent) => {
      if (e.key === "Up" || e.key === "ArrowUp") upPressed = false;
      else if (e.key === "Down" || e.key === "ArrowDown") downPressed = false;
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      if (!isInteractive) return;
      const rect = canvas.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      if (relativeY > 0 && relativeY < canvas.height) {
        playerY = relativeY - paddleHeight / 2;
      }
    };

    window.addEventListener("keydown", keyDownHandler, { passive: false });
    window.addEventListener("keyup", keyUpHandler);
    canvas.addEventListener("mousemove", mouseMoveHandler);

    const draw = () => {
      // Clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Check for dark mode to determine colors
      const isDark = document.documentElement.classList.contains('dark');
      const dotColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
      const fgColor = isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(9, 9, 11, 0.9)";
      const primaryColor = "#ed0004"; // Redstring primary red

      // Draw Dot Grid Background
      ctx.fillStyle = dotColor;
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.fillRect(x + gridSize / 2 - 1, y + gridSize / 2 - 1, 2, 2);
        }
      }

      // Draw dashed center line
      ctx.beginPath();
      ctx.setLineDash([gridSize, gridSize]);
      ctx.moveTo(Math.floor(canvas.width / 2 / gridSize) * gridSize + gridSize/2, 0);
      ctx.lineTo(Math.floor(canvas.width / 2 / gridSize) * gridSize + gridSize/2, canvas.height);
      ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Paddles
      ctx.fillStyle = fgColor;
      
      // Player/Left Paddle
      playerY = Math.max(0, Math.min(canvas.height - paddleHeight, playerY));
      ctx.fillRect(gridSize, playerY, paddleWidth, paddleHeight); 
      
      // AI/Right Paddle
      aiY = Math.max(0, Math.min(canvas.height - paddleHeight, aiY));
      ctx.fillRect(canvas.width - gridSize * 2, aiY, paddleWidth, paddleHeight); 

      // Draw Ball (Blocky Dot matching grid)
      ctx.fillStyle = primaryColor;
      ctx.fillRect(ballX - ballSize / 2, ballY - ballSize / 2, ballSize, ballSize);

      // Draw Scores
      ctx.font = "bold 64px var(--font-inter-display), sans-serif";
      ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";
      ctx.textAlign = "center";
      ctx.fillText(score.player.toString(), canvas.width / 4, gridSize * 4);
      ctx.fillText(score.ai.toString(), (canvas.width * 3) / 4, gridSize * 4);

      if (!isInteractive) {
        ctx.font = "20px var(--font-inter-display), sans-serif";
        ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)";
        ctx.fillText("Click anywhere to take control", canvas.width / 2, canvas.height / 2 + 100);
      }

      // Movement
      if (!isInteractive) {
        // Auto-play AI for Left Paddle
        const leftAiCenter = playerY + paddleHeight / 2;
        if (leftAiCenter < ballY - 15) playerY += 5;
        else if (leftAiCenter > ballY + 15) playerY -= 5;
      } else {
        if (upPressed && playerY > 0) playerY -= 8;
        else if (downPressed && playerY < canvas.height - paddleHeight) playerY += 8;
      }

      // Simple AI for Right Paddle
      const aiCenter = aiY + paddleHeight / 2;
      if (aiCenter < ballY - 15) aiY += 5;
      else if (aiCenter > ballY + 15) aiY -= 5;

      // Ball collision with top/bottom walls
      if (ballY + ballDY > canvas.height - ballSize/2 || ballY + ballDY < ballSize/2) {
        ballDY = -ballDY;
      }

      // Ball collision with paddles
      if (ballX - ballSize/2 < gridSize + paddleWidth) {
        if (ballY > playerY && ballY < playerY + paddleHeight) {
          ballDX = -ballDX * 1.05; // Slightly increase speed
          const deltaY = ballY - (playerY + paddleHeight / 2);
          ballDY = deltaY * 0.2;
          ballX = gridSize + paddleWidth + ballSize/2; // Prevent sticking
        } else if (ballX < 0) {
          // AI Scores
          setScore(s => ({ ...s, ai: s.ai + 1 }));
          ballX = Math.floor(canvas.width / 2 / gridSize) * gridSize;
          ballY = Math.floor(canvas.height / 2 / gridSize) * gridSize;
          ballDX = 6;
          ballDY = 6 * (Math.random() > 0.5 ? 1 : -1);
        }
      } else if (ballX + ballSize/2 > canvas.width - gridSize * 2) {
        if (ballY > aiY && ballY < aiY + paddleHeight) {
          ballDX = -ballDX * 1.05;
          const deltaY = ballY - (aiY + paddleHeight / 2);
          ballDY = deltaY * 0.2;
          ballX = canvas.width - gridSize * 2 - ballSize/2; // Prevent sticking
        } else if (ballX > canvas.width) {
          // Player Scores
          setScore(s => ({ ...s, player: s.player + 1 }));
          ballX = Math.floor(canvas.width / 2 / gridSize) * gridSize;
          ballY = Math.floor(canvas.height / 2 / gridSize) * gridSize;
          ballDX = -6;
          ballDY = 6 * (Math.random() > 0.5 ? 1 : -1);
        }
      }

      ballX += ballDX;
      ballY += ballDY;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
      if (canvas) canvas.removeEventListener("mousemove", mouseMoveHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInteractive, score]);

  return (
    <div 
      className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto cursor-pointer"
      onClick={() => {
        if (!isInteractive) {
          setIsInteractive(true);
          setScore({ player: 0, ai: 0 }); // Reset score on takeover
        }
      }}
    >
      <div className="relative w-full aspect-[2/1] overflow-hidden rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm shadow-xl">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}
