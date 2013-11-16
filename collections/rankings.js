Rankings = new Meteor.Collection("rankings");

Meteor.startup(function() {
  if (Meteor.isServer) {

    // Add rankings for all releases for each user
    Artists.find().forEach(function(artist) {
      Meteor.users.find().forEach(function(user) {
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
    });
  }
});
