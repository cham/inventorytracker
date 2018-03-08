<template>
  <div>
    <table>
      <thead>
        <tr>
          <th class="namecell">Name</th>
          <th>Str</th>
          <th>Weight</th>
          <th>Encumbrance</th>
          <th>Movement</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in players" :key="player.id">
          <td class="namecell">{{player.name}}</td>
          <td>{{player.strength}}</td>
          <td>{{player.totalWeight}}</td>
          <td>{{playerEncumbranceType(player)}}</td>
          <td>{{playerAvailableMovement(player)}}</td>
          <td class="buttoncell">
            <button @click="showEditPlayer = true;playerToEdit = player">Edit</button>
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
    <modal v-if="showEditPlayer" @cancel="showEditPlayer = false" v-bind:size="'large'">
      <h3 slot="header">Edit {{playerToEdit.name}}</h3>
      <div slot="body">
        <edit-player v-bind:player="playerToEdit" @cancel="showEditPlayer = false"></edit-player>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ConfirmationModal from '../utility/ConfirmationModal'
import Modal from '../utility/Modal'
import EditPlayer from './EditPlayer'

export default {
  components: {
    ConfirmationModal,
    Modal,
    EditPlayer
  },
  data () {
    return {
      idToDelete: null,
      playerToEdit: null,
      showEditPlayer: false,
      confirmDeletePlayer: false
    }
  },
  computed: {
    ...mapGetters({
      players: 'players'
    })
  },
  methods: {
    ...mapActions([
      'deletePlayer'
    ]),
    doDeletePlayer () {
      if (!this.idToDelete) {
        return
      }
      this.deletePlayer(this.idToDelete)
      this.idToDelete = null
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
        return player.movement - 20
      }
      if (player.totalWeight >= player.strength * 5) {
        return player.movement - 10
      }
      return player.movement
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
.namecell {
  padding-left: 6px;
}
.buttoncell {
  text-align: right;
  padding-right: 6px;
}
</style>
