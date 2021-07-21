<template>
    <div class="modal" :class="{'is-active': isShowing}">
    <div class="modal-background" @click="hide"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">
                <span><i class="fas fa-exclamation-triangle"></i></span>
                <span> Reset Shortcuts</span>
            </p>
            <button class="delete" aria-label="close" @click="hide"></button>
        </header>
        <section class="modal-card-body">
            <p>Are you sure you want to reset shorcuts to default? This cannot be undone.</p>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-danger" @click="confirm">
                    <span class="icon"><i class="fas fa-trash-alt"></i></span>
                    <span>Reset</span>
                </button>
        </footer>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ResetWarning',
    data: function() {
        return {
            isShowing: false
        }
    },
    emits: {
        reset: null,
        cancel: null
    },
    methods: {
        hide() {
            this.isShowing = false;
            this.$emit('cancel');
        },
        confirm() {
            this.isShowing = false;
            this.$emit('reset');
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
