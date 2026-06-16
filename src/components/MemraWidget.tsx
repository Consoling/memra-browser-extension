import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";

export default function MemraWidget() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({
    x: window.innerWidth - 80,
    y: 200,
  });
  const [dragging, setDragging] = useState(false);

  const handlePointerDown = () => {
    setDragging(true);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!dragging) return;
    movedRef.current = true;
    setPosition({
      x: e.clientX - 28,
      y: e.clientY - 28,
    });
  };

  const handlePointerUp = () => {
    setDragging(false);
    setTimeout(() => {
      movedRef.current = false;
    }, 50);
  };

  const movedRef = useRef(false);
  const isLeftSide = position.x < window.innerWidth / 2;

  const handleClick = () => {
    if (movedRef.current) return;

    setOpen((prev) => !prev);
  };

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);

    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dragging]);

  return (
    <>
      <motion.button
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        style={{
          position: "fixed",
          left: `${position.x}px`,
          top: `${position.y}px`,

          width: "56px",
          height: "56px",

          borderRadius: "9999px",

          border: "none",

          background: "linear-gradient(135deg,#111,#222)",

          boxShadow: "0 10px 30px rgba(0,0,0,.25)",

          color: "white",

          fontSize: "24px",

          cursor: "pointer",

          zIndex: 999999,
        }}
      >
        🧠
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 10,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 10,
            }}
            transition={{
              duration: 0.18,
            }}
            style={{
              position: "fixed",

              left: isLeftSide ? position.x + 70 : position.x - 370,

              top: position.y,

              width: "350px",

              height: "500px",

              background: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)",

              backdropFilter: "blur(20px)",

              border: "1px solid rgba(255,255,255,0.5)",

              boxShadow: "0 20px 60px rgba(0,0,0,.15)",

              borderRadius: "24px",

              color: "black",

              padding: "20px",

              zIndex: 999999,
            }}
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
