// Data: 50 Popular Countries for Movies
const countries = [
    "United States", "India", "United Kingdom", "Japan", "France",
    "Germany", "Italy", "Spain", "China", "South Korea",
    "Brazil", "Mexico", "Russia", "Canada", "Australia",
    "Nigeria", "Egypt", "Turkey", "Iran", "Indonesia",
    "Pakistan", "Bangladesh", "Philippines", "Vietnam", "Thailand",
    "Poland", "Ukraine", "Netherlands", "Belgium", "Sweden",
    "Portugal", "Greece", "Czech Republic", "Hungary", "Austria",
    "Switzerland", "Denmark", "Finland", "Norway", "Ireland",
    "Argentina", "Chile", "Colombia", "Peru", "Venezuela",
    "Malaysia", "Singapore", "Israel", "UAE", "South Africa"
];

// Data: Movie Genres
const genres = [
    "Action", "Adventure", "Comedy", "Drama", "Horror",
    "Sci-Fi", "Romance", "Thriller", "Animation", "Fantasy",
    "Crime", "Mystery", "Documentary", "Family", "Musical",
    "War", "Western", "Biography", "History", "Sport",
    "Superhero", "Noir", "Psychological", "Romantic Comedy"
];

// DOM Elements
const spinCountryBtn = document.getElementById('spinCountryBtn');
const spinGenreBtn = document.getElementById('spinGenreBtn');
const spinBothBtn = document.getElementById('spinBothBtn');
const searchMoviesBtn = document.getElementById('searchMoviesBtn');
const countryResult = document.getElementById('countryResult');
const genreResult = document.getElementById('genreResult');
const selectedCountry = document.getElementById('selectedCountry');
const selectedGenre = document.getElementById('selectedGenre');
const searchInfo = document.getElementById('searchInfo');
const countryWheelInner = document.getElementById('countryWheelInner');
const genreWheelInner = document.getElementById('genreWheelInner');

// Wheel state
let currentCountry = null;
let currentGenre = null;
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

// Initialize wheels when page loads
window.addEventListener('load', () => {
    initializeWheels();
    console.log('Movie Explorer Wheel initialized!');
    console.log(`Countries: ${countries.length}, Genres: ${genres.length}`);
});

// Create wheel segments
function initializeWheels() {
    createWheel(countryWheelInner, countries, countryColors);
    createWheel(genreWheelInner, genres, genreColors);
}

function createWheel(wheelElement, items, colors) {
    wheelElement.innerHTML = '';
    const total = items.length;
    const angle = 360 / total;
    
    for (let i = 0; i < total; i++) {
        const segment = document.createElement('div');
        segment.className = 'wheel-segment';
        segment.style.transform = `rotate(${i * angle}deg)`;
        segment.style.backgroundColor = colors[i % colors.length];
        
        const content = document.createElement('div');
        content.className = 'segment-content';
        
        // Shorten text for better display
        let text = items[i];
        if (text.length > 12) {
            text = text.substring(0, 10) + '..';
        }
        
        content.textContent = text;
        content.style.transform = `rotate(${angle/2}deg)`;
        segment.appendChild(content);
        wheelElement.appendChild(segment);
    }
}

// Spin wheel function
function spinWheel(type, duration = 4000) {
    return new Promise((resolve) => {
        let wheelInner, items, resultElement, setResultFunction;
        
        if (type === 'country') {
            if (isCountrySpinning) return;
            isCountrySpinning = true;
            wheelInner = countryWheelInner;
            items = countries;
            resultElement = countryResult;
            setResultFunction = setSelectedCountry;
            spinCountryBtn.disabled = true;
        } else {
            if (isGenreSpinning) return;
            isGenreSpinning = true;
            wheelInner = genreWheelInner;
            items = genres;
            resultElement = genreResult;
            setResultFunction = setSelectedGenre;
            spinGenreBtn.disabled = true;
        }
        
        // Show spinning message
        resultElement.innerHTML = `
            <div class="spinning-message">
                <i class="fas fa-spinner spinning-icon"></i>
                <p>Spinning the wheel...</p>
            </div>
        `;
        
        // Generate random rotation (5-8 full rotations + random)
        const minRotations = 5;
        const maxRotations = 8;
        const rotations = minRotations + Math.random() * (maxRotations - minRotations);
        const degrees = rotations * 360 + Math.random() * 360;
        
        // Apply spin animation
        wheelInner.style.transition = `transform ${duration}ms cubic-bezier(0.2, 0.8, 0.3, 1)`;
        wheelInner.style.transform = `rotate(${degrees}deg)`;
        
        // Calculate selected item
        const total = items.length;
        const segmentAngle = 360 / total;
        const normalizedDegrees = degrees % 360;
        const effectiveAngle = (360 - normalizedDegrees) % 360;
        const selectedIndex = Math.floor(effectiveAngle / segmentAngle) % total;
        const selectedItem = items[selectedIndex];
        
        console.log(`${type} selected: ${selectedItem} (Index: ${selectedIndex})`);
        
        // Finish after duration
        setTimeout(() => {
            // Show result with celebration
            resultElement.innerHTML = `
                <div class="selected-result">
                    <h3>${selectedItem}</h3>
                    <p>${type === 'country' ? '🎌 Movie Country Selected' : '🎬 Movie Genre Selected'}</p>
                </div>
            `;
            
            // Set result
            setResultFunction(selectedItem);
            
            // Celebrate animation
            resultElement.classList.add('celebrate');
            setTimeout(() => {
                resultElement.classList.remove('celebrate');
            }, 500);
            
            // Re-enable button
            if (type === 'country') {
                spinCountryBtn.disabled = false;
                isCountrySpinning = false;
            } else {
                spinGenreBtn.disabled = false;
                isGenreSpinning = false;
            }
            
            resolve(selectedItem);
        }, duration);
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
            <p><i class="fas fa-check-circle" style="color:#2ecc71;"></i> Ready! Search for <strong>${currentGenre}</strong> movies from <strong>${currentCountry}</strong></p>
        `;
    }
}

// Google Search Function - WITHOUT YEAR
function searchGoogleMovies(country, genre) {
    // Create search query WITHOUT year
    const query = `${genre} movies from ${country} films`;
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
    spinWheel('country', 4000);
});

spinGenreBtn.addEventListener('click', () => {
    spinWheel('genre', 4000);
});

spinBothBtn.addEventListener('click', async () => {
    if (!isCountrySpinning && !isGenreSpinning) {
        // Disable all spin buttons
        spinCountryBtn.disabled = true;
        spinGenreBtn.disabled = true;
        spinBothBtn.disabled = true;
        
        // Show message
        searchInfo.innerHTML = `<p><i class="fas fa-sync-alt spinning-icon"></i> Spinning both wheels...</p>`;
        
        // Spin both wheels simultaneously
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

// Make responsive on window resize
window.addEventListener('resize', () => {
    initializeWheels();
});
