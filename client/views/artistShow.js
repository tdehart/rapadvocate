Template.artistShow.rendered = function() {
  var me = this;

  $('.sortable').sortable().bind('sortupdate', function(evt, obj) {
    // console.log(_.str.trim(obj.item.text()));

    var releases = [];

    $("#rank-list li").each(function(index, element) {
      var text = _.str.trim($(element).text()).split(" ");
      releases.push({
        releaseType: _.str.trim(_.last(text), "()"),
        releaseName: _.initial(text).join(" "),
        rank: index + 1
      });
    });

    var data = {
      artistId: me.data.artist._id,
      userId: Meteor.userId(),
      releases: releases
    };

    Meteor.call("updateUserRankings", data, function(err, result) {
      if (err) {
        console.log("Error submitting rankings", err);
      }
    });
  });
};

Template.artistShow.destroyed = function() {
  $('.sortable').sortable('destroy');
};

Template.artistShow.events({
  'click .edit-button': function(evt, tmpl) {
    evt.preventDefault();

    Router.go('artistEdit', {
      cleanUrlName: this.artist.cleanUrlName
    });
  }
});
