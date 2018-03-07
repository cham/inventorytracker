<template>
  <table>
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    items: 'items'
  })
}
</script>

<style scoped>
table {
  width: 100%;
}
</style>
