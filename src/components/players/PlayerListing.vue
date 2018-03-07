<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Strength</th>
          <th>Movement</th>
          <th>Total Weight</th>
          <th>Speed</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in players" :key="player.id">
          <td>{{player.name}}</td>
          <td>{{player.strength}}</td>
          <td>{{player.movement}}</td>
          <td>{{player.totalWeight}}</td>
          <td>{{player.speed}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    players: 'players'
  })
}
</script>

<style scoped>
table {
  width: 100%;
}
th {
  text-align: left;
}
</style>
