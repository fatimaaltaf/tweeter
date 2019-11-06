/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {
  console.log( "ready!" );

  // Test code
  const tweetData =  [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" 
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];


  // Helper function to convert time from m/s to day

  const getTime = function(created_at) {
    let oneDay = 1000*60*60*24;
    let dateCreatedMs = created_at;
    let todaysDate = Date.now();
    let differenceMs = todaysDate - dateCreatedMs;

    return Math.round(differenceMs/oneDay);
  }

  // console.log(getTime(1461116232227));

  // Render tweets 

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
    $('#tweet-container').append(createTweetElement(tweet));
    }
  }

  // Generate DOM structure for tweet

  const createTweetElement = function(tweet) {
    let $tweet = $(`<article class="tweet">
    <header>
      <div class="avatarName">
        <img class="avatar" src=${tweet.user.avatars} alt="Avatar">
        <span class="name">${tweet.user.name}</span>
      </div>
      <div>
          <span class="twitter-handle">${tweet.user.handle}</span>
      </div>
    </header>


      <p  class="tweet-text">${tweet.content.text}</p>

      
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

  renderTweets(tweetData);
});



