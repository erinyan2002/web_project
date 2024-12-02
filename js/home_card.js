document.addEventListener("DOMContentLoaded", () => {
  const slideshowContainer = document.getElementById("slideshow-container");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  // 로컬 스토리지에서 photos 데이터를 가져오기
  const photos = JSON.parse(localStorage.getItem("photos")) || [];
  let currentIndex = 0;

  if (photos.length === 0) {
    slideshowContainer.innerHTML = "<p>저장된 사진이 없습니다.</p>";
    return;
  }

  // 슬라이드 표시 업데이트 함수
  const updateSlideshow = () => {
    const photo = photos[currentIndex];
    slideshowContainer.innerHTML = `
      <div class="photo-slide">
        <img src="${photo.image}" alt="Photo" class="slide-image" />
        <div class="slide-details">
          <p><strong>위치:</strong> ${photo.location}</p>
          <p><strong>설명:</strong> ${photo.description}</p>
        </div>
      </div>
    `;
  };

  // 이전 버튼 클릭 핸들러
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    updateSlideshow();
  });

  // 다음 버튼 클릭 핸들러
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % photos.length;
    updateSlideshow();
  });

  // 초기 슬라이드 표시
  updateSlideshow();
});
