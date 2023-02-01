const GameBoard = (() => {
    // board
    let array = ["", "", "", "", "", "", "", "", ""];
    // let array =[];
    const reset = () => {
        array = ["", "", "", "", "", "", "", "", ""];
        console.log(array);
        DisplayController.render();
    };
    return { array, reset };
})();

const Player = (sign) => {
    this.sign = sign;
    const getPlayerSign = sign;
    return { getPlayerSign };
};

const DisplayController = (() => {
    const items = document.querySelectorAll(".item");

    const render = () => {
        items.forEach((item, index) => {
            item.textContent = GameBoard.array[index];
        });
    };
    items.forEach((element) => {
        element.addEventListener("click", () => {
            Game.startRound(element.dataset.number);
        });
    });
    return { render, items };
})();
const Game = (() => {
    ar = GameBoard.array;
    let playerX = Player("x");
    let playerO = Player("o");
    let round = 0;
    const addMark = (place, sign) => {
        if (ar[place - 1] === "x" || ar[place - 1] === "o") return;
        else if (ar[place - 1] === "") {
            ar.splice(place - 1, 1);
            ar.splice(place - 1, 0, sign);
            DisplayController.render();
        }
    };
    const checkIfWin = (s) => {
        if (ar[0] === s && ar[1] === s && ar[2] === s) return true;
        else if (ar[3] === s && ar[4] === s && ar[5] === s) return true;
        else if (ar[6] === s && ar[7] === s && ar[8] === s) return true;
        else if (ar[0] === s && ar[3] === s && ar[6] === s) return true;
        else if (ar[1] === s && ar[4] === s && ar[5] === s) return true;
        else if (ar[2] === s && ar[5] === s && ar[8] === s) return true;
        else if (ar[0] === s && ar[4] === s && ar[8] === s) return true;
        else if (ar[2] === s && ar[4] === s && ar[6] === s) return true;
        else return false;
    };
    const startRound = (place) => {
        round++;
        if (round % 2 === 1) addMark(place, "x");
        else if (round % 2 === 0) addMark(place, "o");
        endRound('x')
        endRound('o')
    };
    const endRound = (s) => {
        if (round === 9) console.log('draw')
        else if (checkIfWin(s) === false) return
        else if (checkIfWin(s) === true) console.log(`${s} wins`)
        
    }

    return { checkIfWin, startRound };
})();
