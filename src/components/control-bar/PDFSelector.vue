<template>
    <div class="selector">
        <template v-if="globals.isElectron">
            <p class="input">{{ pdfLink ? pdfLink : 'No File Selected' }}</p>
            <button @click="chooseFilePath" :class="{ 'is-loading': waiting }" class="button is-small is-rounded is-link">Choose</button>
        </template>
        <template v-else>
            <input v-model="pdfLink" placeholder="Enter PDF File Path" class="input"/>
        </template>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'PDFSelector',
    components: {
    },
    data: function() {
        return {
            waiting: false
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
        async chooseFilePath() {
            this.waiting = true;
            let response = await window.electron.getPDFPath();
            if (response.filePaths.length === 1) {
                this.pdfLink = 'file://' + response.filePaths[0];
            }
            this.waiting = false;
        }
    }
}
</script>

<style scoped>

.selector {
    display: flex;
    align-items: center;
    width: 100%;
}

.selector * {
    margin: 0.4em;
}

.input {
    white-space: nowrap;
    overflow: hidden;
}

</style>
