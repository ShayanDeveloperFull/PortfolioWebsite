import { useEffect, useState } from "react";

const THEMES = [
  { name: "Green", className: "theme-green" },
  { name: "Cyan", className: "theme-cyan" },
  { name: "Magenta", className: "theme-magenta" },
];

export default function MatrixControlPanel() {
  const [open, setOpen] = useState(false);
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
      {open && (
        <div className="matrix-control-panel">
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
          <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
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
