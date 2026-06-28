import { saveMemory } from "./memory";

export function startResponseCapture() {
  let timeoutId: number | null = null;

  let lastSavedResponse = "";

  const observer = new MutationObserver(() => {
    const messages = document.querySelectorAll(
      "[data-message-author-role='assistant']"
    );

    const latest =
      messages[
        messages.length - 1
      ] as HTMLElement | undefined;

    if (!latest) return;

    const content =
      latest.innerText.trim();

    if (!content) return;

    // ChatGPT is still changing the response
    // cancel previous save attempt
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(
      async () => {
        // Don't save duplicates
        if (
          content ===
          lastSavedResponse
        ) {
          return;
        }

        lastSavedResponse = content;

        console.log(
          "Saving assistant response..."
        );

        await saveMemory({
          id: crypto.randomUUID(),
          role: "assistant",
          content,
          source: "chatgpt",
          createdAt: Date.now(),
        });

        console.log(
          "Assistant response saved"
        );
      },
      2000 // wait 2 seconds after last change
    );
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return () => observer.disconnect();
}