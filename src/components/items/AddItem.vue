<template>
  <fieldset>
    <input ref="namefield" type="text">
    Cost:
    <input ref="costfield" type="number">
    Weight:
    <input ref="weightfield" type="number">
    <button @click="doAddItem">Add</button>
  </fieldset>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import valid from './validators/AddItem'

export default {
  methods: {
    ...mapActions([
      'addItem'
    ]),
    doAddItem () {
      if (!valid(this)) {
        return
      }
      const name = this.$refs.namefield.value
      const cost = parseFloat(this.$refs.costfield.value)
      const weight = parseFloat(this.$refs.weightfield.value)
      this.addItem({
        name,
        cost,
        weight
      })
    }
  },
  computed: mapGetters({
    items: 'items'
  })
}
</script>

<style scoped>
</style>
