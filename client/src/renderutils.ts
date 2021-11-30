export function distanceToFitInView(fov: number, size: number): number {
    let hyp = size / (2 * Math.cos(degToRad(180 - fov) / 2));   
    return Math.sqrt(hyp * hyp - (size / 2) * (size / 2));
}
function degToRad(deg: number): number {
    return deg * Math.PI / 180;
}