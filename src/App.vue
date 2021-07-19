<template>
    <header class="top" ref="top">
        <ControlBar @hide="setAllShowing(false)" @show="setAllShowing(true)"/>
    </header>
    <article class="middle" :style="{'margin-top': topHeight + 'px', 'margin-bottom': bottomHeight + 'px'}">
        <div v-masonry="containerId" transition-duration="0.2s" item-selector=".item">
            <div v-masonry-tile class="item" v-for="(shortcut, index) in shortcuts" :key="shortcut.order">
                <Shortcut class="shortcut" :index="index" @redraw="redraw" @change="unsavedChange"></Shortcut>
            </div>
        </div>
    </article>
    <footer class="bottom" :style="{'z-index': bottomZIndex}" ref="bottom">
        <ShortcutBar ref="shortcutBar" @showOnTop="showBottomOnTop"/>
    </footer>
</template>

<script>
import Shortcut from './components/shortcut/Shortcut.vue';
import { mapState } from 'vuex';
import ControlBar from './components/control-bar/ControlBar.vue';
import ShortcutBar from './components/shortcut-bar/ShortcutBar.vue';

export default {
    name: 'App',
    components: {
        Shortcut,
        ControlBar,
        ShortcutBar
    },
    data: function() {
        return {
            topHeight: '0',
            bottomHeight: '0',
            bottomZIndex: 2
        }
    },
    mounted() {
        this.updateHeights();
    },
    computed:{
        ...mapState([
            'settings',
            'globals',
            'shortcuts'
        ])
    },
    methods: {
        updateHeights() {
            this.topHeight = this.$refs.top.clientHeight;
            this.bottomHeight = this.$refs.bottom.clientHeight;
        },
        setAllShowing(showing) {
            this.$refs.shortcutBar.unsaved = true;
            for (let i = 0; i < this.shortcuts.length; i++) {
                this.$store.commit('setShortcutShowing', {idx: i, showing});
            }
            this.redraw();
        },
        redraw() {
            this.$nextTick(() => {
                this.$redrawVueMasonry();
            });
        },
        unsavedChange() {
            this.$refs.shortcutBar.unsaved = true;
        },
        showBottomOnTop(show) {
            if (show){
                this.bottomZIndex = 4;
            }
            else {
                this.bottomZIndex = 2;
            }
        }
    }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.top {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 3;
    background-color: white;
}

.middle {
    position: relative;
    z-index: 1;
    padding-bottom: 1em;
}

.bottom {
    position: fixed;
    bottom: 0;
    border-top: solid gainsboro 0.2em;
    width: 100%;
    background-color: white;
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
