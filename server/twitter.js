Meteor.startup(function() {
  var env = process.env;

  // var twit = new TwitMaker({
  //   consumer_key: env.TWITTER_CONSUMER_KEY,
  //   consumer_secret: env.TWITTER_CONSUMER_SECRET,
  //   access_token: env.TWITTER_TOKEN,
  //   access_token_secret: env.TWITTER_TOKEN_SECRET
  // });

  // var Fiber = Npm.require('fibers');
  // var twitterText = Meteor.require('twitter-text');

  // Artists.find().forEach(function(artist) {
  //   twit.get('statuses/user_timeline', {
  //     screen_name: artist.twitterUsername,
  //     count: 10
  //   }, function(err, tweets) {
  //     Fiber(function() {
  //       if (err) {
  //         console.log("Error", err);
  //       }
  //       _.each(tweets, function(tweet) {
  //         data = {
  //           twitterUsername: tweet.user.screen_name,
  //           tweet: {
  //             text: twitterText.autoLink(tweet.text),
  //             createdAt: tweet.created_at
  //           }
  //         };

  //         addTweet(data);
  //       });
  //     }).run();

  //   });
  // });

  // console.log(twit);

  // var stream = twit.stream('statuses/filter', {
  //   track: 'mango'
  // });


  // stream.on('tweet', function(tweet) {
  //   console.log(tweet);
  // });

});
