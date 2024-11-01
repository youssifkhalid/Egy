document.addEventListener('DOMContentLoaded', function() {
    const videoGrid = document.getElementById('video-grid');
    const subcategoryButtons = document.querySelectorAll('.subcategory-btn');
    
    // Simulated video data (replace with actual data from a backend)
    const videos = [
        { id: 1, title: 'فيديو 1', category: 'movies', subcategory: 'comedy', url: 'https://example.com/video1.mp4' },
        { id: 2, title: 'فيديو 2', category: 'movies', subcategory: 'horror', url: 'https://example.com/video2.mp4' },
        { id: 3, title: 'فيديو 3', category: 'cartoons', url: 'https://example.com/video3.mp4' },
        { id: 4, title: 'فيديو 4', category: 'sports', subcategory: 'matches', url: 'https://example.com/video4.mp4' },
        { id: 5, title: 'فيديو 5', category: 'sports', subcategory: 'live', url: 'https://example.com/video5.mp4' },
    ];

    function displayVideos(category, subcategory = '') {
        videoGrid.innerHTML = '';
        const filteredVideos = videos.filter(video => 
            video.category === category && 
            (subcategory === '' || video.subcategory === subcategory)
        );

        filteredVideos.forEach(video => {
            const  videoCard = document.createElement('div');
            videoCard.className = 'video-card';
            videoCard.innerHTML = `
                <h3>${video.title}</h3>
                <video src="${video.url}" controls></video>
            `;
            videoGrid.appendChild(videoCard);
        });
    }

    // Display initial videos based on the current page
    const currentPage = window.location.pathname.split('/').pop().split('.')[0];
    displayVideos(currentPage);

    // Add event listeners to subcategory buttons
    subcategoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const subcategory = this.dataset.category;
            displayVideos(currentPage, subcategory);
        });
    });
});