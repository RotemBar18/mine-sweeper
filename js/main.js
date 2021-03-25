'use strict'

var gBoard;
var gLevel = {
    SIZE: 4,
    MINES: 2
};
var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secPassed: 0
}
var gCellClickedCounter = 0
var gLivesCounter = 2
var gTimer = 0
var intID = setInterval(renderTimer, 1000)

function init() {
    gBoard = createBoard(gLevel.SIZE);
    renderBoard(gBoard);

}

function placeMines(i, j) {
    var emptyCells = findEmptyCells(i, j);
    emptyCells = shuffle(emptyCells);
    for (var i = 0; i < gLevel.MINES; i++) {
        var emptyCell = emptyCells.pop();
        var currCell = gBoard[emptyCell.i][emptyCell.j]
        currCell.value = MINE
        currCell.isMine = true
        renderCell(emptyCell, currCell.value);
    }
}

function setMinesNegsCount() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        var currRow = gBoard[i];
        for (var j = 0; j < gLevel.SIZE; j++) {
            var currCell = currRow[j];
            if (!currCell.isMine) {
                var negs = countNeighbors(gBoard, i, j);
                currCell.minesAroundCount = negs;
                if (negs === 0) currCell.value = EMPTY
                else currCell.value = negs + ''
                renderCell({ i, j }, currCell.value)
            }
        }

    }
}
//after cell clicked
function cellClicked(elCell, i, j, ev) {
    if (gBoard[i][j].isShown) return
    //if game hasnt started go out
    if (!gGame.isOn) return
    // set mines after the first click
    if (!gCellClickedCounter) {

        placeMines(i, j)
        setMinesNegsCount()
        gCellClickedCounter++

    }
    //check whether its a right click or left click
    var isRightClick = checkRightLeft(ev)
    //if its right click (for showing a flag)
    if (isRightClick) {
        //check if clicked cell is a flag
        if (elCell.innerHTML === `<span class="showen">${FLAG}</span>`) {
            elCell.innerHTML = `<span class="hidden">${gBoard[i][j].value}</span>`
            gGame.markedCount--
            console.log('gGame.markedCount--', gGame.markedCount)
            return
        }
        //if not flag
        else {
            //check if cell already shown
            if (gBoard[i][j].isShown) return
            //if cell still hidden
            else {
                elCell.innerHTML = `<span class="showen">${FLAG}</span>`
                gBoard[i][j].isMarked = true
                isRightClick = false
                gCellClickedCounter++
                gGame.markedCount++
                console.log('gGame.markedCount++', gGame.markedCount)
                return
            }
        }
    }
    // if its left click (for showing the cell content)
    else {
        //check if flag
        if (elCell.innerHTML === `<span class="showen">${FLAG}</span>`) {
            return
        }
        //if its not a flag 
        gGame.shownCount++
        console.log('Game.shownCount++', gGame.shownCount)
        elCell.innerHTML = `<span class="showen">${gBoard[i][j].value}</span>`
        gBoard[i][j].isShown = true
        //check if mine for losing life
        if (elCell.innerHTML === `<span class="showen">${MINE}</span>` && gLivesCounter >= 0) {
            var elLives = document.querySelector('.lives span')
            var livesStr = ''
            for (var i = 0; i < gLivesCounter; i++) {
                livesStr += ' ❤'
            }
            gLivesCounter--
            elLives.innerHTML = livesStr
        }
        //check lives for game over
        if (gLivesCounter === -1) {
            var elBtn = document.querySelector('button')
            elBtn.innerText = '🤯'
            elBtn.style.backgroundColor = 'red'
            elLives.innerHTML = ''
            gGame.isOn = false
            clearInterval(intID)
        }
        //check  size for win
    } if (gLevel.SIZE === 4) {
        if (gGame.markedCount < 2 && gGame.markedCount + gGame.shownCount === gLevel.SIZE ** 2) {
            var elBtn = document.querySelector('button')
            elBtn.innerText = '😎'
            elBtn.style.backgroundColor = 'green'
            gGame.isOn = false
            clearInterval(intID)
        }
    } else if (gLevel.SIZE === 8) {
        if (gGame.markedCount < 12 && gGame.markedCount + gGame.shownCount === gLevel.SIZE ** 2) {
            var elBtn = document.querySelector('button')
            elBtn.innerText = '😎'
            elBtn.style.backgroundColor = 'green'
            gGame.isOn = false
            clearInterval(intID)

        } else if (gLevel.SIZE === 8) {
            if (gGame.markedCount < 30 && gGame.markedCount + gGame.shownCount === gLevel.SIZE ** 2) {
                var elBtn = document.querySelector('button')
                elBtn.innerText = '😎'
                elBtn.style.backgroundColor = 'green'
                gGame.isOn = false
                clearInterval(intID)

            }
        }
    }
}



function checkRightLeft(ev) {
    ev.preventDefault()
    if (ev.type === 'click') {
        return false
    }
    return true
}




function levelClick(elBtn) {
    switch (elBtn.innerText) {
        case 'beginner (2)':
            gLevel.MINES = 2
            gLevel.SIZE = 4
            break;
        case 'medium (12)':
            gLevel.MINES = 12
            gLevel.SIZE = 8
            break;
        case 'expert (30)':
            gLevel.MINES = 30
            gLevel.SIZE = 12
            break;
        default: -1
            break;
    }
    var elRestartBtn =document.querySelector('.info-board button')
    restartButton(elRestartBtn)
}


function restartgame() {
    var elLives = document.querySelector('.lives span')
    elLives.innerHTML = ' ❤ ❤ ❤'
    gGame.shownCount = 0
    gGame.markedCount = 0
    gGame.secPassed = 0
    gTimer = 0
    gCellClickedCounter = 0
    gLivesCounter = 2
    gGame.isOn = true
    gBoard = createBoard(gLevel.SIZE)
    renderBoard(gBoard)

}

function restartButton(elBtn) {
    elBtn.innerText = '😄'
    elBtn.style.backgroundColor = 'wheat'
    restartgame()
}