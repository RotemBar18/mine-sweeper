
const MINE = '💣';
const EMPTY = ''
const FLAG = '🏴‍☠️'
function countNeighbors(board, rowIdx, colIdx) {
    var neighbors = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            var cell = board[i][j];
            if (cell.value === MINE) neighbors++
        }
    }
    return neighbors
}
function createCell(i, j) {
    var cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
        value: EMPTY,
        location: { i: i, j: j }
    }
    return cell
}
function createBoard(size) {
    var board = []
    for (var i = 0; i < size; i++) {
        board[i] = [];
        for (var j = 0; j < size; j++) {
            board[i][j] = createCell(i, j)
        }
    }
    return board
}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = board[i][j]
            var tdId = `cell-${i}-${j}`;
            strHtml += `<td id="${tdId}" oncontextmenu="cellClicked(this,${i},${j},event)"  onclick="cellClicked(this,${i},${j},event)">
            <span></span></td>`
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.game-board');
    elMat.innerHTML = strHtml;
}
// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.getElementById(`cell-${location.i}-${location.j}`);
    elCell.innerHTML = `<span class="hidden">${value}</span>`
}

function findEmptyCells(idxI,idxJ) {
    var emptyCells = [];
    for (var i = 0; i < gBoard.length; i++) {
        var currRow = gBoard[i]
        for (var j = 0; j < currRow.length; j++) {
            if(i === idxI && j === idxJ) continue;
            var cell = currRow[j]
            if (!cell.isMine) emptyCells.push({ i, j })
        }

    }
    return emptyCells
}

function shuffle(items) {
    var randIdx;
    var keep;
    var i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length - 1);
        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is inclusive and the minimum is inclusive 
}


function getCellCoord(strCellId) {
    var parts = strCellId.split('-')
    var coord = { i: +parts[1], j: +parts[2] };
    return coord;
}



function renderTimer(){
    var elTimer = document.querySelector('.time') 
   gGame.secPassed++
    elTimer.innerHTML =gGame.secPassed
}

function showNeighbors(board, rowIdx, colIdx) {
    var neighbors =[];
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            var cell = board[i][j];
            neighbors.push(cell)
            console.log(' neighbors',  neighbors)
        }
    }
    return neighbors
}