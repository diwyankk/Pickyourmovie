// Data: All 195 countries
const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola",
    "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
    "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
    "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
    "Cameroon", "Canada", "Central African Republic", "Chad", "Chile",
    "China", "Colombia", "Comoros", "Congo", "Costa Rica",
    "Côte d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czechia",
    "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador",
    "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
    "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
    "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
    "Guyana", "Haiti", "Honduras", "Hungary", "Iceland",
    "India", "Indonesia", "Iran", "Iraq", "Ireland",
    "Israel", "Italy", "Jamaica", "Japan", "Jordan",
    "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
    "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
    "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
    "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
    "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
    "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
    "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria",
    "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan",
    "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay",
    "Peru", "Philippines", "Poland", "Portugal", "Qatar",
    "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
    "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
    "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
    "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan",
    "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
    "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
    "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
    "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
    "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
    "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

// Data: Movie Genres
const genres = [
    "Action", "Adventure", "Animation", "Biography", "Comedy",
    "Crime", "Documentary", "Drama", "Family", "Fantasy",
    "Film-Noir", "History", "Horror", "Music", "Musical",
    "Mystery", "Romance", "Sci-Fi", "Sport", "Thriller",
    "War", "Western", "Superhero", "Psychological"
];

// DOM Elements
const countryWheelCanvas = document.getElementById('countryWheel');
const genreWheelCanvas = document.getElementById('genreWheel');
const spinCountryBtn = document.getElementById('spinCountryBtn');
const spinGenreBtn = document.getElementById('spinGenreBtn');
const spinBothBtn = document.getElementById('spinBothBtn');
const searchMoviesBtn = document.getElementById('searchMoviesBtn');
const countryResult = document.getElementById('countryResult');
const genreResult = document.getElementById('genreResult');
const selectedCountry = document.getElementById('selectedCountry');
const selectedGenre = document.getElementById('selectedGenre');
const searchInfo = document.getElementById('searchInfo');

// Wheel variables
let countryChart = null;
let genreChart = null;
let isCountrySpinning = false;
let isGenreSpinning = false;

// Colors for wheels
const countryColors = [
    '#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2',
    '#EF476F', '#7B68EE', '#FFA500', '#32CD32', '#1E90FF',
    '#8A2BE2', '#FF69B4', '#00CED1', '#FF8C00', '#9ACD32'
];

const genreColors = [
    '#E74C3C', '#3498DB', '#2ECC71', '#F39C12', '#9B59B6',
    '#1ABC9C', '#D35400', '#34495E', '#16A085', '#8E44AD',
    '#2C3E50', '#27AE60', '#2980B9', '#F1C40F', '#E67E22'
];

// Initialize both wheels
function initializeWheels() {
    // Country wheel setup
    const countryCtx = countryWheelCanvas.getContext('2d');
    countryWheelCanvas.width = 400;
    countryWheelCanvas.height = 400;
    
    // Genre wheel setup
    const genreCtx = genreWheelCanvas.getContext('2d');
    genreWheelCanvas.width = 400;
    genreWheelCanvas.height = 400;
    
    // Create charts using Chart.js
    countryChart = new Chart(countryCtx, {
        type: 'doughnut',
        data: {
            labels: countries,
            datasets: [{
                data: Array(countries.length).fill(1),
                backgroundColor: getColors(countries.length, countryColors),
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: false,
            animation: {
                duration: 0
            },
            cutout: '60%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return countries[context.dataIndex];
                        }
                    }
                }
            }
        }
    });
    
    genreChart = new Chart(genreCtx, {
        type: 'doughnut',
        data: {
            labels: genres,
            datasets: [{
                data: Array(genres.length).fill(1),
                backgroundColor: getColors(genres.length, genreColors),
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: false,
            animation: {
                duration: 0
            },
            cutout: '60%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return genres[context.dataIndex];
                        }
                    }
                }
            }
        }
    });
    
    drawCountryLabels();
    drawGenreLabels();
}

