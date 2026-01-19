// Movie Picker Application
document.addEventListener('DOMContentLoaded', function() {
    // Countries with flags and colors for wheel
    const countries = [
        { name: "United States", flag: "🇺🇸", color: "#1E3A8A" },
        { name: "India", flag: "🇮🇳", color: "#FF9933" },
        { name: "France", flag: "🇫🇷", color: "#002654" },
        { name: "Japan", flag: "🇯🇵", color: "#BC002D" },
        { name: "South Korea", flag: "🇰🇷", color: "#003478" },
        { name: "United Kingdom", flag: "🇬🇧", color: "#012169" },
        { name: "Germany", flag: "🇩🇪", color: "#000000" },
        { name: "Italy", flag: "🇮🇹", color: "#008C45" },
        { name: "Spain", flag: "🇪🇸", color: "#C60B1E" },
        { name: "Brazil", flag: "🇧🇷", color: "#009739" },
        { name: "Mexico", flag: "🇲🇽", color: "#006847" },
        { name: "Australia", flag: "🇦🇺", color: "#012169" },
        { name: "Canada", flag: "🇨🇦", color: "#FF0000" },
        { name: "Russia", flag: "🇷🇺", color: "#D52B1E" },
        { name: "China", flag: "🇨🇳", color: "#DE2910" },
        { name: "Nigeria", flag: "🇳🇬", color: "#008751" },
        { name: "Egypt", flag: "🇪🇬", color: "#CE1126" },
        { name: "Turkey", flag: "🇹🇷", color: "#E30A17" },
        { name: "Iran", flag: "🇮🇷", color: "#DA0000" },
        { name: "Indonesia", flag: "🇮🇩", color: "#FF0000" },
        { name: "Sweden", flag: "🇸🇪", color: "#006AA7" },
        { name: "Denmark", flag: "🇩🇰", color: "#C60C30" },
        { name: "Norway", flag: "🇳🇴", color: "#EF2B2D" },
        { name: "Poland", flag: "🇵🇱", color: "#DC143C" },
        { name: "Argentina", flag: "🇦🇷", color: "#74ACDF" }
    ];

    // Movie genres with colors for wheel
    const genres = [
        { name: "Action", color: "#E63946", icon: "fa-explosion" },
        { name: "Adventure", color: "#1D3557", icon: "fa-mountain" },
        { name: "Animation", color: "#457B9D", icon: "fa-film" },
        { name: "Comedy", color: "#F4A261", icon: "fa-face-laugh" },
        { name: "Drama", color: "#2A9D8F", icon: "fa-masks-theater" },
        { name: "Fantasy", color: "#9D4EDD", icon: "fa-wand-sparkles" },
        { name: "Horror", color: "#390099", icon: "fa-ghost" },
        { name: "Mystery", color: "#6A4C93", icon: "fa-magnifying-glass" },
        { name: "Romance", color: "#E76F51", icon: "fa-heart" },
        { name: "Sci-Fi", color: "#118AB2", icon: "fa-robot" },
        { name: "Thriller", color: "#073B4C", icon: "fa-heart-pulse" },
        { name: "Documentary", color: "#06D6A0", icon: "fa-camera" }
    ];

    // DOM Elements
    const countryWheel = document.getElementById('countryWheel');
    const genreWheel = document.getElementById('genreWheel');
    const spinCountryBtn = document.getElementById('spinCountryBtn');
    const spinGenreBtn = document.getElementById('spinGenreBtn');
    const countryResult = document.getElementById('countryResult');
    const genreResult = document.getElementById('genreResult');
    const selectedCountry = document.getElementById('selectedCountry');
    const selectedGenre = document.getElementById('selectedGenre');
    const countryFlag = document.getElementById('countryFlag');
    const nextToGenreBtn = document.getElementById('nextToGenreBtn');
    const showSearchBtn = document.getElementById('showSearchBtn');
    const restartBtn = document.getElementById('restartBtn');
    
    // Search elements
    const displayCountry = document.getElementById('displayCountry');
    const displayGenre = document.getElementById('displayGenre');
    const searchQuery = document.getElementById('searchQuery');
    const searchQueryText = document.getElementById('searchQueryText');
    const googleSearchBtn = document.getElementById('googleSearchBtn');
    
    // Step sections
    const countryStep = document.getElementById('countryStep');
    const genreStep = document.getElementById('genreStep');
    const searchStep = document.getElementById('searchStep');
    
    // State variables
    let currentCountry = null;
    let currentGenre = null;
    let isSpinning = false;

    // Initialize the application
    function init() {
        createCountryWheel();
        createGenreWheel();
        setupEventListeners();
        
        // Auto-spin country wheel on page load after a short delay
        setTimeout(() => {
            spinCountryBtn.click();
        }, 1000);
    }

    // Create the country wheel with segments
    function createCountryWheel() {
        countryWheel.innerHTML = '';
        const totalCountries = countries.length;
        const angle = 360 / totalCountries;
        
        for (let i = 0; i < totalCountries; i++) {
            const segment = document.createElement('div');
            segment.className = 'wheel-segment';
            segment.style.transform = `rotate(${i * angle}deg)`;
            segment.style.backgroundColor = countries[i].color;
            
            // Create gradient effect for each segment
            segment.style.backgroundImage = `linear-gradient(to bottom right, ${countries[i].color}, ${darkenColor(countries[i].color, 20)})`;
            
            const span = document.createElement('span');
            // Only show country name when wheel stops (initially empty)
            span.textContent = '';
            span.id = `country-segment-${i}`;
            segment.appendChild(span);
            
            countryWheel.appendChild(segment);
        }
    }

    // Create the genre wheel with segments
    function createGenreWheel() {
        genreWheel.innerHTML = '';
        const totalGenres = genres.length;
        const angle = 360 / totalGenres;
        
        for (let i = 0; i < totalGenres; i++) {
            const segment = document.createElement('div');
            segment.className = 'wheel-segment';
            segment.style.transform = `rotate(${i * angle}deg)`;
            segment.style.backgroundColor = genres[i].color;
            
            // Create gradient effect for each segment
            segment.style.backgroundImage = `linear-gradient(to bottom right, ${genres[i].color}, ${darkenColor(genres[i].color, 20)})`;
            
            const span = document.createElement('span');
            // Only show genre name when wheel stops (initially empty)
            span.textContent = '';
            span.id = `genre-segment-${i}`;
            segment.appendChild(span);
            
            genreWheel.appendChild(segment);
        }
    }

    // Helper function to darken a color
    function darkenColor(color, percent) {
        let r = parseInt(color.substring(1, 3), 16);
        let g = parseInt(color.substring(3, 5), 16);
        let b = parseInt(color.substring(5, 7), 16);

        r = Math.floor(r * (100 - percent) / 100);
        g = Math.floor(g * (100 - percent) / 100);
        b = Math.floor(b * (100 - percent) / 100);

        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    // Spin the wheel and get a random item
    function spinWheel(wheel, items, resultCallback, isCountry = true) {
        if (isSpinning) return;
        
        isSpinning = true;
        
        // Disable spin buttons during spinning
        spinCountryBtn.disabled = true;
        if (spinGenreBtn) spinGenreBtn.disabled = true;
        
        // Hide any previous results
        if (isCountry) {
            countryResult.classList.add('hidden');
        } else {
            genreResult.classList.add('hidden');
        }
        
        // Clear wheel segment text during spin
        const segments = wheel.querySelectorAll('.wheel-segment span');
        segments.forEach(segment => {
            segment.textContent = '';
        });
        
        // Randomly select an item
        const totalItems = items.length;
        const selectedIndex = Math.floor(Math.random() * totalItems);
        
        // Calculate rotation (multiple full rotations plus offset)
        const fullRotations = 5;
        const segmentAngle = 360 / totalItems;
        const rotation = 360 * fullRotations + (360 - (selectedIndex * segmentAngle)) + (Math.random() * segmentAngle);
        
        // Apply spinning animation
        wheel.style.transition = 'transform 4s cubic-bezier(0.2, 0.8, 0.3, 1)';
        wheel.style.transform = `rotate(${rotation}deg)`;
        
        // After spinning, show the result
        setTimeout(() => {
            // Show the selected item on the wheel segment
            if (isCountry) {
                document.getElementById(`country-segment-${selectedIndex}`).textContent = countries[selectedIndex].name;
            } else {
                document.getElementById(`genre-segment-${selectedIndex}`).textContent = genres[selectedIndex].name;
            }
            
            // Call the result callback with selected item
            resultCallback(items[selectedIndex]);
            
            // Re-enable spin buttons
            isSpinning = false;
            spinCountryBtn.disabled = false;
            if (spinGenreBtn) spinGenreBtn.disabled = false;
        }, 4000);
    }

    // Handle country selection
    function handleCountrySelected(country) {
        currentCountry = country;
        
        // Update UI with selected country
        selectedCountry.textContent = country.name;
        countryFlag.textContent = country.flag;
        
        // Show result
        setTimeout(() => {
            countryResult.classList.remove('hidden');
            // Scroll to result smoothly
            countryResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
    }

    // Handle genre selection
    function handleGenreSelected(genre) {
        currentGenre = genre;
        
        // Update UI with selected genre
        selectedGenre.textContent = genre.name;
        
        // Show result
        setTimeout(() => {
            genreResult.classList.remove('hidden');
            // Scroll to result smoothly
            genreResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
    }

    // Show search step with Google search button
    function showSearchStep() {
        // Update the search step with current selections
        displayCountry.textContent = currentCountry.name;
        displayGenre.textContent = currentGenre.name;
        
        // Create the search query
        const searchQueryTextValue = `${currentCountry.name} ${currentGenre.name} movies`;
        searchQuery.textContent = searchQueryTextValue;
        searchQueryText.textContent = searchQueryTextValue;
        
        // Set the Google search URL
        const encodedQuery = encodeURIComponent(searchQueryTextValue);
        googleSearchBtn.href = `https://www.google.com/search?q=${encodedQuery}`;
        
        // Switch to search step
        switchStep('searchStep');
        
        // Scroll to top of search section
        setTimeout(() => {
            searchStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }

    // Switch between steps
    function switchStep(stepId) {
        // Hide all steps
        countryStep.classList.remove('active');
        genreStep.classList.remove('active');
        searchStep.classList.remove('active');
        
        // Show selected step
        document.getElementById(stepId).classList.add('active');
    }

    // Restart the process
    function restartProcess() {
        // Reset wheels to initial position
        countryWheel.style.transition = 'none';
        countryWheel.style.transform = 'rotate(0deg)';
        genreWheel.style.transition = 'none';
        genreWheel.style.transform = 'rotate(0deg)';
        
        // Clear wheel segment text
        const countrySegments = countryWheel.querySelectorAll('.wheel-segment span');
        const genreSegments = genreWheel.querySelectorAll('.wheel-segment span');
        
        countrySegments.forEach(segment => segment.textContent = '');
        genreSegments.forEach(segment => segment.textContent = '');
        
        // Reset results
        countryResult.classList.add('hidden');
        genreResult.classList.add('hidden');
        
        // Reset state
        currentCountry = null;
        currentGenre = null;
        
        // Switch back to country step
        switchStep('countryStep');
        
        // Scroll to top
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
        
        // Auto-spin country wheel after a short delay
        setTimeout(() => {
            spinCountryBtn.click();
        }, 500);
    }

    // Set up event listeners
    function setupEventListeners() {
        // Spin country wheel
        spinCountryBtn.addEventListener('click', () => {
            spinWheel(countryWheel, countries, handleCountrySelected, true);
        });
        
        // Next to genre step
        nextToGenreBtn.addEventListener('click', () => {
            switchStep('genreStep');
            
            // Scroll to top of genre section
            setTimeout(() => {
                genreStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        });
        
        // Spin genre wheel
        spinGenreBtn.addEventListener('click', () => {
            spinWheel(genreWheel, genres, handleGenreSelected, false);
        });
        
        // Show search step
        showSearchBtn.addEventListener('click', () => {
            showSearchStep();
        });
        
        // Restart process
        restartBtn.addEventListener('click', () => {
            restartProcess();
        });
    }

    // Initialize the app
    init();
});
