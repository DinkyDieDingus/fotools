<template>
    <SettingsMenu ref="settings"/>
    <div class="top-bar" :class="{'top-bar-divider': globals.isWebsite}">
        <PDFSelector v-if="!globals.isWebsite" class="selector-container"/>
        <div class='controls-container'>
            <button class="button is-rounded is-small is-primary" @click="hideAll">Hide All</button>
            <button class="button is-rounded is-small is-warning" @click="showAll">Show All</button>
            <button class="button is-rounded is-small is-link" @click="showSettings">
                <span class="icon is-small"><i class="fas fa-cog"></i></span>
            </button>
        </div>
    </div>
</template>

<script>
import PDFSelector from './PDFSelector.vue';
import SettingsMenu from './SettingsMenu.vue';
import { mapState } from 'vuex';

export default {
    name: 'ControlBar',
    components: {
        PDFSelector,
        SettingsMenu
    },
    data: function() {
        return {
        }
    },
    computed:{
        ...mapState([
            'globals'
        ])
    },
    emits: {
        show: null,
        hide: null
    },
    methods: {
        hideAll() {
            this.$emit('hide');
        },
        showAll() {
            this.$emit('show');
        },
        showSettings() {
            this.$refs.settings.show();
        }
    }
}
</script>

<style scoped>
body {
    z-index: 2;
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

</style>
