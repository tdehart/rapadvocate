_.extend(Template.artists, {
  artists: function() {
    return Artists.find();
  },

  events: {
    'submit .new-artist': function(evt, tmpl) {
      evt.preventDefault();

      var stageName = tmpl.find("#new-artist-input");

      var newArtist = {
        stageName: _.str.trim(stageName.value)
      };

      Meteor.call("addArtist", newArtist, function(err, result) {
        if (err) {
          console.log("Error adding artist");
        } else {
          $(stageName).val('');
        }
      });
    }
  }
});