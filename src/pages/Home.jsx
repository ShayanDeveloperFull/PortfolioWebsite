import { useEffect, useState, useRef } from "react";
import "../index.css";

const Home = () => {
  const firstName = "SHAYAN ";
  const lastName = "ASADPOUR";
  const nameTypeSpeed = 140;
  const subtitleTypeSpeed = 80;
  const descriptionTypeSpeed = 40;

  const [nameDisplay, setNameDisplay] = useState("");
  const [subtitleDisplay, setSubtitleDisplay] = useState("");
  const [descriptionDisplay, setDescriptionDisplay] = useState("");
  const [secondDescriptionDisplay, setSecondDescriptionDisplay] = useState("");
  const [nameTypingComplete, setNameTypingComplete] = useState(false);
  const [imageAnimationComplete, setImageAnimationComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    let i = 0;
    let active = true;
    let currentlyTypingLastName = false;

    const step = () => {
      if (!active) return;

      if (!currentlyTypingLastName) {
        if (i < firstName.length) {
          setNameDisplay(firstName.slice(0, i + 1));
          i += 1;
          setTimeout(step, nameTypeSpeed);
        } else {
          currentlyTypingLastName = true;
          i = 0;
          if (isMobile) {
            setNameDisplay(firstName + "\n");
          }
          setTimeout(step, nameTypeSpeed);
        }
      } else {
        if (i < lastName.length) {
          const currentDisplay = isMobile
            ? firstName + "\n" + lastName.slice(0, i + 1)
            : firstName + lastName.slice(0, i + 1);
          setNameDisplay(currentDisplay);
          i += 1;
          setTimeout(step, nameTypeSpeed);
        } else {
          setNameTypingComplete(true);
        }
      }
    };

    setTimeout(step, 250);
    return () => {
      active = false;
    };
  }, [isMobile]);

  useEffect(() => {
    if (!imageAnimationComplete) return;

    const prefix = isMobile
      ? "Full‑Stack Developer |\nReact • Node • "
      : "Full‑Stack Developer | React • Node • ";
    const words = ["TypeScript", "PostgreSQL", "REST APIs"];
    let wordIndex = 0;
    let charIndex = 0;
    let active = true;
    let descriptionStarted = false;

    const step = () => {
      if (!active) return;

      const currentWord = words[wordIndex];

      const currentText = prefix + currentWord.slice(0, charIndex + 1);
      setSubtitleDisplay(currentText);
      charIndex++;

      if (charIndex === currentWord.length) {
        if (currentWord === "TypeScript" && !descriptionStarted) {
          descriptionStarted = true;

          setTimeout(() => {
            startDescriptionTyping();
          }, 200);
        }

        setTimeout(() => {
          if (active) {
            wordIndex = (wordIndex + 1) % words.length;
            charIndex = 0;

            setSubtitleDisplay(prefix);
            setTimeout(step, 200);
          }
        }, 1500);
        return;
      }

      setTimeout(step, subtitleTypeSpeed);
    };

    const startDescriptionTyping = () => {
      const firstDescription =
        "I'm a passionate coder focused on crafting performant, accessible & immersive web experiences. I thrive across the stack—from\nintuitive React interfaces to resilient Node / Express APIs & optimized data flows.";
      const secondDescription =
        "Always iterating, always learning. Exploring design systems, real‑time architectures & scalable cloud patterns. Let's build something meaningful.";

      let i = 0;
      const typeFirstDescription = () => {
        if (i <= firstDescription.length) {
          setDescriptionDisplay(firstDescription.slice(0, i));
          i++;
          setTimeout(typeFirstDescription, descriptionTypeSpeed);
        } else {
          setTimeout(() => {
            let j = 0;
            const typeSecondDescription = () => {
              if (j <= secondDescription.length) {
                setSecondDescriptionDisplay(secondDescription.slice(0, j));
                j++;
                setTimeout(typeSecondDescription, descriptionTypeSpeed);
              }
            };
            typeSecondDescription();
          }, 300);
        }
      };
      typeFirstDescription();
    };

    let prefixIndex = 0;
    const typePrefix = () => {
      if (!active) return;
      setSubtitleDisplay(prefix.slice(0, prefixIndex + 1));
      prefixIndex++;

      if (prefixIndex === prefix.length) {
        setTimeout(step, 200);
      } else {
        setTimeout(typePrefix, subtitleTypeSpeed);
      }
    };

    setTimeout(typePrefix, 300);

    return () => {
      active = false;
    };
  }, [imageAnimationComplete, isMobile]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-matrix-green overflow-hidden">
      <div className="z-10 text-center space-y-6 max-w-4xl px-6">
        <div className="name-with-photo">
          <h1
            className="font-matrix glitch leading-none relative inline-block"
            data-text={nameDisplay || " "}
            style={{
              lineHeight: 1,
              minHeight: "1em",
              minWidth: "20ch",
              whiteSpace: "pre-line",
            }}
          >
            {nameDisplay}
          </h1>
          {nameTypingComplete && (
            <img
              src="/profile-photo.png"
              alt="Shayan Asadpour Profile"
              className={`profile-inline matrix-entrance ${
                imageAnimationComplete ? "entered" : ""
              }`}
              onAnimationEnd={() => setImageAnimationComplete(true)}
            />
          )}
        </div>
        <h2
          className={`text-2xl md:text-3xl font-matrix ${
            !isMobile ? "typing-cursor" : ""
          } min-h-[2.5rem] subtitle-responsive`}
        >
          {isMobile
            ? subtitleDisplay.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  {index === 0 && <br />}
                  {index === 1 && (
                    <span className="typing-cursor-mobile">_</span>
                  )}
                </span>
              ))
            : subtitleDisplay}
        </h2>
        <p className="text-lg md:text-xl font-matrix leading-relaxed opacity-90">
          {descriptionDisplay.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              {index === 0 && <br />}
            </span>
          ))}
        </p>
        <p className="text-base md:text-lg font-matrix opacity-80">
          {secondDescriptionDisplay}
        </p>
      </div>
    </section>
  );
};

export default Home;
