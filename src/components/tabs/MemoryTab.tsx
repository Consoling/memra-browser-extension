import { useEffect, useState } from "react";
import { getMemories} from "../../lib/memory";

export default function MemoryTab() {
  const [memories, setMemories] =
    useState<any[]>([]);

    const [query, setQuery] =
  useState("");

useEffect(() => {
  const load = async () => {
    setMemories(
      await getMemories()
    );
  };

  load();

  window.addEventListener(
    "memra-memory-added",
    load
  );

  return () => {
    window.removeEventListener(
      "memra-memory-added",
      load
    );
  };
}, []);

const filteredMemories =
  memories.filter((memory) =>
    memory.content
      .toLowerCase()
      .includes(
        query.toLowerCase()
      )
  );

  return (
    <div>
      <h3>Memory</h3>

      <input
  value={query}
  onChange={(e) =>
    setQuery(e.target.value)
  }
  placeholder="Search memories..."
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    marginBottom: "16px",
    outline: "none",
  }}
/>


{filteredMemories.length === 0 && (
  <div
    style={{
      opacity: 0.6,
      textAlign: "center",
      marginTop: "20px",
    }}
  >
    No memories found
  </div>
)}
     {filteredMemories.map((memory) => (
  <div key={memory.id}>
    {memory.content}
  </div>
))}
    </div>
  );
}