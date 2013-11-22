Template.artistEdit.rendered = function() {
  $(".modal-backdrop").remove();
};

Template.artistEdit.events({
  'click .cancel-button': function(evt, tmpl) {
    evt.preventDefault();

    Router.go('artistShow', {
      cleanUrlName: this.cleanUrlName
    });
  },

  'submit .new-music-release': function(evt, tmpl) {
    evt.preventDefault();

    //TODO: refactor with loop
    var artistId = tmpl.find("#artist-id");
    var releaseType = tmpl.find("#input-release-type");
    var releaseName = tmpl.find("#input-release-name");
    var releaseYear = tmpl.find("#input-release-year");
    var iTunesUrl = tmpl.find("#input-itunes-url");
    var spotifyUrl = tmpl.find("#input-spotify-url");
    var amazonUrl = tmpl.find("#input-amazon-url");
    var mixtapeUrl = tmpl.find("#input-mixtape-url");

    var data = {
      artistId: artistId.value,
      release: {
        releaseType: releaseType.value,
        releaseName: _.str.trim(releaseName.value),
        releaseYear: _.str.trim(releaseYear.value),
        iTunesUrl: _.str.trim(iTunesUrl.value),
        spotifyUrl: _.str.trim(spotifyUrl.value),
        amazonUrl: _.str.trim(amazonUrl.value),
        mixtapeUrl: _.str.trim(mixtapeUrl.value)
      }
    };

    Meteor.call("addMusicRelease", data, function(err, result) {
      if (err) {
        console.log("Error updating artist", err);
      } else {
        $(releaseType).val('');
        $(releaseName).val('');
        $(releaseYear).val('');
        $(iTunesUrl).val('');
        $(spotifyUrl).val('');
        $(amazonUrl).val('');
      }
    });
  },

  'submit .edit-artist': function(evt, tmpl) {
    evt.preventDefault();

    //TODO: refactor with loop
    var id = tmpl.find("#_id");
    var stageName = tmpl.find("#input-stage-name");
    var realName = tmpl.find("#input-real-name");
    var website = tmpl.find("#input-website");
    var artistImage = tmpl.find("#input-artist-image");
    var birthdate = tmpl.find("#input-birthdate");
    var birthplace = tmpl.find("#input-birthplace");
    var cleanUrlName = tmpl.find("#input-clean-url-name");
    var twitterUsername = tmpl.find("#input-twitter");

    var data = {
      artistId: id.value,
      artist: {
        stageName: _.str.trim(stageName.value),
        realName: _.str.trim(realName.value),
        website: _.str.trim(website.value),
        artistImage: _.str.trim(artistImage.value),
        birthplace: _.str.trim(birthplace.value),
        birthdate: _.str.trim(birthdate.value),
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
