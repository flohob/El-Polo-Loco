let canvas; // Declare a variable for the canvas element
let world; // Declare a variable for the game world
let keyboard = new Keyboard(); // Create a new instance of the Keyboard class
let backgroundmusic = new Audio("https://cdn.freesound.org/previews/585/585006_13199071-lq.mp3"); // Create an Audio object with the specified background music URL
let playMusic = false; // Boolean flag to control whether the background music is set to play initially

/**
 * Function for developing a World to play the Game + calls the Function toggleMusic which is described in the lower Part of the Code
 */

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  console.log("My Character is", world["enemies"]);
}

/**
 * This Funtion is for Playing Background Music if a certain button is clicked on the HTML
 */
function toggleMusic() {
  playMusic = !playMusic; 
  if (playMusic === true) {
    backgroundmusic.loop = true;
    backgroundmusic.play();
    changeMusicImage(true);
  } else {
    stopBackgroundmusic();
    backgroundmusic.loop = false;
    changeMusicImage(false);
  }
}

/**
 *This Function is for chaning the Mute Icon to Speaker Icon
 * @param {boolean} isMusicPlaying checks if the Music is playing
 */

 function changeMusicImage(isMusicPlaying) {
  var musicImage2 = document.getElementById("music-toggle-image");
  var musicImage = document.getElementById("music-btn2");

  // Ändere das Bildquellenattribut entsprechend dem Status der Musik
  if (isMusicPlaying) {
    // Musik spielt, zeige das Bild des normalen Lautsprechers
    musicImage2.src = "img/Backgrounds/speaker-1521312_640.png";
    musicImage.src = "img/Backgrounds/speaker-1521312_640.png";
  } else {
    // Musik spielt nicht, zeige das Bild des entfernten Lautsprechers
    musicImage2.src = "img/Backgrounds/remove-1521310_640.png";
    musicImage.src = "img/Backgrounds/remove-1521310_640.png";
  }
}

/**
 * Function for pause the Background Music 
 */

function stopBackgroundmusic() {
  backgroundmusic.pause();
  backgroundmusic.currentTime = 0; 
}

/**
 * This Function starts the Game if the player is cicking on the Start Button in the HTML
 */

function startGame() {
  if (playMusic) {
    backgroundmusic.loop = true;
    backgroundmusic.play();
    changeMusicImage(true);
  } else {
    stopBackgroundmusic();
    changeMusicImage(false);
  }
  initLevel();
  init();
  document.getElementById("start-screen").classList.add("hidden");
  canvas.classList.remove("hidden");
  document.getElementById('mobile-container').classList.remove('hidden');
}

/**
 * Shows the Story of the Character and the Game via classlist add and remove hidden
 */

function showStory() {
  document.getElementById("story-container").classList.remove("hidden");
  document.getElementById("start-screen").classList.add("hidden");
}

/**
 * Closes the Story via classlist add and remove hidden
 */

function closeStory() {
  document.getElementById("story-container").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
}
/**
 * Shows the Story of the Character and the Game via classlist add and remove hidden
 */

function showSettings() {
  document.getElementById("settings-screen").classList.remove("hidden");
  document.getElementById("start-screen").classList.add("hidden");
}

/**
 * Closes the Story via classlist add and remove hidden
 */
function closeSettings() {
  document.getElementById("settings-screen").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
}

/**
 * button for reloading the website
 */

function buttonReload() {
  window.location.reload();
}

/**
 * Function for entering Fullscreen after Issues with the one form your Videos
 * Fullscreen is also used for entering the Website with mobile devices
 */

function showFullscreen() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("startscreen-fullscreen").classList.remove("hidden");
}

/**
 * closes the Fullscreen Mode via classlist add and remove
 */

function closeFullscreen() {
  document.getElementById("start-screen").classList.remove("hidden");
  document.getElementById("startscreen-fullscreen").classList.add("hidden");
  document.getElementById("canvas").classList.remove("fullscreen");
}

/**
 * Starts the Game in Fullscreen + calls the Function Mobilepoints for showing these
 */

function startGameFullscreen() {
  // Initialisiere Musik und Bild direkt, anstatt toggleMusic() zu verwenden
  if (playMusic) {
    backgroundmusic.loop = true;
    backgroundmusic.play();
    changeMusicImage(true);
  } else {
    stopBackgroundmusic();
    changeMusicImage(false);
  }
  initLevel();
  init();
  document.getElementById("startscreen-fullscreen").classList.add("hidden");
  document.getElementById("canvas").classList.remove("hidden");
  document.getElementById("canvas").classList.add("fullscreen");
  document.getElementById('mobile-container').classList.remove('hidden');
  mobilepoints();
}

/**
 * Keyboard Settings
 */

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (e.keyCode == 68) {
    keyboard.D = true;
  }
  console.log(e);
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

/**
 * This Function is for developing Mobile Poinst for m. devices to play the Game 
 */

function mobilepoints() {
  document.getElementById('but2').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });
  document.getElementById('but2').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById('but1').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });
  document.getElementById('but1').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById('but3').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });
  document.getElementById('but3').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });

  document.getElementById('but4').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.D = true;
  });
  document.getElementById('but4').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.D = false;
  });
}



