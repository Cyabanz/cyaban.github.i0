// Ultraviolet config - dynamic bare switching via localStorage (from settings.html)

// Helper to get bare URL from localStorage (if enabled and set)
function getActiveBareUrl() {
    try {
        if (localStorage.getItem('bareEnabled') !== '1') return null;
        const arr = JSON.parse(localStorage.getItem('bareUrls') || "[]");
        return arr.length ? arr[0] : null;
    } catch {
        return null;
    }
}

// Default/fallback bare proxy
let fallbackBare = 'https://tomp.app';

// Try to get dynamic bare URL from settings
let bareUrl = getActiveBareUrl();
if (!bareUrl) bareUrl = fallbackBare;

// Assign config as usual, but dynamically set .bare
self.__uv$config = {
    prefix: '/uv/service/',
    bare: bareUrl,
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/uv/uv.handler.js',
    client: '/uv/uv.client.js',
    bundle: '/uv/uv.bundle.js',
    config: '/uv/uv.config.js',
    sw: '/uv/uv.sw.js',
};

// (Optional) Live update bare backend if user changes settings while app is open:
window.addEventListener('storage', (e) => {
    if (e.key === 'bareEnabled' || e.key === 'bareUrls') {
        let newBare = getActiveBareUrl() || fallbackBare;
        self.__uv$config.bare = newBare;
    }
});
