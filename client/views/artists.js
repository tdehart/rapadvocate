Template.artists.events({
  'submit .new-artist': function(evt, tmpl) {
    evt.preventDefault();

    var stageName = tmpl.find("#new-artist-input");

    var newArtist = {
      stageName: _.str.trim(stageName.value)
    };

    Meteor.call("addArtist", newArtist, function(err, result) {
      if (err) {
        console.log("Error adding artist");
      }

      $(stageName).val('');
    });
  }
});

Template.artistShow.events({
  'click .cancel-button': function(evt, tmpl) {
    evt.preventDefault();
    
    Router.go('/artists');
  },

  'submit .edit-artist': function(evt, tmpl) {
    evt.preventDefault();

    var stageName = tmpl.find("#input-stage-name");
    var realName = tmpl.find("#input-real-name");
    var website = tmpl.find("#input-website");

    var artist = {
      stageName: _.str.trim(stageName.value),
      realName: _.str.trim(realName.value),
      website: _.str.trim(website.value)
    };

    Meteor.call("updateArtist", artist, function(err, result) {
      if (err) {
        console.log("Error updating artist", err);
      }
    });

  }
});