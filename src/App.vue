<template>
    <ControlBar @hide="hideAll" @show="showAll"/>
    <div v-masonry="containerId" transition-duration="0.2s" item-selector=".item">
        <div v-masonry-tile class="item" v-for="(shortcut, index) in shortcuts" :key="shortcut.order">
            <Shortcut class="shortcut" @imageLoaded="redraw" @toggleShow="toggleShow(index)" @changeOrder="alterOrder" :isLast="index === shortcuts.length - 1" :link="settings.pdfLink" :shortcut="shortcut"></Shortcut>
        </div>
    </div>
</template>

<script>
import Shortcut from './components/Shortcut.vue';
import { mapState } from 'vuex';
import ControlBar from './components/ControlBar.vue';

let shortcuts = require('./data/shortcuts.json');
for (let i = 0; i < shortcuts.length; i++) {
    shortcuts[i].order = i;
    shortcuts[i].isShowing = false;
}

export default {
    name: 'App',
    components: {
        Shortcut,
        ControlBar
    },
    data: function() {
        return {
            shortcuts
        }
    },
    computed:{
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
  font-size: 5px;
}

.top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.selector-container {
    margin: 0 0.5em 0 0;
    padding: 0 0.5em 0 0;
    border-right: solid;
    border-color: gainsboro;
}


.controls-container {
    display: flex;
    align-items: center;
    
}

.controls-container * {
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
