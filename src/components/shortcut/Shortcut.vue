<template>
    <div class="message">
        <div class="message-header">
            <p :style="{color: shortcut.colour}">{{ shortcut.name }}</p>
            <div class="controls">
                <p>{{ shortcut.order + 1 }}</p>
                <button :disabled="shortcut.order === 0" class="button is-small is-rounded" @click="changeOrder(-1)">↑</button>
                <button :disabled="isLast" class="button is-small is-rounded" @click="changeOrder(1)">↓</button>
                <button class="show-button button is-small is-rounded is-info" @click="toggleShow">{{ shortcut.isShowing ? 'Hide' : 'Show' }}</button>
            </div>
        </div>
        <div v-if="shortcut.isShowing" class="message-body">
            <ShortcutSection @loaded="imageLoad" v-for="section in shortcut.sections" :key="section.page" :link="settings.pdfLink" :section="section"/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ShortcutSection from './ShortcutSection.vue';
export default {
    name: 'Shortcut',
    components: {
        ShortcutSection
    },
    emits: {
        redraw: null,
        change: null
    },
    props: {
        index: Number
    },
    data: function() {
        return {
            isShowing: false
        }
    },
    methods: {
        changeOrder(relVal) {
            this.$store.commit('reorderShortcuts', {abs: this.index, rel: relVal});
            this.$emit('redraw');
            this.$emit('change');
        },
        toggleShow() {
            this.isShowing = !this.isShowing;
            this.$store.commit('setShortcutShowing', {idx: this.index, showing: this.isShowing});
            this.$emit('redraw');
            this.$emit('change');
        },
        imageLoad() {
            this.$emit('redraw');
        }
    },
    computed: {
        ...mapState([
            'settings'
        ]),
        ...mapState({
            shortcut(state) {
                this.$emit('redraw');
                return state.shortcuts[this.index];
            },
            isLast(state) {
                return state.shortcuts.length - 1 === this.index;
            }
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.controls .button {
    margin-left: 0.2em;
    margin-right: 0.2em;
}

.controls p {
    margin-left: 0.4em;
    margin-right: 0.4em;
}

.show-button {
    width: 5em;
}

.controls {
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;

}

</style>
