let lastKey;
let text_buffer;
let lines;
let cursor_row = 0;
let cursor_col = 0;
let debug_text = ""
Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
}

function debug_print(str) {
    debug_text += str;
}

// returns "█" if invalid or non printable
function getPrintableCharAt(row, col, lines) {
    let ch = getCharAt(row, col, lines);
    if (ch == "" || ch == " " || !(typeof ch === 'string')) ch = "█";
    return ch;
}
function getCharAt(row, col, lines) {
    if (lines.length>row) {
        let line = lines[row]
        if (line.length>col) {
            let ch = line[col];
            return ch;
        }
    }
    return "";
}
function linesToBuffer(lines) {
    return lines.join("\n");
}
function bufferToLines(buffer) {
    return buffer.split("\n");
}

const Mode = {
    Insert: 0,
    Normal: 1,
    Visual: 2
}

let mode = Mode.Insert;

function getName() {
    return 'Text edit';
}

function onConnect() {
    lastKey = '';
    text_buffer = loadData();
    lines = bufferToLines(text_buffer);
    drawScreen();
}

function constrain_cursor() {
    cursor_col<0;

    if (cursor_row<0) {
        cursor_row = 0;
    }

    if (lines.length-1<cursor_row) {
        cursor_row = lines.length-1;
    }

    if (cursor_col<0) {
        cursor_col= 0;
    }
    
    if (lines[cursor_row].length<cursor_col) {
        cursor_col = lines[cursor_row].length;
    }
}

function drawScreen() {
    clearScreen();

    // Draw text
    drawBox(10, 0, 0, 56, 20);
    drawText('Text editor', 14, 25, 0);
    //drawTextWrapped(text_buffer + '█', 17, 1, 1, 50);

    // DEBUG: draw input
    // drawText('INPUT', 14, 2, 7);
    // drawBox(10, 1, 8, 7, 5);
    // drawText('000', 5, 3, 10);
    // drawText(lastKey, 17, 6 - lastKey.length, 10);

    for (let i = 0; i<lines.length; i++) {
        drawText(i+" "+lines[i]+ '_', 8, 1, 1+i);
    }
    let cursor_char = getPrintableCharAt(cursor_row, cursor_col, lines);
    drawText(cursor_char, 17, cursor_col+1+2, cursor_row+1);

    // status line
    drawText(
        "Mode: ["+mode_to_str(mode)+
        "], Row: "+cursor_row+
        ", Col: "+cursor_col+
        ", Input: "+lastKey+
        "("+String.fromCharCode(lastKey)+")",
        17, 2, 19);

    drawText(debug_text,17,0,0);
    debug_text = "";
}

// only draw when screen changes.
function onUpdate() {}

function mode_to_str(mode) {
    switch(mode){
        case Mode.Insert:
            return "Insert";
        case Mode.Normal:
            return "Normal";
        case Mode.Visual:
            return "Visual";
    }
}

function onInput(key) {

    lastKey = key.toString();
    let data_updated = false;
    let screen_updated = true;//false;
    switch(mode){
        case Mode.Insert:
            if ((key >= 32 && key < 127)/*&& text_buffer.length < 49*/) {
                //text_buffer = linesToBuffer(lines);

                lines[cursor_row] = lines[cursor_row].substring(0, cursor_col) + String.fromCharCode(key) + lines[cursor_row].substring(cursor_col);
                cursor_col+=1;
                //text_buffer = text_buffer + String.fromCharCode(key);
                data_updated = true;
                //lines = bufferToLines(text_buffer);
            }
            else if (key == 10) {
                //text_buffer = linesToBuffer(lines);
                //data_updated = true;
                //text_buffer = text_buffer + "\n";
                //lines = bufferToLines(text_buffer);
                let line = lines[cursor_row];
                lines.insert(cursor_row+1, line.substring(cursor_col));
                lines[cursor_row] = line.substring(0, cursor_col);
                cursor_row += 1;
                cursor_col  = 0;

                
                // + eval(text_buffer);
            }
            else if (key == 27) {
                //@ leaves insert mode.
                screen_updated = true;
                mode = Mode.Normal;
            }
            break;
        case Mode.Normal:
            screen_updated = true;
            switch (key) {
                case 104:
                    cursor_col-=1;break;
                case 108:
                    cursor_col+=1;break;
                case 106:
                    cursor_row+=1;break;
                case 107:
                    cursor_row-=1;break;
                case 105: // i
                    mode = Mode.Insert;break;
                case 120: // x
                    if (lines[cursor_row].length > 0) {
                        lines[cursor_row] = lines[cursor_row].substring(0, cursor_col) + lines[cursor_row].substring(cursor_col+1);
                        data_updated = true;
                    }break; 
                case 65: // A
                    mode = Mode.Insert;
                case 36: // $
                    cursor_col = lines[cursor_row].length;break;
            }break;
    }

    if (mode == Mode.Insert || mode == Mode.Normal)
    {
        switch(key)
        {
            case 8: // delete
                if (lines[cursor_row].length > 0 && cursor_col != 0) {
                    lines[cursor_row] = lines[cursor_row].substring(0, cursor_col-1) + lines[cursor_row].substring(cursor_col);
                    data_updated = true;
                    cursor_col-=1;
                }
                else if (lines.length>1)
                {
                    lines[cursor_row-1] += lines[cursor_row];
                    lines.splice(cursor_row, 1);
                }
                break; 
                case 19: // left
                    cursor_col-=1;break;
                case 20: // right
                    cursor_col+=1;break;
                case 17: // up
                    cursor_row-=1;break;
                case 18: // down
                    cursor_row+=1;break;
        }
    }

    if (data_updated) {
        text_buffer = linesToBuffer(lines);
        saveData(text_buffer);
        lines = bufferToLines(text_buffer);
    }



    screen_updated |= data_updated;

    constrain_cursor();
    if (screen_updated) {drawScreen();}
}
