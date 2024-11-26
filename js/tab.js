// JSONデータからカード作成ロジック
const cardData = [
  {
    headerIcon: "../img/company/경향.png",
    headerTitle: "'마약 투약 혐의' 이선균, \n일주일 만에 경찰 재출석",
    mainImage:
      "	https://www.bigkinds.or.kr/resources/images/01100901/2023/11/04/01100901.20231104134944001.01.jpg",
    articles:
      "\n배우 이선균(48)은 경찰 조사에서 유흥업소 여실장으로부터 마약을 투약당했다는 진술을 했습니다. 이에 대해 이선균은 마약 투약 혐의는 인정하지만 고의성은 부인하고 있습니다. 조사는 약 3시간 동안 진행되었습니다. \n\n유흥업소 여실장 A씨는 이선균과 가수 지드래곤에게 마약을 전달한 혐의를 받고 있으며, 이로 인해 이선균의 전과가 확인되었습니다. \n\n현재 이선균과 지드래곤을 비롯한 총 10명이 마약 투약 혐의로 조사 중이며, 추가적인 물증 수집을 위해 유흥업소 실장과의 협박 관계 조사도 진행 중입니다. \n\n경찰은 여실장의 진술 신빙성을 확인한 후, 이선균의 추가적인 진술을 바탕으로 보강 수사를 진행하고 추가 조사를 할 계획입니다.",
    timelineurl: "../examples/timelines/timeline.html",
    phrase: '이선균, 모발 검사 음성...\n"최소 10개월 마약 안했다"',
  },
  {
    headerIcon: "../img/company/경향.png",
    headerTitle:
      "“총리가 퇴임 후 일자리 찾나” 수낵- \n머스크 대담에 英언론 “굴욕적”",
    mainImage:
      "https://www.bigkinds.or.kr/resources/images/01100501/2023/11/04/01100501.20231104094205001.01.jpg",
    articles:
      "조 바이든 미국 대통령에 대한 민주당 지지층의 지지율이 사상 최저치로 떨어졌다.\n\n바이든 대통령이 이스라엘과 팔레스타인 해야 한다는 응답은 54%, 팔레스타인 시민을 보호해야 한다는 응답도 41%로 나타났다.\n\n\n워싱턴=박영준 특파원 yjp@segye.com",
    timelineurl: "../examples/timelines/timeline.html",
    phrase: '영국 총리와 일론 머스크의 대담이\n영국 언론의 비판을 받다',
  },
  {
    headerIcon: "../img/company/국민일보.png",
    headerTitle: "‘캠프데이비드’ 이후 석달… \n한·미·일 정상, 한걸음 더 밀착",
    mainImage:
      "../img/article/14.jpg",
    articles:
      "조 바이든 미국 대통령에 대한 민주당 지지층의 지지율이 사상 최저치로 떨어졌다.\n\n바이든 대통령이 이스라엘과 팔레스타인 해야 한다는 응답은 54%, 팔레스타인 시민을 보호해야 한다는 응답도 41%로 나타났다.\n\n\n워싱턴=박영준 특파원 yjp@segye.com",
    timelineurl: "../examples/timelines/timeline.html",
    phrase: '한·미·일 정상 회동',
  },
  {
    headerIcon: "../img/company/경향.png",
    headerTitle: "미국 소비자물가 주춤…\n주가 치솟고 국채 금리 떨어졌다",
    mainImage:
      "../img/article/37.jpg",
    articles:
      "조 바이든 미국 대통령에 대한 민주당 지지층의 지지율이 사상 최저치로 떨어졌다.\n\n바이든 대통령이 이스라엘과 팔레스타인 해야 한다는 응답은 54%, 팔레스타인 시민을 보호해야 한다는 응답도 41%로 나타났다.\n\n\n워싱턴=박영준 특파원 yjp@segye.com",
    timelineurl: "../examples/timelines/timeline.html",
    phrase: '美 10월 물가 3.2% 상승, 오름폭 둔화',
  },
];
function generateCard(data) {
  const card = document.createElement("div");
  card.className = "card";

  const cardHeader = document.createElement("div");
  cardHeader.className = "card-header";
  cardHeader.innerHTML = `<img src="${
    data.headerIcon
  }" alt="Icon"><div>${data.headerTitle.replace(/\n/g, "<br>")}</div>`;
  card.appendChild(cardHeader);

  const cardMain = document.createElement("div");
  cardMain.className = "card-main";
  cardMain.style.overflowX = "auto";

  const imageContainer = document.createElement("div");
  imageContainer.className = "image-container";
  const img = document.createElement("img");
  img.src = data.mainImage;
  img.alt = "Main Image";
  imageContainer.appendChild(img);

  // 新しいタイトル（phrase）要素を追加し、改行を処理
  const titleOverlay = document.createElement("div");
  titleOverlay.className = "image-title-overlay"; // 新しいクラス名
  titleOverlay.innerHTML = data.phrase.replace(/\n/g, "<br>"); // innerHTMLを使用して改行を処理

  imageContainer.appendChild(titleOverlay);

  cardMain.appendChild(imageContainer);

  // 新しい親要素（articles-wrapper）を作成して、それにarticle-containerを追加
  const articlesWrapper = document.createElement("div");
  articlesWrapper.className = "articles-wrapper"; // 新しいクラス名

  const articleContainer = document.createElement("div");
  articleContainer.className = "article-container";
  articleContainer.innerHTML = data.articles.split("\n").join("<br>");
  articlesWrapper.appendChild(articleContainer); // articles-wrapperにarticle-containerを追加

  cardMain.appendChild(articlesWrapper); // cardMainにarticles-wrapperを追加

  card.appendChild(cardMain);

  // iframe要素を作成
  const cardIframe = document.createElement("iframe");
  cardIframe.className = "card-iframe";
  cardIframe.src = data.timelineurl;
  cardIframe.scrolling = "no"; // スクロールを非表示にする
  card.appendChild(cardIframe);

  // カードフッターを作成
  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer";
  const commentSection = document.createElement("textarea");
  commentSection.className = "comment-section";
  commentSection.placeholder = "댓글을 입력히세요...";
  commentSection.style.display = "none"; // 初期状態で非表示にする
  cardFooter.appendChild(commentSection);
  card.appendChild(cardFooter);

  // heartボタン要素を作成
  const heartButton = document.createElement("button");
  heartButton.className = "heartButton";
  heartButton.innerHTML = '<img src="../img/icon/heart.svg" alt="heartButton">';
  cardFooter.appendChild(heartButton);

  // ボタンがクリックされたときのイベントリスナー
  heartButton.addEventListener("click", () => {
    const img = heartButton.querySelector("img");

    // 画像のリンクを切り替える
    if (img.src.includes("heart.svg")) {
      img.src = "../img/icon/heart02.svg";
    } else {
      img.src = "../img/icon/heart.svg";
    }

    // スケールを大きくする
    heartButton.style.transform = "scale(1.3)";

    // 一定時間後にスケールを元に戻す
    setTimeout(() => {
      heartButton.style.transform = "scale(1)";
    }, 200); // ここでは200ミリ秒後にスケールを元に戻す
  });

  // comentボタン要素を作成
  const comentButton = document.createElement("button");
  comentButton.className = "comentButton";
  // アイコン画像のURLを指定して、<img>要素をボタンの内部に挿入
  comentButton.innerHTML =
    '<img src="../img/icon/coment.svg" alt="comentButton">';
  comentButton.addEventListener("click", () => {
    // ボタンがクリックされたときにコメントセクションの表示を切り替え
    const commentStyle = commentSection.style;
    commentStyle.display =
      commentStyle.display === "none" || commentStyle.display === ""
        ? "block"
        : "none";
  });
  cardFooter.appendChild(comentButton); // ボタンをカードフッターに追加

  // before-afterボタン要素を作成
  const toggleButton = document.createElement("button");
  toggleButton.className = "toggleButton";
  // アイコン画像のURLを指定して、<img>要素をボタンの内部に挿入
  toggleButton.innerHTML =
    '<img src="../img/icon/time.svg" alt="Toggle Iframe">';
  toggleButton.addEventListener("click", () => {
    // ボタンがクリックされたときにiframeの表示を切り替え
    const iframeStyle = cardIframe.style;
    iframeStyle.display =
      iframeStyle.display === "none" || iframeStyle.display === ""
        ? "block"
        : "none";
  });
  cardFooter.appendChild(toggleButton); // ボタンをカードフッターに追加

  // savedボタン要素を作成
  const savedButton = document.createElement("button");
  savedButton.className = "card-savedButton";
  savedButton.innerHTML = '<img src="../img/icon/saved.svg" alt="savedButton">';
  cardFooter.appendChild(savedButton);

  // ボタンがクリックされたときのイベントリスナー
  savedButton.addEventListener("click", () => {
    const img = savedButton.querySelector("img");

    // 画像のリンクを切り替える
    if (img.src.includes("saved.svg")) {
      img.src = "../img/icon/saved02.svg";
    } else {
      img.src = "../img/icon/saved.svg";
    }

    // スケールを大きくする
    savedButton.style.transform = "scale(1.3)";

    // 一定時間後にスケールを元に戻す
    setTimeout(() => {
      savedButton.style.transform = "scale(1)";
    }, 200); // ここでは200ミリ秒後にスケールを元に戻す
  });

  return card; // 作成したカード要素を返す
}

const mainElement = document.querySelector("main");

// スクロールイベントのリスナー
let dataIndex = 0; // どのカードデータが次に表示されるかを追跡
mainElement.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = mainElement;
  if (
    scrollTop + clientHeight >= scrollHeight - 5 &&
    dataIndex < cardData.length
  ) {
    // ほぼページの底に達した、かつまだ表示すべきデータがある
    mainElement.appendChild(generateCard(cardData[dataIndex]));
    dataIndex++;
  }
});

// 初期カードのロード
document.addEventListener("DOMContentLoaded", () => {
  for (dataIndex = 0; dataIndex < cardData.length; dataIndex++) {
    mainElement.appendChild(generateCard(cardData[dataIndex]));
  }
});
