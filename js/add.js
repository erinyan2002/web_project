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

  // 파일 선택 버튼 클릭 시 파일 선택 창 열기
  fileSelectorButton.addEventListener("click", () => {
    fileInput.click();
  });

  // 파일 선택 시 처리
  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImg.src = e.target.result;
        photoBox.classList.remove("hidden"); // 사진 박스 표시
        uploadContainer.classList.add("hidden"); // 업로드 컨테이너 숨기기
      };
      reader.readAsDataURL(file);
    }
  });

  // Add Location 버튼 클릭 시
  addLocationButton.addEventListener("click", () => {
    locationInput.classList.remove("hidden");
    locationInput.focus();
  });

  // 위치 입력
  locationInput.addEventListener("input", (event) => {
    selectedLocation = event.target.value; // 입력값 저장
  });

  // Add To Timeline 버튼 클릭 시
  addButton.addEventListener("click", () => {
    const description = document.getElementById("photo-description").value;

    if (description && previewImg.src) {
      // 사진 데이터 준비
      const photoData = {
        location: selectedLocation || "위치 정보 없음",
        description: description,
        image: previewImg.src,
      };

      // localStorage에 사진 데이터 저장
      let savedPhotos = JSON.parse(localStorage.getItem("photos")) || [];
      savedPhotos.push(photoData);
      localStorage.setItem("photos", JSON.stringify(savedPhotos));

      // 홈 페이지로 이동
      window.location.href = "home.html";
    } else {
      alert("모든 정보를 입력하세요.");
    }
  });
});
