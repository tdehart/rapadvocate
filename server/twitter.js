if (Meteor.isServer) {
  Meteor.startup(function() {
    // connect the twitter api
    var twit = new TwitMaker({
      consumer_key: '',
      consumer_secret: '',
      access_token: '',
      access_token_secret: ''
    });

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

    //       Meteor.call("addTweet", data, function(err, result) {
    //         if (err) {
    //           console.log("Error updating artist", err);
    //         }
    //       });
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
}
