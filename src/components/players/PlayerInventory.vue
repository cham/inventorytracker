<template>
  <div class="playerinventory">
    <fieldset>
      <div class="nameinput-wrapper">
        <input @keyup="onNameKeyup" ref="newitemname" type="text">
        <span @click="onClickPrefill" class="nameinput-prefill" ref="prefilltext">{{prefillName}}</span>
      </div>
      x
      <input ref="newitemquantity" type="number">
      <button @click="onAddInventoryItem">Add</button>
    </fieldset>
    <div v-for="item in player.inventory" :key="item.id">
      {{item.id}} x {{item.quantity}}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['player'],
  data () {
    return {
      prefillName: ''
    }
  },
  computed: mapGetters({
    items: 'items'
  }),
  methods: {
    ...mapActions([
      'addPlayerInventory'
    ]),
    onNameKeyup () {
      const name = this.$refs.newitemname.value
      const prefillItem = this.items.find(item => !!item.name.match(new RegExp(name, 'i')))
      if (prefillItem) {
        this.prefillName = prefillItem.name
        this.$refs.prefilltext.style.display = 'inline-block'
      } else {
        this.prefillName = ''
        this.$refs.prefilltext.style.display = 'none'
      }
    },
    onClickPrefill () {
      this.$refs.newitemname.value = this.prefillName
      this.$refs.prefilltext.style.display = 'none'
    },
    onAddInventoryItem () {
      const name = this.$refs.newitemname.value
      const quantity = parseInt(this.$refs.newitemquantity.value, 10)
      const inventoryItem = this.items.find(item => item.name === name)
      if (!inventoryItem) {
        return
      }
      this.addPlayerInventory({
        playerId: this.player.id,
        itemId: inventoryItem.id,
        quantity
      })
    }
  }
}
</script>

<style scoped>
.playerinventory {
  display: inline-block;
}
input {
  margin-left: 0
}
.nameinput-wrapper {
  position: relative;
  display: inline-block;
  width: 350px;
}
.nameinput-wrapper input {
  width: 100%;
}
.nameinput-prefill {
  position: absolute;
  right: 0;
  top: 0;
  padding: 5px 8px;
  border-radius: 3px;
  background: #ad8c2d;
  color: #fff;
  display: none;
}
</style>
