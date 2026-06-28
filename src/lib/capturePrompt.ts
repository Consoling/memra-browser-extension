import { saveMemory } from "./memory";

export function startPromptCapture() {
  document.addEventListener("keydown", async (e) => {
    if (e.key !== "Enter" || e.shiftKey) return;

    const editor = document.querySelector(
      '[contenteditable="true"]',
    ) as HTMLDivElement | null;
let lastPrompt = "";


    const prompt = editor?.innerText.trim();

    if (!prompt) return;
if (prompt === lastPrompt)
  return;

lastPrompt = prompt;
    await saveMemory({
      id: crypto.randomUUID(),
      role: "user",
      content: prompt,
      source: "chatgpt",
      createdAt: Date.now(),
    });
  });
}
