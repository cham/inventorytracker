<template>
  <fieldset>
    <input ref="namefield" type="text">
    Strength:
    <input ref="strengthfield" type="number">
    Movement:
    <input ref="movementfield" type="number">
    <button @click="doAddPlayer">Add</button>
  </fieldset>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import valid from './validators/AddPlayer'

export default {
  methods: {
    ...mapActions([
      'addPlayer'
    ]),
    doAddPlayer () {
      if (!valid(this)) {
        return
      }
      const name = this.$refs.namefield.value
      const strength = parseInt(this.$refs.strengthfield.value, 10)
      const movement = parseInt(this.$refs.movementfield.value, 10)
      this.addPlayer({
        name,
        strength,
        movement
      })
    }
  },
  computed: mapGetters({
    players: 'players'
  })
}
</script>

<style scoped>
</style>
