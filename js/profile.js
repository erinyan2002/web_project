document.addEventListener("DOMContentLoaded", () => {
    const profilePic = document.getElementById("profile-pic");
    const inputFile = document.getElementById("input-file");
    const nameInput = document.getElementById("name-input");
    const bioInput = document.getElementById("bio-input");
    const editButton = document.getElementById("edit-button");
    const saveButton = document.getElementById("save-button");
    const editForm = document.getElementById("edit-form");
  
    const profileName = document.getElementById("profile-name");
    const profileBio = document.getElementById("profile-bio");

  
    // 이미지 업로드 핸들러
    inputFile.addEventListener("change", function () {
      const file = inputFile.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const imageBase64 = event.target.result;
          profilePic.src = imageBase64;
          localStorage.setItem("profileImage", imageBase64);
        };
        reader.readAsDataURL(file);
      }
    });
  
    // Edit 버튼 클릭 시
    editButton.addEventListener("click", () => {
      editForm.classList.remove("hidden");
      editButton.classList.add("hidden");
  
      nameInput.value = profileName.textContent;
      bioInput.value = profileBio.textContent;
    });
  
    // Save 버튼 클릭 시
    saveButton.addEventListener("click", () => {
      const name = nameInput.value.trim();
      const bio = bioInput.value.trim();
  
      if (name) {
        profileName.textContent = name;
        localStorage.setItem("userName", name);
      }
  
      if (bio) {
        profileBio.textContent = bio;
        localStorage.setItem("userBio", bio);
      }
  
      editForm.classList.add("hidden");
      editButton.classList.remove("hidden");
    });
  
    // 로컬 저장소에서 데이터 불러오기
    window.addEventListener("load", () => {
      const savedName = localStorage.getItem("userName");
      const savedBio = localStorage.getItem("userBio");
      const savedImage = localStorage.getItem("profileImage");
  
      if (savedName) profileName.textContent = savedName;
      if (savedBio) profileBio.textContent = savedBio;
      if (savedImage) profilePic.src = savedImage;
    });
  });
  