<template>
  <div>
    <input @keyup="doSearchItems" ref="searchfield" type="search" placeholder="Search">
    <table v-if="items.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>Cost</th>
          <th>Weight</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{item.name}}</td>
          <td>{{item.cost}} gp</td>
          <td>{{item.weight}} lb.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'searchItems'
    ]),
    doSearchItems () {
      this.searchItems(this.$refs.searchfield.value)
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
</style>
