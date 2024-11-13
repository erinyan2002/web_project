document.addEventListener("DOMContentLoaded", () => {
    const photoInput = document.getElementById("photo-input");
    const titleInput = document.getElementById("title-input");
    const descriptionInput = document.getElementById("description-input");
    const uploadButton = document.getElementById("upload-button");
    const gallery = document.getElementById("gallery");
    const slideshowSection = document.getElementById("slideshow-section");
    const slideshow = document.getElementById("slideshow");
    const stopSlideshowButton = document.getElementById("stop-slideshow");

    let photos = [];
    let slideshowInterval;

    // 사진 업로드
    uploadButton.addEventListener("click", () => {
        const file = photoInput.files[0];
        const title = titleInput.value;
        const description = descriptionInput.value;

        if (!file) {
            alert("사진을 선택하세요.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const photoData = {
                src: reader.result,
                title,
                description,
            };
            photos.push(photoData);
            renderGallery();
            renderSlideshow();
        };
        reader.readAsDataURL(file);

        // 입력 필드 초기화
        photoInput.value = "";
        titleInput.value = "";
        descriptionInput.value = "";
    });

    // 갤러리 렌더링
    function renderGallery() {
        gallery.innerHTML = "";
        photos.forEach((photo) => {
            const div = document.createElement("div");
            div.classList.add("gallery-item");
            div.innerHTML = `
                <img src="${photo.src}" alt="${photo.title}">
                <h3>${photo.title}</h3>
                <p>${photo.description}</p>
            `;
            gallery.appendChild(div);
        });
    }

    // 슬라이드쇼 렌더링
    function renderSlideshow() {
        if (photos.length === 0) return;

        slideshow.innerHTML = "";
        photos.forEach((photo, index) => {
            const img = document.createElement("img");
            img.src = photo.src;
            img.alt = photo.title;
            img.style.opacity = index === 0 ? "1" : "0";
            slideshow.appendChild(img);
        });

        if (slideshowInterval) clearInterval(slideshowInterval);
        let currentIndex = 0;

        slideshowInterval = setInterval(() => {
            const images = slideshow.querySelectorAll("img");
            images.forEach((img, index) => {
                img.style.opacity = index === currentIndex ? "1" : "0";
            });
            currentIndex = (currentIndex + 1) % images.length;
        }, 3000);

        slideshowSection.classList.remove("hidden");
    }

    // 슬라이드쇼 정지
    stopSlideshowButton.addEventListener("click", () => {
        if (slideshowInterval) clearInterval(slideshowInterval);
        slideshowSection.classList.add("hidden");
    });
});
