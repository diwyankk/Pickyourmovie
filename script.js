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

    // Movie database
    const movieDatabase = {
        "United States": {
            "Action": { 
                title: "The Dark Knight", 
                year: "2008", 
                rating: "9.0/10", 
                description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
            },
            "Drama": { 
                title: "The Shawshank Redemption", 
                year: "1994", 
                rating: "9.3/10", 
                description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
            },
            "Sci-Fi": { 
                title: "Inception", 
                year: "2010", 
                rating: "8.8/10", 
                description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
            },
            "Comedy": { 
                title: "The Grand Budapest Hotel", 
                year: "2014", 
                rating: "8.1/10", 
                description: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge."
            }
        },
        "India": {
            "Drama": { 
                title: "3 Idiots", 
                year: "2009", 
                rating: "8.4/10", 
                description: "Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently, even as the rest of the world called them 'idiots'."
            },
            "Action": { 
                title: "Baahubali: The Beginning", 
                year: "2015", 
                rating: "8.0/10", 
                description: "In ancient India, an adventurous and daring man becomes involved in a decades-old feud between two warring peoples."
            },
            "Romance": { 
                title: "Dilwale Dulhania Le Jayenge", 
                year: "1995", 
                rating: "8.1/10", 
                description: "When Raj meets Simran in Europe, it isn't love at first sight but when Simran moves to India for an arranged marriage, love makes its presence felt."
            }
        },
        "Japan": {
            "Animation": { 
                title: "Spirited Away", 
                year: "2001", 
                rating: "8.6/10", 
                description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts."
            },
            "Drama": { 
                title: "Seven Samurai", 
                year: "1954", 
                rating: "8.6/10", 
                description: "Farmers from a village exploited by bandits hire a veteran samurai for protection, who gathers six other samurai to join him."
            },
            "Action": { 
                title: "Kill Bill: Vol. 1", 
                year: "2003", 
                rating: "8.2/10", 
                description: "After awakening from a four-year coma, a former assassin wreaks vengeance on the team of assassins who betrayed her."
            }
        },
        "France": {
            "Drama": { 
                title: "Amélie", 
                year: "2001", 
                rating: "8.3/10", 
                description: "Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and, along the way, discovers love."
            },
            "Romance": { 
                title: "Blue Is the Warmest Colour", 
                year: "2013", 
                rating: "7.7/10", 
                description: "Adèle's life is changed when she meets Emma, a young woman with blue hair, who will allow her to discover desire and to assert herself as a woman and as an adult."
            },
            "Comedy": { 
                title: "The Intouchables", 
                year: "2011", 
                rating: "8.5/10", 
                description: "After he becomes a quadriplegic from a paragliding accident, an aristocrat hires a young man from the projects to be his caregiver."
            }
        }
    };

    // Fallback movies if country/genre combination not found
    const fallbackMovies = [
        { 
            title: "Parasite", 
            country: "South Korea", 
            genre: "Thriller", 
            year: "2019", 
            rating: "8.6/10", 
            description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan."
        },
        { 
            title: "City of God", 
            country: "Brazil", 
            genre: "Crime", 
            year: "2002", 
            rating: "8.6/10", 
            description: "In the slums of Rio, two kids' paths diverge as one struggles to become a photographer and the other a kingpin."
        },
        { 
            title: "Life Is Beautiful", 
            country: "Italy", 
            genre: "Drama", 
            year: "1997", 
            rating: "8.6/10", 
            description: "When an open-minded Jewish librarian and his son become victims of the Holocaust, he uses a perfect mixture of will, humor, and imagination to protect his son from the dangers around their camp."
        }
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
    const showMovieBtn = document.getElementById('showMovieBtn');
    const restartBtn = document.getElementById('restartBtn');
    
    // Movie elements
    const movieTitle = document.getElementById('movieTitle');
    const movieCountry = document.getElementById('movieCountry');
    const movieGenre = document.getElementById('movieGenre');
    const movieYear = document.getElementById('movieYear');
    const movieRating = document.getElementById('movieRating');
    const movieDescription = document.getElementById('movieDescription');
    
    // Step sections
    const countryStep = document.getElementById('countryStep');
    const genreStep = document.getElementById('genreStep');
    const movieStep = document.getElementById('movieStep');
    
    // State variables
    let currentCountry = null;
    let currentGenre = null;
    let isSpinning = false;
    let usedCombinations = [];

    // Initialize the application
    function init() {
        createCountryWheel();
        createGenreWheel();
        setupEventListeners();
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

    // Show movie recommendation
    function showMovieRecommendation() {
        // Find movie based on country and genre
        let movie = null;
        
        if (movieDatabase[currentCountry.name] && movieDatabase[currentCountry.name][currentGenre.name]) {
            movie = movieDatabase[currentCountry.name][currentGenre.name];
        } else {
            // Use a fallback movie
            const randomIndex = Math.floor(Math.random() * fallbackMovies.length);
            movie = fallbackMovies[randomIndex];
            // Update current selection to match fallback
            currentCountry = { name: movie.country, flag: getFlagForCountry(movie.country) };
            currentGenre = { name: movie.genre };
        }
        
        // Update movie details in UI
        movieTitle.textContent = movie.title;
        movieCountry.textContent = currentCountry.name;
        movieGenre.textContent = currentGenre.name;
        movieYear.textContent = movie.year;
        movieRating.textContent = movie.rating;
        movieDescription.textContent = movie.description;
        
        // Track this combination to avoid repeats
        usedCombinations.push(`${currentCountry.name}-${currentGenre.name}`);
        
        // Switch to movie step
        switchStep('movieStep');
        
        // Scroll to top of movie section
        setTimeout(() => {
            movieStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }

    // Helper function to get flag for a country
    function getFlagForCountry(countryName) {
        const country = countries.find(c => c.name === countryName);
        return country ? country.flag : "🇺🇸";
    }

    // Switch between steps
    function switchStep(stepId) {
        // Hide all steps
        countryStep.classList.remove('active');
        genreStep.classList.remove('active');
        movieStep.classList.remove('active');
        
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
        
        // Show movie recommendation
        showMovieBtn.addEventListener('click', () => {
            showMovieRecommendation();
        });
        
        // Restart process
        restartBtn.addEventListener('click', () => {
            restartProcess();
        });
        
        // Auto-spin country wheel on page load after a short delay
        setTimeout(() => {
            spinCountryBtn.click();
        }, 1000);
    }

    // Initialize the app
    init();
});
