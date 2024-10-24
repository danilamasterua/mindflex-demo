import {computePosition, flip, offset} from "@floating-ui/vue";

export function showTooltip(parentId: string, floatingId: string) {
    let birthdayBtn: Element = document.getElementById(parentId);
    let birthdayTooltip: Element = document.getElementById(floatingId);

    birthdayTooltip.style.display = "block";

    computePosition(birthdayBtn, birthdayTooltip, {
        placement: 'left-start',
        middleware: [flip()]
    }).then(
        ({x, y}) => {
            Object.assign(birthdayTooltip.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
        }
    );
}

export function setFloatingElementDisplayNone(id: string) {
    let element: Element = document.getElementById(id);
    element.style.display = "none";
}