export type ControlKeys = { SHOOT: string, FORWARD: string, BACKWARD: string, LEFT: string, RIGHT: string };
export const playerControls: ControlKeys[] = [
    { SHOOT: "KeyQ", FORWARD: "KeyE", BACKWARD: "KeyD", LEFT: "KeyS", RIGHT: "KeyF" },
    { SHOOT: "KeyM", FORWARD: "ArrowUp", BACKWARD: "ArrowDown", LEFT: "ArrowLeft", RIGHT: "ArrowRight" },
]

export let keyStates: { [key: string]: boolean } = {};

document.addEventListener("keydown", (key) => {
    keyStates[key.code] = true;
})
document.addEventListener("keyup", (key) => {
    keyStates[key.code] = false;

})