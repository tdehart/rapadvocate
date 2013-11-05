// Artists document
// { 
//   _id: "4f297e550b3e6d9e2b7aa58e",
//   stageName: "Kendrick Lamar",
//   realName: "Kendrick Lamar Duckworth",
//   cleanUrlName: 'kendrick-lamar',
//   birthdate: 1329126719,
//   birthplace: "Compton, California",
//   website: "http://www.kendricklamar.com/",
//   tags: ["west coast", "ya bish"],
//   similarArtists: [{artistId: "4f297e550b3e6d9e2b7aa58e", stageName: "Schoolboy Q", weight: 2}],
//   comments: [{
//     userId: "1f297e550b3e6d9e2b7aa58f",
//     name: "2WAR",
//     created: 1328118162000,
//     text: "we really out here",
//   }],
//   releases: [{ 
//     _id: "2f297e550b3e6d9e2b7aa58z"
//     artistIds: ["4f297e550b3e6d9e2b7aa58e"],
//     name: "Overly Dedicated", 
//     type: "mixtape",
//     ranks: [{userId: "1f297e550b3e6d9e2b7aa58f", rank: 1}],
//     avgRank: 1,
//     url: "http://tinyurl.com/6kkexux",
//     likes: ["1f297e550b3e6d9e2b7aa58f"] },
//     sales: 0,
//   }]
// }


Artists = new Meteor.Collection("artists");
// Use Meteor.methods for db operations
Meteor.methods({

  addArtist: function(artist) {
    if (artist.stageName === "") {
      throw new Meteor.Error(403, "Stage name required");
    } else if (Artists.find({stageName: artist.stageName}).count() > 0) {
      throw new Meteor.Error(403, "Duplicate artist");
    }

    return Artists.insert(artist);
  },

  updateArtist: function(artist) {
    var artistObject = Artists.findOne({_id: artist._id});
    return Artists.update(artistObject, artist);
  }
});