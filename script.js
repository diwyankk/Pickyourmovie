// ---------- DATA ----------
const countries = [
  "India","United States","United Kingdom","France","Germany","Italy","Spain",
  "Japan","South Korea","China","Iran","Turkey","Russia","Brazil","Argentina",
  "Mexico","Canada","Australia","New Zealand","Sweden","Norway","Denmark",
  "Finland","Iceland","Poland","Czech Republic","Slovakia","Hungary","Romania",
  "Bulgaria","Ukraine","Serbia","Croatia","Slovenia","Austria","Switzerland",
  "Netherlands","Belgium","Portugal","Greece","Ireland","Scotland","Wales",
  "South Africa","Nigeria","Ghana","Kenya","Egypt","Morocco","Tunisia",
  "Saudi Arabia","UAE","Qatar","Israel","Palestine","Jordan","Lebanon","Syria",
  "Iraq","Afghanistan","Pakistan","Bangladesh","Sri Lanka","Nepal","Bhutan",
  "Thailand","Vietnam","Indonesia","Malaysia","Singapore","Philippines",
  "Myanmar","Cambodia","Laos","Mongolia","Kazakhstan","Uzbekistan","Turkmenistan",
  "Kyrgyzstan","Tajikistan","Armenia","Georgia","Azerbaijan","Chile","Peru",
  "Colombia","Venezuela","Bolivia","Ecuador","Paraguay","Uruguay","Panama",
  "Costa Rica","Cuba","Dominican Republic","Haiti","Jamaica","Trinidad",
  "Barbados","Fiji","Samoa","Tonga","Papua New Guinea","Solomon Islands",
  "Maldives","Seychelles","Mauritius","Madagascar","Ethiopia","Somalia",
  "Sudan","South Sudan","Uganda","Rwanda","Burundi","Tanzania","Zambia",
  "Zimbabwe","Botswana","Namibia","Angola","Mozambique","Malawi","Cameroon",
  "Ivory Coast","Senegal","Mali","Niger","Chad","Libya","Algeria","Western Sahara",
  "Yemen","Oman","Kuwait","Bahrain","Cyprus","Malta","Luxembourg","Liechtenstein",
  "Monaco","San Marino","Vatican City","Belarus","Latvia","Lithuania","Estonia",
  "Iraq","Iran","Taiwan","Hong Kong","Macau","Greenland","Suriname","Guyana"
];

// ensure uniqueness per session
let remainingCountries = [...new Set(countries)];

const genres = [
  "Action","Adventure","Drama","Romance","Sci-Fi","Fantasy","Thriller","Horror",
  "Mystery","Crime","Noir","Psychological","Surreal","Art-House","Indie",
  "Documentary","Biopic","Historical","War","Western","Musical","Animation",
  "Anime","Cyberpunk","Dystopian","Post-Apocalyptic","Political","Legal",
  "Heist","Gangster","Slasher","Found Footage","Experimental","Mythological"
];

// ---------- WHEEL LOGIC ----------
function drawWheel(canvas, items) {
  const ctx = canvas.getContext("2d");
  const radius = canvas.width / 2;
  const angle = (2 * Math.PI) / items.length;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  items.forEach((item, i) => {
    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.fillStyle = `hsl(${i * 360 / items.length}, 70%, 40%)`;
    ctx.arc(radius, radius, radius, i * angle, (i + 1) * angle);
    ctx.fill();

    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(i * angle + angle / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "12px Arial";
    ctx.fillText(item, radius - 10, 5);
    ctx.restore();
  });
}

// ---------- COUNTRY SPIN ----------
const countryCanvas = document.getElementById("countryWheel");
drawWheel(countryCanvas, remainingCountries);

document.getElementById("spinCountry").onclick = () => {
  if (remainingCountries.length === 0) return;

  const resultBox = document.getElementById("countryResult");
  resultBox.textContent = "Spinning...";

  setTimeout(() => {
    const index = Math.floor(Math.random() * remainingCountries.length);
    const country = remainingCountries.splice(index, 1)[0];

    resultBox.textContent = `Country: ${country}`;
    document.getElementById("genreSection").classList.remove("hidden");

    document.getElementById("genreSection")
      .scrollIntoView({ behavior: "smooth" });

    drawWheel(countryCanvas, remainingCountries);
  }, 6000);
};

// ---------- GENRE SPIN ----------
const genreCanvas = document.getElementById("genreWheel");
drawWheel(genreCanvas, genres);

document.getElementById("spinGenre").onclick = () => {
  const resultBox = document.getElementById("genreResult");
  resultBox.textContent = "Spinning...";

  setTimeout(() => {
    const index = Math.floor(Math.random() * genres.length);
    resultBox.textContent = `Genre: ${genres[index]}`;
  }, 5000);
};
