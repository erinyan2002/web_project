# 📸 MyGallery 프로젝트 - 화면 설명 및 기능

---

## **1. 프로필 관리 화면**  
![화면 캡처 2024-12-13 214643](https://github.com/user-attachments/assets/4df6bda0-fe29-4982-a37e-37e2c0e89637)


**설명:**  
- 사용자 프로필 사진, 이름, 자기소개를 수정하고 저장할 수 있는 화면입니다.  
- **Edit Photo** 버튼을 클릭하면 사진을 변경할 수 있으며, 입력란에서 정보를 수정하고 **Save** 버튼을 누르면 저장됩니다.  
- 깔끔한 카드형 UI와 핑크 테마로 시각적 일관성을 유지했습니다.  

---

## **2. 프로필 수정 화면**  
![화면 캡처 2024-12-13 214657](https://github.com/user-attachments/assets/782518bd-3894-49a1-b1c4-01cccfa0ee92)


**설명:**  
- 수정된 프로필이 반영된 화면입니다.  
- **Edit Profile** 버튼을 클릭하면 수정 모드로 돌아가 다시 정보를 변경할 수 있습니다.  
- 카드 중앙에 사용자의 이미지와 정보가 배치되어 깔끔하고 직관적인 디자인입니다.  

---

## **3. 사진 업로드 화면**  
 ![화면 캡처 2024-12-13 214714](https://github.com/user-attachments/assets/f892e60a-a52c-438d-96e0-92871a2b4aa2)


**설명:**  
- 사용자가 사진을 업로드할 수 있는 화면입니다.  
- **Add Photo Here** 영역에 사진을 드래그하거나 선택하여 업로드 가능합니다.  
- 업로더 아래에는 현재 로그인된 사용자의 이름과 간단한 정보가 표시되며, **Add** 버튼을 눌러 사진이 저장됩니다.  

---

## **4. 사진 필터 및 위치 추가 화면**  
![화면 캡처 2024-12-13 214822](https://github.com/user-attachments/assets/55f18dd9-d9d7-4b83-94a6-71c2eb2a589b)


**설명:**  
- 업로드된 사진에 다양한 필터를 적용할 수 있는 화면입니다.  
- 제공되는 필터:  
  - **Original**: 기본 사진  
  - **Grayscale**: 흑백 변환  
  - **Sepia**: 세피아 톤  
  - **Blur**: 흐림 효과  
  - **High Contrast**: 고대비  
  - **Brighten**: 밝기 조정  
- 사진 설명과 위치를 추가할 수 있으며, Google Maps API를 통해 장소 선택이 가능합니다.  
- **Add Location** 버튼을 눌러 위치를 추가하고, **Add To Home**을 누르면 사진이 갤러리에 반영됩니다.  

---

## **5. 홈 화면 - 사진 갤러리**  
![화면 캡처 2024-12-13 214840](https://github.com/user-attachments/assets/32c2b4f4-9cd9-4992-962b-8054053780e8)


**설명:**  
- 업로드된 사진들이 **그리드 뷰** 형태로 정렬되어 표시됩니다.  
- 각 사진에는 제목, 좋아요 버튼 ❤️, 위치 정보, 업로드 시간이 표시됩니다.  
- **반응형 디자인**으로 다양한 화면 크기에서 잘 동작하도록 구현되었습니다.  

---

## **6. 사진 모달 뷰**  
![화면 캡처 2024-12-13 214911](https://github.com/user-attachments/assets/eb195c6f-7c18-4e75-8f77-e6759a4e77ae)


**설명:**  
- 갤러리에서 사진을 클릭하면 나타나는 **상세 보기 모달 창**입니다.  
- **포함된 정보:**  
  - **Description**: 사진에 대한 설명  
  - **Date**: 업로드된 날짜와 시간  
  - **Location**: 추가된 위치 정보 (Google Maps 연동)  
- **버튼 기능:**  
  - **좋아요 ❤️**: 클릭 시 좋아요 상태를 저장  
  - **삭제 🗑️**: 사진을 갤러리에서 삭제  
  - **다운로드 ⬇️**: 사진 파일을 로컬에 저장
 
 ## 📂 **프로젝트 구조**  
```plaintext

MyGallery/
├── img/                # 이미지 파일
│   ├── icon/           # 아이콘 파일
├── js/                 # JavaScript 파일
│   ├── index.js        # 주요 기능 구현
├── css/                # 스타일링 파일
│   ├── home-styles.css # 홈 화면 스타일
├── html/               # HTML 파일
│   ├── index.html      # 메인 화면
├── README.md           # 프로젝트 설명 파일
└── assets/             # 기타 리소스

# 📸 **MyGallery 프로젝트**

---

## 💻 **사용된 기술**  
| **구분**          | **기술**                     |  
|------------------|---------------------------|  
| **Frontend**     | HTML5, CSS3, JavaScript    |  
| **API**          | Google Maps API            |  
| **Storage**      | Local Storage              |  
| **디자인**        | CSS Grid, Flexbox, Font Awesome |  

---

## 🔧 **설계 요소 평가**  
### **성능**  
- 빠르고 가벼운 **로컬 스토리지**를 활용해 데이터 저장 및 유지  

### **안정성**  
- 프론트엔드 중심으로 구현하여 **복잡도 최소화** 및 유지보수 용이  

### **확장성**  
- 향후 **백엔드 서버**와 **클라우드 데이터 연동**을 통해 다중 사용자 지원  

---

## 🔮 **향후 발전 방향**  
1. **클라우드 데이터 연동**  
   - 로컬 스토리지 대신 서버 기반 데이터 관리 (예: Firebase, MongoDB)  
2. **소셜 미디어 공유 기능**  
   - 업로드된 사진을 SNS에 바로 공유할 수 있도록 기능 개선  
3. **다양한 필터 추가**  
   - 사용자 요청을 반영하여 **새로운 필터**를 지속적으로 추가  
4. **모바일 최적화**  
   - UI를 **모바일 친화적**으로 더욱 개선하여 사용자 경험 강화  

---

## 👥 **팀 구성**  
| **이름** | **소속**     | **학번**   |  
|---------|-------------|----------|  
| 이먓판   | 컴퓨터공학과  | 23  |  

---

## 📜 **라이센스**  
이 프로젝트는 **MIT License**를 따릅니다.  
자유롭게 사용, 수정 및 재배포할 수 있습니다.  

---

## **요약**  
**MyGallery**는 사용자의 프로필 관리, 사진 업로드 및 관리, 필터 적용, 위치 추가 등 **직관적이고 강력한 기능**을 제공하는 웹 애플리케이션입니다.  
모든 화면이 **핑크 테마**와 **깔끔한 UI 디자인**으로 구성되었으며, **Google Maps API**를 통해 위치 데이터를 시각적으로 관리할 수 있습니다.  

---
