document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const width = 20;
    const height = 20;
    let snakeBody= [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let moveX = 0;
    let moveY = 0;
    let intervalId;

    const isSnake =(x, y) => snakeBody.some((segment) => segment.x === x && segment.y === y);

    const drawGameBoard = () => {
        board.innerHTML = '';
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const cell = document.createElement('div');

                cell.classList.add('cell');
                if (isSnake(x, y)) {
                    cell.classList.add('snakeBody');
                } else if (x === food.x && y === food.y) {
                    cell.classList.add('food');
                }
                board.appendChild(cell);
            }
        }
    }

    function moveSnake() {
        const snakeHead = { x: snakeBody[0].x + moveX, y: snakeBody[0].y + moveY };

        snakeBody.unshift(snakeHead);

        if (snakeHead.x === food.x && snakeHead.y === food.y) {
            food.x = Math.floor(Math.random() * width);
            food.y = Math.floor(Math.random() * height);
        } else {
            snakeBody.pop();
        }
    }

    function handleKeyPress(event) {
        switch (event.key) {
            case 'ArrowUp':
                if (moveY !== 1) { moveX = 0; moveY = -1; }
                break;
            case 'ArrowDown':
                if (moveY !== -1) { moveX = 0; moveY = 1; }
                break;
            case 'ArrowLeft':
                if (moveX !== 1) { moveX = -1; moveY = 0; }
                break;
            case 'ArrowRight':
                if (moveX !== -1) { moveX = 1; moveY = 0; }
                break;
        }
    }

    function checkCollision() {
        const snakeHead = snakeBody[0];

        return (
            snakeHead.x < 0 || snakeHead.x >= width ||
            snakeHead.y < 0 || snakeHead.y >= height ||
            snakeBody.slice(1).some(segment => segment.x === snakeHead.x && segment.y === snakeHead.y)
        );
    }

    function startGame() {
        intervalId = setInterval(() => {
            if (checkCollision()) {
                clearInterval(intervalId);
                alert('Game Over!');
                return;
            }
            moveSnake();
            drawGameBoard();
        }, 200);
    }

    document.addEventListener('keydown', handleKeyPress);
    startGame();
});
