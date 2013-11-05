Template.artists.events({
  'submit .new-artist': function(evt, tmpl) {
    evt.preventDefault();

    var stageName = tmpl.find("#new-artist-input");

    var newArtist = {
      stageName: _.str.trim(stageName.value),
      cleanUrlName: _.str.trim(stageName.value.toLowerCase()).split(' ').join('-')
    };

    Meteor.call("addArtist", newArtist, function(err, result) {
      if (err) {
        console.log("Error adding artist");
      }

      $(stageName).val('');
    });
  },
});

Template.artistShow.events({
  'click .edit-button': function(evt, tmpl) {
    evt.preventDefault();

    Router.go('artistEdit', {cleanUrlName: this.cleanUrlName});
  }
});

Template.artistEdit.events({
  'click .cancel-button': function(evt, tmpl) {
    evt.preventDefault();

    Router.go('artistShow', {cleanUrlName: this.cleanUrlName});
  },

  'submit .edit-artist': function(evt, tmpl) {
    evt.preventDefault();

    var id = tmpl.find("#_id");
    var stageName = tmpl.find("#stageName");
    var realName = tmpl.find("#realName");
    var website = tmpl.find("#website");
    var cleanUrlName = tmpl.find("#cleanUrlName");

    var artist = {
      _id: id.value,
      stageName: _.str.trim(stageName.value),
      realName: _.str.trim(realName.value),
      website: _.str.trim(website.value),
      cleanUrlName: _.str.trim(cleanUrlName.value)
    };

    Meteor.call("updateArtist", artist, function(err, result) {
      if (err) {
        console.log("Error updating artist", err);
      }
    });

    Router.go('artistShow', {cleanUrlName: cleanUrlName.value});
  }
});