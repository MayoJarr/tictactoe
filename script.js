/* eslint-disable no-useless-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
const GameBoard = (() => {
  let array = ['', '', '', '', '', '', '', '', ''];
  const reset = () => {
    array = ['', '', '', '', '', '', '', '', ''];
  };
  return { array, reset };
})();

const Player = (sign) => {
  const getPlayerSign = () => sign;
  return { getPlayerSign };
};

const Npc = (() => {
  const ar = GameBoard.array;
  const newMove = () => Math.round(Math.random() * 9);

  const makeMove = () => {
    const move = newMove();
    if (ar[move] === 'x' || ar[move] === 'o') makeMove();
    if (ar[move] === '') {
      addMove(move + 1);
    }
  };
  const addMove = (move) => {
    Game.addMark(move, 'o');
  };
  return { makeMove };
})();
const DisplayController = (() => {
  const items = document.querySelectorAll('.item');
  const menu = document.querySelector('.menu');
  const resetB = document.querySelector('.resetB');
  const menuText = document.querySelector('.menuText');
  const twoP = document.querySelector('.twoP');
  const oneP = document.querySelector('.oneP');
  const greeting = document.querySelector('.greeting');
  const render = () => {
    items.forEach((item, index) => {
      item.textContent = GameBoard.array[index];
    });
  };
  const resetItems = () => {
    items.forEach((item) => {
      item.textContent = '';
    });
  };
  const showMenu = (winner) => {
    menuText.textContent = winner;
    menu.style.cssText = 'top: 15px; opacity: 1;';
  };
  const hideMenu = () => {
    menu.style.cssText = 'top: -300px; opacity: 0;';
  };
  const hideGreeting = () => {
    greeting.style.cssText = 'opacity: 0; transform: scale(.2);';
  };
  items.forEach((element) => {
    element.addEventListener('click', () => {
      Game.startRound(element.dataset.number);
    });
  });
  resetB.addEventListener('click', () => {
    GameBoard.reset();
    hideMenu();
    resetItems();
    Game.resetRound();
  });
  oneP.addEventListener('click', () => {
    Game.gameTypee('one');
    hideGreeting();
  });
  twoP.addEventListener('click', () => {
    Game.gameTypee('two');
    hideGreeting();
  });
  return { render, showMenu };
})();
const Game = (() => {
  let gameType = '';
  const playerX = Player('x');
  const playerO = Player('o');
  let round = 0;
  const addMark = (place, sign) => {
    const ar = GameBoard.array;
    ar.splice(place - 1, 1);
    ar.splice(place - 1, 0, sign);
    DisplayController.render();
  };
  const gameTypee = (type) => {
    gameType = type;
  };
  const checkIfWin = (s) => {
    const ar = GameBoard.array;
    if (ar[0] === s && ar[1] === s && ar[2] === s) return true;
    if (ar[3] === s && ar[4] === s && ar[5] === s) return true;
    if (ar[6] === s && ar[7] === s && ar[8] === s) return true;
    if (ar[0] === s && ar[3] === s && ar[6] === s) return true;
    if (ar[1] === s && ar[4] === s && ar[7] === s) return true;
    if (ar[2] === s && ar[5] === s && ar[8] === s) return true;
    if (ar[0] === s && ar[4] === s && ar[8] === s) return true;
    if (ar[2] === s && ar[4] === s && ar[6] === s) return true;
    return false;
  };
  const resetRound = () => {
    round = 0;
    GameBoard.array = ['', '', '', '', '', '', '', '', ''];
  };
  const endRound = (s) => {
    if (round === 9) DisplayController.showMenu('Draw!');
    else if (checkIfWin(s) === false) return;
    else if (checkIfWin(s) === true) {
      DisplayController.showMenu(`${s} wins`);
    }
  };
  const startRound = (place) => {
    const ar = GameBoard.array;
    if (ar[place - 1] === 'x' || ar[place - 1] === 'o') return;
    if (ar[place - 1] === '') {
      round += 1;
      if (round % 2 === 1) {
        addMark(place, playerX.getPlayerSign());
        if (gameType === 'one') {
          Npc.makeMove();
          round += 1;
        }
      } else if (round % 2 === 0) {
        if (gameType === 'two') {
          addMark(place, playerO.getPlayerSign());
        }
      }
      endRound('x');
      endRound('o');
    }
  };
  return {
    startRound, resetRound, addMark, round, gameTypee,
  };
})();
