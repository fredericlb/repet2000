<template>
    <q-layout ref="layout" view="LHr lpR lFr">

        <q-layout-header>
            <q-toolbar>
                <q-btn
                    flat round dense
                    icon="music_note"
                />

                <q-toolbar-title>
                    <span>Repet 2000</span>
                </q-toolbar-title>

            </q-toolbar>
            <q-tabs>
                <q-route-tab slot="title" icon="today" to="/" replace label="Sessions" />
                <q-route-tab slot="title" icon="music_note" to="/songbook" replace label="Songbook" />
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