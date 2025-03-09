const images = ["0.jpeg", "1.jpeg", "2.jpeg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");
bgImage.classList.add("bg");

bgImage.src = `img/${chosenImage}`;

document.querySelector("#wrap").appendChild(bgImage);
