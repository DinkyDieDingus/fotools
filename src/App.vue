<template>
    <div class="top-bar">
        <input v-if="!globals.isWebsite" v-model="pdfLink" placeholder="Enter PDF File Path" class="input"/>
        <button class="button is-rounded is-small is-primary" @click="hideAll">Hide All</button>
        <button class="button is-rounded is-small is-warning" @click="showAll">Show All</button>
    </div>
    <div v-masonry="containerId" transition-duration="0.2s" item-selector=".item">
        <div v-masonry-tile class="item" v-for="(shortcut, index) in shortcuts" :key="shortcut.order">
            <Shortcut class="shortcut" @imageLoaded="redraw" @toggleShow="toggleShow(index)" @changeOrder="alterOrder" :isLast="index === shortcuts.length - 1" :link="settings.pdfLink" :shortcut="shortcut"></Shortcut>
        </div>
    </div>
</template>

<script>
import Shortcut from './components/Shortcut.vue';
import { mapState } from 'vuex';

let shortcuts = require('./data/shortcuts.json');
for (let i = 0; i < shortcuts.length; i++) {
    shortcuts[i].order = i;
    shortcuts[i].isShowing = false;
}

export default {
    name: 'App',
    components: {
        Shortcut
    },
    data: function() {
        return {
            shortcuts
        }
    },
    computed:{
        pdfLink: {
            get() {
                return this.$store.state.settings.pdfLink;
            },
            set(value) {
                this.$store.commit('updateSetting', {setting: 'pdfLink', value});
            }
        },
        ...mapState([
            'settings',
            'globals'
        ])
    },
    methods: {
        toggleShow(index) {
            this.shortcuts[index].isShowing = !this.shortcuts[index].isShowing;
            this.$nextTick(() => {
                this.redraw();
            });
        },
        hideAll() {
            console.log('store', this.$store.state.settings);
            for (let shortcut of this.shortcuts) {
                shortcut.isShowing = false;
            }
            this.$nextTick(() => {
                this.redraw();
            });
        },
        showAll() {
            for (let shortcut of this.shortcuts) {
                shortcut.isShowing = true;
            }
            this.$nextTick(() => {
                this.redraw();
            });
        },
        alterOrder(abs, rel) {
            let temp = this.shortcuts[abs + rel];
            this.shortcuts[abs + rel] = this.shortcuts[abs];
            this.shortcuts[abs + rel].order = abs + rel;
            this.shortcuts[abs] = temp;
            this.shortcuts[abs].order = abs;
            this.$nextTick(() => {
                this.redraw();
            });
        },
        redraw() {
            this.$redrawVueMasonry();
        }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
}

.top-bar {
    display: flex;
    align-items: center;
}

.top-bar * {
    margin: 0.4em;
}

.shortcut-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    height: 100vh;
    align-content: flex-start;
    border: solid;
}

.shortcut {
    width: 28em;
    margin: 5px;
    /*
    padding: 5px;
    border: solid 3px;
    */
}
</style>
