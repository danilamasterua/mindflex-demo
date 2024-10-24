export class TTTGame{
    private _board: string[][];
    private _currentPlayer: string;
    private _gameOver: boolean;

    constructor() {
        this.initialize()
    }

    get board(): string[][] {
        return this._board;
    }

    get currentPlayer(): string {
        return this._currentPlayer;
    }

    get gameOver(): boolean {
        return this._gameOver;
    }

    public makeMove(i: number, j: number) {
        if (this._board[i][j] !== "") {
            return
        } else {
            this._board[i][j] = this._currentPlayer;
        }
    }

    public isWinnerHere(player: string): boolean {
        // Check rows and columns
        for (let i = 0; i < 3; i++) {
            if (
                (this._board[i][0] === player && this._board[i][1] === player && this._board[i][2] === player) || // Check row
                (this._board[0][i] === player && this._board[1][i] === player && this._board[2][i] === player)    // Check column
            ) {
                return true;
            }
        }
        // Check diagonals
        return (this._board[0][0] === player && this._board[1][1] === player && this._board[2][2] === player) || // Check main diagonal
            (this._board[0][2] === player && this._board[1][1] === player && this._board[2][0] === player);

    }

    public whoIsWinner(): string | undefined {
        // Check for player "X"
        if (this.isWinnerHere("X")) {
            return "X";
        }
        // Check for player "O"
        if (this.isWinnerHere("O")) {
            return "O";
        }
        return undefined; // No winner
    }

    public aiMove(){
        let aiPlayer = this._currentPlayer === "X" ? "O" : "X";
        let randomI = 0;
        let randomJ = 0;
        do {
            randomI = Math.floor(Math.random() * 3);
            randomJ = Math.floor(Math.random() * 3);
        } while (this._board[randomI][randomJ]!== "")
        this._board[randomI][randomJ] = aiPlayer;
    }

    public isDraw(): boolean {
        // Check if the board is full without any winner
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this._board[i][j] === "") {
                    return false; // Found an empty space, not a draw
                }
            }
        }
        return true; // No empty spaces, it's a draw
    }

    public restoreGame() {
        this.initialize()
    }

    private initialize() {
        this._board = [];
        for (let i = 0; i < 3; i++) {
            this._board[i] = [];
            for (let j = 0; j < 3; j++) {
                this._board[i][j] = "";
            }
        }
        let randomBoolean: boolean = Math.random() > 0.5;
        if (randomBoolean) {
            this._currentPlayer = "X"
        } else {
            this._currentPlayer = "O"
        }
        this._gameOver = false;
    }
}