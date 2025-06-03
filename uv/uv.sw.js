self.addEventListener('fetch', async (event) => {
    const url = new URL(event.request.url);

    // Check if the request is for Discord web
    if (url.hostname.endsWith("discord.com") && event.request.destination === "document") {
        let response = await fetch(event.request);
        let text = await response.text();

        // Inject Vencord before </body>
        text = text.replace(
            "</body>",
            `<script src="https://vencord.dev/inject.js"></script></body>`
        );

        // Return the modified response
        event.respondWith(new Response(text, {
            headers: response.headers,
            status: response.status,
            statusText: response.statusText
        }));
        return; // Stop further processing
    }

    // Fallback to normal handling
    event.respondWith(fetch(event.request));
});
