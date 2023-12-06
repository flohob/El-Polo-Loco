let canvas;
let world;
let keyboard = new Keyboard();
fullscreenpressed = false;

function init() {
canvas = document.getElementById('canvas');
world = new World(canvas, keyboard);
console.log('My Character is', world['enemies']);
}





function startGame() {
    initLevel();
    init();
    document.getElementById('start-screen').classList.add('hidden'); 
    canvas.classList.remove('hidden');
    
}

function showStory() {
    document.getElementById('story-container').classList.remove('hidden');
    document.getElementById('start-screen').classList.add('hidden');
}

function closeStory() {
    document.getElementById('story-container').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
}

function showSettings () {
    document.getElementById('settings-screen').classList.remove('hidden');
    document.getElementById('start-screen').classList.add('hidden');
}

function closeSettings() {
    document.getElementById('settings-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
}

function buttonReload() {
    window.location.reload();
}

function showFullscreen() {
   document.getElementById('start-screen').classList.add('hidden');
   document.getElementById('startscreen-fullscreen').classList.remove('hidden'); 
  }

  function closeFullscreen() {
    document.getElementById('start-screen').classList.remove('hidden');
    document.getElementById('startscreen-fullscreen').classList.add('hidden'); 
   }



  function startGameFullscreen() {
    initLevel();
    init();
    document.getElementById('startscreen-fullscreen').classList.add('hidden');
    document.getElementById('canvas').classList.remove('hidden');
    document.getElementById('canvas').classList.add('fullscreen');
    fullscreenpressed = true;
  }

  
  


window.addEventListener('keydown', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if(e.keyCode == 38) {
        keyboard.UP = true;
    }
    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if(e.keyCode == 68) {
        keyboard.D = true;
    }
    console.log(e);
});

window.addEventListener('keyup', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if(e.keyCode == 38) {
        keyboard.UP = false;
    }
    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if(e.keyCode == 68) {
        keyboard.D = false;
    }
});



