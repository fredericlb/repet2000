<template name="appLayout">
    <component :is="layout">
        <router-view/>
    </component>
</template>

<script>

    import {Meteor} from 'meteor/meteor';

    //See main.js for the global import of 'Quasar' and vue.use() method.
    //Don't move the 'Quasar' import from main.js - importing 'Quasar' later causes an error

    // To make the material-icons appear, we also have to add links in the /public folder from the .css and .woff files
    // in node_modules/quasar-extras/material-icons
    //import '/node_modules/quasar-extras/material-icons';

    if(Meteor.isCordova && cordova.platformId == 'ios'){
        import('/node_modules/quasar-framework/dist/umd/quasar.ios.min.css');
    }else{
        import('/node_modules/quasar-framework/dist/umd/quasar.mat.min.css');
    }

    //swap the comments on these lines if you want to compile for ios
    import {
        QLayout, QToolbar, QToolbarTitle, QTabs, QTab, QRouteTab, QBtn, QIcon,
        QItemMain, QItemSide, QList, QListHeader, QLayoutHeader, QLayoutFooter, QLayoutDrawer, QPageContainer, QItem
    } from '/node_modules/quasar-framework/dist/quasar.mat.esm.js';
    // import {
    //     QLayout, QToolbar, QToolbarTitle, QTabs, QTab, QRouteTab, QBtn, QIcon,
    //     QItemMain, QItemSide, QList, QListHeader, QLayoutHeader, QLayoutFooter, QLayoutDrawer, QPageContainer, QItem
    // } from '/node_modules/quasar-framework/dist/quasar.ios.esm.js';

    import MainLayout from './layouts/MainLayout.vue';
    import SongLayout from './layouts/SongLayout.vue';

    export default {
        data: function () {
            return {
                showLeft: false,
                showRight: false
            }
        },
        computed: {
            layout () {
                return (this.$route.meta.layout || 'Main') + 'Layout';
            }
        },
        props: {
            uiid: 'mat'
        },
        components: {
            QLayoutFooter,
            QLayoutHeader,
            QLayoutDrawer,
            QLayout,
            QToolbar,
            QToolbarTitle,
            QTabs,
            QTab,
            QRouteTab,
            QBtn,
            QIcon,
            QItemMain, QItemSide,
            QList, QListHeader, QPageContainer,
            QItem,
            MainLayout,
            SongLayout
        }
    }
</script>
