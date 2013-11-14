Meteor.publish('artists', function () {
    return Artists.find();
});

Meteor.publish('rankings', function () {
    return Rankings.find();
});
