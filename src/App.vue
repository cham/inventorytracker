<template>
  <div id="app">
    <header>
      <button @click="onClickPlayers" class="toggle-players">Players</button>
      <button @click="onClickItems" class="toggle-items">Items</button>
    </header>
    <section ref="players" class="content-area players">
      <add-player></add-player>
      <player-listing></player-listing>
    </section>
    <section ref="items" class="content-area items">
      <add-item></add-item>
      <item-listing></item-listing>
    </section>
  </div>
</template>

<script>
import AddItem from './components/items/AddItem'
import ItemListing from './components/items/ItemListing'
import AddPlayer from './components/players/AddPlayer'
import PlayerListing from './components/players/PlayerListing'

export default {
  components: {
    AddItem,
    ItemListing,
    AddPlayer,
    PlayerListing
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
      .then(() => this.$store.dispatch('loadPlayers'))
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
header {
  padding: 8px 2px;
}
.content-area {
  position: absolute;
  top: 52px;
  bottom: 0;
  transition: left ease-out 0.2s;
  width: 100%;
  overflow: auto;
}
.players {
  left: 0;
}
.items {
  left: 100%;
}
</style>
