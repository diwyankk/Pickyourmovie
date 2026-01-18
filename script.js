// Country list - all 195 countries [citation:4]
const allCountries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", 
    "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
    "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
    "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
    "Cameroon", "Canada", "Central African Republic", "Chad", "Chile",
    "China", "Colombia", "Comoros", "Congo", "Costa Rica",
    "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czechia",
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

// DOM Elements
const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

// Configuration
const totalCountries = allCountries.length;
const degreesPerCountry = 360 / totalCountries;

// Generate rotation values for each country
const rotationValues = [];
for (let i = 0; i < totalCountries; i++) {
    rotationValues.push({
        minDegree: i * degreesPerCountry,
        maxDegree: (i + 1) * degreesPerCountry,
        countryIndex: i
    });
}

// Generate colors for the wheel (cinematic color palette)
const generateCinematicColors = () => {
    const colors = [];
    const baseColors = [
        '#8B0000', '#FF4500', '#FFD700', '#32CD32', '#1E90FF',
        '#6A5ACD', '#8A2BE2', '#DA70D6', '#FF69B4', '#FF6347'
    ];
    
    for (let i = 0; i < totalCountries; i++) {
        colors.push(baseColors[i % baseColors.length]);
    }
    return colors;
};

const pieColors = generateCinematicColors();

// Create equal data array for all countries
const data = Array(totalCountries).fill(1);

// Create and configure the wheel chart [citation:1]
let myChart = new Chart(wheel, {
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
        labels: allCountries,
        datasets: [{
            backgroundColor: pieColors,
            data: data,
            borderWidth: 2,
            borderColor: '#000'
        }]
    },
    options: {
        responsive: true,
        animation: { duration: 0 },
        layout: {
            padding: 5
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return allCountries[context.dataIndex];
                    }
                }
            },
            legend: { display: false },
            datalabels: {
                color: "#FFFFFF",
                formatter: (_, context) => {
                    // Show abbreviated country names on wheel
                    const country = allCountries[context.dataIndex];
                    return country.length > 10 ? country.substring(0, 8) + '...' : country;
                },
                font: { 
                    size: 9,
                    weight: 'bold'
                },
                textAlign: 'center',
                rotation: (context) => {
                    const segmentAngle = 360 / totalCountries;
                    return (context.dataIndex * segmentAngle + segmentAngle / 2) % 360 - 90;
                }
            }
        }
    }
});

// Find which country was selected based on rotation angle
const getSelectedCountry = (angleValue) => {
    // Normalize angle to 0-360
    const normalizedAngle = ((angleValue % 360) + 360) % 360;
    
    for (let i = 0; i < rotationValues.length; i++) {
        if (normalizedAngle >= rotationValues[i].minDegree && 
            normalizedAngle < rotationValues[i].maxDegree) {
            return allCountries[rotationValues[i].countryIndex];
        }
    }
    return allCountries[0]; // Fallback
};

// Wheel spinning state
let count = 0;
let resultValue = Math.floor(Math.random() * 1000) + 1000; // Random large number for multiple spins
let currentRotation = 0;

// Spin button click handler
spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    finalValue.innerHTML = `<p><i class="fas fa-spinner fa-spin"></i> Spinning...</p>`;
    
    // Generate random rotation (5-10 full rotations plus random offset)
    const extraRotation = Math.floor(Math.random() * 360);
    const totalRotation = currentRotation + (5 * 360) + extraRotation;
    
    // Animate the wheel
    const animation = myChart.animate(0, {
        duration: 4000,
        easing: 'easeOutQuart',
        onComplete: function() {
            // Calculate final angle
            const finalAngle = totalRotation % 360;
            currentRotation = totalRotation;
            
            // Get selected country
            const selectedCountry = getSelectedCountry(finalAngle);
            
            // Display result with cinematic flair
            finalValue.innerHTML = `
                <p class="selected-country">${selectedCountry}</p>
                <p class="country-subtext">🎬 Today's Movie Destination! 🎬</p>
            `;
            
            // Re-enable spin button
            spinBtn.disabled = false;
            
            // Add celebration effect
            addCelebrationEffect();
        }
    });
    
    // Rotate the chart
    myChart.options.rotation = -totalRotation;
    myChart.update();
});

// Add celebration effect when country is selected
function addCelebrationEffect() {
    const resultDiv = document.getElementById('final-value');
    resultDiv.style.animation = 'none';
    setTimeout(() => {
        resultDiv.style.animation = 'celebrate 0.5s ease';
    }, 10);
    
    // Add CSS for celebration animation
    if (!document.querySelector('#celebration-styles')) {
        const style = document.createElement('style');
        style.id = 'celebration-styles';
        style.textContent = `
            @keyframes celebrate {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            .selected-country {
                font-size: 2.2rem !important;
                color: #FFD700 !important;
                text-shadow: 0 0 15px rgba(255, 215, 0, 0.7) !important;
                animation: pulse 1.5s infinite !important;
            }
            .country-subtext {
                color: #4ECDC4 !important;
                font-size: 1rem !important;
                margin-top: 10px !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize with random rotation
myChart.options.rotation = -Math.floor(Math.random() * 360);
myChart.update();

console.log(`Wheel initialized with ${totalCountries} countries`);
