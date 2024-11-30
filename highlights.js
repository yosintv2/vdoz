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

// Function to display highlights dynamically using Bootstrap grid classes
function displayHighlightsWithBootstrap(highlights) {
    const container = document.getElementById('highlightsContainer');
    highlights.forEach(highlight => {
        // Create a new div for each highlight
        const div = document.createElement('div');
        div.className = 'col-md-4 mb-4';  // Bootstrap class for 1/3 width on medium screens

        // Construct HTML for each highlight
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

// Function to fetch and display JSON data
function loadHighlights(jsonPath) {
    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            displayHighlightsWithBootstrap(data.highlights);
        })
        .catch(error => console.error('Error loading JSON:', error));
}

// Initialize the highlights with Bootstrap layout
document.addEventListener('DOMContentLoaded', () => {
    loadHighlights('highlights.json'); // Update the JSON file path if necessary
});
