//*=================================================
//* Actions and Logic
//*=================================================

const cardColors = {
  card0: "rgb(70,152,170)",
  card1: "rgb(105,78,119)",
  card2: "rgb(172,143,194)",
  card3: "rgb(221,88,20)",
  card4: "rgb(155,187,202)"
};

const applyColor = (colorStr) => {
  $(".large-num").css("color", colorStr);
  $(".card-block").css("border-color", colorStr);
};

const toggleSideNav = () => {
  $(
    ".sidenav .main-tab, .sidenav .close-btn, .sidenav .small-label"
  ).toggleClass("hidden");
};

let slideIndex = 1;
const showSlides = (num, direction) => {
  let indx;
  const slides = $(".cards");
  const dots = $(".dot");
  if (num > slides.length) slideIndex = 1;
  if (num < 1) slideIndex = slides.length;
  for (indx = 0; indx < slides.length; indx++) {
    $(slides[indx]).hide({ direction: "right" }, 600);
  }
  for (indx = 0; indx < dots.length; indx++) {
    $(dots[indx]).removeClass("active");
  }
  // $(slides[slideIndex - 1]).css("display", "block");
  $(slides[slideIndex - 1])
    .delay(600)
    .show({ direction: "left" }, 600);

  $(dots[slideIndex - 1]).addClass("active");
  console.log($(".cards").height());
};

//*=================================================
//* jQuery section
//*=================================================

$(document).ready(() => {
  //* Side nav open at home page loading
  $(".sidenav").width("20%");
  toggleSideNav();

  //* Opening side Nav
  $(document).on("click", "#menu-btn", function (evnt) {
    $(".sidenav").width("20%");
    toggleSideNav();
  });

  //* On first rendering, add user info.
  let { fullname, rolename, AgencyID } = SESSION_VARIABLE[0];

  // For Dev Env only. Can stay for Production.
  if (!fullname || fullname.startsWith("<%=")) {
    fullname = "Kate Tornese";
    rolename = "LAC TECH Support";
    AgencyID = "PRA";
  }
  const welcomeLine = `
    <div class="row">
      <div class="col-sm-4"></div>
      <div class="welcome-text col-sm-4">Hello ${fullname} (${AgencyID})
      </div>
      <div class="role-text col-sm-4">User Role: ${rolename}
      </div>
    </div>`;
  $(".user-info").append(welcomeLine);

  //* On first rendering, display the first card.
  // const firstCard = cardText.card0;
  // const firstCardColor = cardColors.card0;
  // $(".card-block").empty().append(firstCard).attr("id", "card0");
  // applyColor(firstCardColor);
  // $("#go-left").prop("disabled", true);
  showSlides(slideIndex);

  //* Closing sidenav by clicking close-btn or sidenav losing focus
  $(document).on("click", ".close-btn", function (evnt) {
    $(".dropdown-container").css("display", "none");
    $(".main-tab .dropdown-btn").removeClass("active");
    $(".sidenav").width("3%");
    toggleSideNav();
  });

  //* Selecting a menu item and displaying the sub-menu
  $(document).on("click", ".dropdown-btn", function (evnt) {
    $(".dropdown-container").css("display", "none");
    $(".main-tab .dropdown-btn").removeClass("active");
    $(this).siblings(".dropdown-container").css("display", "block");
    $(this).toggleClass("active");
  });

  //* Selecting a submenu item
  $(document).on("click", ".dropdown-container a", function (evnt) {
    $(".dropdown-container").css("display", "none");
    $(".main-tab .dropdown-btn").removeClass("active");
    $(".sidenav").width("3%");
    toggleSideNav();
  });

  //* Selecting another page in subnav bar
  $("#sub-nav li").on("click", function (evnt) {
    evnt.stopPropagation();
    $("#sub-nav li").removeClass("blue-light-bg blue-text");
    $(this).toggleClass("blue-light-bg blue-text");
  });

  //* Display next or previous card when a chevron is clicked on
  $(document).on("click", ".prev, .next", function (evnt) {
    evnt.stopPropagation();
    const tempArr = $(this).hasClass("next") ? [1, "next"] : [-1, "prev"];
    const [num, direction] = tempArr;
    showSlides((slideIndex += num), direction);
  });

  //* Display selected card when a number is clicked on
  $(document).on("click", ".dot", function (evnt) {
    evnt.stopPropagation();
    const selectedCardIndex = Number($(this).text());
    showSlides((slideIndex = selectedCardIndex));
  });
});
