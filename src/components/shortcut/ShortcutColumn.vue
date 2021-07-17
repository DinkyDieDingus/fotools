<template>
    <div class="message">
        <div class="message-header">
            <p :style="{color: shortcut.colour}">{{ shortcut.name }}</p>
            <div>
                <button class="button is-small is-rounded" @click="changeOrder(-1)">↑</button>
                <button :disabled="isLast" class="button is-small is-rounded" @click="changeOrder(1)">↓</button>
                <button class="show-button button is-small is-rounded is-info" @click="isShowing = !isShowing">{{ isShowing ? 'Hide' : 'Show' }}</button>
            </div>
        </div>
        <div v-if="isShowing" class="message-body">
            <ShortcutSection v-for="section in shortcut.sections" :key="section.page" :link="link" :section="section"/>
        </div>
    </div>
</template>

<script>
import ShortcutSection from './ShortcutSection.vue';
export default {
  name: 'Shortcut',
  components: {
      ShortcutSection
  },
  emits: {
      changeOrder: null
  },
  props: {
    link: String,
    shortcut: Object,
    globalHide: Boolean,
    globalShow: Boolean,
    isFirst: Boolean,
    isLast: Boolean
  },
  data: function() {
      return {
          isShowing: false
      }
  },
  methods: {
      changeOrder(relVal) {
          this.$emit('changeOrder', this.shortcut.order, relVal);
      }
  },
  watch: {
      globalHide(val) {
          if (val === true) {
              this.isShowing = false;
          }
      },
      globalShow(val) {
          if (val === true) {
              this.isShowing = true;
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button {
    margin-left: 0.2em;
    margin-right: 0.2em;
}

.show-button {
    width: 5em;
}

</style>
