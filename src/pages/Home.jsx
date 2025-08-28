import React, { useEffect, useState, useRef } from "react";
import "../index.css";

// Typewriter hook supporting optional instant word swapping (no delete animation)
const useTypeRotate = ({
  prefix,
  words,
  typeSpeed = 55,
  deleteSpeed = 30,
  holdTime = 1200,
  holdTimeLastWord, // optional distinct hold time for last word
  startDelay = 700,
  instantWords = false,
  prefixChunkSize = 1, // how many chars to add per tick for prefix
  swapWords = false, // if true: no per-char delete; just swap full words
  skipDelete = false, // if true: no delete animation; just jump to next word
}) => {
  const [output, setOutput] = useState("");
  const wordIndexRef = useRef(0);
  const typedPrefixRef = useRef(false);
  const currentWordRef = useRef("");
  const deletingRef = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const run = () => {
      // 1. Type prefix first
      if (!typedPrefixRef.current) {
        const already = output.length;
        const nextLen = already + prefixChunkSize;
        const nextPrefix = prefix.slice(0, nextLen);
        setOutput(nextPrefix);
        if (nextPrefix === prefix) {
          typedPrefixRef.current = true;
        }
        timeoutRef.current = setTimeout(run, Math.max(15, typeSpeed * 0.4));
        return;
      }

      const word = words[wordIndexRef.current];

      // 2. Simple swap mode (legacy option)
      if (swapWords) {
        setOutput(prefix + word);
        wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
        const isLast = wordIndexRef.current === 0 && words.length > 1; // cycle wrap
        const hold = isLast && holdTimeLastWord ? holdTimeLastWord : holdTime;
        timeoutRef.current = setTimeout(run, hold);
        return;
      }

      // 3. Skip delete mode (type, hold, instantly clear, type next)
      if (skipDelete) {
        const typed = currentWordRef.current;
        if (typed.length < word.length) {
          const next = word.slice(0, typed.length + 1);
          currentWordRef.current = next;
          setOutput(prefix + next);
          timeoutRef.current = setTimeout(run, typeSpeed);
        } else {
          const isLast = wordIndexRef.current === words.length - 1;
          const hold = isLast && holdTimeLastWord ? holdTimeLastWord : holdTime;
          timeoutRef.current = setTimeout(() => {
            // reset to prefix and advance word index
            wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
            currentWordRef.current = "";
            setOutput(prefix); // instantly remove old word
            run();
          }, hold);
        }
        return;
      }

      // 4. Standard type + delete cycle
      if (!deletingRef.current) {
        // typing forward
        const next = word.slice(0, currentWordRef.current.length + 1);
        currentWordRef.current = next;
        setOutput(prefix + next);
        if (next === word) {
          deletingRef.current = true;
          const isLast = wordIndexRef.current === words.length - 1;
          const hold = isLast && holdTimeLastWord ? holdTimeLastWord : holdTime;
          timeoutRef.current = setTimeout(run, hold);
        } else {
          timeoutRef.current = setTimeout(run, typeSpeed);
        }
      } else {
        // deleting
        const next = currentWordRef.current.slice(0, -1);
        currentWordRef.current = next;
        setOutput(prefix + next);
        if (next.length === 0) {
          deletingRef.current = false;
          wordIndexRef.current = (wordIndexRef.current + 1) % words.length;
          timeoutRef.current = setTimeout(run, typeSpeed * 1.2);
        } else {
          timeoutRef.current = setTimeout(run, deleteSpeed);
        }
      }
    };

    timeoutRef.current = setTimeout(run, startDelay);
    return () => clearTimeout(timeoutRef.current);
  }, [
    prefix,
    words,
    typeSpeed,
    deleteSpeed,
    holdTime,
    holdTimeLastWord,
    startDelay,
    prefixChunkSize,
    swapWords,
    skipDelete,
    instantWords,
  ]);

  return output;
};

const Home = () => {
  const density = 100; // static baseline now
  const [dropsKey] = useState(0);
  const subtitle = useTypeRotate({
    prefix: "Full‑Stack Developer | React • Node • ",
    words: ["TypeScript", "PostgreSQL", "REST APIs"],
    typeSpeed: 60, // speed for typing each char
    holdTime: 1000, // hold each word for 1 second
    holdTimeLastWord: 1000, // last word also 1 second
    startDelay: 250,
    instantWords: false, // type out words
    prefixChunkSize: 2,
    swapWords: false,
    skipDelete: true, // no delete animation, just next word typing
  });

  // density change events removed

  const rainDrops = Array.from({ length: density }, (_, index) => (
    <div
      key={index + "-" + dropsKey}
      className="rain-drop"
      style={{
        left: `${(index / density) * 100}%`,
        animationDelay: `${Math.random() * 0.6}s`,
      }}
    />
  ));

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-matrix-green overflow-hidden">
      <div className="matrix-rain absolute inset-0 z-0">{rainDrops}</div>
      <div className="z-10 text-center space-y-6 max-w-4xl px-6">
        <div className="name-with-photo">
          <h1
            className="font-matrix glitch leading-none"
            data-text="SHAYAN ASADPOUR"
            style={{ lineHeight: 1 }}
          >
            SHAYAN ASADPOUR
          </h1>
          <img
            src="/profile-photo.png"
            alt="Profile"
            className="profile-inline"
          />
        </div>
        <h2 className="text-2xl md:text-3xl font-matrix typing-cursor min-h-[2.5rem]">
          {subtitle}
        </h2>
        <p className="text-lg md:text-xl font-matrix leading-relaxed opacity-90">
          I'm a passionate coder focused on crafting performant, accessible &
          immersive web experiences. I thrive across the stack—from
          <br />
          intuitive React interfaces to resilient Node / Express APIs &
          optimized data flows.
        </p>
        <p className="text-base md:text-lg font-matrix opacity-80">
          Always iterating, always learning. Exploring design systems, real‑time
          architectures & scalable cloud patterns. Let's build something
          meaningful.
        </p>
      </div>
    </section>
  );
};

export default Home;
