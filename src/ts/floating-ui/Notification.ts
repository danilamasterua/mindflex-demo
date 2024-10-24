import {computePosition, offset} from "@floating-ui/vue";

export function showNotification(msg: string): void {
    document.querySelector("#notification_content").innerHTML = msg;

    const notificationAnchor = document.querySelector("#notification_anchor");
    const notificationBlock = document.querySelector("#notification");

    toggleNotificationVisibility()

    computePosition(notificationAnchor, notificationBlock, {
        placement: 'bottom',
        middleware: [offset({
            mainAxis: 6,
            crossAxis: -6
        })]
    }).then(
        ({x,y}) => {
            Object.assign(notificationBlock.style, {
                left: `${x}px`,
                top: `${y}px`,
            })
        }
    );

    let interval = setInterval(() => {
        if (notificationBlock.classList.contains('show')) {
            toggleNotificationVisibility();
            document.querySelector("#notification_content").innerHTML = "";
        }
        clearInterval(interval)}, 5000)
}

export function toggleNotificationVisibility() {
    const notificationBlock = document.querySelector("#notification");
    notificationBlock?.classList.toggle("show");
}