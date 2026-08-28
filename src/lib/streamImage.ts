/**
 * Streaming image generation helper.
 *
 * POSTs a prompt to the server route `/api/generate-image`, which forwards to the
 * Lovable AI Gateway with `stream: true`. SSE events arrive as the model produces
 * partial frames (blurred previews) and finally a completed image.
 *
 * The callback receives `(dataUrl, isFinal)` for each frame; render the data URL and
 * keep it blurred until `isFinal` is true.
 */
export async function streamImage(
  endpoint: string,
  prompt: string,
  model: string,
  onFrame: (dataUrl: string, isFinal: boolean) => void,
): Promise<void> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, model }),
  });
  if (!res.ok || !res.body) {
    throw new Error(`Image generation failed: ${res.status} ${await res.text().catch(() => "")}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // Split the buffer into complete SSE events. Events are separated by a blank line.
    const parts = buffer.split("\n\n");
    buffer = parts.pop() ?? "";

    for (const part of parts) {
      for (const line of part.split("\n")) {
        if (!line.startsWith("data:")) continue;
        const data = line.slice(5).trim();
        if (!data) continue;
        try {
          const parsed = JSON.parse(data);
          // image.delta carries a data URL + is_final flag.
          if (parsed.image?.delta) {
            onFrame(parsed.image.delta, !!parsed.image.is_final);
          }
        } catch {
          // Ignore non-JSON keep-alive lines.
        }
      }
    }
  }

  // A stream that ends with zero events is a gateway hiccup: replay once
  // with streaming off to recover the finished image from the JSON body.
  // The client handles this by checking whether any frame was delivered.
}