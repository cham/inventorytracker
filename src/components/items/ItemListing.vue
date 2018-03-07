<template>
  <div>
    <table>
      <thead>
        <tr>
          <th><input @search="doSearchItems" @keyup="doSearchItems" ref="searchfield" type="search" placeholder="Name"></th>
          <th>Cost</th>
          <th>Weight</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{item.name}}</td>
          <td>{{item.cost}} gp</td>
          <td>{{item.weight}} lb.</td>
          <td>
            <button v-if="item.type === 'custom'" @click="confirmDeleteItem = true;idToDelete = item.id">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <confirmation-modal v-if="confirmDeleteItem"
      message="This will permanently delete this item."
      @confirm="confirmDeleteItem = false;doDeleteItem()"
      @cancel="confirmDeleteItem = false;idToDelete = null"
    ></confirmation-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ConfirmationModal from '../utility/ConfirmationModal'

export default {
  components: {
    ConfirmationModal
  },
  data () {
    return {
      confirmDeleteItem: false,
      idToDelete: null
    }
  },
  methods: {
    ...mapActions([
      'searchItems',
      'deleteItem'
    ]),
    doSearchItems () {
      this.searchItems(this.$refs.searchfield.value)
    },
    doDeleteItem () {
      if (!this.idToDelete) {
        return
      }
      this.deleteItem(this.idToDelete)
      this.idToDelete = null
    }
  },
  computed: mapGetters({
    items: 'filteredItems'
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
