// Private Server Methods
addUserRankings = function(data) {
  var ranking = Rankings.findOne({
    artistId: data.artistId,
    userId: data.userId
  });

  if (!ranking) {
    Rankings.insert({
      artistId: data.artistId,
      userId: data.userId,
      releases: data.releases
    });
  }
};

updateArtistRankings = function(artist) {
  _ = lodash;

  //Extend each artist with borda points to 0
  _.each(artist.releases, function(release) {
    _.extend(release, {"points": 0});
  });

  releaseCount = artist.releases.length;

  //Iterate over all rankings for this artist and tally borda points
  Rankings.find({artistId: artist._id}).forEach(function(ranking) {
    _.each(ranking.releases, function(userRankingRelease) {
      var artistRelease = _.findWhere(artist.releases, {releaseName: userRankingRelease.releaseName});
      artistRelease.points += (releaseCount - (userRankingRelease.rank - 1));
    });
  });

  //Keep track of all new rankings in this object
  var newRankings = [];
  // For every rank (determined by # of releases) we're going to determine the new artist release rankings
  for (var i = 1; i <= releaseCount; i++) {
    var releaseIndex = _.indexOf(artist.releases, _.max(artist.releases, 'points'));
    var release = artist.releases[releaseIndex];
    newRankings.push({
      releaseType: release.releaseType,
      releaseName: release.releaseName,
      rank: i,
      points: release.points
    });

    console.log(release.releaseName + " is rank " + i + " with " + release.points + " points.");

    //Remove this release from the list so we can get the next max
    artist.releases.splice(releaseIndex, 1);
  }

  //Update the artist's release rankings
  Artists.update({_id: artist._id}, {$set: {releases: newRankings}});
};

// Public Meteor Methods
Meteor.methods({
  updateUserRankings: function(data) {
    if (Meteor.userId() !== data.userId) {
      throw new Meteor.Error(403, "You can't change this user's ratings");
    }
    
    //Update the rankings for current user/artist
    Rankings.update({artistId: data.artistId, userId: data.userId}, {$set: { releases: data.releases }});

    //Update the artist rankings with new user rankings
    //TODO: move this to cron job
    updateArtistRankings(Artists.findOne({_id: data.artistId}));
  }
});

// Server Startup
Meteor.startup(function() {
  // Add rankings for all releases for each user
  Artists.find().forEach(function(artist) {
    Meteor.users.find().forEach(function(user) {
      var data = {
        artistId: artist._id,
        userId: user._id,
        releases: artist.releases
      };

      addUserRankings(data);
    });
  });
});
