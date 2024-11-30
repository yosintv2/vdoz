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

// Function to display highlights with manual ads after every 3rd video
function displayHighlightsWithManualAds(highlights) {
    const container = document.getElementById('highlightsContainer');
    let videoCount = 0;

    highlights.forEach((highlight, index) => {
        // Create a new row every three videos
        if (videoCount % 3 === 0) {
            const row = document.createElement('div');
            row.className = 'row';
            container.appendChild(row);
        }

        const currentRow = container.lastChild;

        // Add the video highlight
        const videoUrl = getVideoUrl(highlight.video);
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
            currentRow.appendChild(div);
            videoCount++;
        }

        // Manually add Google Ads after every 3 videos
        if (videoCount % 3 === 0) {
            addGoogleAd();
        }
    });
}

// Function to manually add Google Ads
function addGoogleAd() {
    const adDiv = document.createElement('div');
    adDiv.className = 'ad';
    adDiv.innerHTML = `
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-XXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"></ins>
        <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
    `;
    document.getElementById('highlightsContainer').appendChild(adDiv);
}

// Function to fetch and display JSON data
function loadHighlights(jsonPath) {
    fetch(jsonPath)
        .then(response => response.json())
        .then(data => {
            displayHighlightsWithManualAds(data.highlights);
        })
        .catch(error => console.error('Error loading JSON:', error));
}

// Initialize the highlights with ads
document.addEventListener('DOMContentLoaded', () => {
    loadHighlights('highlights.json'); // Update the JSON file path if necessary
});
