const s = ".*x+", cols = 17, width = 55, height = 27, num_p = 30; let p = [];
function getName() {return "*Stars :)*"}
function drawPoint(p) {
    drawText(p.c, p.time >= cols ? 2*cols-p.time : p.time, p.x, p.y);
}
function randomPoint() {
    return {x:Math.random()*width, y:Math.random()*height, time:0, c:s[Math.floor(Math.random()*s.length)]}
}
function updatePoint(p) {
    p.time+=Math.random()>0.1 ? 1 : 0;
    if (p.time>cols*2) p = randomPoint();
    return p;
}
function onConnect() {
    for (let i = 0; i<num_p; i++) {
        p[i] = randomPoint();
    }
}
function onUpdate() {
    clearScreen();
    for (let i = 0; i<p.length; i++) {
        p[i] = updatePoint(p[i]);
        drawPoint(p[i]);
    }
}
function onInput() {}
