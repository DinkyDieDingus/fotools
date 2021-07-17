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
            <ShortcutSection @loaded="imageLoad" v-for="section in shortcut.sections" :key="section.page" :link="link" :section="section"/>
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
      changeOrder: null,
      toggleShow: null,
      imageLoaded: null
  },
  props: {
    link: String,
    shortcut: Object,
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
      },
      toggleShow() {
          this.$emit('toggleShow');
      },
      imageLoad() {
          this.$emit('imageLoaded');
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
