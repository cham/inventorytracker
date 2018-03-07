<template>
  <div id="app">
    <header>
      <button @click="onClickPlayers" class="toggle-players">Players</button>
      <button @click="onClickItems" class="toggle-items">Items</button>
    </header>
    <section ref="players" class="content-area players">
    </section>
    <section ref="items" class="content-area items">
      <item-listing></item-listing>
    </section>
  </div>
</template>

<script>
import ItemListing from './components/items/ItemListing'

export default {
  components: {
    ItemListing
  },
  methods: {
    onClickPlayers () {
      this.$refs.players.style.left = '0%'
      this.$refs.items.style.left = '100%'
    },
    onClickItems () {
      this.$refs.players.style.left = '-100%'
      this.$refs.items.style.left = '0%'
    }
  },
  created () {
    this.$store.dispatch('loadItems')
  }
}
</script>

<style scoped>
#app {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.content-area {
  position: absolute;
  top: 52px;
  bottom: 0;
  transition: left ease-out 0.2s;
  width: 100%;
}
.players {
  background: red;
  left: 0;
}
.items {
  background: #fef;
  left: 100%;
}
</style>
