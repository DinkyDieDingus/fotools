<template>
    <ResetWarning @reset="reset" @cancel="cancelReset" ref="resetWarning"/>
    <div class="bar">
        <button class="button is-success is-rounded" :disabled="!unsaved" :class="{'is-loading': saving}" @click="save">
            <span class="icon"><i class="fas fa-save"></i></span>
            <span v-if="unsaved">Save Shortcuts</span>
            <span v-else>Saved</span>
        </button>
        <div class="right-side">
            <button v-if="globals.isElectron" class="button is-info is-rounded" :class="{'is-loading': exporting}" @click="exportShortcuts">
                <span class="icon"><i class="fas fa-file-export"></i></span>
                <span>Export</span>
            </button>
            <button class="button is-warning is-rounded" :class="{'is-loading': resetting}" @click="confirmReset">
                <span class="icon"><i class="fas fa-trash-alt"></i></span>
                <span>Reset</span>
            </button>
        </div>
    </div>
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
            resetting: false,
            exporting: false
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
                this.unsaved = false;
                console.log('finished resetting');
            });
        },
        cancelReset() {
            this.$emit('showOnTop', false);
        },
        async exportShortcuts() {
            if (this.globals.isElectron) {
                this.exporting = true;
                await window.electron.exportShortcuts(JSON.stringify(this.$store.state.shortcuts, null, 4));
                this.exporting = false;
            }
        }
    }
}
</script>

<style scoped>
body {
    z-index: 2;
}

.bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.button {
    margin: 0.5em;
}

</style>
