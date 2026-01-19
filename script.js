// Data: All 195 countries (simplified for wheel display)
const countries = [
    "USA", "India", "UK", "Japan", "France", 
    "Germany", "Italy", "Spain", "China", "Brazil",
    "Mexico", "Russia", "Canada", "Australia", "Korea",
    "Nigeria", "Egypt", "Turkey", "Iran", "Indonesia",
    "Pakistan", "Bangladesh", "Philippines", "Vietnam", "Thailand",
    "Poland", "Ukraine", "Netherlands", "Belgium", "Sweden",
    "Portugal", "Greece", "Czech", "Hungary", "Austria",
    "Switzerland", "Denmark", "Finland", "Norway", "Ireland",
    "Argentina", "Chile", "Colombia", "Peru", "Venezuela",
    "Malaysia", "Singapore", "Israel", "UAE", "Saudi Arabia"
];

// Data: Movie Genres
const genres = [
    "Action", "Adventure", "Comedy", "Drama", "Horror",
    "Sci-Fi", "Romance", "Thriller", "Animation", "Fantasy",
    "Crime", "Mystery", "Documentary", "Family", "Musical",
    "War", "Western", "Biography", "History", "Sport",
    "Superhero", "Noir", "Psychological", "Musical"
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
    '#EF476F', '#7B68EE', '#FFA500', '#32CD32', '#1E90FF'
];

const genreColors = [
    '#E74C3C', '#3498DB', '#2ECC71', '#F39C12', '#9B59B6',
    '#1ABC9C', '#D35400', '#34495E', '#16A085', '#8E44AD'
];

// Initialize wheels
function initializeWheels() {
    createWheel(countryWheelInner, countries, countryColors);
    createWheel(genreWheelInner, genres, genreColors);
}

// Create wheel segments
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
        content.className = 'wheel-segment-content';
        
        // Shorten text if needed
        let text = items[i];
        if (text.length > 8) {
            text = text.substring(0, 6) + '..';
        }
        
        content.textContent = text;
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
                <p>Spinning...</p>
            </div>
        `;
        
        // Generate random rotation
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
        
        // Finish after duration
        setTimeout(() => {
            // Show result
            resultElement.innerHTML = `
                <div class="selected-result">
                    <h3>${selectedItem}</h3>
                    <p>${type === 'country' ? '🎌 Country Selected' : '🎬 Genre Selected'}</p>
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
        .spinning-message p {
            font-size: 1rem;
        }
    `;
    document.head.appendChild(style);
    
    console.log('Movie Explorer Wheel initialized!');
    console.log(`Countries: ${countries.length}, Genres: ${genres.length}`);
});

// Make responsive on window resize
window.addEventListener('resize', () => {
    initializeWheels();
});
