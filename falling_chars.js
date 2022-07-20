const s = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz.,:;!?&#/\\%\'"0123456789+-*()[]^`█▟▙▜▛▀▄▐▌▝▘▗▖─═║╔╗╚╝╠╣╦╩╬><▲▼☺☻⚉ ™ ♦ ♣ ♠ ♥', cols = 17, width = 52, height = 18, num_p = 10; let p = [];
function getName() {return "*Falling chars :)*"}
function randChar() {
    return s[Math.floor(Math.random()*s.length)];
}
function drawPoint(p) {
    drawText(randChar(), p.time, p.x, p.y);
}
function randomPoint() {
    return {x:Math.random()*(width-1)+2, y:1/*Math.random()*(height-1)+1*/, time:0, c:randChar()}
}
function updatePoint(p) {
    p.time+=1;
    p.y%=height;
    p.y+=1;
    if (p.time>cols) p = randomPoint();
    return p;
}
function onConnect() {
    for (let i = 0; i<num_p; i++) {
        p[i] = randomPoint();
        p[i].time = Math.random()*cols;
    }
}
function onUpdate() {
    for (let i = 0; i<p.length; i++) {
        p[i] = updatePoint(p[i]);
        drawPoint(p[i]);
    }
    drawBox(10, 2, 1, width, height);
}
function onInput() {}
