<template>
    <div style="padding: 8px;">
        <div v-if="view == 'list' && (versions == null || versions.length == 0)">
            Pas de versions
        </div>
        <q-list highlight v-if="view == 'list' && versions && versions.length > 0"> 
            <q-item v-for="v in versions" :key="v.name">
                <q-item-main :label="v.name" />
                <q-item-side right>
                    <a :href="v.link">
                        <q-item-tile icon="cloud_download">
                        </q-item-tile>
                    </a>
                </q-item-side>
            </q-item>
        </q-list>
        <div v-if="view === 'add'">
            <q-field label='Nom'>
                <q-input v-model='versionName'/>
            </q-field>
            <q-field label='Status'>
                <q-radio v-model='versionType' label='Repet' val='repet'>
                </q-radio>
                <q-radio v-model='versionType' label='Maquette' val='demo'>
                </q-radio>
            </q-field>
            <q-field label='Fichier'>
                <input type='file' @change='readFile'/>
            </q-field>
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="view === 'list'">
            <q-btn
                    round
                    color="primary"
                    @click="showAddView"
                    icon="add"
            />
        </q-page-sticky>
        <q-page-sticky position="bottom-right" :offset="[70, 18]" v-if="view === 'add'">
            <q-btn
                    round
                    color="secondary"
                    @click="view = 'list'"
                    icon="cancel"
            />
        </q-page-sticky>
        <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="view === 'add'">
            <q-btn
                    round
                    color="primary"
                    @click="addVersion"
                    icon="check"
            />
        </q-page-sticky>
    </div>

</template>

<script>
    import {Session} from 'meteor/session';
    import {Songs, Versions} from '../lib/collections.js';

    export default {
        data: function() {
            return {
                view: 'list',
                versionName: "",
                versionType: "",
                versionFile: null
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
            },
            fileVersions: {
                params() {
                    return null;
                },
                update () {
                    return Versions.findOne();
                }
            }
        },
        computed: {
            versions: function() {
                return this.song ? this.song.versions || [] : []
            }
        },
        created() {
            this.$subscribe('file.versions');
            this.$subscribe('songs');
        },
        destroyed() {
        },
        methods: {
            showAddView () {
                this.view = 'add';
                this.versionName = '';
                this.versionType = 'repet';
                this.versionFile = null;
            },

            addVersion () {           
                const upload = Versions.insert({
                    file: this.versionFile,
                    streams: 'dynamic',
                    chunkSize: 'dynamic'
                }, false);
                const id = this.$route.params.id;
                upload.on('end', (error, fileObj) => {
                    Songs.update(id, {$set: {
                        versions: [...this.versions, {
                            songId: id,
                            fileName: this.versionFile.name,
                            name: this.versionName,
                            type: this.versionType,
                            date: new Date(),
                            fileId: fileObj._id,
                            link: Versions.link(fileObj)
                        }]
                    }})
                    this.view = 'list';
                });
                upload.start();
                const songId = this.$route.params.id;
                var f = new FS.File(this.versionFile);
            },

            readFile ({target: {files: [file]}}) {
                this.versionFile = file;
            },
        }
    }

</script>
