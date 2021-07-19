<template>
    <button class="button is-success is-rounded" :disabled="!unsaved" :class="{'is-loading': saving}" @click="save">
        <span class="icon"><i class="fas fa-save"></i></span>
        <span v-if="unsaved">Save Shortcuts</span>
        <span v-else>Saved</span>
    </button>
    <button class="button is-warning is-rounded" :class="{'is-loading': resetting}" @click="reset">
        <span class="icon"><i class="fas fa-trash-alt"></i></span>
        <span>Reset Shortcuts</span>
    </button>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ShortcutBar',
    components: {
    },
    emits: {
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
        reset() {
            console.log('resetting shortcuts');
            this.unsaved = true;
            this.resetting = true;
            this.$nextTick(() => {
                this.$store.commit('resetShortcuts');
                this.resetting = false;
                console.log('finished resetting');
            });
        }
    }
}
</script>

<style scoped>

.button {
    margin: 0.5em;
}

</style>
