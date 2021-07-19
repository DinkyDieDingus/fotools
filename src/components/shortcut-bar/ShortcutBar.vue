<template>
    <ResetWarning @reset="reset" @cancel="cancelReset" ref="resetWarning"/>
    <button class="button is-success is-rounded" :disabled="!unsaved" :class="{'is-loading': saving}" @click="save">
        <span class="icon"><i class="fas fa-save"></i></span>
        <span v-if="unsaved">Save Shortcuts</span>
        <span v-else>Saved</span>
    </button>
    <button class="button is-warning is-rounded" :class="{'is-loading': resetting}" @click="confirmReset">
        <span class="icon"><i class="fas fa-trash-alt"></i></span>
        <span>Reset Shortcuts</span>
    </button>
</template>

<script>
import { mapState } from 'vuex';
import ResetWarning from './ResetWarning.vue';

export default {
    name: 'ShortcutBar',
    components: {
        ResetWarning
    },
    emits: {
        showOnTop: null
    },
    data: function() {
        return {
            saving: false,
            unsaved: false,
            resetting: false
        }
    },
    computed:{
        ...mapState([
            'globals'
        ])
    },
    methods: {
        save() {
            console.log('saving shortcuts');
            this.saving = true;
            this.$nextTick(() => {
                this.$store.commit('saveShortcuts');
                this.saving = false;
                this.unsaved = false;
                console.log('finished saving');
            });
        },
        confirmReset() {
            this.$refs.resetWarning.isShowing = true;
            this.$emit('showOnTop', true);
        },
        reset() {
            console.log('resetting shortcuts');
            this.resetting = true;
            this.$emit('showOnTop', false);
            this.$nextTick(() => {
                this.$store.commit('resetShortcuts');
                this.resetting = false;
                console.log('finished resetting');
            });
        },
        cancelReset() {
            this.$emit('showOnTop', false);
        }
    }
}
</script>

<style scoped>
body {
    z-index: 2;
}

.button {
    margin: 0.5em;
}

</style>
