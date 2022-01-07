interface Pos {
    i: number;
    j: number
}

interface BoardMovement {
    newBoard: number[][];
    direction: string // history direction 
}

function slidingPuzzle(board: number[][]): string {
    // Write your code here
    const queue: BoardMovement[] = [{newBoard: board, direction: ''}]
    const visited = new Set<string>();
    while (queue.length > 0) {
        const currentBoardMovement = queue.shift() as BoardMovement
        const neighborMovements: BoardMovement[] = findConnections(currentBoardMovement.newBoard)
        for (let neighborMovement of neighborMovements) {
            const neighborBoardString = JSON.stringify(neighborMovement.newBoard)
            if (!visited.has(neighborBoardString)) {
                visited.add(neighborBoardString)
                const accumulatedDirection = currentBoardMovement.direction + neighborMovement.direction
                if (puzzleIsResolved(neighborMovement.newBoard)) {
                    // TODO collect directions from queue
                    return accumulatedDirection
                }
                queue.push({newBoard: neighborMovement.newBoard, direction: accumulatedDirection})
                console.log(queue)
            }
        }
    }
    
    console.log('done', visited);
    return ''
}
function findConnections(board: number[][]): BoardMovement[] {
    // TODO optimized for a better performance
    const positionOfZero: Pos = findZero(board);
    const connectedBoards: BoardMovement[] = []
    if (positionOfZero.i > 0) connectedBoards.push({
        newBoard: swapBoard(board, 'U'),
        direction: 'U'
    })
    if (positionOfZero.j > 0) connectedBoards.push({
        newBoard: swapBoard(board, 'D'),
        direction: 'D'
    })
    if (positionOfZero.i < board.length - 1) connectedBoards.push({
        newBoard: swapBoard(board, 'L'),
        direction: 'L'
    })
    if (positionOfZero.j < board[0].length - 1) connectedBoards.push({
        newBoard: swapBoard(board, 'R'),
        direction: 'R'
    }) // R
    
    console.log({connectedBoards})
    return connectedBoards;
}

function findZero(board: number[][]): Pos {
    for (let i=0; i<board.length; i++) {
        for (let j=0; j<board[0].length; j++) {
            if (board[i][j] === 0) return {i, j}
        }    
    }
    throw 'no zero found in the board'
}
function swapBoard(_board: number[][], direction: string): number[][] {
    // TODO corner cases
    const zeroPos: Pos = findZero(_board)
    const board = [..._board]
    if (direction === 'L') {
        if (zeroPos.j - 1 >= 0) {
            const temp: number = board[zeroPos.i][zeroPos.j - 1]
            board[zeroPos.i][zeroPos.j - 1] = board[zeroPos.i][zeroPos.j]
            board[zeroPos.i][zeroPos.j] = temp;
        }
    } else if (direction === 'R') {
        if (zeroPos.j + 1 <= board[0].length - 1) {
            const temp: number = board[zeroPos.i][zeroPos.j + 1]
            board[zeroPos.i][zeroPos.j + 1] = board[zeroPos.i][zeroPos.j]
            board[zeroPos.i][zeroPos.j] = temp;
        }
    } else if (direction === 'U') {
        if (zeroPos.i - 1 >= 0) {
            const temp: number = board[zeroPos.i-1][zeroPos.j]
            board[zeroPos.i-1][zeroPos.j] = board[zeroPos.i][zeroPos.j]
            board[zeroPos.i][zeroPos.j] = temp;
        }
    } else if (direction === 'D') {
        if (zeroPos.i + 1 >= board.length - 1) {
            const temp: number = board[zeroPos.i+1][zeroPos.j]
            board[zeroPos.i+1][zeroPos.j] = board[zeroPos.i][zeroPos.j]
            board[zeroPos.i][zeroPos.j] = temp;
        }
    } else {
        throw 'is not a legal direction'
    }

    return board
} 
function puzzleIsResolved (board: number[][]): boolean {
    console.log('check', board, JSON.stringify(board) === '[[1,2,3],[4,5,6],[7,8,0]]')
    return JSON.stringify(board) === '[[1,2,3],[4,5,6],[7,8,0]]'
}

console.log(slidingPuzzle([[1,2,3],[4,5,6],[7,0,8]]))
