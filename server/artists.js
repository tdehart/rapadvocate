Meteor.methods({
  addArtist: function(artist) {
    console.log('add artist', this);

    if (artist.stageName === "") {
      throw new Meteor.Error(403, "Stage name required");
    } else if(artist.cleanUrlName === "") {
      throw new Meteor.Error(403, "Clean URL name required");
    } else if (Artists.find({stageName: artist.stageName}).count() > 0) {
      throw new Meteor.Error(403, "Duplicate artist");
    }

    return Artists.insert(artist);
  },

  updateArtist: function(data) {
    if (data.artist.cleanUrlName === "") {
      throw new Meteor.Error(403, "Clean URL name required");
    }

    return Artists.update({_id: data.artistId}, {$set: data.artist});
  },

  addMusicRelease: function(data) {
    if (data.artistId === "") {
      throw new Meteor.Error(403, "Artist ID required");
    } else if (data.release.releaseName === "") {
      throw new Meteor.Error(403, "Album/mixtape name required");
    } else if (data.release.releaseType === "") {
      throw new Meteor.Error(403, "Album/mixtape type required");
    }

    return Artists.update({_id: data.artistId}, {$addToSet: {releases: data.release}});
  }
});