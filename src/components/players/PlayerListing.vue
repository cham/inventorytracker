<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Strength</th>
          <th>Base Movement</th>
          <th>Total Weight</th>
          <th>Encumbrance</th>
          <th>Movement</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in players" :key="player.id">
          <td>{{player.name}}</td>
          <td>{{player.strength}}</td>
          <td>{{player.movement}}</td>
          <td>{{player.totalWeight}}</td>
          <td>{{playerEncumbranceType(player)}}</td>
          <td>{{playerAvailableMovement(player)}}</td>
          <td>
            <button>Edit</button>
            <button @click="confirmDeletePlayer = true;idToDelete = player.id">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <confirmation-modal v-if="confirmDeletePlayer"
      message="This will permanently delete this player."
      @confirm="confirmDeletePlayer = false;doDeletePlayer()"
      @cancel="confirmDeletePlayer = false;idToDelete = null"
    ></confirmation-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ConfirmationModal from '../utility/ConfirmationModal'

export default {
  components: {
    ConfirmationModal
  },
  data () {
    return {
      confirmDeletePlayer: false
    }
  },
  computed: {
    ...mapGetters({
      players: 'players'
    })
  },
  methods: {
    doDeletePlayer () {
    },
    playerEncumbranceType (player) {
      if (player.totalWeight >= player.strength * 15) {
        return 'Immobile'
      }
      if (player.totalWeight >= player.strength * 10) {
        return 'Heavily Encumbered'
      }
      if (player.totalWeight >= player.strength * 5) {
        return 'Encumbered'
      }
      return 'Unencumbered'
    },
    playerAvailableMovement (player) {
      if (player.totalWeight >= player.strength * 15) {
        return 0
      }
      if (player.totalWeight >= player.strength * 10) {
        return player.speed - 20
      }
      if (player.totalWeight >= player.strength * 5) {
        return player.speed - 10
      }
      return player.speed
    }
  }
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
