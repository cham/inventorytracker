<template>
  <div class="playerinventory">
    <fieldset>
      <div class="nameinput-wrapper">
        <input @keyup="onNameKeyup" ref="newitemname" type="text">
        <span @click="onClickPrefill" class="nameinput-prefill" ref="prefilltext">{{prefillName}}</span>
      </div>
      x
      <input ref="newitemquantity" type="number" value="1">
      <button @click="onAddInventoryItem">Add</button>
    </fieldset>
    <div class="playerinventory--items">
      <div v-for="item in player.inventory" :key="item.id">
        {{getItemName(item.id)}} x {{item.quantity}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

const getPrefillItemName = (items, search) => {
  const matchingItems = items.filter(item => !!item.name.match(new RegExp(search, 'i')))
  if (!matchingItems.length || !search) {
    return null
  }
  matchingItems.sort((a, b) => {
    const aLen = a.name.length
    const bLen = b.name.length
    if (aLen > bLen) {
      return 1
    }
    if (aLen < bLen) {
      return -1
    }
    return 0
  })
  return matchingItems[0].name
}

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
    getItemName (itemId) {
      const item = this.items.find(item => item.id === itemId)
      if (!item) {
        return `Unknown item id:${itemId}`
      }
      return item.name
    },
    onNameKeyup () {
      const name = this.$refs.newitemname.value
      const prefillItem = getPrefillItemName(this.items, name)
      if (prefillItem) {
        this.prefillName = prefillItem
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
.playerinventory--items {
  height: 275px;
  overflow: auto;
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
