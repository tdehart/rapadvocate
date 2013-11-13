Meteor.methods({
  addArtist: function(artist) {
    console.log('add artist', this);

    if (artist.stageName === "") {
      throw new Meteor.Error(403, "Stage name required");
    } else if (artist.cleanUrlName === "") {
      throw new Meteor.Error(403, "Clean URL name required");
    } else if (Artists.find({
      stageName: artist.stageName
    }).count() > 0) {
      throw new Meteor.Error(403, "Duplicate artist");
    }

    return Artists.insert(artist);
  },

  updateArtist: function(data) {
    if (data.artist.cleanUrlName === "") {
      throw new Meteor.Error(403, "Clean URL name required");
    }

    return Artists.update({
      _id: data.artistId
    }, {
      $set: data.artist
    });
  },

  deleteArtist: function(id) {
    if (!id) {
      throw new Meteor.Error(403, "Artist ID required to delete.");
    }

    return Artists.remove({_id: id});
  },

  addMusicRelease: function(data) {
    if (data.artistId === "") {
      throw new Meteor.Error(403, "Artist ID required");
    } else if (data.release.releaseName === "") {
      throw new Meteor.Error(403, "Album/mixtape name required");
    } else if (data.release.releaseType === "") {
      throw new Meteor.Error(403, "Album/mixtape type required");
    }

    var artist = Artists.findOne({_id: data.artistId});
    if (artist.releases) {
      data.release.rank = artist.releases.length + 1;
    } else {
      data.release.rank = 1;
    }

    Artists.update(artist, {$addToSet: {releases: data.release}});
  },

  addTweet: function(data) {
    if (data.twitterUsername === "") {
      throw new Meteor.Error(403, "Need a twitter username to add a tweet");
    }

    return Artists.update({
      twitterUsername: ("@" + data.twitterUsername)
    }, {
      $addToSet: {
        tweets: data.tweet
      }
    });
  }
});
