// User Story 3: Declare board_size variable
const board_size = 8;

// User Story 1: print function to append content to body
function print(data) {
    const label = document.createElement('span');
    label.textContent = data;
    document.body.appendChild(label);
}

// User Story 2: newLine function to create a line break
function newLine() {
    document.body.appendChild(document.createElement('br'));
}

// Function to create the chessboard
function createChessboard() {
    for (let row = 0; row < board_size; row++) {
        let line = '';
        for (let col = 0; col < board_size; col++) {
            // Alternate between ' * ' and ' # ' based on row+col position
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

// Create the chessboard when the page loads
window.onload = createChessboard;