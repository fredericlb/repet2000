import { Meteor } from 'meteor/meteor';
import { Songs, Versions } from '../lib/collections.js';


/* permissions (thanks to ongoworks:security) */
Security.permit(['insert', 'update','remove'])
    .collections([Songs]).allowInClientCode();