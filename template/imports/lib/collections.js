
import { Mongo } from 'meteor/mongo';
import { FilesCollection } from 'meteor/ostrio:files';

const Songs = new Mongo.Collection('songs');
const Versions = new FilesCollection({
    collectionName: 'Versions',
    storagePath: '/opt/repet2000/versions',
    allowClientCode: true, // Disallow remove files from Client
});

export {Songs, Versions};