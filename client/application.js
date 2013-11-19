Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
});

Template.layout.events({
  'click .login-nav-button': function(evt, tmpl) {
    evt.preventDefault();
  }
});
