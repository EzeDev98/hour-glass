function startHourglass(totalTimeInSeconds) {
  const sandTop = document.querySelector(".sand-top");
  const sandStream = document.querySelector(".sand-stream");
  const sandBottom = document.querySelector(".sand-bottom");
  const timeDisplay = document.querySelector(".time-container h1"); 

  let remainingTime = totalTimeInSeconds;
  updateTimeDisplay(remainingTime);

  const animationDuration = totalTimeInSeconds * 1000;
  const animationDurationInSeconds = animationDuration / 1000;

  sandTop.style.animation = `empty-top ${animationDurationInSeconds}s linear forwards`;
  sandBottom.style.animation = `fill-bottom ${animationDurationInSeconds}s linear 0.5s forwards`;

  let isEmpty = false;
  let particleInterval;
  let countdownInterval; 

  countdownInterval = setInterval(() => {
    remainingTime--;
    updateTimeDisplay(remainingTime);

    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);

  function updateTimeDisplay(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    timeDisplay.textContent = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  function createSandParticle() {
    const particle = document.createElement("div");
    particle.classList.add("sand-particle");
    sandStream.appendChild(particle);

    const randomX = Math.random() * 15 - 7.5;
    particle.style.left = `calc(50% + ${randomX}px)`;

    const particleAnimationDuration = Math.random() * 5 + 3;
    const particleAnimationDelay = Math.random() * 2;
    particle.style.animationDuration = `${particleAnimationDuration}s`;
    particle.style.animationDelay = `${particleAnimationDelay}s`;

    particle.addEventListener("animationend", () => {
      particle.remove();
    });
  }

  const heightToWidthMap = [
    { height: 61, width: 90 },
    { height: 60, width: 90 },
    { height: 59, width: 90 },
    { height: 58, width: 90 },
    { height: 57, width: 90 },
    { height: 56, width: 90 },
    { height: 55, width: 90 },
    { height: 54, width: 89 },
    { height: 53, width: 89 },
    { height: 52, width: 89 },
    { height: 51, width: 89 },
    { height: 50, width: 88 },
    { height: 49, width: 88 },
    { height: 48, width: 88 },
    { height: 47, width: 87 },
    { height: 46, width: 87 },
    { height: 45, width: 87 },
    { height: 44, width: 86 },
    { height: 43, width: 86 },
    { height: 42, width: 85 },
    { height: 41, width: 84 },
    { height: 40, width: 82 },
    { height: 39, width: 82 },
    { height: 38, width: 82 },
    { height: 37, width: 81 },
    { height: 36, width: 81 },
    { height: 35, width: 81 },
    { height: 34, width: 80 },
    { height: 33, width: 80 },
    { height: 32, width: 80 },
    { height: 31, width: 79 },
    { height: 30, width: 78 },
    { height: 29, width: 76 },
    { height: 28, width: 75 },
    { height: 27, width: 74 },
    { height: 26, width: 73 },
    { height: 25, width: 72 },
    { height: 24, width: 71 },
    { height: 23, width: 70 },
    { height: 22, width: 69 },
    { height: 21, width: 68 },
    { height: 20, width: 67 },
    { height: 19, width: 66 },
    { height: 18, width: 65 },
    { height: 17, width: 64 },
    { height: 16, width: 63 },
    { height: 15, width: 62 },
    { height: 14, width: 61 },
    { height: 13, width: 60 },
    { height: 12, width: 59 },
    { height: 11, width: 58 },
    { height: 10, width: 57 },
    { height: 9, width: 56 },
    { height: 8, width: 55 },
    { height: 7, width: 54 },
    { height: 6, width: 53 },
    { height: 5, width: 52 },
    { height: 4, width: 51 },
    { height: 3, width: 50 },
    { height: 2, width: 49 },
    { height: 1, width: 48 },
    { height: 0, width: 47 },
  ];

  function adjustSandProperties(progress) {
    const initialTopHeight = 61;
    const topHeight = initialTopHeight - progress * initialTopHeight;

    let topWidth = 90;
    for (const { height, width } of heightToWidthMap) {
      if (topHeight >= height) {
        topWidth = width;
        break;
      }
    }

    if (progress >= 1) {
      isEmpty = true;
      const existingParticles = document.querySelectorAll(".sand-particle");
      existingParticles.forEach((p) => p.remove()); 
    }

    const topBorderRadius = 100 - progress * 80;
    sandTop.style.height = `${topHeight}px`;
    sandTop.style.width = `${topWidth}px`;
    sandTop.style.borderRadius = `0 0 ${topBorderRadius}px ${topBorderRadius}px`;

    const initialBottomHeight = 61; 
    const bottomHeight = progress * initialBottomHeight; 
    sandBottom.style.height = `${bottomHeight}px`;

    if (bottomHeight >= 21) {
      const borderRadiusProgress =
        (bottomHeight - 21) / (initialBottomHeight - 21);
      const bottomBorderRadius = 0 + borderRadiusProgress * 120;
      sandBottom.style.borderRadius = `${bottomBorderRadius}px ${bottomBorderRadius}px 0 0`;
    } else {
      sandBottom.style.borderRadius = `0 0 0 0`;
    }

    sandBottom.style.width = `90px`;
  }

  function sandCreationAnimation() {
    const startTime = Date.now();
    particleInterval = setInterval(() => {
      if (!isEmpty) {
        createSandParticle();
      }
    }, 50);

    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = elapsedTime / animationDuration;

      if (progress >= 1) {
        clearInterval(interval);
        clearInterval(countdownInterval); 
        clearInterval(particleInterval); 
        console.log("Hourglass animation completed.");
      }

      adjustSandProperties(progress);
    }, 16);
  }

  sandCreationAnimation();
}

function initTextCycling() {
  const texts = [
    ["IN THE END", "ONLY TIME WILL TELL"],
    ["EVERY GRAIN", "A UNIVERSE"],
    ["TICK TOCK", "GOES THE CLOCK"],
    ["Be Productive", "Time Is Money"],
  ];
  const element = document.getElementById("changing-text");
  let current = 0;

  setInterval(() => {
    current = (current + 1) % texts.length;
    element.innerHTML = texts[current].map((t) => `<span>${t}</span>`).join("");
  }, 8000);
}

document.addEventListener("DOMContentLoaded", () => {
  startHourglass(120);
  initTextCycling();
});
