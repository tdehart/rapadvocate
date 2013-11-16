Meteor.methods({
  addUserRankings: function(data) {
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
  },

  updateUserRankings: function(data) {
    return Rankings.update({
      artistId: data.artistId,
      userId: data.userId
    }, {
      $set: {
        releases: data.releases
      }
    });
  },

  updateArtistRankings: function() {
    //Using lodash methods below
    _ = lodash;

    Artists.find().forEach(function(artist) {
      var ranks = {};

      //Build an object of ranks with default value of 0; e.g., {"1": 0, "2": 0, "3": 0}
      for (var i = 1; i <= artist.releases.length; i++) {
        ranks[i] = 0;
      }

      //Extend each artist release with the rank object
      _.each(artist.releases, function(release) {
        _.extend(release, ranks);
      });

      //Iterate over all rankings for this artist and count number of rankings for each release
      Rankings.find({artistId: artist._id}).forEach(function(ranking) {
        _.each(ranking.releases, function(rankingRelease) {
          var artistRelease = _.findWhere(artist.releases, {releaseName: rankingRelease.releaseName});
          artistRelease[rankingRelease.rank] += 1;
        });
      });

      //Keep track of all new rankings in this object
      var newRankings = [];

      //Retain the original artist.release list length because we'll later be splicing this list
      var releaseLength = artist.releases.length;

      //For every rank (determined by # of releases) we're going to determine the new artist release rankings
      for (i = 1; i <= releaseLength; i++) {
        //Whichever release has the most votes for this rank gets to be this rank
        //e.g., if MMLP has the most votes for "Rank 1" then MMLP is now "Rank 1"
        var releaseIndex = _.indexOf(artist.releases, _.max(artist.releases, i));
        var release = artist.releases[releaseIndex];
        newRankings.push({
          releaseType: release.releaseType,
          releaseName: release.releaseName,
          rank: i
        });

        console.log(release.releaseName + " has the most votes for Rank " + i + " with " + release[i] + " votes.");

        //Remove this release from the list in case there are ties. Every release needs to get a rank.
        artist.releases.splice(releaseIndex, 1);
      }

      //Update the artist's release rankings
      Artists.update({_id: artist._id}, {$set: {releases: newRankings}});
    });
  }
});