// Helper function to generate colors
function getColors(count, colorArray) {
    const colors = [];
    for (let i = 0; i < count; i++) {
        colors.push(colorArray[i % colorArray.length]);
    }
    return colors;
}

// Draw country labels manually
function drawCountryLabels() {
    const ctx = countryWheelCanvas.getContext('2d');
    const centerX = countryWheelCanvas.width / 2;
    const centerY = countryWheelCanvas.height / 2;
    const radius = Math.min(centerX, centerY) - 60;
    
    ctx.clearRect(0, 0, countryWheelCanvas.width, countryWheelCanvas.height);
    
    // Draw country names around the wheel
    const total = countries.length;
    const angleStep = (2 * Math.PI) / total;
    
    for (let i = 0; i < total; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle + Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 10px Poppins';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 2;
        
        // Shorten long country names
        let countryName = countries[i];
        if (countryName.length > 12) {
            countryName = countryName.substring(0, 10) + '..';
        }
        
        ctx.fillText(countryName, 0, 0);
        ctx.restore();
    }
}

// Draw genre labels manually
function drawGenreLabels() {
    const ctx = genreWheelCanvas.getContext('2d');
    const centerX = genreWheelCanvas.width / 2;
    const centerY = genreWheelCanvas.height / 2;
    const radius = Math.min(centerX, centerY) - 60;
    
    ctx.clearRect(0, 0, genreWheelCanvas.width, genreWheelCanvas.height);
    
    // Draw genre names around the wheel
    const total = genres.length;
    const angleStep = (2 * Math.PI) / total;
    
    for (let i = 0; i < total; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle + Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px Poppins';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 2;
        
        ctx.fillText(genres[i], 0, 0);
        ctx.restore();
    }
}

// Spin wheel function
function spinWheel(type, duration = 4000) {
    return new Promise((resolve) => {
        let chart, resultElement, items, setResultFunction;
        let isSpinning = false;
        
        if (type === 'country') {
            chart = countryChart;
            resultElement = countryResult;
            items = countries;
            setResultFunction = setSelectedCountry;
            isCountrySpinning = true;
            isSpinning = isCountrySpinning;
        } else {
            chart = genreChart;
            resultElement = genreResult;
            items = genres;
            setResultFunction = setSelectedGenre;
            isGenreSpinning = true;
            isSpinning = isGenreSpinning;
        }
        
        // Disable button
        if (type === 'country') {
            spinCountryBtn.disabled = true;
        } else {
            spinGenreBtn.disabled = true;
        }
        
        // Show spinning message
        resultElement.innerHTML = `
            <div class="spinning-message">
                <i class="fas fa-spinner fa-spin spinning"></i>
                <p>Spinning...</p>
            </div>
        `;
        
        // Generate random rotation (3-5 full rotations + random offset)
        const fullRotations = 3 + Math.floor(Math.random() * 3);
        const extraRotation = Math.random() * 360;
        const totalRotation = fullRotations * 360 + extraRotation;
        
        // Get random index for selection
        const selectedIndex = Math.floor(Math.random() * items.length);
        const selectedItem = items[selectedIndex];
        
        // Animate the rotation
        let startTime = null;
        let startRotation = chart.options.rotation || 0;
        
        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            // Calculate current rotation
            const currentRotation = startRotation + totalRotation * easeOut;
            
            // Update chart rotation
            chart.options.rotation = currentRotation % 360;
            chart.update();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Animation finished
                finishSpin();
            }
        }
        
        function finishSpin() {
            // Update display with selected item
            resultElement.innerHTML = `
                <div class="selected-result">
                    <h3>${selectedItem}</h3>
                    <p>${type === 'country' ? '🎌 Country Selected' : '🎬 Genre Selected'}</p>
                </div>
            `;
            
            // Set the selected value
            setResultFunction(selectedItem);
            
            // Re-enable button
            if (type === 'country') {
                spinCountryBtn.disabled = false;
                isCountrySpinning = false;
            } else {
                spinGenreBtn.disabled = false;
                isGenreSpinning = false;
            }
            
            // Celebrate animation
            resultElement.classList.add('celebrate');
            setTimeout(() => {
                resultElement.classList.remove('celebrate');
            }, 500);
            
            // Resolve promise
            resolve(selectedItem);
        }
        
        // Start animation
        requestAnimationFrame(animate);
    });
}

