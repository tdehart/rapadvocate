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
    return Meteor.subscribe('artists', this.params._id);
  },

  data: function () {
    return Artists.findOne({_id: this.params._id});
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
    path: '/artist/:_id',
    controller: ArtistShowController
  });

});