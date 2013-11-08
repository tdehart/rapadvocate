Template.artistEdit.events({
  'click .cancel-button': function(evt, tmpl) {
    evt.preventDefault();

    Router.go('artistShow', {
      cleanUrlName: this.cleanUrlName
    });
  },

  'submit .new-music-release': function(evt, tmpl) {
    evt.preventDefault();

    var artistId = tmpl.find("#artist-id");
    var releaseType = tmpl.find("#input-release-type");
    var releaseName = tmpl.find("#input-release-name");
    var otherArtists = tmpl.find("#input-other-artists");
    var iTunesUrl = tmpl.find("#input-itunes-url");
    var spotifyUrl = tmpl.find("#input-website");
    var amazonUrl = tmpl.find("#input-birthplace");

    var data = {
      artistId: artistId.value,
      release: {
        releaseType: releaseType.value.toLowerCase(),
        releaseName: _.str.trim(releaseName.value)
      }
    };

    Meteor.call("addMusicRelease", data, function(err, result) {
      if (err) {
        console.log("Error updating artist", err);
      }
    });
  },

  'submit .edit-artist': function(evt, tmpl) {
    evt.preventDefault();

    var id = tmpl.find("#_id");
    var stageName = tmpl.find("#input-stage-name");
    var realName = tmpl.find("#input-real-name");
    var website = tmpl.find("#input-website");
    var birthplace = tmpl.find("#input-birthplace");
    var cleanUrlName = tmpl.find("#input-clean-url-name");
    var twitterUsername = tmpl.find("#input-twitter");

    var data = {
      artistId: id.value,
      artist: {
        stageName: _.str.trim(stageName.value),
        realName: _.str.trim(realName.value),
        website: _.str.trim(website.value),
        birthplace: _.str.trim(birthplace.value),
        cleanUrlName: _.str.trim(cleanUrlName.value),
        twitterUsername: _.str.trim(twitterUsername.value)
      }
    };

    Meteor.call("updateArtist", data, function(err, result) {
      if (err) {
        console.log("Error updating artist", err);
      }
    });

    Router.go('artistShow', {
      cleanUrlName: cleanUrlName.value
    });
  },

  'click .delete-button': function(evt, tmpl) {
    evt.preventDefault();
    var response = confirm("You sure?");

    if (response) {
      var id = tmpl.find("#_id").value;

      Meteor.call("deleteArtist", id, function(err, result) {
        if (err) {
          console.log("Error updating artist", err);
        }
      });
    }

    Router.go('artists');
  }
});
