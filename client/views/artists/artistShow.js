var firstRender = true;

Template.artistShow.rendered = function() {
  if (firstRender) {
    Session.set('rankingTemplate', 'allRanks');
    firstRender = false;
  }
};

Template.myRankingsTemplate.rendered = function() {
  $('.sortable').sortable({
    sort: function() {
      var $lis = $(this).children('li');
      $lis.each(function() {
        var $li = $(this);
        var hindex = $lis.filter('.ui-sortable-helper').index();
        if (!$li.is('.ui-sortable-helper')) {
          var index = $li.index();
          index = index < hindex ? index + 1 : index;

          $li.val(index);

          if ($li.is('.ui-sortable-placeholder')) {
            $lis.filter('.ui-sortable-helper').val(index);
          }
        }
      });
    }
  });
};

Template.artistShow.events({
  'click #artist-edit': function(evt, tmpl) {
    evt.preventDefault();

    Router.go('artistEdit', {
      cleanUrlName: this.artist.cleanUrlName
    });
  },

  'click .my-ranks-button': function(evt, tmpl) {
    evt.preventDefault();

    Session.set('rankingTemplate', 'myRanks');
  },

  'click .save-ranks-button': function(evt, tmpl) {
    evt.preventDefault();
    Session.set('rankingTemplate', 'allRanks');

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
      artistId: this.artist._id,
      userId: Meteor.userId(),
      releases: releases
    };

    Meteor.call("updateUserRankings", data, function(err, result) {
      if (err) {
        console.log("Error submitting rankings", err);
      }
    });
  },

  'click .cancel-ranks-button': function(evt, tmpl) {
    evt.preventDefault();
    Session.set('rankingTemplate', 'allRanks');
    $(".sortable").sortable("cancel");
  }
});
