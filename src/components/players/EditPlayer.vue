<template>
  <fieldset>
    <p>
      <label>Name</label>
      <input type="text" v-model="name">
    </p>
    <p>
      <label>Strength</label>
      <input type="number" v-model="strength">
    </p>
    <p>
      <label>Movement</label>
      <input type="number" v-model="movement">
    </p>
    <p>
      <label>Inventory</label>
      <player-inventory v-bind:player="player"></player-inventory>
    </p>
    <p>
      <button @click="doEditPlayer">Edit</button>
    </p>
  </fieldset>
</template>

<script>
import { mapActions } from 'vuex'
import PlayerInventory from './PlayerInventory'

export default {
  props: ['player'],
  components: {
    PlayerInventory
  },
  data () {
    return {
      name: this.player.name,
      strength: this.player.strength,
      movement: this.player.movement,
      inventory: this.player.inventory
    }
  },
  methods: {
    ...mapActions([
      'editPlayer'
    ]),
    doEditPlayer () {
      this.editPlayer({
        id: this.player.id,
        name: this.name,
        strength: this.strength,
        movement: this.movement,
        inventory: this.inventory
      })
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
label {
  display: inline-block;
  width: 100px;
  vertical-align: top;
}
</style>
