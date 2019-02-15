<template>
    <div>
        <q-list highlight v-if="view == 'list'"> 
            <q-list-header>En cours</q-list-header>
            <q-item v-for="s in filter('wip')" :key="s.name" @click.native="$router.push(`/song/${s._id}`)">
                <q-item-main :label="s.name" />
            </q-item>
            <q-item-separator />
            <q-list-header>Finis</q-list-header>
            <q-item v-for="s in filter('done')" :key="s.name" @click.native="$router.push(`/song/${s._id}`)">
                <q-item-main :label="s.name" />
                <q-item-side right>
                    <q-item-tile icon="visibility" color="blue" />
                </q-item-side>
            </q-item>
            <q-item-separator />
            <q-list-header>Nouveaux</q-list-header>
            <q-item v-for="s in filter('new')" :key="s.name" @click.native="$router.push(`/song/${s._id}`)">
                <q-item-main :label="s.name" />
                <q-item-side right>
                    <q-item-tile icon="visibility" color="blue" />
                </q-item-side>
            </q-item>
            <q-item-separator />
            <q-list-header>Abandonnés</q-list-header>
            <q-item v-for="s in filter('cancelled')" :key="s.name" @click.native="$router.push(`/song/${s._id}`)">
                <q-item-main :label="s.name" />
                <q-item-side right>
                    <q-item-tile icon="visibility" color="blue" />
                </q-item-side>
            </q-item>
        </q-list>
        <div v-if="view == 'add'"> 
            <q-field label='Nom'>
                <q-input v-model='songName'/>
            </q-field>
            <q-field label='Status'>
                <q-radio v-model='songStatus' label='Nouveau' val='new'>
                </q-radio>
                <q-radio v-model='songStatus' label='En cours' val='wip'>
                </q-radio>
                <q-radio v-model='songStatus' label='Fini' val='done'>
                </q-radio>
                <q-radio v-model='songStatus' label='Abandonné' val='cancelled'>
                </q-radio>
            </q-field>
            <q-btn
                    label='Abandonner'
                    color="secondary"
                    @click="view = 'list'"
            />
            <q-btn
                    label='Ajouter'
                    color="primary"
                    @click="addSong"
                    icon="add"
            />
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="view === 'list'">
            <q-btn
                    round
                    color="primary"
                    @click="showAddView"
                    icon="add"
            />
        </q-page-sticky>
    </div>

</template>

<script>
    import {Session} from 'meteor/session';
    import {Songs} from '../lib/collections.js';

    //swap the comment on these lines if you want to compile for ios
    import { QProgress } from '/node_modules/quasar-framework/dist/quasar.mat.esm.js';
    //import { QProgress } from '/node_modules/quasar-framework/dist/quasar.ios.esm.js';

    export default {
        data: function() {
            return {
                view: 'list',
                songName: '',
                songStatus: 'new'
            }
        },
        components: {
        },
        meteor: {
            songs: {
                params() {
                    return null;
                },
                update () {
                    return Songs.find();
                }
            }
        },
        created() {
            this.$subscribe('songs');
        },
        destroyed() {
        },
        methods: {
            showAddView () {
                this.view = 'add';
            },

            filter (filterStatus) {
                return this.songs.filter(({status}) => status === filterStatus);
            },

            addSong () {
                Songs.insert({
                    name: this.songName,
                    status: this.songStatus
                });
                this.songName = '';
                this.songStatus = '';
                this.view = 'list';
            }
        }
    }

</script>
