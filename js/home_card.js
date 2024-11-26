document.addEventListener("DOMContentLoaded", () => {
  const slideshowContainer = document.getElementById("slideshow-container");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  let photos = JSON.parse(localStorage.getItem("photos")) || [];
  let currentIndex = 0;

  // 슬라이드 표시
  function showSlide(index) {
    slideshowContainer.innerHTML = ""; // 이전 슬라이드 초기화
    if (photos.length === 0) {
      slideshowContainer.innerHTML = "<p>슬라이드에 표시할 사진이 없습니다.</p>";
      return;
    }

    const photo = photos[index];

    const slide = document.createElement("div");
    slide.className = "slide";

    const img = document.createElement("img");
    img.src = photo.image;
    img.alt = "Uploaded Photo";

    const caption = document.createElement("div");
    caption.className = "caption";
    caption.innerHTML = `
      <p>${photo.description}</p>
      <p><small>${photo.location}</small></p>
    `;

    slide.appendChild(img);
    slide.appendChild(caption);
    slideshowContainer.appendChild(slide);
  }

  // 이전 버튼 클릭
  prevBtn.addEventListener("click", () => {
    if (photos.length > 0) {
      currentIndex = (currentIndex - 1 + photos.length) % photos.length;
      showSlide(currentIndex);
    }
  });

  // 다음 버튼 클릭
  nextBtn.addEventListener("click", () => {
    if (photos.length > 0) {
      currentIndex = (currentIndex + 1) % photos.length;
      showSlide(currentIndex);
    }
  });

  // 초기 슬라이드 표시
  showSlide(currentIndex);
});
