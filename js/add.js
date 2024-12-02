document.addEventListener("DOMContentLoaded", () => {
  const fileSelectorButton = document.getElementById("file-selector-button");
  const fileInput = document.getElementById("file-input");
  const uploadContainer = document.getElementById("upload-container");
  const photoBox = document.getElementById("photo-box");
  const previewImg = document.getElementById("preview-img");
  const addLocationButton = document.getElementById("add-location");
  const locationInput = document.getElementById("location-input");
  const addButton = document.getElementById("add-button");

  let selectedLocation = ""; // 선택된 위치 저장

  // 파일 선택 버튼 클릭
  fileSelectorButton.addEventListener("click", () => {
    fileInput.click();
  });

  // 파일 선택 시 처리
  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImg.src = e.target.result; // 이미지 미리보기
        photoBox.classList.remove("hidden");
        uploadContainer.classList.add("hidden");
        console.log("Image Loaded:", previewImg.src); // 디버깅 로그
      };
      reader.readAsDataURL(file);
    } else {
      console.error("No file selected");
    }
  });

  // Add To Home 버튼 클릭
  addButton.addEventListener("click", () => {
    const description = document.getElementById("photo-description").value;

    if (previewImg.src && description) {
      const photoData = {
        location: selectedLocation || "위치 정보 없음",
        description: description,
        image: previewImg.src,
      };

      // localStorage 저장
      const savedPhotos = JSON.parse(localStorage.getItem("photos")) || [];
      savedPhotos.push(photoData);
      localStorage.setItem("photos", JSON.stringify(savedPhotos));

      console.log("PhotoSaved :", savedPhotos); // 디버깅 로그
      alert("사진이 추가되었습니다!");
      window.location.href = "/";
    } else {
      alert("모든 정보를 입력하세요.");
    }
  });

  // 위치 입력 처리
  addLocationButton.addEventListener("click", () => {
    locationInput.classList.remove("hidden");
    locationInput.focus();
  });

  locationInput.addEventListener("input", (event) => {
    selectedLocation = event.target.value;
  });
});