// Set selected country
function setSelectedCountry(country) {
    currentCountry = country;
    selectedCountry.textContent = country;
    selectedCountry.style.color = '#e74c3c';
    updateSearchButton();
}

// Set selected genre
function setSelectedGenre(genre) {
    currentGenre = genre;
    selectedGenre.textContent = genre;
    selectedGenre.style.color = '#3498db';
    updateSearchButton();
}

// Update search button state
function updateSearchButton() {
    if (currentCountry && currentGenre) {
        searchMoviesBtn.disabled = false;
        searchInfo.innerHTML = `
            <p><i class="fas fa-check-circle" style="color:#2ecc71;"></i> Ready to search for <strong>${currentGenre}</strong> movies from <strong>${currentCountry}</strong></p>
        `;
    } else {
        searchMoviesBtn.disabled = true;
    }
}

// Google Search Function
function searchGoogleMovies(country, genre) {
    // Create search query
    const query = `${genre} movies from ${country} 2023 2024 best films`;
    const encodedQuery = encodeURIComponent(query);
    const googleUrl = `https://www.google.com/search?q=${encodedQuery}`;
    
    // Open in new tab
    window.open(googleUrl, '_blank');
    
    // Show search initiated message
    searchInfo.innerHTML = `
        <p><i class="fas fa-external-link-alt"></i> Opening Google search for <strong>${genre}</strong> movies from <strong>${country}</strong>...</p>
    `;
}

// Event Listeners
spinCountryBtn.addEventListener('click', () => {
    if (!isCountrySpinning) {
        spinWheel('country', 4000);
    }
});

spinGenreBtn.addEventListener('click', () => {
    if (!isGenreSpinning) {
        spinWheel('genre', 4000);
    }
});

spinBothBtn.addEventListener('click', async () => {
    if (!isCountrySpinning && !isGenreSpinning) {
        // Disable all spin buttons
        spinCountryBtn.disabled = true;
        spinGenreBtn.disabled = true;
        spinBothBtn.disabled = true;
        
        // Spin both wheels
        await Promise.all([
            spinWheel('country', 4000),
            spinWheel('genre', 4000)
        ]);
        
        // Re-enable spin both button
        spinBothBtn.disabled = false;
    }
});

searchMoviesBtn.addEventListener('click', () => {
    if (currentCountry && currentGenre) {
        searchGoogleMovies(currentCountry, currentGenre);
    }
});

// Initialize when page loads
window.addEventListener('load', () => {
    initializeWheels();
    
    // Add CSS for spinning message
    const style = document.createElement('style');
    style.textContent = `
        .spinning-message {
            text-align: center;
            color: #667eea;
        }
        .spinning-message i {
            font-size: 2rem;
            margin-bottom: 10px;
            display: block;
        }
        .selected-result {
            text-align: center;
        }
        .selected-result h3 {
            color: #2c3e50;
            font-size: 1.5rem;
            margin-bottom: 5px;
        }
        .selected-result p {
            color: #7f8c8d;
            font-size: 0.9rem;
        }
    `;
    document.head.appendChild(style);
    
    console.log('Movie Explorer Wheel initialized!');
    console.log(`Countries: ${countries.length}, Genres: ${genres.length}`);
});

// Make responsive on window resize
window.addEventListener('resize', () => {
    // Re-initialize wheels to adjust to new size
    if (countryChart) {
        countryChart.destroy();
    }
    if (genreChart) {
        genreChart.destroy();
    }
    initializeWheels();
});
