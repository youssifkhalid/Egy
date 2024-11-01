document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('admin-login-form');
    const adminPanel = document.getElementById('admin-panel');
    const uploadForm = document.getElementById('upload-form');
    const categorySelect = document.getElementById('video-category');
    const subcategorySelect = document.getElementById('video-subcategory');
    const videoManagement = document.getElementById('video-management');

    const ADMIN_PHONE = '01092812463';
    const ADMIN_PASSWORD = 'Aa123456#';

    let videos = JSON.parse(localStorage.getItem('videos')) || [];

    const subcategories = {
        movies: ['comedy', 'horror', 'new', 'old', 'foreign'],
        cartoons: [],
        sports: ['matches', 'live']
    };

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;

        if (phone === ADMIN_PHONE && password === ADMIN_PASSWORD) {
            document.getElementById('login-form').style.display = 'none';
            adminPanel.style.display = 'block';
            displayVideos();
        } else {
            alert('رقم الهاتف أو كلمة المرور غير صحيحة');
        }
    });

    categorySelect.addEventListener('change', function() {
        const category = this.value;
        subcategorySelect.innerHTML = '<option value="">اختر التصنيف الفرعي</option>';
        
        if (subcategories[category]) {
            subcategories[category].forEach(sub => {
                const option = document.createElement('option');
                option.value = sub;
                option.textContent = sub;
                subcategorySelect.appendChild(option);
            });
        }
    });

    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const videoData = {
            id: Date.now(),
            title: document.getElementById('video-title').value,
            url: document.getElementById('video-url').value,
            description: document.getElementById('video-description').value,
            category: categorySelect.value,
            subcategory: subcategorySelect.value
        };

        videos.push(videoData);
        localStorage.setItem('videos', JSON.stringify(videos));
        alert('تم رفع الفيديو بنجاح!');
        uploadForm.reset();
        displayVideos();
    });

    function displayVideos() {
        videoManagement.innerHTML = '';
        videos.forEach(video => {
            const videoElement = document.createElement('div');
            videoElement.className = 'video-item';
            videoElement.innerHTML = `
                <h4>${video.title}</h4>
                <p>الفئة: ${video.category}</p>
                <p>التصنيف الفرعي: ${video.subcategory || 'غير محدد'}</p>
                <button onclick="deleteVideo(${video.id})">حذف</button>
            `;
            videoManagement.appendChild(videoElement);
        });
    }

    window.deleteVideo = function(id) {
        videos = videos.filter(video => video.id !== id);
        localStorage.setItem('videos', JSON.stringify(videos));
        displayVideos();
    };
});
