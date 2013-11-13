Template.artistShow.rendered = function() {
  $('.sortable').sortable().bind('sortupdate', function(evt, obj) {
    // console.log(_.str.trim(obj.item.text()));

    $("ol li").each(function(index, element) {
      console.log(_.str.trim($(this).text()));
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
      cleanUrlName: this.cleanUrlName
    });
  }
});
