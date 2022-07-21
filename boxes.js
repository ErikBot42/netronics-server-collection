let t = 0;
function getName() {return '*Boxes :)*';}
function drawBox_r(x,y,xs,ys,l) {
    l*=-1;
    drawBox(l>0?l:6,x,y,xs,ys);
    let o    = 1;
    let n_x  = x+o
    let n_xs = xs-2*o;
    let n_y  = y+o
    let n_ys = ys-2*o;
    let size = Math.min(xs,ys);
    if (size>=6 && Math.random()>0.2) {
        let os = o-1;
        if (xs>ys == Math.random()>0.1) {
            drawBox_r(n_x,       n_y,Math.floor(n_xs/2),n_ys,l);
            drawBox_r(Math.floor(n_x+n_xs/2)+os,n_y,Math.ceil(n_xs/2)-os,n_ys,l);
        }
        else {
            drawBox_r(n_x,n_y,n_xs,Math.floor(n_ys/2),l);
            drawBox_r(n_x,Math.floor(n_y+n_ys/2)+os,n_xs,Math.ceil(n_ys/2)-os,l);
        }
    }
}
function onConnect() {}
function onUpdate() {
    t += 1;
    if (t == 120) {
        clearScreen();
        t = 0;
        let o = 0;
        drawBox_r(-o, -o, 56+o*2, 20+o*2, 17);
    }
}
function onInput(key) {}
