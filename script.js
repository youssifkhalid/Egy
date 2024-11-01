document.addEventListener('DOMContentLoaded', function() {
    const videoGrid = document.getElementById('video-grid');
    const subcategoryButtons = document.querySelectorAll('.subcategory-btn');
    
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
                <h3>${video.title}</h3>
                <video src="${video.url}" controls></video>
                <p>${video.description}</p>
            `;
            videoGrid.appendChild(videoCard);
        });
    }

    // عرض الفيديوهات الأولية بناءً على الصفحة الحالية
    const currentPage = window.location.pathname.split('/').pop().split('.')[0];
    displayVideos(currentPage);

    // إضافة مستمعي الأحداث لأزرار التصنيف الفرعي
    subcategoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const subcategory = this.dataset.category;
            displayVideos(currentPage, subcategory);
        });
    });
});
