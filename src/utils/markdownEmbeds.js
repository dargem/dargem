const VIDEO_URL_PATTERN = /^https?:\/\/[^\s<>"')]+\.(?:mp4|webm|ogg|mov)(?:\?[^\s<>"')]+)?$/i;
const IMAGE_URL_PATTERN = /^https?:\/\/[^\s<>"')]+\.(?:png|jpe?g|gif|webp|avif|svg)(?:\?[^\s<>"')]+)?$/i;
const GITHUB_ATTACHMENT_URL_PREFIX = "https://github.com/user-attachments/assets/";

const escapeHtmlAttribute = (value) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

const buildMediaEmbed = (url) => {
    const escapedUrl = escapeHtmlAttribute(url);

    if (url.startsWith(GITHUB_ATTACHMENT_URL_PREFIX) || VIDEO_URL_PATTERN.test(url)) {
        return `<video controls playsinline src="${escapedUrl}"></video>`;
    }

    if (IMAGE_URL_PATTERN.test(url)) {
        return `<img src="${escapedUrl}" alt="Embedded media" />`;
    }

    return url;
};

export const injectStandaloneMediaEmbeds = (markdown) => {
    return (markdown || "")
        .split(/\r?\n/)
        .map((line) => {
            const trimmedLine = line.trim();

            if (!trimmedLine) {
                return line;
            }

            const bareUrlMatch = trimmedLine.match(/^<(.+)>$/);
            const url = bareUrlMatch?.[1] ?? trimmedLine;

            if (
                url.startsWith(GITHUB_ATTACHMENT_URL_PREFIX) ||
                VIDEO_URL_PATTERN.test(url) ||
                IMAGE_URL_PATTERN.test(url)
            ) {
                return buildMediaEmbed(url);
            }

            return line;
        })
        .join("\n");
};