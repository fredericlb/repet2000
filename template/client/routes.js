// Import the router
import { RouterFactory } from 'meteor/akryum:vue-router2'
// Components
import Home from '/imports/ui/Home.vue'
import Songbook from '/imports/ui/Songbook.vue'
import Lyrics from '/imports/ui/Lyrics.vue'
import Versions from '/imports/ui/Versions.vue'
import Help from '/imports/ui/Help.vue'

RouterFactory.configure(factory => {
    // Simple routes
    factory.addRoutes([
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/songbook',
            name: 'songbook',
            component: Songbook,
        },
        {
            path: '/song/:id',
            name: 'song',
            component: Lyrics,
            meta: {layout: 'song'}
        },
        {
            path: '/song/:id/versions',
            name: 'song-versions',
            component: Versions,
            meta: {layout: 'song'}
        },
        {
            path: '/help',
            name: 'help',
            component: Help,
        },
    ])
})
