import { useEffect, useState } from "react";
import { getMemories } from "../../lib/memory";

export default function MemoryTab() {
  const [memories, setMemories] = useState<any[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const load = async () => {
      setMemories(await getMemories());
    };
    load();
    window.addEventListener("memra-memory-added", load);
    return () => window.removeEventListener("memra-memory-added", load);
  }, []);

  const filteredMemories = memories.filter((m) =>
    m.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "12px",
      }}>
        <div>
          <h3 style={{
            margin: 0,
            fontSize: "14px",
            fontWeight: 700,
            color: "#111827",
            letterSpacing: "-0.02em",
          }}>
            Memories
          </h3>
          <p style={{
            margin: 0,
            fontSize: "11px",
            color: "#9CA3AF",
            marginTop: "1px",
          }}>
            {memories.length} {memories.length === 1 ? "entry" : "entries"} stored
          </p>
        </div>

        {/* Pill badge */}
        {memories.length > 0 && (
          <div style={{
            background: "rgba(203,41,87,0.10)",
            border: "1px solid rgba(203,41,87,0.18)",
            borderRadius: "999px",
            padding: "2px 9px",
            fontSize: "11px",
            fontWeight: 600,
            color: "#CB2957",
          }}>
            {filteredMemories.length}
          </div>
        )}
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: "12px" }}>
        <svg style={{
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          flexShrink: 0,
        }} width="13" height="13" viewBox="0 0 24 24" fill="none">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            stroke="#9CA3AF" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search memories…"
          style={{
            width: "100%",
            padding: "8px 12px 8px 30px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.7)",
            background: "rgba(255,255,255,0.55)",
            color: "#111827",
            fontSize: "12.5px",
            outline: "none",
            boxSizing: "border-box",
            backdropFilter: "blur(6px)",
            transition: "border-color 0.15s, background 0.15s",
            fontFamily: "inherit",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "rgba(203,41,87,0.45)";
            e.target.style.background = "rgba(255,255,255,0.8)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(255,255,255,0.7)";
            e.target.style.background = "rgba(255,255,255,0.55)";
          }}
        />
      </div>

      {/* List */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        paddingRight: "2px",
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(0,0,0,0.1) transparent",
      }}>
        {filteredMemories.length === 0 ? (
          <div style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            paddingTop: "32px",
          }}>
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
            }}>
              🔍
            </div>
            <p style={{
              margin: 0,
              fontSize: "12.5px",
              color: "#9CA3AF",
              textAlign: "center",
            }}>
              {query ? "No memories match" : "Nothing stored yet"}
            </p>
          </div>
        ) : (
          filteredMemories.map((memory, index) => (
            <MemoryCard key={memory.id} memory={memory} index={index} />
          ))
        )}
      </div>
    </div>
  );
}

const ACCENTS = [
  { dot: "#CB2957", bg: "rgba(203,41,87,0.08)",  border: "rgba(203,41,87,0.18)"  },
  { dot: "#7C3AED", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.18)" },
  { dot: "#0891B2", bg: "rgba(8,145,178,0.08)",  border: "rgba(8,145,178,0.18)"  },
  { dot: "#059669", bg: "rgba(5,150,105,0.08)",  border: "rgba(5,150,105,0.18)"  },
  { dot: "#D97706", bg: "rgba(217,119,6,0.08)",  border: "rgba(217,119,6,0.18)"  },
];

function MemoryCard({ memory, index }: { memory: any; index: number }) {
  const [hovered, setHovered] = useState(false);
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "rgba(255,255,255,0.82)"
          : "rgba(255,255,255,0.55)",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)"}`,
        borderRadius: "12px",
        padding: "10px 12px",
        cursor: "default",
        transition: "all 0.16s ease",
        backdropFilter: "blur(8px)",
        boxShadow: hovered
          ? "0 2px 12px rgba(0,0,0,0.07)"
          : "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
        {/* Colored dot */}
        <div style={{
          width: "7px",
          height: "7px",
          borderRadius: "999px",
          background: accent.dot,
          flexShrink: 0,
          marginTop: "5px",
          boxShadow: `0 0 0 3px ${accent.bg}`,
          transition: "box-shadow 0.16s",
        }} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            margin: 0,
            fontSize: "12.5px",
            lineHeight: "1.55",
            color: hovered ? "#111827" : "#374151",
            transition: "color 0.16s ease",
            wordBreak: "break-word",
          }}>
            {memory.content}
          </p>

          {memory.createdAt && (
            <span style={{
              display: "block",
              marginTop: "5px",
              fontSize: "10px",
              color: "#9CA3AF",
              letterSpacing: "0.01em",
            }}>
              {new Date(memory.createdAt).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric",
              })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}