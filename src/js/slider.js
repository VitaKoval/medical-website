const swiperReviews = new Swiper(".swiper-reviews", {
  mousewheel: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// jQuery(function () {
//   var swiperReviews = new Swiper(".swiper-reviews", {
//     mousewheel: true,
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },
//   });
// });

// managementTeamContainer.addEventListener("click", handleManagementTeamButton);

const managementTeamContainer = document.querySelector(".management-team");

const handleManagementTeamButton = (e) => {
  let button = e.target.closest("[data-modal-button]");

  if (!button) {
    return;
  }

  let managementTeamItem = button.closest(".management-team__item");
  let arrowButton = managementTeamItem.querySelector(
    ".management-team__button"
  );
  let closeButton = managementTeamItem.querySelector(".close-button");

  if (!managementTeamItem) {
    return;
  }
  if (managementTeamItem.classList.toggle("show")) {
    arrowButton.querySelector("span").textContent = "Hide info";
    arrowButton.querySelector("svg").style.transform = "rotate(180deg)";
    closeButton.style.display = "block";
    if (managementTeamItem.querySelector(".info")) {
      managementTeamItem.querySelector(".info").style.display = "block";
    }
  } else {
    arrowButton.querySelector("span").textContent = "Show more";
    arrowButton.querySelector("svg").style.transform = "rotate(0deg)";
    closeButton.style.display = "none";

    if (managementTeamItem.querySelector(".info")) {
      managementTeamItem.querySelector(".info").style.display = "none";
    }
  }
};

managementTeamContainer.addEventListener("click", handleManagementTeamButton);

// Partners Corner
(function ($) {
  let currentPage = 1;
  let typeAsset = "All";

  function loadAssets() {
    let searchTerm = $("#search-input").val();

    $.ajax({
      type: "POST",
      url: "/wp-admin/admin-ajax.php",
      data: {
        action: "partners_corner_function",
        assetType: typeAsset,
        paged: currentPage,
        search_term: searchTerm,
      },
      beforeSend: function () {
        $(".show-more-btn").addClass("loading");
      },
      success: function (result) {
        console.log(result);
      },
    });
  }

  // Filter by typeAsset
  if ($(".partner-corner").length > 0) {
    $(".partner-corner-filter__item").click(function () {
      currentPage = 1;

      $(".partner-corner-filter__item").removeClass("active");
      $(this).addClass("active");

      typeAsset = $(this).data("type");

      console.log("Clicked item type:", itemType);
      loadAssets();
    });

    // Show more button
    $(".show-more-btn").on("click", function () {
      currentPage++;
      loadAssets();
    });

    // Search
    $("#search-input").on("keypress", function (evt) {
      if (evt.key === "Enter") {
        currentPage = 1;
        loadAssets();
      }
    });
  }

  // Modal
})(jQuery);

<object
  type="image/svg+xml"
  data="https://healthee.co/wp-content/uploads/2023/12/2023-blog-2.png"
></object>;
