<template>
    <div style="padding: 8px;">
        <pre  v-if="view === 'list'">
{{song != null ? (song.lyrics ? song.lyrics : 'Pas de paroles') : '...'}}
        </pre>
        <div v-if="view === 'edit'">
            <q-input
                v-model="songLyrics"
                type="textarea"
                float-label="Paroles"
                :max-height="200"
                rows="10"
            />
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="view === 'list'">
            <q-btn
                    round
                    color="primary"
                    @click="showEditView"
                    icon="edit"
            />
        </q-page-sticky>
        <q-page-sticky position="bottom-right" :offset="[70, 18]" v-if="view === 'edit'">
            <q-btn
                    round
                    color="secondary"
                    @click="view = 'list'"
                    icon="cancel"
            />
        </q-page-sticky>
        <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="view === 'edit'">
            <q-btn
                    round
                    color="primary"
                    @click="editLyrics"
                    icon="check"
            />
        </q-page-sticky>
    </div>

</template>

<script>
    import {Session} from 'meteor/session';
    import {Songs} from '../lib/collections.js';

    export default {
        data: function() {
            return {
                view: 'list',
                songLyrics: ""
            }
        },
        components: {
        },
        meteor: {
            song: {
                params() {
                    return null;
                },
                update () {
                    const id = this.$route.params.id;
                    return Songs.findOne({_id: id});
                }
            }
        },
        created() {
            this.$subscribe('songs');
        },
        destroyed() {
        },
        methods: {
            showEditView () {
                this.view = 'edit';
                this.songLyrics = this.song.lyrics || '';
            },

            editLyrics () {
                const id = this.$route.params.id;
                Songs.update(id, {
                    $set: {
                        lyrics: this.songLyrics
                    }
                });
                this.songLyrics = '';
                this.view = 'list';
            }
        }
    }

</script>
