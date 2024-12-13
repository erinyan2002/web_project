document.addEventListener("DOMContentLoaded", () => {
  const fileSelectorButton = document.getElementById("file-selector-button");
  const fileInput = document.getElementById("file-input");
  const uploadContainer = document.getElementById("upload-container");
  const photoBox = document.getElementById("photo-box");
  const previewImg = document.getElementById("preview-img");
  const addLocationButton = document.getElementById("add-location");
  const addButton = document.getElementById("add-button");
  const placeInfoDiv = document.getElementById("place-info");

  let selectedLocation = ""; // 위치 저장
  let selectedFilter = "none"; // 필터 저장

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
        previewImg.src = e.target.result; // 미리보기 이미지 설정
        previewImg.style.filter = selectedFilter; // 필터 적용
        photoBox.classList.remove("hidden"); // 사진 박스 표시
        uploadContainer.classList.add("hidden"); // 업로드 컨테이너 숨김
      };
      reader.readAsDataURL(file);
    } else {
      alert("사진 파일을 선택하세요.");
    }
  });

  // 필터 선택
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedFilter = button.getAttribute("data-filter"); // 선택한 필터 저장
      previewImg.style.filter = selectedFilter; // 미리보기 이미지에 필터 적용

      // 필터 버튼 활성화 상태 업데이트
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });

  // 위치 추가 버튼 클릭
  addLocationButton.addEventListener("click", () => {
    const locationDetails = placeInfoDiv.innerText.trim(); // 장소 정보 가져오기
    if (locationDetails) {
      selectedLocation = locationDetails; // 선택된 위치 저장
      alert(`위치가 저장되었습니다: ${selectedLocation}`);
    } else {
      alert("위치 정보를 입력하거나 선택하세요.");
    }
  });

  // Add To Home 버튼 클릭
  addButton.addEventListener("click", () => {
    const description = document.getElementById("photo-description").value;

    if (previewImg.src && description) {
      const currentDate = new Date(); // 현재 날짜 및 시간 가져오기
      const formattedDate = currentDate.toLocaleString(); // 로컬 시간 형식으로 변환

      const photoData = {
        location: selectedLocation || "위치 정보 없음",
        description: description,
        image: previewImg.src,
        filter: selectedFilter, // 필터 정보 추가
        date: formattedDate, // 날짜 정보 추가
      };

      // localStorage 저장
      
      const savedPhotos = JSON.parse(localStorage.getItem("photos")) || [];
      savedPhotos.push(photoData);
      localStorage.setItem("photos", JSON.stringify(savedPhotos));

      alert("사진이 추가되었습니다!");
      window.location.href = "../index.html"; // 홈 화면으로 이동
    } else {
      alert("모든 정보를 입력하세요.");
    }
  });
});
