let redraw = 0;
let firstConnect = 1;

function getName() {
	return "Mandelbrot";
}

function onConnect() {
	return;
}

/*
 * 17  up
 * 18  down
 * 19  left
 * 20  right
 * 122 z     ; zoom out
 * 120 x     ; zoom in
 * 99  c     ; toggle burning
 */

let widthMax     =  56;
let heightMax    =  20;
let iterationMax =  20;
let zoom         = 3.0;
let CxOffset     = 2.2;
let CyOffset     = 1.5;
let burning      = false;

function onUpdate() {
	if (firstConnect)
		drawText("Press any key to next.",17,(56/2)-10,20/2);

	if (redraw) {
		clearScreen();
		for (let widthi = 0;widthi < 56;widthi++) {
			for (let heighti = 0;heighti < 20;heighti++) {
				let Cx = widthi/widthMax*zoom-CxOffset;
				let Cy = heighti/heightMax*zoom-CyOffset;
				let Zx = 0;
				let Zy = 0;
				let newZx = 0;
				let newZy = 0;

				let iteration = 0;
				while (((Zx*Zx + Zy*Zy) < 4.0) && (iteration < iterationMax)) {
					newZx = (Zx*Zx - Zy*Zy);
					newZy = (2 * Zx * Zy);
					if (burning) {
						Zx = Math.abs(newZx + Cx);
						Zy = Math.abs(newZy + Cy);
					} else {
						Zx = newZx + Cx;
						Zy = newZy + Cy;
					}
					iteration++;
				}
				drawText("█",(iteration/iterationMax)*17,widthi,heighti);
			}
		}
		redraw = 0;
	}

	drawText(zoom,5,0,0);
	drawText(CxOffset,5,0,1);
	drawText(CyOffset,5,5,1);
	drawText("BRN: ",5,0,2);
	drawText(burning,5,4,2);
}

function onInput(key) {
	firstConnect = 0;
	redraw = 1;

	if (key == 99) /* c */
		burning = !burning;

	if (key == 122) /* z */
		zoom += 0.5;
	if (key == 120) /* x */
		zoom -= 0.5;

	if (key == 17) /* up */
		CyOffset += 0.1;
	if (key == 18) /* down */
		CyOffset -= 0.1;

	if (key == 19) /* left */
		CxOffset += 0.1;
	if (key == 20) /* right */
		CxOffset -= 0.1;
}
