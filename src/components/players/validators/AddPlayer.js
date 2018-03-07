export default (instance) => {
  const name = instance.$refs.namefield.value
  const strength = parseInt(instance.$refs.strengthfield.value, 10)
  const movement = parseInt(instance.$refs.movementfield.value, 10)
  let valid = true

  if (!name || instance.players.find(player => player.name === name)) {
    instance.$refs.namefield.classList.add('invalid')
    valid = false
  } else {
    instance.$refs.namefield.classList.remove('invalid')
  }

  if (!strength) {
    instance.$refs.strengthfield.classList.add('invalid')
    valid = false
  } else {
    instance.$refs.strengthfield.classList.remove('invalid')
  }

  if (!movement) {
    instance.$refs.movementfield.classList.add('invalid')
    valid = false
  } else {
    instance.$refs.movementfield.classList.remove('invalid')
  }

  return valid
}
