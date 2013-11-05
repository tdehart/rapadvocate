//Artist Index Controller
ArtistsController = RouteController.extend({
  template: 'artists',

  before: function () {},
  after: function () {},

  waitOn: function () {
    return Meteor.subscribe('artists');
  },

  data: function () {
    return {
      artists: Artists.find()
    };
  },

});

//Artist Show Controller
ArtistShowController = RouteController.extend({
  template: 'artistShow',
  before: function () {},
  after: function () {},

  waitOn: function () {
    return Meteor.subscribe('artists', {cleanUrlName: this.params.cleanUrlName});
  },

  data: function () {
    return Artists.findOne({cleanUrlName: this.params.cleanUrlName});
  }
});

//Artist Edit Controller
ArtistEditController = RouteController.extend({
  template: 'artistEdit',
  before: function () {},
  after: function () {},

  waitOn: function () {
    return Meteor.subscribe('artists', {cleanUrlName: this.params.cleanUrlName});
  },

  data: function () {
    return Artists.findOne({cleanUrlName: this.params.cleanUrlName});
  }
});

//Artist Routes
Router.map(function() {
  this.route('root', {
    path: '/',
    controller: ArtistsController
  });

  this.route('artists', {
    path: '/artists',
    controller: ArtistsController
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