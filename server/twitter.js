Meteor.startup(function() {
  var env = process.env;

  // var twit = new TwitMaker({
  //   consumer_key: env.TWITTER_CONSUMER_KEY,
  //   consumer_secret: env.TWITTER_CONSUMER_SECRET,
  //   access_token: env.TWITTER_TOKEN,
  //   access_token_secret: env.TWITTER_TOKEN_SECRET
  // });

  var Fiber = Npm.require('fibers');

  // var em = twit.get('statuses/user_timeline', {
  //   screen_name: 'eminem',
  //   count: 10
  // }, function(err, tweets) {
  //   Fiber(function() {
  //     _.each(tweets, function(tweet) {
  //       data = {
  //         twitterUsername: tweet.user.screen_name,
  //         tweet: {
  //           text: tweet.text,
  //           createdAt: tweet.created_at
  //         }
  //       };

  //       addTweet(data);
  //     });
  //   }).run();

  // });



  // var stream = twit.stream('statuses/filter', {
  //   track: 'mango'
  // });


  // stream.on('tweet', function(tweet) {
  //   Fiber(function() {
  // Tweets.insert({
  //   text: tweet.text,
  //   author: tweet.user.screen_name
  // });
  //   }).run();
  // });

});
