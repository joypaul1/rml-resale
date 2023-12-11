
(function ($) {
  // data-background
  // $(document).on("ready", function () {
  //   $("[data-background]").each(function () {
  //     $(this).css(
  //       "background-image",
  //       "url(" + $(this).attr("data-background") + ")"
  //     );
  //   });
  // });

  // preloader
  $(window).on("load", function () {
    $(".preloader").fadeOut("slow");
  });


  // scroll to top
  $(window).scroll(function () {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      $("#scroll-top").addClass("active");
    } else {
      $("#scroll-top").removeClass("active");
    }
  });

  $("#scroll-top").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 1500);
    return false;
  });

  // navbar fixed top
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".navbar").addClass("fixed-top");
    } else {
      $(".navbar").removeClass("fixed-top");
    }
  });


})(jQuery);
