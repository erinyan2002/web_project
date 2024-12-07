document.addEventListener("DOMContentLoaded", () => {
  const fileSelectorButton = document.getElementById("file-selector-button");
  const fileInput = document.getElementById("file-input");
  const uploadContainer = document.getElementById("upload-container");
  const photoBox = document.getElementById("photo-box");
  const previewImg = document.getElementById("preview-img");
  const addLocationButton = document.getElementById("add-location");
  const locationInput = document.getElementById("location-input");
  const locationDropdown = document.getElementById("location-dropdown");
  const addButton = document.getElementById("add-button");

  let selectedLocation = ""; // 선택된 위치 저장
  let autocompleteService;

  // Google Maps API 초기화
  function initializeAutocomplete() {
    autocompleteService = new google.maps.places.AutocompleteService();
  }

  // Google Maps API 로드 완료 시 호출
  function loadGoogleMapsApi() {
    initializeAutocomplete();
  }

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
      };
      reader.readAsDataURL(file);
    } else {
      alert("사진 파일을 선택하세요.");
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

      alert("사진이 추가되었습니다!");
      window.location.href = "../index.html";
    } else {
      alert("모든 정보를 입력하세요.");
    }
  });

  // Add Location 버튼 클릭
  addLocationButton.addEventListener("click", () => {
    locationInput.classList.remove("hidden");
    locationDropdown.classList.add("hidden");
    locationInput.focus();
  });

  // 위치 검색 입력 시 자동완성 결과 표시
  locationInput.addEventListener("input", () => {
    const query = locationInput.value;
    if (!query) {
      locationDropdown.classList.add("hidden");
      return;
    }

    autocompleteService.getPlacePredictions({ input: query }, (predictions, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
        locationDropdown.innerHTML = predictions
          .map(
            (prediction) =>
              `<div class="dropdown-item" data-place-id="${prediction.place_id}">${prediction.description}</div>`
          )
          .join("");
        locationDropdown.classList.remove("hidden");
      }
    });
  });

  // 위치 선택 시
  locationDropdown.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("dropdown-item")) {
      selectedLocation = target.textContent;
      locationInput.value = selectedLocation;
      locationDropdown.classList.add("hidden");
    }
  });

  // Google Maps API 로드
  loadGoogleMapsApi();
});
