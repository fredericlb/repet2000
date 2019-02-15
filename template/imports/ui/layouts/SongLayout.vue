<template>
    <q-layout ref="layout" view="LHr lpR lFr">

        <q-layout-header>
            <q-toolbar color="secondary">
                <q-btn
                    flat round dense
                    icon="music_note"
                    @click.native="$router.push('/')"
                />
                <q-toolbar-title>
                    &nbsp;>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{{song ? song.name : '...'}}</span>
                </q-toolbar-title>

            </q-toolbar>
            <q-tabs color="secondary" v-if="song">
                <q-route-tab slot="title" icon="short_text" :to="`/song/${song._id}`" replace label="Paroles" />
                <q-route-tab slot="title" icon="list" :to="`/song/${song._id}/sections`" replace label="Sections" />
                <q-route-tab slot="title" icon="queue_music" :to="`/song/${song._id}/versions`" replace label="Versions" />
            </q-tabs>
        </q-layout-header>

        <q-page-container>
            <slot></slot>
        </q-page-container>

        <q-layout-footer>
            <q-toolbar>
                <q-toolbar-title>
                    &copy; 2019 <a href="facebook.com/QuiniouVarai">Quiniou Varai</a> && <a
                        href="http://www.parapluie.org">Parapluie</a>
                </q-toolbar-title>
            </q-toolbar>
        </q-layout-footer>

    </q-layout>
</template>

<script>
    import {Songs} from '../../lib/collections.js'

    export default {
        meteor: {
            song: {
                update () {
                    const id = this.$route.params.id;
                    const song = Songs.findOne({_id: id});
                    return song;
                }
            }
        },
        created () {
            this.$subscribe('songs');
        }
    }
</script>