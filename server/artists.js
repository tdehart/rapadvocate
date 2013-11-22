addTweet = function(data) {
  return Artists.update({
    twitterUsername: (data.twitterUsername)
  }, {
    $addToSet: {
      tweets: data.tweet
    }
  });
};

setTwitterUserId = function(twitterUser) {
  Artists.update({
    twitterUsername: twitterUser.screen_name
  }, {
    $set: {twitterId: twitterUser.id}
  });
};

Meteor.methods({
  addArtist: function(artist) {
    if (!Meteor.user()) {
      throw new Meteor.Error(403, "You must be logged in for this action");
    } else if (artist.stageName === "") {
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
    if (!Meteor.user()) {
      throw new Meteor.Error(403, "You must be logged in for this action");
    } else if (data.artist.cleanUrlName === "") {
      throw new Meteor.Error(403, "Clean URL name required");
    }

    return Artists.update({
      _id: data.artistId
    }, {
      $set: data.artist
    });
  },

  deleteArtist: function(id) {
    if (!Meteor.user()) {
      throw new Meteor.Error(403, "You must be logged in for this action");
    } else if (!id) {
      throw new Meteor.Error(403, "Artist ID required to delete.");
    }

    return Artists.remove({_id: id});
  },

  addMusicRelease: function(data) {
    if (!Meteor.user()) {
      throw new Meteor.Error(403, "You must be logged in for this action");
    } else if (data.artistId === "") {
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
  }
});

//Seed some artists if none are present
Meteor.startup(function() {
  Artists.remove({});
  Rankings.remove({});
  
  var artists = JSON.parse(Assets.getText("artists.json"));

  if (!Artists.find().count()) {
    artists.forEach(function(artist) {
      console.log("Inserting " + artist.stageName);
      Artists.insert(artist);
    });
  }

});
