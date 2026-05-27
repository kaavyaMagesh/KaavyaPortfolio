import { useEffect, useRef } from "react";

export function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse / touch
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("resize", handleResize);

     // 1. STARS INITIALIZATION
    const starsCount = 120;
    const stars: Array<{ x: number; y: number; size: number; speed: number; phase: number; glow: boolean }> = [];
    for (let i = 0; i < starsCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.65, // Mostly in the top half
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.015 + 0.003,
        phase: Math.random() * Math.PI * 2,
        glow: Math.random() > 0.7, // 30% of the stars glow softly
      });
    }

    // 3. PERSPECTIVE GRID SETTINGS
    const cols = 26; // horizontal lines density
    const rows = 28; // perspective lines depth
    const gridColor = "rgba(255, 0, 170, 0.4)";
    const highlightColor = "rgba(255, 0, 170, 0.85)";

    // 4. ORGANIC FLOATING BINARY NODES INITIALIZATION
    const nodesCount = 65;
    const floatingNodes: Array<{
      xPercent: number; // side-to-side position (-0.5 to 0.5)
      zOffset: number;  // offset in Z depth (0 to rows * 30)
      char: string;
      speed: number;
      phase: number;
    }> = [];
    for (let i = 0; i < nodesCount; i++) {
      floatingNodes.push({
        xPercent: Math.random() * 1.35 - 0.675, // Scattered left and right
        zOffset: Math.random() * rows * 30,      // Scattered depth
        char: Math.random() > 0.5 ? "1" : "0",
        speed: Math.random() * 0.05 + 0.01,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    // Render loop
    const render = () => {
      time += 0.015;

      // Soft ease mouse movement
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Clear with very deep cosmic space color
      ctx.fillStyle = "#030008";
      ctx.fillRect(0, 0, width, height);

      // --- NEBULA GLOW ---
      const nebulaGrad = ctx.createRadialGradient(
        width / 2,
        height * 0.6,
        10,
        width / 2,
        height * 0.55,
        width * 0.6
      );
      nebulaGrad.addColorStop(0, "rgba(80, 0, 95, 0.4)");
      nebulaGrad.addColorStop(0.3, "rgba(35, 0, 50, 0.2)");
      nebulaGrad.addColorStop(0.7, "rgba(10, 0, 20, 0.05)");
      nebulaGrad.addColorStop(1, "transparent");
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, width, height);

      // --- STARS ---
      stars.forEach((star) => {
        // More dramatic twinkling speed & amplitude range
        const twinkleCycle = time * star.speed * 120 + star.phase;
        const opacity = Math.abs(Math.sin(twinkleCycle)) * 0.85 + 0.15;
        
        ctx.save();
        if (star.glow) {
          // Render a much larger, more noticeable glowing star aura
          const glowRadius = star.size * (6.5 + Math.sin(twinkleCycle * 1.5) * 1.5);
          const starGlow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glowRadius);
          starGlow.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.85})`);
          starGlow.addColorStop(0.3, `rgba(255, 120, 220, ${opacity * 0.45})`); // Neon pink glow
          starGlow.addColorStop(0.7, `rgba(0, 220, 255, ${opacity * 0.15})`);   // Cyber cyan edge
          starGlow.addColorStop(1, "transparent");
          ctx.fillStyle = starGlow;
          ctx.beginPath();
          ctx.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Slightly larger stars for visibility
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.glow ? star.size * 1.5 : star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // --- NEON HORIZON GLOW REMOVED ---

      // --- 3D PERSPECTIVE GRID ---
      // Camera/Projection metrics
      const fov = 350;
      const centerY = height * 0.58;
      const centerX = width / 2;

      // Function to project 3D coordinates to 2D screen
      const project = (x3d: number, y3d: number, z3d: number) => {
        // Prevent division by zero near the camera plane
        const safeZ = Math.max(-fov + 10, z3d);
        const scale = fov / (safeZ + fov);
        return {
          x: centerX + x3d * scale,
          // Shift centerY and camera height to map grid off the screen at the bottom
          y: centerY + y3d * scale,
          scale,
        };
      };

      // Generate heights/undulation for grid vertices dynamically
      const getGridHeight = (gridX: number, z3d: number) => {
        // Deep continuous ocean waves
        const wave1 = Math.sin(gridX * 0.15 - time * 0.7) * 45; 
        const wave2 = Math.cos(z3d * 0.005 - time * 0.5) * 35; 
        const wave3 = Math.sin((gridX * 0.05 + z3d * 0.003) - time * 0.4) * 20; 
        
        // Deflection from cursor
        const dx = (gridX * 20 + centerX) - mouse.x;
        const dy = (centerY - (z3d / 30) * 15) - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseDeflect = dist < 220 ? Math.sin((1 - dist / 220) * Math.PI) * -35 : 0;

        // Dampen wave height close to the horizon to make grid lines merge cleanly
        // z3d ranges from roughly -250 up to rows * 25 (700)
        const maxHorizonZ = rows * 25;
        const horizonScale = Math.max(0, Math.min(1, (maxHorizonZ - z3d) / 120));

        // Position camera closer/lower to let waves flow beneath and out of the bottom of frame
        return 145 + (wave1 + wave2 + wave3 + mouseDeflect) * horizonScale;
      };

      // 1. Draw Perspective Grid Lines (Depth/Receding lines)
      ctx.lineWidth = 2.5; // Bold grid lines
      for (let c = 0; c <= cols; c++) {
        const xPercent = c / cols - 0.5; // -0.5 to 0.5
        const x3d = xPercent * width * 3.4;

        ctx.beginPath();
        for (let r = -15; r < rows; r++) { // Draw even closer rows (r = -15) to pull waves way below bottom margin
          // Slow down forward scroll speed (12 speed instead of 38)
          const z3d = r * 25 - (time * 12) % 25; 
          const y3d = getGridHeight(xPercent * cols, z3d); 
          const pt = project(x3d, y3d, z3d);

          if (r === -15) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        
        // Fade out lines deeper in perspective
        const lineGrad = ctx.createLinearGradient(0, centerY, 0, height);
        lineGrad.addColorStop(0, "rgba(255, 0, 170, 0.05)");
        lineGrad.addColorStop(0.3, "rgba(255, 0, 170, 0.65)");
        lineGrad.addColorStop(1, "rgba(255, 0, 170, 0.98)");
        ctx.strokeStyle = lineGrad;
        ctx.stroke();
      }

      // Draw filled base polygon matching the grid ocean surface to cover the black background void below horizon
      ctx.save();
      const fillGrad = ctx.createLinearGradient(0, centerY, 0, height);
      fillGrad.addColorStop(0, "rgba(24, 0, 48, 0.4)");    // Very soft indigo neon mist at the horizon
      fillGrad.addColorStop(0.5, "rgba(35, 0, 58, 0.65)"); // Slightly denser violet
      fillGrad.addColorStop(1, "rgba(12, 0, 24, 0.85)");  // Deep dark synth space blend at the bottom
      ctx.fillStyle = fillGrad;
      ctx.beginPath();
      // Start at bottom left
      ctx.moveTo(0, height);
      // Project nodes along the horizon left-to-right
      for (let c = 0; c <= cols; c++) {
        const xPercent = c / cols - 0.5;
        const x3d = xPercent * width * 3.4;
        const z3d = rows * 25; // Far horizon Z depth
        const y3d = getGridHeight(xPercent * cols, z3d);
        const pt = project(x3d, y3d, z3d);
        if (c === 0) ctx.lineTo(0, pt.y);
        ctx.lineTo(pt.x, pt.y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 2. Draw Horizontal Grid Lines (Transverse lines)
      for (let r = -15; r < rows; r++) { // Draw even closer rows (r = -15)
        const z3d = r * 25 - (time * 12) % 25; // Slow down forward scroll speed (12 speed instead of 38)
        const scaleOpacity = Math.max(0, Math.min(1, (z3d + 200) / 500)); 
        
        ctx.strokeStyle = `rgba(255, 0, 170, ${scaleOpacity * 0.6})`;
        ctx.lineWidth = 2.5; 
        ctx.beginPath();
        
        for (let c = 0; c <= cols; c++) {
          const xPercent = c / cols - 0.5;
          const x3d = xPercent * width * 3.4;
          const y3d = getGridHeight(xPercent * cols, z3d); 
          const pt = project(x3d, y3d, z3d);

          if (c === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }

      // 3. Draw Organic Floating Binary Nodes scattered across the 3D wave plane
      floatingNodes.forEach((node) => {
        // Move the node forward matching time (wrapping Z coordinate slowly: 12 speed instead of 38)
        let z3d = (node.zOffset - time * 12 * 25) % (rows * 25);
        if (z3d < -250) z3d += rows * 25; // loop back to horizon

        const scaleOpacity = Math.max(0, Math.min(1, (z3d + 200) / 500));
        if (scaleOpacity < 0.05) return;

        const x3d = node.xPercent * width * 3.4;
        // Float the text slightly above the wave base
        const y3d = getGridHeight(node.xPercent * cols, z3d) - 14; 
        const pt = project(x3d, y3d, z3d);

        // Slow characters shifting phase
        const nodeCycle = time * 0.25 + node.phase;
        const fade = Math.abs(Math.sin(nodeCycle)) * scaleOpacity;
        
        // Randomly alternate between '0' and '1' very slowly
        const char = Math.sin(nodeCycle) > 0 ? "1" : "0";

        ctx.save();
        ctx.font = `bold ${Math.max(10, Math.floor(14 * ((z3d + 200) / 350)))}px monospace`;
        
        // Render a subtle neon glow backing shadow behind the digit
        ctx.fillStyle = `rgba(255, 0, 170, ${fade * 0.25})`;
        ctx.fillText(char, pt.x - 1, pt.y - 1);
        ctx.fillText(char, pt.x + 1, pt.y + 1);

        // Core bright pink digit
        ctx.fillStyle = `rgba(255, 160, 230, ${fade * 0.7})`;
        ctx.fillText(char, pt.x, pt.y);
        ctx.restore();
      });

      // Draw top horizontal edge glow removed for a seamless horizon transition

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
