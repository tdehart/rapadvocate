Template.artists.events({
  'submit .new-artist': function(evt, tmpl) {
    evt.preventDefault();

    var stageName = tmpl.find("#new-artist-input");

    var newArtist = {
      stageName: _.str.trim(stageName.value)
    };

    var me = this;

    Meteor.call("addArtist", newArtist, function(err, result) {
      if (err) {
        console.log("Error adding artist");
      }

      $(stageName).val('');

    });
  }
});
