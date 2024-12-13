document.addEventListener("DOMContentLoaded", () => {
  const photoGrid = document.getElementById("photo-grid");
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modal-image");
  const modalDescription = document.getElementById("modal-description");
  const closeModal = document.getElementById("close-modal");
  const modalLikeBtn = document.getElementById("modal-like-btn");
  const modalDeleteBtn = document.getElementById("modal-delete-btn");
  const modalSaveBtn = document.getElementById("modal-save-btn"); // Save 버튼
  let photos = JSON.parse(localStorage.getItem("photos")) || [];
  let likes = JSON.parse(localStorage.getItem("likes")) || [];
  let currentIndex = 0;

  // 사진 그리드 렌더링
  const renderPhotoGrid = () => {
    photoGrid.innerHTML = photos
      .map(
        (photo, index) => `
        <div class="photo-card ${likes.includes(index) ? "liked" : ""}" data-index="${index}">
          <img src="${photo.image}" alt="Photo ${index + 1}" />
          <div class="like-icon">❤</div> <!-- 작은 하트 추가 -->
          <div class="card-overlay">
            <span>${photo.description || "No description"}</span>
            <span>${photo.date || "No date"}</span>
          </div>
        </div>
      `
      )
      .join("");

    attachCardListeners();
  };

  // 사진 카드 이벤트 리스너 추가
  const attachCardListeners = () => {
    const photoCards = document.querySelectorAll(".photo-card");
    photoCards.forEach((card) => {
      const index = parseInt(card.dataset.index, 10);
      const likeIcon = card.querySelector(".like-icon");

      // 카드 클릭 이벤트 (모달 열기)
      card.addEventListener("click", () => {
        showModal(index);
      });

      // 작은 하트 클릭 이벤트 (좋아요 토글)
      likeIcon.addEventListener("click", (e) => {
        e.stopPropagation(); // 카드 클릭과 별도로 처리
        toggleLike(index); // 좋아요 토글
      });
    });
  };

  // 모달 표시
  const showModal = (index) => {
    currentIndex = index;
    const photo = photos[currentIndex];
    modalImage.src = photo.image;
    modalImage.style.filter = photo.filter || "none"; // 필터 적용

    modalDescription.innerHTML = `
    <div class="content-data">
      <p><strong>Description:</strong> ${photo.description || "No description available."}</p>
      <p><strong>Date:</strong> ${photo.date || "No date available."}</p>
      <p class="location-data"><strong>Location:</strong> ${photo.location || "No location available."}</p>
    </div>
    `;

    modal.classList.remove("hidden");

    // 모달 좋아요 버튼 상태 업데이트
    updateLikeButton(currentIndex);
  };

  // 좋아요 토글 함수
  const toggleLike = (index) => {
    if (likes.includes(index)) {
      likes = likes.filter((likeIndex) => likeIndex !== index); // 좋아요 해제
    } else {
      likes.push(index); // 좋아요 추가
    }
    localStorage.setItem("likes", JSON.stringify(likes)); // 좋아요 상태 저장

    // UI 업데이트
    updateAllLikes(index);
  };

  // 좋아요 상태 모든 UI에 업데이트
  const updateAllLikes = (index) => {
    // 홈 화면의 사진 카드
    const photoCards = document.querySelectorAll(".photo-card");
    photoCards.forEach((card) => {
      if (parseInt(card.dataset.index, 10) === index) {
        card.classList.toggle("liked", likes.includes(index));
      }
    });

    // 모달 버튼 업데이트
    updateLikeButton(index);
  };

  // 모달 좋아요 버튼 상태 업데이트
  const updateLikeButton = (index) => {
    if (likes.includes(index)) {
      modalLikeBtn.classList.add("liked");
    } else {
      modalLikeBtn.classList.remove("liked");
    }
  };

  // 사진 삭제
  const deletePhoto = () => {
    if (currentIndex !== null && photos[currentIndex]) {
      photos.splice(currentIndex, 1);
      likes = likes.filter((likeIndex) => likeIndex !== currentIndex); // 좋아요 상태에서도 제거
      localStorage.setItem("photos", JSON.stringify(photos));
      localStorage.setItem("likes", JSON.stringify(likes));
      modal.classList.add("hidden");
      renderPhotoGrid(); // 그리드 업데이트
    }
  };

  // 사진 저장
  const savePhoto = () => {
    if (currentIndex !== null && photos[currentIndex]) {
      const photo = photos[currentIndex];
      const link = document.createElement("a");
      link.href = photo.image;
      link.download = `Photo_${currentIndex + 1}.png`; // 파일명 지정
      link.click();
    }
  };

  // 모달 닫기
  closeModal.addEventListener("click", () => modal.classList.add("hidden"));
  modalLikeBtn.addEventListener("click", () => toggleLike(currentIndex)); // 모달 내 좋아요
  modalDeleteBtn.addEventListener("click", deletePhoto);
  modalSaveBtn.addEventListener("click", savePhoto);

  // 초기화
  renderPhotoGrid();
});
