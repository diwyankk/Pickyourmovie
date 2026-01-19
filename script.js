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
    "Côte d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic",
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

// Selected values
let currentCountry = null;
let currentGenre = null;

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

// Initialize Wheels
function initWheel(canvas, items, colors, type) {
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    const sliceAngle = (2 * Math.PI) / items.length;
    
    return { ctx, centerX, centerY, radius, sliceAngle };
}

// Draw Wheel
function drawWheel(canvas, items, colors, rotation = 0, selectedIndex = -1) {
    const { ctx, centerX, centerY, radius, sliceAngle } = initWheel(canvas, items, colors);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw each slice
    for (let i = 0; i < items.length; i++) {
        const startAngle = i * sliceAngle + rotation;
        const endAngle = (i + 1) * sliceAngle + rotation;
        
        // Draw slice
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        
        // Set color (highlight selected slice)
        ctx.fillStyle = selectedIndex === i ? '#FFD700' : colors[i % colors.length];
        ctx.fill();
        
        // Draw border
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw text
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + sliceAngle / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = selectedIndex === i ? '#000' : 'white';
        ctx.font = 'bold 12px Poppins';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 3;
        
        // Shorten long names
        let text = items[i];
        if (text.length > 12) {
            text = text.substring(0, 10) + '..';
        }
        
        ctx.fillText(text, radius - 25, 4);
        ctx.restore();
    }
    
    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = '#2c3e50';
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw icon in center
    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px FontAwesome';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(canvas.id === 'countryWheel' ? '🌍' : '🎬', centerX, centerY);
}

// Spin Animation
function spinWheel(canvas, items, colors, resultElement, valueSetter, duration = 3000) {
    return new Promise((resolve) => {
        const spinBtn = canvas.id === 'countryWheel' ? spinCountryBtn : spinGenreBtn;
        spinBtn.disabled = true;
        
        // Generate random rotation (3-5 full rotations + random offset)
        const fullRotations = 3 + Math.floor(Math.random() * 3);
        const extraRotation = Math.random() * 2 * Math.PI;
        const totalRotation = fullRotations * 2 * Math.PI + extraRotation;
        
        // Animation parameters
        const startTime = Date.now();
        const startRotation = 0;
        const sliceAngle = (2 * Math.PI) / items.length;
        
        // Show spinning message
        resultElement.innerHTML = `
            <div class="spinning-message">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Spinning...</p>
            </div>
        `;
        
        // Animation loop
        function animate() {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            // Calculate current rotation
            const currentRotation = startRotation + totalRotation * easeOut;
            
            // Draw wheel with current rotation
            drawWheel(canvas, items, colors, currentRotation);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Animation finished
                finishSpin();
            }
        }
        
        function finishSpin() {
            // Calculate selected item
            const finalRotation = totalRotation % (2 * Math.PI);
            const pointerAngle = Math.PI; // Bottom position
            const effectiveAngle = (pointerAngle - finalRotation + (2 * Math.PI)) % (2 * Math.PI);
            const selectedIndex = Math.floor(effectiveAngle / sliceAngle);
            const selectedItem = items[selectedIndex];
            
            // Update display
            resultElement.innerHTML = `
                <div class="selected-result">
                    <h3>${selectedItem}</h3>
                    <p>${canvas.id === 'countryWheel' ? '🎌 Country Selected' : '🎬 Genre Selected'}</p>
                </div>
            `;
            
            // Highlight selected slice
            drawWheel(canvas, items, colors, finalRotation, selectedIndex);
            
            // Set value
            valueSetter(selectedItem);
            
            // Re-enable button
            spinBtn.disabled = false;
            
            // Celebrate
            resultElement.classList.add('celebrate');
            setTimeout(() => resultElement.classList.remove('celebrate'), 500);
            
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
    const query = `${genre} movies from ${country} 2023 2024`;
    const encodedQuery = encodeURIComponent(query);
    const googleUrl = `https://www.google.com/search?q=${encodedQuery}`;
    
    // Open in new tab
    window.open(googleUrl, '_blank');
}

// Event Listeners
spinCountryBtn.addEventListener('click', () => {
    spinWheel(countryWheelCanvas, countries, countryColors, countryResult, setSelectedCountry, 4000);
});

spinGenreBtn.addEventListener('click', () => {
    spinWheel(genreWheelCanvas, genres, genreColors, genreResult, setSelectedGenre, 4000);
});

spinBothBtn.addEventListener('click', async () => {
    // Disable all buttons
    spinCountryBtn.disabled = true;
    spinGenreBtn.disabled = true;
    spinBothBtn.disabled = true;
    
    // Spin both wheels sequentially
    await spinWheel(countryWheelCanvas, countries, countryColors, countryResult, setSelectedCountry, 4000);
    await spinWheel(genreWheelCanvas, genres, genreColors, genreResult, setSelectedGenre, 4000);
    
    // Re-enable buttons
    spinCountryBtn.disabled = false;
    spinGenreBtn.disabled = false;
    spinBothBtn.disabled = false;
});

searchMoviesBtn.addEventListener('click', () => {
    if (currentCountry && currentGenre) {
        searchGoogleMovies(currentCountry, currentGenre);
        
        // Show search initiated message
        searchInfo.innerHTML = `
            <p><i class="fas fa-external-link-alt"></i> Opening Google search for <strong>${currentGenre}</strong> movies from <strong>${currentCountry}</strong>...</p>
        `;
    }
});

// Initialize wheels on load
window.addEventListener('load', () => {
    drawWheel(countryWheelCanvas, countries, countryColors);
    drawWheel(genreWheelCanvas, genres, genreColors);
    
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
