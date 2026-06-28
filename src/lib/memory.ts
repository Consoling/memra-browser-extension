export type Memory = {
  id: string;

  role: "user" | "assistant";

  content: string;

  source: "chatgpt";

  createdAt: number;

  conversationId?: string;
};


function isMemoryArray(
  value: unknown
): value is Memory[] {
  return Array.isArray(value);
}

export async function saveMemory(memory: Memory) {
  console.log("SAVE MEMORY CALLED", memory);

  const result =
    await chrome.storage.local.get("memories");

  const memories =
    (result.memories as Memory[]) ?? [];

  memories.unshift(memory);

  await chrome.storage.local.set({
    memories,
  });

  window.dispatchEvent(
  new CustomEvent(
    "memra-memory-added"
  )
);

}

export async function getMemories(): Promise<
  Memory[]
> {
  const result =
    await chrome.storage.local.get(
      "memories"
    );

  return (
    (result.memories as Memory[]) ?? []
  );
}