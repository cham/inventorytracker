<template>
  <table>
    <thead>
      <tr>
        <th><input @search="doSearchItems" @keyup="doSearchItems" ref="searchfield" type="search" placeholder="Name"></th>
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
th {
  text-align: left;
}
</style>
