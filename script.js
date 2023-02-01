const GameBoard = (() => {
    // board
    let array = ["", "", "", "", "", "", "", "", ""];
    // let array =[];
    const reset = () => {
        array = ["", "", "", "", "", "", "", "", ""];
        console.log(array)
        DisplayController.render();
    }
    return { array, reset };
})();

const Player = (sign) => {
    const getPlayerSign = sign;
    const addMark = (place) => {
        if (
            ar[place - 1] === "x" ||
            ar[place - 1] === "o"
        )
            return;
        else if (ar[place - 1] === "") {
            ar.splice(place - 1, 1);
            ar.splice(place - 1, 0, sign);
            isWin = Game.checkIfWin();
            if (isWin === true) console.log('win')
            else if (isWin === false) console.log('not win')
            DisplayController.render();
        }
    };
    return { getPlayerSign, addMark };
};

const DisplayController = (() => {
    const items = document.querySelectorAll(".item");
    
    const render = () => {
        items.forEach((item, index) => {
            item.textContent = GameBoard.array[index];
        });
    };
    items.forEach((element) => {
        element.addEventListener("click", () =>
            Game.player.addMark(element.dataset.number)
        );
    });
    return { render, items };
})();
const Game = (() => {
    ar = GameBoard.array;
    let player = Player('x');
    const checkIfWin = () => {
        const s = player.getPlayerSign 
        if (ar[0] === s && ar[1] === s && ar[2] === s) return true;
        else if (ar[3] === s && ar[4] === s && ar[5] === s) return true;
        else if (ar[6] === s && ar[7] === s && ar[8] === s) return true;
        else if (ar[0] === s && ar[3] === s && ar[6] === s) return true;
        else if (ar[1] === s && ar[4] === s && ar[5] === s) return true;
        else if (ar[2] === s && ar[5] === s && ar[8] === s) return true;
        else if (ar[0] === s && ar[4] === s && ar[8] === s) return true;
        else if (ar[2] === s && ar[4] === s && ar[6] === s) return true;
        else return false;
    }
    return { player, checkIfWin };
})();