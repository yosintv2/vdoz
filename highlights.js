// Function to convert video URLs into direct playable formats
function getVideoUrl(url) {
    try {
        const urlObj = new URL(url);

        // Handle YouTube
        if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
            const videoId = urlObj.searchParams.get('v') || urlObj.pathname.split('/')[1];
            return `https://www.youtube.com/watch?v=${videoId}`;
        }

        // Handle Vimeo
        if (urlObj.hostname.includes('vimeo.com')) {
            const videoId = urlObj.pathname.split('/')[1];
            return `https://vimeo.com/${videoId}`;
        }

        // Handle Dailymotion
        if (urlObj.hostname.includes('dailymotion.com')) {
            const videoId = urlObj.pathname.split('/')[2];
            return `https://www.dailymotion.com/video/${videoId}`;
        }

        // Handle Custom Player URLs
        if (urlObj.hostname.includes('yosintv2.github.io') && urlObj.pathname.includes('plyrr.html')) {
            return url;
        }

        // Default case: Return the original URL
        return url;
    } catch (error) {
        console.error('Invalid video URL:', url);
        return '';
    }
}

// Function to display cricket highlights
function displayCricketHighlights(cricket) {
    const container = document.getElementById('highlightsContainer');
    cricket.forEach(highlight => {
        const div = document.createElement('div');
        div.className = 'highlight';
        const videoUrl = getVideoUrl(highlight.video);
        if (videoUrl) {
            div.innerHTML = `
                <div class="highlight">
                    <a href="${videoUrl}" target="_blank">
                        <img src="${highlight.image}" alt="${highlight.matchTitle}">
                    </a>
                    <a href="${videoUrl}" target="_blank">
                        <h2>${highlight.matchTitle}</h2>
                    </a>
                </div>
            `;
            container.appendChild(div);
        }
    });
}

// Function to display football highlights by league
function displayFootballHighlights(football) {
    for (const league in football) {
        const leagueSection = document.createElement('div');
        leagueSection.className = 'league-section';
        const leagueTitle = document.createElement('h3');
        leagueTitle.textContent = league;
        leagueSection.appendChild(leagueTitle);

        football[league].forEach(highlight => {
            const div = document.createElement('div');
            div.className = 'highlight';
            const videoUrl = getVideoUrl(highlight.video);
            if (videoUrl) {
                div.innerHTML = `
                    <div class="highlight">
                        <a href="${videoUrl}" target="_blank">
                            <img src="${highlight.image}" alt="${highlight.matchTitle}">
                        </a>
                        <a href="${videoUrl}" target="_blank">
                            <h2>${highlight.matchTitle}</h2>
                        </a>
                    </div>
                `;
                leagueSection.appendChild(div);
            }
        });

        document.getElementById('highlightsContainer').appendChild(leagueSection);
    }
}

// Function to load highlights from JSON
function loadHighlights(jsonPath) {
    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            // Display Cricket Highlights
            displayCricketHighlights(data.cricket);

            // Display Football Highlights
            displayFootballHighlights(data.football);
        })
        .catch(error => console.error('Error loading JSON:', error));
}

// Initialize the highlights
document.addEventListener('DOMContentLoaded', () => {
    loadHighlights('highlights.json'); // Adjust path to your JSON file if necessary
});
