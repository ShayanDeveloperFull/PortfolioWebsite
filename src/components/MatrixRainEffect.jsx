import { useEffect } from "react";

const MatrixRainEffect = () => {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";

    const alphabet = latin + nums; // Use only Latin and numbers

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops = [];

    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      context.fillStyle = "rgba(0, 0, 0, 0.05)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Use current theme primary color (fallback to green)
      const themePrimary =
        getComputedStyle(document.body)
          .getPropertyValue("--matrix-primary")
          .trim() || "#0F0";
      context.fillStyle = themePrimary;
      context.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(
          Math.floor(Math.random() * alphabet.length)
        );
        context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    let paused = false;
    const NORMAL_INTERVAL = 30; // ms per frame draw attempt
    const SLOW_INTERVAL = 100; // slower
    const FAST_INTERVAL = 15; // faster
    let currentInterval = NORMAL_INTERVAL;
    let intervalId;

    const startInterval = () => {
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (!paused) draw();
      }, currentInterval);
    };

    const handleToggle = (e) => {
      paused = !!e.detail.paused;
    };
    const handleSpeed = (e) => {
      const mode = e.detail?.mode;
      if (mode === "slow") currentInterval = SLOW_INTERVAL;
      else if (mode === "fast") currentInterval = FAST_INTERVAL;
      else currentInterval = NORMAL_INTERVAL;
      startInterval();
    };
    window.addEventListener("matrix-rain-toggle", handleToggle);
    window.addEventListener("matrix-rain-speed", handleSpeed);

    startInterval();

    return () => {
      window.removeEventListener("matrix-rain-toggle", handleToggle);
      window.removeEventListener("matrix-rain-speed", handleSpeed);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return null;
};

export default MatrixRainEffect;
