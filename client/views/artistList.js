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

Template.artist.rendered = function() {
  var finished = Session.get('doAddAnimation');
  if (finished) {
    $("li:last").hide().slideDown();
  }

  Session.set('doAddAnimation', false);
};
