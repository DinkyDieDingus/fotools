<template>
    <p v-if="section.title"><u><b>{{ section.title }}</b></u></p>
    <div v-if="section.image" class="image-container">
        <figure :class="`image `">
            <img @load="loaded" :src='img'/>
        </figure>
    </div>
    <template v-for="note in section.notes" :key="note">
        <li>{{ note }}</li>
    </template>
    <div class="entry">
        <p>Page {{ section.page }}</p>
        <a :href="`${link}#page=${section.page + 2}`">Open in PDF</a>
    </div>
</template>

<script>
import getImagePath from '../js/image.js';

export default {
  name: 'ShortcutSection',
  props: {
    link: String,
    section: Object
  },
  emits: {
      loaded: null
  },
  data: function() {
      return {
      }
  },
  methods: {
      getImagePath,
      loaded(){
          this.$emit('loaded');
      }
  },
  computed: {
      img() {
          return this.getImagePath(this.section.image);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.entry {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dotted grey;
}

.image-container {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
}

</style>
