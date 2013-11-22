Meteor.startup(function() {
  var env = process.env;

  var twit = new TwitMaker({
    consumer_key: env.TWITTER_CONSUMER_KEY,
    consumer_secret: env.TWITTER_CONSUMER_SECRET,
    access_token: env.TWITTER_TOKEN,
    access_token_secret: env.TWITTER_TOKEN_SECRET
  });

  var Fiber = Npm.require('fibers');
  var twitterText = Meteor.require('twitter-text');
  var moment = Meteor.require('moment');

  // var twitterNames = _.map(Artists.find().fetch(), function(artist) {
  //   return artist.twitterUsername;
  // });

  // twit.get('users/lookup', {
  //   screen_name: twitterNames.join(',')
  // }, function(err, users) {
  //   Fiber(function() {
  //     if (err) {
  //       console.log("Error", err);
  //     }
  //     _.each(users, function(user) {
  //       setTwitterUserId(user);
  //     });
  //   }).run();
  // });

  Artists.find().forEach(function(artist) {
    twit.get('statuses/user_timeline', {
      screen_name: artist.twitterUsername,
      count: 8
    }, function(err, tweets) {
      Fiber(function() {
        if (err) {
          console.log("Error", err);
        }
        _.each(tweets, function(tweet) {
          console.log(tweet);
          var tweetTime = tweet.created_at;
          var time = moment(new Date(tweetTime)).fromNow();
          data = {
            twitterUsername: tweet.user.screen_name,
            tweet: {
              text: twitterText.autoLink(tweet.text),
              createdAt: time,
              rawTime: tweetTime,
              detailsId: tweet.id_str,
              detailsLink: 'https://twitter.com/' + artist.twitterUsername + '/status/' + tweet.id_str
            }
          };

          addTweet(data);
        });
      }).run();

    });
  });

  // console.log(twit);

  // var twitterIds = _.map(Artists.find().fetch(), function(artist) {
  //   return artist.twitterId;
  // });


  // var stream = twit.stream('statuses/filter', {
  //   follow: twitterIds.join(',')
  // });

  // console.log(twitterIds);

  // stream.on('tweet', function(tweet) {
  //   if (tweet.retweeted_status) {
  //     console.log('retweet');
  //   } else {
  //     console.log('real tweet');
  //   }

  //   console.log(tweet.user.screen_name, tweet.text);
  // });

});
