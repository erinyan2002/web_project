document.addEventListener("DOMContentLoaded", () => {
    const profilePhoto = document.getElementById("profile-photo");
    const modal = document.getElementById("upload-modal");
    const uploadPhotoBtn = document.getElementById("upload-photo-btn");
    const removePhotoBtn = document.getElementById("remove-photo-btn");
    const cancelBtn = document.getElementById("cancel-btn");

    // 프로필 사진 클릭 시 모달 표시
    profilePhoto.addEventListener("click", () => {
        modal.classList.remove("hidden");
    });

    // 사진 업로드 버튼 클릭 시
    uploadPhotoBtn.addEventListener("click", () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";

        fileInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profilePhoto.src = e.target.result;
                    modal.classList.add("hidden");
                    alert("프로필 사진이 변경되었습니다!");
                };
                reader.readAsDataURL(file);
            }
        });

        fileInput.click();
    });

    // 사진 삭제 버튼 클릭 시
    removePhotoBtn.addEventListener("click", () => {
        profilePhoto.src = "../icon/profile.svg"; // 기본 이미지로 변경
        modal.classList.add("hidden");
        alert("프로필 사진이 삭제되었습니다!");
    });

    // 취소 버튼 클릭 시
    cancelBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
    });
});
