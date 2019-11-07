/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Generate DOM structure for tweet

// Escape function to prevent XXS
const escape = function(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


const createTweetElement = function(tweet) {
let $tweet = $(`<article class="tweet">
<header>
  <div class="avatarName">
    <img class="avatar" src=${tweet.user.avatars} alt="Avatar">
    <span class="name">${escape(tweet.user.name)}</span>
  </div>
  <div>
      <span class="twitter-handle">${escape(tweet.user.handle)}</span>
  </div>
</header>


  <p  class="tweet-text">${escape(tweet.content.text)}</p>

  
<footer>
  <div>
  <span class="date">${getTime(tweet.created_at)} days ago</span>
  </div>
  <div class="dateIcons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>  
  </div>
</footer>
</article>`);
// ...
return $tweet;
};

// Helper function to convert time from m/s to day

const getTime = function(created_at) {
  let oneDay = 1000*60*60*24;
  let dateCreatedMs = created_at;
  let todaysDate = Date.now();
  let differenceMs = todaysDate - dateCreatedMs;

  return Math.round(differenceMs/oneDay);
}

// Helper function that checks if tweet text input matches the invalid cases
const checkIfTweetIsInvalid = function(tweet) {
  if (tweet === '') {
    alert('Empty tweet. Please add text.');
    return true;
  } else if ( tweet.length > 140) {
    alert('You have more than 140 characters.')
    return true;
  }
  return false;
}


// Render tweets 

const renderTweets = function(tweets) {
  $('#tweet-container').empty()
  for (let tweet of tweets) {
  $('#tweet-container').append(createTweetElement(tweet));
  }
};

// JQuery 
$( document ).ready(function() {
  console.log( "ready!" );

  // Form submission using JQuery
    const $form = $('#tweet-submission');

    $form.on('submit', function ( event ) {
      console.log('Button clicked, performing ajax call...');
      event.preventDefault();
      const tweet = $('.tweetInput').val();
      let result = checkIfTweetIsInvalid(tweet);
      if (result === false) {
        $.ajax({
          url: '/tweets',
          type: 'POST',
          data: $(this).serialize()
        }).then(() => {
          loadTweets();
        })
      }

  });

  // Toggle New Tweet Box
  // $('.new-tweet').hide();

  $('.arrow').click(function () {
    $('.new-tweet').slideToggle('slow')
  });

  // Load tweets
  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (tweet) {
      console.log('Success: ', tweet);
        renderTweets(tweet);
    })
  };
  loadTweets();
});





