const board_size = 8;

function print(data) {
    const label = document.createElement('span');
    label.textContent = data;
    document.body.appendChild(label);
}

function newLine() {
    document.body.appendChild(document.createElement('br'));
}

function createChessboard() {
    for (let row = 0; row < board_size; row++) {
        let line = '';
        for (let col = 0; col < board_size; col++) {
            if ((row + col) % 2 === 0) {
                line += ' * ';
            } else {
                line += ' # ';
            }
        }
        print(line);
        newLine();
    }
}

window.onload = createChessboard;