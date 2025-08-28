import { useEffect, useState } from "react";

const THEMES = [
  { name: "Green", className: "theme-green" },
  { name: "Cyan", className: "theme-cyan" },
  { name: "Magenta", className: "theme-magenta" },
];

export default function MatrixControlPanel() {
  const [open, setOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [paused, setPaused] = useState(false);
  const [speedMode, setSpeedMode] = useState("normal"); // normal | slow | fast

  useEffect(() => {
    document.body.classList.toggle("matrix-paused", paused);
    window.dispatchEvent(
      new CustomEvent("matrix-rain-toggle", { detail: { paused } })
    );
  }, [paused]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("matrix-rain-speed", {
        detail: { mode: speedMode },
      })
    );
  }, [speedMode]);

  // Handle smooth panel animation
  useEffect(() => {
    if (open) {
      setShouldRender(true);
      setIsAnimating(true);
      // Small delay to ensure the element is rendered before starting animation
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsAnimating(false);
      }, 800); // Increased to match the new CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [open]);

  const applyTheme = (cls) => {
    document.body.classList.remove(
      "theme-green",
      "theme-cyan",
      "theme-magenta"
    );
    document.body.classList.add(cls);
  };

  return (
    <>
      <button
        aria-label="Toggle Matrix Panel"
        className={`matrix-control-toggle ${open ? "open" : "closed"}`}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "×" : "Matrix Control"}
      </button>
      {shouldRender && (
        <div
          className={`matrix-control-panel ${
            open && !isAnimating ? "panel-visible" : "panel-hidden"
          }`}
        >
          <h4>MATRIX CONTROL</h4>
          {/* Removed legacy rain speed slider now that discrete speed mode buttons exist */}
          <div style={{ marginTop: "0.5rem" }}>
            <button
              type="button"
              className="btn-matrix"
              onClick={() => setPaused((p) => !p)}
              style={{ width: "100%" }}
            >
              {paused ? "Resume Rain" : "Pause Rain"}
            </button>
          </div>
          <div>
            <label>Speed</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {[
                { label: "Slow", value: "slow" },
                { label: "Normal", value: "normal" },
                { label: "Fast", value: "fast" },
              ].map((b) => (
                <button
                  key={b.value}
                  type="button"
                  className={`btn-matrix ${
                    speedMode === b.value ? "active-btn" : ""
                  }`}
                  onClick={() => setSpeedMode(b.value)}
                  aria-pressed={speedMode === b.value}
                  style={{ flex: 1 }}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label>Theme</label>
            <div className="theme-buttons">
              {THEMES.map((t) => (
                <button
                  key={t.className}
                  className="btn-matrix"
                  onClick={() => applyTheme(t.className)}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
