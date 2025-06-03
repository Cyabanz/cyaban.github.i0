function injectScriptTag(html, scriptUrl) {
  return html.replace(/<\/body>/i, `<script src="${scriptUrl}"></script></body>`);
}

function injectCustomScripts(html, proxiedUrl) {
  // Inject Vencord only on Discord
  if (proxiedUrl.includes('discord.com')) {
    html = injectScriptTag(html, 'https://raw.githubusercontent.com/Vendicated/VencordWeb/main/dist/inject.js');
  }
  // Inject adblock script everywhere (replace URL with your own adblock script if desired)
  html = injectScriptTag(html, 'https://cdn.jsdelivr.net/gh/cyaban/cyaban.github.io@main/uv/adblock.js');
  return html;
}
