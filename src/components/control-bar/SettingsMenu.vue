<template>
    <div class="modal" :class="{'is-active': showing}">
    <div class="modal-background" @click="hide"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">
                <span><i class="fas fa-cog"></i></span>
                <span> Settings</span>
            </p>
            <button class="delete" aria-label="close" @click="hide"></button>
        </header>
        <section class="modal-card-body">
            <div class="field" v-if="browser !== undefined">
                <label class="label">Browser</label>
                <div class="select">
                    <select v-model="browser">
                        <option v-for="option in globals.browserList" :value="option" :key="option">
                            {{ capitalise(option) }}
                        </option>
                    </select>
                </div>
            </div>
        </section>
        <footer class="modal-card-foot">
            <div class="saving">
                <button class="button is-success" @click="save">
                    <span class="icon"><i class="fas fa-save"></i></span>
                    <span>Save</span>
                </button>
                <p class="unsaved-text" v-if="changed">Unsaved Changes</p>
            </div>
            <button class="button is-warning" @click="reset">Reset to Defaults</button>
        </footer>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'SettingsMenu',
    data: function() {
        return {
            showing: false,
            browser: this.$store.state.settings.browser
        }
    },
    computed: {
        changed() {
            if (this.browser !== this.$store.state.settings.browser) {
                return true;
            }
            return false;
        },
        ...mapState([
            'settings',
            'globals'
        ])
    },
    methods: {
        show() {
            this.showing = true;
        },
        hide() {
            this.sync();
            this.showing = false;
        },
        capitalise(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        save() {
            this.$store.commit('updateSetting', {setting: 'browser', value: this.browser});
        },
        reset() {
            let pdf = this.$store.state.settings.pdfLink;
            this.$store.commit('resetSettings');
            this.$store.commit('updateSetting', {setting: 'pdfLink', value: pdf});
            this.sync();
        },
        sync() {
            this.browser = this.$store.state.settings.browser;
        }
    }
}
</script>

<style scoped>
.modal-card-foot {
    display: flex;
    justify-content: space-between;
}

.modal-card-body {
    font-size: medium;
}

.saving {
    display: flex;
    align-items: center;
}

.unsaved-text {
    font-size: 0.8rem;
    font-style: italic;
    margin-left: 0.5em;
    color: gray;
}

</style>
