//* Logic
//* =================================================

const createNews = (newsList) => {
  let newsItems = "";

  // newsList is an empty array
  if (newsList.length < 1) return "<li>No News</li>";

  for (const obj of newsList) {
    const { ID, newsTitle, newsArticle } = obj;
    const elementNews = `
      <li>
        <a class="modalButton" data-toggle="modal" href="#myModal" data-height="300px" data-width="100%" data-target="#myModal"
        data-id=${ID} data-news="${newsArticle}">
          ${newsTitle}
        </a>
      </li>
    `;
    newsItems += elementNews;
  }
  return newsItems;
};

//* =================================================
//* jQuery section
//* =================================================
$(document).ready(function () {
  //* At 1st rendering, add News Bulletin items from request
  const news = createNews(GetNewsBulletin);
  $("#news-panel").append(news);

  //* Selected news article displayed in modal
  $(document).on("click", "a.modalButton", function (evnt) {
    const height = $(this).attr("data-height") || 300;
    const width = $(this).attr("data-width") || 400;
    const title = $(this).text();
    $("#myModal .modal-title").text(title);
    const newsArticle = $(this).data("news");

    $("#myModal .modal-body #myModalTextBox").text(newsArticle);
    $("body").on("hidden.bs.modal", "#myModal", function () {
      $(this).removeData("bs.modal");
    });
  });
});
