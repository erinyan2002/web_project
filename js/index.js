document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("intro-screen");
  const mainContent = document.getElementById("main-content");
  const enterSiteBtn = document.getElementById("enter-site-btn");

  // Intro Screen 초기화
  const initIntroScreen = () => {
    const introSeen = localStorage.getItem("introSeen");
    if (introSeen === "true") {
      introScreen.style.display = "none"; // 인트로 화면 숨기기
      mainContent.classList.remove("hidden"); // 메인 컨텐츠 표시
    } else {
      introScreen.style.display = "flex"; // 인트로 화면 표시
      mainContent.classList.add("hidden"); // 메인 컨텐츠 숨기기
    }
  };

  enterSiteBtn.addEventListener("click", () => {
    introScreen.style.animation = "fade-out 1s forwards";
    setTimeout(() => {
      introScreen.style.display = "none";
      localStorage.setItem("introSeen", "true"); // 인트로 본 상태 저장
      mainContent.classList.remove("hidden"); // 메인 컨텐츠 표시
    }, 1000);
  });

  // Slider and Modal functionality
  const slideContainer = document.querySelector(".slide");
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modal-image");
  const modalDescription = document.getElementById("modal-description");
  const closeModal = document.getElementById("close-modal");
  const modalLikeBtn = document.getElementById("modal-like-btn");
  const modalDeleteBtn = document.getElementById("modal-delete-btn");
  const modalShareBtn = document.getElementById("modal-share-btn");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let photos = JSON.parse(localStorage.getItem("photos")) || [];
  let likes = JSON.parse(localStorage.getItem("likes")) || [];
  let currentIndex = 0;

  const renderSlider = () => {
    if (photos.length === 0) {
      slideContainer.innerHTML = "<p>저장된 사진이 없습니다.</p>";
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    slideContainer.innerHTML = photos
      .map(
        (photo, index) => `
          <div 
            class="item ${likes.includes(index) ? "liked" : ""}" 
            style="background-image: url('${photo.image}'); 
                   transform: translateX(${(index - currentIndex) * 100}%);"
            data-index="${index}">

            <div class="content">
              <div class="name">Photo ${index + 1}</div>
              <div class="des">${photo.description || "No description"}</div>
              <div class="des">${photo.date || "No date"}</div>
              <i class="heart-icon">❤</i>
            </div>
          </div>
        `
      )
      .join("");

    updateButtonState();
    attachItemListeners();
  };

  const updateButtonState = () => {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === photos.length - 1;
  };

  const attachItemListeners = () => {
    document.querySelectorAll(".item").forEach((item) => {
      item.addEventListener("click", (e) => {
        const index = e.currentTarget.getAttribute("data-index");
        showModal(index);
      });
    });
  };

  const showModal = (index) => {
    currentIndex = parseInt(index, 10);
    const photo = photos[currentIndex];
    modalImage.src = photo.image;

    modalDescription.innerHTML = `
    <div class="content-data">
      <p><strong>Description:</strong> ${
        photo.description || "No description available."
      }</p>
      <p><strong>Date:</strong> ${photo.date || "No date available."}</p>
      <p class="location-data"><strong>Location:</strong> ${
        photo.location || "No location available."
      }</p> </div>
    `;

    modal.classList.remove("hidden");

    if (likes.includes(currentIndex)) {
      modalLikeBtn.classList.add("liked");
    } else {
      modalLikeBtn.classList.remove("liked");
    }
  };

  const deletePhoto = () => {
    if (currentIndex !== null && photos[currentIndex]) {
      photos.splice(currentIndex, 1);
      likes = likes.filter((likeIndex) => likeIndex !== currentIndex);
      localStorage.setItem("photos", JSON.stringify(photos));
      localStorage.setItem("likes", JSON.stringify(likes));
      modal.classList.add("hidden");
      currentIndex = Math.max(0, currentIndex - 1);
      renderSlider();
    }
  };

  const sharePhoto = () => {
    if (currentIndex !== null && photos[currentIndex]) {
      const photo = photos[currentIndex];
      navigator.clipboard.writeText(photo.image).then(() => {
        alert("Image URL copied to clipboard!");
      });
    }
  };

  const toggleLike = () => {
    if (currentIndex !== null) {
      if (likes.includes(currentIndex)) {
        likes = likes.filter((likeIndex) => likeIndex !== currentIndex);
      } else {
        likes.push(currentIndex);
      }
      localStorage.setItem("likes", JSON.stringify(likes));
      renderSlider();
      showModal(currentIndex);
    }
  };

  const showPrev = () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderSlider();
    }
  };

  const showNext = () => {
    if (currentIndex < photos.length - 1) {
      currentIndex++;
      renderSlider();
    }
  };

  // Event listeners
  prevBtn.addEventListener("click", showPrev);
  nextBtn.addEventListener("click", showNext);
  closeModal.addEventListener("click", () => modal.classList.add("hidden"));
  modalLikeBtn.addEventListener("click", toggleLike);
  modalDeleteBtn.addEventListener("click", deletePhoto);
  modalShareBtn.addEventListener("click", sharePhoto);

  // Initial render
  renderSlider();
  // 초기화 함수 호출
  initIntroScreen();
});
