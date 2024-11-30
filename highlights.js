// Function to convert video URLs into embeddable or direct formats
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

        // Handle Custom Player URLs (e.g., yosintv2.github.io player)
        if (urlObj.hostname.includes('yosintv2.github.io') && urlObj.pathname.includes('plyrr.html')) {
            return url; // Use the custom player URL as-is
        }

        // Default case: Return the original URL
        return url;
    } catch (error) {
        console.error('Invalid video URL:', url);
        return '';
    }
}

// Function to display highlights dynamically on the page
function displayHighlights(highlights) {
    const container = document.getElementById('highlightsContainer');
    highlights.forEach(highlight => {
        const videoUrl = getVideoUrl(highlight.video); // Get direct video URL
        if (videoUrl) {
            const div = document.createElement('div');
            div.className = 'highlight';
            div.innerHTML = `
                <a href="${videoUrl}" target="_blank">
                    <img src="${highlight.image}" alt="${highlight.matchTitle}">
                </a>
                <a href="${videoUrl}" target="_blank">
                    <h2>${highlight.matchTitle}</h2>
                </a>
            `;
            container.appendChild(div);
        } else {
            console.warn('Skipping highlight with invalid video URL:', highlight);
        }
    });
}

// Function to fetch and display JSON data
function loadHighlights(jsonPath) {
    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            displayHighlights(data.highlights);
        })
        .catch(error => console.error('Error loading JSON:', error));
}

// Initialize the highlights by providing the JSON file path
document.addEventListener('DOMContentLoaded', () => {
    loadHighlights('highlights.json'); // Update the path if the JSON file is in another location
});
