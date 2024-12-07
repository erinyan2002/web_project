var jsonData = [
  { 사건: "강남구 강도사건", 거리: "1km" },
  { 사건: "종로구 폭행사건", 거리: "2km" },
  { 사건: "동대문입구역 시위 진행중", 거리: "3km" },
  { 사건: "서대문구 파괴행위사건", 거리: "4km" },
  { 사건: "마포구 폭동사건", 거리: "5km" },
  { 사건: "용산구 해킹사건", 거리: "6km" },
  { 사건: "송파구 3중 추돌", 거리: "7km" }
];

function createTableFromJson(jsonData) {
  var table = document.createElement("table");
  var thead = document.createElement("thead");
  var tbody = document.createElement("tbody");

  var headerRow = document.createElement("tr");
  Object.keys(jsonData[0]).forEach(function (key) {
    var th = document.createElement("th");
    th.appendChild(document.createTextNode(key));
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  jsonData.forEach(function (item) {
    var tr = document.createElement("tr");
    Object.values(item).forEach(function (val) {
      var td = document.createElement("td");
      td.appendChild(document.createTextNode(val));
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  return table;
}

function loadTable() {
  var table = createTableFromJson(jsonData);
  var container = document.querySelector("#alarmPopup .popup-content");
  var oldTable = container.querySelector("table");

  if (oldTable) {
    container.replaceChild(table, oldTable);
  } else {
    container.appendChild(table);
  }
}

document.addEventListener("DOMContentLoaded", loadTable);

function openPopup(popupId) {
  document.getElementById(popupId).style.display = "flex";
}

function closePopup(popupId) {
  document.getElementById(popupId).style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".popup-overlay").forEach(function (popup) {
    popup.addEventListener("click", function (event) {
      if (event.target === this) {
        closePopup(this.id);
      }
    });
  });

  document
    .getElementById("category_card")
    .addEventListener("click", function () {
      openPopup("categoryPopup");
    });

  document
    .getElementById("neighborhood_card")
    .addEventListener("click", function () {
    });

  document.getElementById("alarm_card").addEventListener("click", function () {
    openPopup("alarmPopup");
  });

  document.querySelectorAll(".close-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      var popupId = this.closest(".popup-overlay").id;
      closePopup(popupId);
    });
  });
});
