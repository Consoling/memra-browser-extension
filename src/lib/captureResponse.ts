import { saveMemory } from "./memory";

export function startResponseCapture() {
  let lastResponse = "";

  const observer =
    new MutationObserver(async () => {
      const markdowns =
        document.querySelectorAll(
          "[data-message-author-role='assistant']"
        );

      const latest =
        markdowns[
          markdowns.length - 1
        ] as HTMLElement | undefined;

      if (!latest) return;

      const content =
        latest.innerText.trim();

      if (!content) return;

      if (content === lastResponse)
        return;

      lastResponse = content;

      console.log(
        "Assistant response captured"
      );

      await saveMemory({
        id: crypto.randomUUID(),
        role: "assistant",
        content,
        source: "chatgpt",
        createdAt: Date.now(),
      });
    });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}