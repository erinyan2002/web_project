document.addEventListener("DOMContentLoaded", () => {
    const editButton = document.getElementById("edit-button");
    const saveButton = document.getElementById("save-button");
    const editContainer = document.getElementById("edit-container");
    const nameInput = document.getElementById("name-input");
    const bioInput = document.getElementById("bio-input");

    const nameElement = document.getElementById("name");
    const bioElement = document.getElementById("bio");

    // Edit 버튼 클릭 시 입력창 표시
    editButton.addEventListener("click", () => {
        editContainer.style.display = "flex";
        nameInput.value = nameElement ? nameElement.textContent.trim() : ""; // 현재 이름을 입력창에 표시
        bioInput.value = bioElement ? bioElement.textContent.trim() : "";   // 현재 bio를 입력창에 표시
        editButton.style.display = "none"; // Edit 버튼 숨기기
    });

    // Save 버튼 클릭 시 이름과 Bio 저장
    saveButton.addEventListener("click", () => {
        const newName = nameInput.value.trim();
        const newBio = bioInput.value.trim();

        if (newName && nameElement) {
            nameElement.textContent = newName; // 이름 업데이트
        }

        if (newBio && bioElement) {
            bioElement.textContent = newBio; // Bio 업데이트
        }

        editContainer.style.display = "none"; // 입력창 숨기기
        editButton.style.display = "block";  // Edit 버튼 다시 표시
    });
});
