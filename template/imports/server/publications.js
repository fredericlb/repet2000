import { Meteor } from 'meteor/meteor';
import { Songs, Versions } from '../lib/collections.js';

Meteor.publish('songs', function(){
    return Songs.find({});
});

/*
Meteor.publish('versions', function(){
    return Versions.find({});
});*/

Meteor.publish('files.versions.all', function () {
    return Versions.find().cursor;
});

if (Meteor.isClient) {
    Meteor.subscribe('files.versions.all');
}
