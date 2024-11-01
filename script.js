document.addEventListener('DOMContentLoaded', function() {
    const videoGrid = document.getElementById('video-grid');
    const subcategoryButtons = document.querySelectorAll('.subcategory-btn');
    const videoPlayer = document.getElementById('video-player');
    const videoTitle = document.getElementById('video-title');
    const videoDescription = document.getElementById('video-description');
    
    // استرجاع الفيديوهات من التخزين المحلي
    const videos = JSON.parse(localStorage.getItem('videos')) || [];

    function displayVideos(category, subcategory = '') {
        videoGrid.innerHTML = '';
        const filteredVideos = videos.filter(video => 
            video.category === category && 
            (subcategory === '' || video.subcategory === subcategory)
        );

        filteredVideos.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';
            videoCard.innerHTML = `
                <img src="https://img.youtube.com/vi/${getYouTubeID(video.url)}/0.jpg" alt="${video.title}">
                <div class="video-info">
                    <h3>${video.title}</h3>
                    <p>${video.description.substring(0, 60)}...</p>
                </div>
            `;
            videoCard.addEventListener('click', () => playVideo(video));
            videoGrid.appendChild(videoCard);
        });
    }

    function playVideo(video) {
        videoPlayer.src = `https://www.youtube.com/embed/${getYouTubeID(video.url)}`;
        videoTitle.textContent = video.title;
        videoDescription.textContent = video.description;
        document.querySelector('.video-player').style.display = 'block';
        document.querySelector('.video-details').style.display = 'block';
    }

    function getYouTubeID(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    // عرض الفيديوهات الأولية بناءً على الصفحة الحالية
    const currentPage = window.location.pathname.split('/').pop().split('.')[0];
    displayVideos(currentPage);

    // إضافة مستمعي الأحداث لأزرار التصنيف الفرعي
    subcategoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            subcategoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const subcategory = this.dataset.category;
            displayVideos(currentPage, subcategory);
        });
    });
});
