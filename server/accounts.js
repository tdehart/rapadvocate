//Create rankings for new user
Accounts.onCreateUser(function(options, user) {
  Artists.find().forEach(function(artist) {
    var data = {
      artistId: artist._id,
      userId: user._id,
      releases: artist.releases
    };

    Meteor.call("addUserRankings", data, function(err, result) {
      if (err) {
        console.log("Error adding user ranking");
      }
    });
  });

  // We still want the default hook's 'profile' behavior.
  if (options.profile)
    user.profile = options.profile;

  return user;
});
