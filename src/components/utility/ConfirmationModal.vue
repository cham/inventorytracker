<template>
  <modal @cancel="$emit('cancel')">
    <h3 slot="header">Confirm</h3>
    <div slot="body">
      <p>
        {{message}}
      </p>
      <p>
        <button @click="$emit('confirm')">Confirm</button>
        <button @click="$emit('cancel')">Cancel</button>
      </p>
    </div>
  </modal>
</template>

<script>
import Modal from './Modal'

export default {
  components: {
    Modal
  },
  props: ['message'],
  methods: {
    onKeyPress (e) {
      if (e.key === 'Enter') {
        this.$emit('confirm')
      }
    }
  },
  created () {
    window.addEventListener('keyup', this.onKeyPress)
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.onKeyPress)
  }
}
</script>
