$(document).ready(function() {
  $("form > textarea").keyup(function() {
    let $charInTweet = $(this).val().length;
    let $charLeft = 140 - $charInTweet
    let $counter = $(this).closest("form").find(".counter");
     $counter.text($charLeft);

     if ($charLeft < 0) {
      $counter.addClass("overChar");
     } else {
       $counter.removeClass("overChar");
     }
  });

  console.log(document.ready);
});



