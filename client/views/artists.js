Template.artistShow.rendered = function() {
  $('.sortable').sortable().bind('sortupdate', function(evt, obj) {
    console.log(_.str.trim(obj.item.text()));
  });
};

Template.artistShow.destroyed = function() {
  $('.sortable').sortable('destroy');
};

Template.artists.events({
  'submit .new-artist': function(evt, tmpl) {
    evt.preventDefault();

    var stageName = tmpl.find("#new-artist-input");

    var newArtist = {
      stageName: _.str.trim(stageName.value),
      cleanUrlName: _.str.trim(stageName.value.toLowerCase()).split(' ').join('-')
    };

    Session.set('doAddAnimation', true);

    Meteor.call("addArtist", newArtist, function(err, result) {
      if (err) {
        console.log("Error adding artist:", err.reason);
      }

      $(stageName).val('');
    });
  },
});

Template.artistShow.events({
  'click .edit-button': function(evt, tmpl) {
    evt.preventDefault();

    Router.go('artistEdit', {
      cleanUrlName: this.cleanUrlName
    });
  }
});

Template.artists.rendered = function() {

};

Template.artist.rendered = function() {
  var finished = Session.get('doAddAnimation');
  if (finished) {
    $("li:last").hide().slideDown();
  }

  Session.set('doAddAnimation', false);

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

    var data = {
      artistId: id.value,
      artist: {
        stageName: _.str.trim(stageName.value),
        realName: _.str.trim(realName.value),
        website: _.str.trim(website.value),
        birthplace: _.str.trim(birthplace.value),
        cleanUrlName: _.str.trim(cleanUrlName.value)
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
  }
});