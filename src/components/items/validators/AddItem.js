export default (instance) => {
  const name = instance.$refs.namefield.value
  const cost = parseFloat(instance.$refs.costfield.value)
  const weight = parseFloat(instance.$refs.weightfield.value)
  let valid = true

  if (!name || instance.items.find(item => item.name === name)) {
    instance.$refs.namefield.classList.add('invalid')
    valid = false
  } else {
    instance.$refs.namefield.classList.remove('invalid')
  }

  if (!cost && cost !== 0) {
    instance.$refs.costfield.classList.add('invalid')
    valid = false
  } else {
    instance.$refs.costfield.classList.remove('invalid')
  }

  if (!weight && weight !== 0) {
    instance.$refs.weightfield.classList.add('invalid')
    valid = false
  } else {
    instance.$refs.weightfield.classList.remove('invalid')
  }

  return valid
}
