//Create rankings for new user
Accounts.onCreateUser(function(options, user) {
  Artists.find().forEach(function(artist) {
    var data = {
      artistId: artist._id,
      userId: user._id,
      releases: artist.releases
    };

    addUserRankings(data);
  });

  user.username = options.email.split("@")[0];

  // We still want the default hook's 'profile' behavior.
  if (options.profile)
    user.profile = options.profile;

  return user;
});

Meteor.startup(function() {
  var user = Meteor.users.findOne({username: "tdehart"});

  if (user) {
    Roles.addUsersToRoles(user._id, 'admin');
  }
  
});
