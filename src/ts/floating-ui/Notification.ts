import {computePosition} from "@floating-ui/vue";

let interval: number | null = null;

export function showNotification(msg: string): void {
    const notificationContent = document.getElementById("notification_content");

    const notificationAnchor = document.getElementById("notification_anchor");
    const notificationBlock = document.getElementById("notification");

    if (notificationContent && notificationAnchor && notificationBlock) {
        notificationBlock.classList.add("show");

        notificationContent.innerHTML = msg;

        computePosition(notificationAnchor, notificationBlock, {
            placement: 'bottom',
        }).then(
            ({x, y}) => {
                Object.assign(notificationBlock.style, {
                    left: `${x}px`,
                    top: `${y}px`,
                })
            }
        );

        onCursorEnd();
    }
}

export function onCursorBehind(): void {
    if (interval !== null) {
        clearInterval(interval)
        interval = null;
    }
}

export function onCursorEnd(): void {
    onCursorBehind();
    const notificationBlock = document.getElementById("notification");
    if (notificationBlock != null) {
        interval = setInterval(() => {
            notificationBlock.classList.remove("show");
            onCursorBehind()
        }, 5000)
    }
}