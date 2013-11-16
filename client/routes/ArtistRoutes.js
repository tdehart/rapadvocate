//Artist List Controller
ArtistListController = RouteController.extend({
  template: 'artists',

  before: function() {},
  after: function() {},

  waitOn: function() {
    return Meteor.subscribe('artists');
  },

  data: function() {
    return {
      artists: Artists.find(),
    };
  },

});

//Artist Show Controller
ArtistShowController = RouteController.extend({
  template: 'artistShow',
  before: function() {},
  after: function() {},

  waitOn: function () {
    return [Meteor.subscribe('artists', {cleanUrlName: this.params.cleanUrlName}),
            Meteor.subscribe('rankings', {userId: Meteor.userId()})];
  },

  data: function() {
    var artist = Artists.findOne({cleanUrlName: this.params.cleanUrlName});

    return {
      artist: artist,
      rankings: Rankings.findOne({artistId: artist._id, userId: Meteor.userId()})
    };
  }
});

//Artist Edit Controller
ArtistEditController = RouteController.extend({
  template: 'artistEdit',
  before: function() {
    if (!Meteor.user()) {
      Router.go('artistShow', {
        cleanUrlName: this.params.cleanUrlName
      });
    }
  },
  after: function() {},

  waitOn: function() {
    return Meteor.subscribe('artists', {cleanUrlName: this.params.cleanUrlName});
  },

  data: function() {
    return Artists.findOne({cleanUrlName: this.params.cleanUrlName});
  }
});

//Artist Routes
Router.map(function() {
  this.route('root', {
    path: '/',
    controller: ArtistListController
  });

  this.route('artists', {
    path: '/artists',
    controller: ArtistListController
  });

  this.route('artistShow', {
    path: '/artist/:cleanUrlName',
    controller: ArtistShowController
  });

  this.route('artistEdit', {
    path: '/artist/:cleanUrlName/edit',
    controller: ArtistEditController
  });

});
