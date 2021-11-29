export const KEYS = {
    FORWARD: "w", BACKWARD: "s", LEFT: "a", RIGHT: "d",
};
export const CHARS = {
    w: "FORWARD", s: "BACKWARD", a: "LEFT", d: "RIGHT",
}
export let keyStates = { FORWARD: false, BACKWARD: false, LEFT: false, RIGHT: false };

document.addEventListener("keydown", (key) => {
    if (Object.values(KEYS).includes(key.key)) {
        keyStates[charToKey(key.key)] = true;
    }
})
document.addEventListener("keyup", (key) => {
    if (key.key in CHARS) {
        keyStates[charToKey(key.key)] = false;
    }
})

function charToKey(char: string): keyof typeof KEYS {
    // @ts-ignore - im not sure how i would do this better
    return CHARS[char];
}