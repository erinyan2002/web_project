document.addEventListener("DOMContentLoaded", () => {
    const slideshowContainer = document.getElementById("slideshow-container");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
  
    let photos = JSON.parse(localStorage.getItem("photos")) || []; // 로컬스토리지에서 데이터 가져오기
    let currentIndex = 0;
  
    // 슬라이드를 표시하는 함수
    function showSlide(index) {
      slideshowContainer.innerHTML = ""; // 기존 슬라이드 초기화
      if (photos.length === 0) {
        // 사진이 없을 경우
        slideshowContainer.innerHTML = "<p>표시할 사진이 없습니다.</p>";
        return;
      }
  
      const photo = photos[index]; // 현재 인덱스의 사진 데이터
  
      const slide = document.createElement("div");
      slide.className = "slide";
      photos.forEach((photo, index) => {
      const img = document.createElement("img");
      img.src = photo.image;
      img.alt = "Uploaded Photo";
      img.style.maxWidth = "100%"; // 이미지 크기 조정
      img.style.borderRadius = "10px";
      img.alt = `Photo ${index + 1}`;
      slideshowContainer.appendChild(img);
      });
  
      const caption = document.createElement("div");
      caption.className = "caption";
      caption.innerHTML = `
        <p>${photo.description || "No Description"}</p>
        <p><small>${photo.location || "Unknown Location"}</small></p>
      `;
  
      slide.appendChild(img);
      slide.appendChild(caption);
      slideshowContainer.appendChild(slide); // 슬라이드 컨테이너에 추가
    }
  
    // 이전 버튼 클릭 시
    prevBtn.addEventListener("click", () => {
      if (photos.length > 0) {
        currentIndex = (currentIndex - 1 + photos.length) % photos.length;
        showSlide(currentIndex);
      }
    });
  
    // 다음 버튼 클릭 시
    nextBtn.addEventListener("click", () => {
      if (photos.length > 0) {
        currentIndex = (currentIndex + 1) % photos.length;
        showSlide(currentIndex);
      }
    });
  
    // 초기 슬라이드 표시
    showSlide(currentIndex);
  });
  