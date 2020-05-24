export function retrieveMO() {
    if (!window.MutationObserver) {
        var frame = document.createElement('iframe');
        document.body.appendChild(frame);
        window.MutationObserver = frame.contentWindow.MutationObserver;
        document.body.removeChild(frame);
    }
}
