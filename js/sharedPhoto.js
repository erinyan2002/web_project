document.addEventListener("DOMContentLoaded", () => {
    const sharedPhotoContainer = document.getElementById("shared-photo-container");
  
    // URL에서 ID 추출
    const urlParams = new URLSearchParams(window.location.search);
    const photoId = urlParams.get("id");
  
    if (!photoId) {
      sharedPhotoContainer.innerHTML = "<p>사진 ID가 제공되지 않았습니다.</p>";
      return;
    }
  
    // 로컬 스토리지에서 공유된 사진 데이터 가져오기 (가상 서버 로직)
    const sharedPhotos = JSON.parse(localStorage.getItem("sharedPhotos")) || [];
    const photo = sharedPhotos[photoId];
  
    if (!photo) {
      sharedPhotoContainer.innerHTML = "<p>공유된 사진을 찾을 수 없습니다.</p>";
      return;
    }
  
    // 공유된 사진 표시
    sharedPhotoContainer.innerHTML = `
      <div class="photo-slide">
        <img src="${photo.image}" alt="Shared Photo" class="slide-image" />
        <div class="slide-details">
          <p><strong>위치:</strong> ${photo.location || "위치 정보 없음"}</p>
          <p><strong>설명:</strong> ${photo.description || "설명 없음"}</p>
        </div>
      </div>
    `;
  });
