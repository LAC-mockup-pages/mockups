//* Logic
//* =================================================

const createNews = (newsList) => {
  const newsItem = "";
  return newsItem;
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
    console.log("title :>> ", this);
    $("#myModal .modal-title").text(title);
    const newsArticle = $(this).data("news");

    $("#myModal .modal-body #myModalTextBox").text(newsArticle);
    $("body").on("hidden.bs.modal", "#myModal", function () {
      $(this).removeData("bs.modal");
    });
  });
});
