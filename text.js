let lastKey;
let text_buffer;

const Mode = {
    Insert: 0,
    Normal: 1
}
let mode = Mode.Insert;

function getName() {
    return 'Text edit';
}

function onConnect() {
    lastKey = '';
    text_buffer = loadData();
}

function onUpdate() {
    clearScreen();

    // Draw text
    drawBox(10, 0, 0, 56, 20);
    drawTextWrapped(text_buffer + '█', 17, 1, 1, 50);
    drawText('Text editor', 14, 20, 0);

    // DEBUG: draw input
    drawText('INPUT', 14, 2, 7);
    drawBox(10, 1, 8, 7, 5);
    drawText('000', 5, 3, 10);
    drawText(lastKey, 17, 6 - lastKey.length, 10);
     
}

function mode_to_str(mode) {
    switch(mode){
        case Mode.Insert:
            return "I";
        case Mode.Normal:
            return "N";
    }
}

function onInput(key) {

    lastKey = key.toString();
    let data_updated = false;
    if (key == 8 && text_buffer.length > 0) {
        text_buffer = text_buffer.substring(0, text_buffer.length - 1);
        data_updated = true;
    }
    else if ((key >= 32 && key < 127)/*&& text_buffer.length < 49*/) {
        text_buffer = text_buffer + String.fromCharCode(key);
        data_updated = true;
    }
    else if (key == 10) {
        data_updated = true;
        text_buffer = text_buffer + " " + eval(text_buffer);
    }

    if (data_updated) {
        saveData(text_buffer);
    }
}
