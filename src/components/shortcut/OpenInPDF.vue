<template>
    <template v-if="globals.isElectron">
        <button class="button is-small is-rounded" @click="open">Open in PDF</button>
    </template>
    <template v-else-if="!globals.isWebsite">
        <a class="button is-small is-rounded" v-if="link !== ''" :href="`${link}#page=${page + 2}`" target="_blank" rel="noopener noreferrer">Open in PDF</a>
    </template>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'OpenInPDF',
  props: {
    link: String,
    page: Number
  },
  data: function() {
      return {
      };
  },
  computed:{
        ...mapState([
            'settings',
            'globals'
        ])
    },
  methods: {
      open() {
          window.electron.openPDF(`${this.link}#page=${this.page + 2}`, this.$store.state.settings.browser);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
