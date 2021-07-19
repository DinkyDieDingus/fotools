<template>
    <header class="top" ref="top">
        <ControlBar @hide="hideAll" @show="showAll"/>
    </header>
    <article class="middle" :style="{'margin-top': topHeight + 'px', 'margin-bottom': bottomHeight + 'px'}">
        <div v-masonry="containerId" transition-duration="0.2s" item-selector=".item">
            <div v-masonry-tile class="item" v-for="(shortcut, index) in shortcuts" :key="shortcut.order">
                <Shortcut class="shortcut" @imageLoaded="redraw" @toggleShow="toggleShow(index)" @changeOrder="alterOrder" :isLast="index === shortcuts.length - 1" :link="settings.pdfLink" :shortcut="shortcut"></Shortcut>
            </div>
        </div>
    </article>
    <footer class="bottom" ref="bottom">
        <ShortcutBar ref="shortcutBar"/>
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
            unsavedShortcutChanges: false
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
        toggleShow(index) {
            this.$refs.shortcutBar.unsaved = true;
            this.shortcuts[index].isShowing = !this.shortcuts[index].isShowing;
            this.$nextTick(() => {
                this.redraw();
            });
        },
        hideAll() {
            this.$refs.shortcutBar.unsaved = true;
            for (let shortcut of this.shortcuts) {
                shortcut.isShowing = false;
            }
            this.$nextTick(() => {
                this.redraw();
            });
        },
        showAll() {
            this.$refs.shortcutBar.unsaved = true;
            for (let shortcut of this.shortcuts) {
                shortcut.isShowing = true;
            }
            this.$nextTick(() => {
                this.redraw();
            });
        },
        alterOrder(abs, rel) {
            this.$refs.shortcutBar.unsaved = true;
            this.$store.commit('reorderShortcuts', { abs, rel });
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
    z-index: 2;
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
