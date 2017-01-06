
//   .   . p   .                     
//   | o |     |                     
//   | . |     |-  ;-. . . ;-.-. ;-. 
//   | | |     |   |   | | | | | | | 
//   ' ' '     `-' '   `-` ' ' ' |-' 
//                               '   

window.playerName = 'liltrump';
window.happiness = 20;
window.playing = false;
window.score = 0;
window.tweets = []; // Store all tweets

colors = ['#674b67', '#4b5667', '#4b6756', '#67664b'];
$('body').css('background-color', getRandFromArr(colors));


// Tweet components
//
tweet_companies = [
  'Tesla ',
  'Ford ',
  'Chevy ',
  'Apple ',
  'Microsoft ',
  'Silicon Valley ',
  'CNN ',
  "Rosie O'Donnell ",
  'NBC ',
  'The media ',
  'H ',
  'Obama ',
  'Amazon ',
  'GM ',
  'The democratic party '
];

tweet_prep = [
  'must ',
  'needs to ',
  'really needs to ',
  "can't just ",
  'thinks it can just ',
  "can only ",
  "can't even ",
  "has to, strongly, ",
  "should, painfully, "
];

tweet_prop = [
  'understand ',
  'admit to ',
  'think about ',
  'stop weakening ',
  'see '
];

tweet_body = [
  'production overseas! ',
  'shady dealings. ',
  'apologizing to me. ',
  'how great I am. ',
  'what a victory I had. ',
  'the state of this economy. ',
  'immigration. ',
  'Ocare. ',
  'a global economy. ',
  'this great country. ',
  'the huge amount of money I have. ',
  'how out of conrol they are. '
];

tweet_endings = [
  'Sad!',
  'Love!',
  'CRAZY!',
  'Nice!',
  'MAKE AMERICA GREAT AGAIN!',
  'NOT!',
  'Think again!',
  'jobs leaving, ISIS, Ocare, etc.',
  "I'm just the best!",
  'Oh please!',
  'Give me a break...',
  'Weak!',
  'Smart!',
  'What a lightweight...',
  'Just terrific!',
  'ZERO credibility...',
  '',
  '',
  ''
];

media_phrases = [
  'MEDIA ATTENTION',
  'NEWS ARTICLE',
  'BLOG POST'
];


// Game functions
//
var generateTweet = function(){
  var tweet_text = getRandFromArr(tweet_companies) + getRandFromArr(tweet_prep) + getRandFromArr(tweet_prop) + getRandFromArr(tweet_body) + getRandFromArr(tweet_endings);
  var $tweet = $('.tweet.template').clone();
  $tweet.find('.tweet-name').text(window.playerName);
  $tweet.find('.tweet-at').text('@' + window.playerName);
  $tweet.find('.tweet-body').text(tweet_text);

  $tweet.css('top', getRand(5, 60) + '%');
  $tweet.css('left', getRand(1, 20) + '%');
  $tweet.addClass('tweet-new');
  $('body').append($tweet);

  $tweet.removeClass('template');
  window.score += 20*window.tweets.length;
  window.tweets.push($tweet); // Add to global tweets array
  window.happiness -= 1;
  checkHappiness();
};

var removeLastTweet = function(){
  window.tweets[window.tweets.length-1].remove();
  window.tweets.pop();
};

var checkHappiness = function(){
  if (window.happiness < 10) {
    $('.trump').addClass('is-angry');
    $('.trump').removeClass('is-content');
  } else {
    $('.trump').addClass('is-content');
    $('.trump').removeClass('is-angry');
  };

  if (window.happiness <= 0){
    window.playing = false;
    $('#overlay').show();
  };
};

var setScore = function(score){
  $('.score').find('h1').text(score);
};

var resetGame = function(){
  $('.trump').removeClass('is-content');
  $('.trump').removeClass('is-angry');
  $('.trump').addClass('is-egg');
  $('.intro').show();
  $('#overlay').hide();
  $('.menu').hide();

  window.tweets = [];
  window.happiness = 20;
  window.score = 0;
  setScore(window.score);
  $('.tweet-new').remove();
};



// Game loops
//
setInterval(function(){
  if (window.playing === true) {
    generateTweet();
  }
}, 4000);

setInterval(function(){
  if (window.playing === true) {
    window.score += 1;
    setScore(window.score);
  }
}, 200);




// Click handlers
//
// Try again end button
$("#tryagain").on('click', function(){
  resetGame();
});

// Tweet button
$('#tweet').on('click', function(event){
  generateTweet();
});

// Hatch to start
$('#hatch').on('click', function(){
  $('.trump').removeClass('is-egg');
  $('.trump').addClass('is-content');
  $('.trump').addClass('is-centered');
  if ($('#name').val() == ''){
    $('#name').val("Lil' Trump");
  };
  window.playerName = $('#name').val();
  $('.trump-name').find('h1').text(window.playerName);
  $('#overlay-name').text(window.playerName);
  window.playing = true;
  $('.intro').hide();
  $('.menu').css('display', 'flex');
});


// Feed button
$('#feed').on('click', function(event) {
  if (window.tweets.length === 0) { return; }
  removeLastTweet();

  window.score += 10;
  window.happiness += 1;
  console.log(window.happiness);

  $(event.currentTarget).addClass('is-disabled');
  $('.media-attention').text('+ ' + getRandFromArr(media_phrases))
  $('.media-attention').show();
  $('.media-attention').addClass('is-fading');

  setTimeout(function(){
    $('.media-attention').hide();
    $('.media-attention').removeClass('is-fading');
    $(event.currentTarget).removeClass('is-disabled');
  }, 1000);
});



// Helpers
//
var getRand = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getRandFromArr(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
};
