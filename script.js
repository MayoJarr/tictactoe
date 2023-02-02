const GameBoard = (() => {
    let array = ["", "", "", "", "", "", "", "", ""];
    const reset = () => {
        array = ["", "", "", "", "", "", "", "", ""];
    };
    return { array, reset };
})();

const Player = (sign) => {
    const getPlayerSign = () => sign;
    return { getPlayerSign };
};

const DisplayController = (() => {
    const items = document.querySelectorAll(".item");
    const menu = document.querySelector(".menu");
    const resetB = document.querySelector(".resetB");
    const menuText = document.querySelector(".menuText");
    const render = () => {
        items.forEach((item, index) => {
            item.textContent = GameBoard.array[index];
        });
    };
    const resetItems = () => {
        items.forEach((item) => {
            item.textContent = "";
        });
    };
    items.forEach((element) => {
        element.addEventListener("click", () => {
            Game.startRound(element.dataset.number);
        });
    });
    resetB.addEventListener("click", () => {
        GameBoard.reset();
        hideMenu();
        resetItems();
        Game.resetRound();
    });
    const showMenu = (winner) => {
        menuText.textContent = winner;
        menu.style.cssText = "top: 15px; opacity: 1; transform(scale(1.2));";
    };
    const hideMenu = (winner) => {
        menu.style.cssText = "top: -300px; opacity: 0; transform(scale(1));";
    };
    return { render, showMenu };
})();
const Game = (() => {
    let playerX = Player("x");
    let playerO = Player("o");
    let round = 0;
    const addMark = (place, sign) => {
        let ar = GameBoard.array;
        ar.splice(place - 1, 1);
        ar.splice(place - 1, 0, sign);
        DisplayController.render();
    };
    const checkIfWin = (s) => {
        let ar = GameBoard.array;
        if (ar[0] === s && ar[1] === s && ar[2] === s) return true;
        else if (ar[3] === s && ar[4] === s && ar[5] === s) return true;
        else if (ar[6] === s && ar[7] === s && ar[8] === s) return true;
        else if (ar[0] === s && ar[3] === s && ar[6] === s) return true;
        else if (ar[1] === s && ar[4] === s && ar[7] === s) return true;
        else if (ar[2] === s && ar[5] === s && ar[8] === s) return true;
        else if (ar[0] === s && ar[4] === s && ar[8] === s) return true;
        else if (ar[2] === s && ar[4] === s && ar[6] === s) return true;
        else return false;
    };
    const resetRound = () => {
        let ar = GameBoard.array;
        round = 0;
        ar = ["", "", "", "", "", "", "", "", ""];
        GameBoard.array = ["", "", "", "", "", "", "", "", ""];
    };
    const startRound = (place) => {
        let ar = GameBoard.array;
        if (ar[place - 1] === "x" || ar[place - 1] === "o") return;
        else if (ar[place - 1] === "") {
            round++;
            if (round % 2 === 1) addMark(place, playerX.getPlayerSign());
            else if (round % 2 === 0) addMark(place, playerO.getPlayerSign());
            endRound("x");
            endRound("o");
        }
    };
    const endRound = (s) => {
        if (round === 9) DisplayController.showMenu(`Draw!`);
        else if (checkIfWin(s) === false) return;
        else if (checkIfWin(s) === true) {
            DisplayController.showMenu(`${s} wins`);
        }
    };
    return { checkIfWin, startRound, resetRound };
})();
