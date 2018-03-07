exports.generateId = () => {
  let uuid = ''
  let ii
  for (ii = 0; ii < 32; ii += 1) {
    switch (ii) {
      case 8:
      case 20:
        uuid += '-'
        uuid += (Math.random() * 16 | 0).toString(16)
        break
      case 12:
        uuid += '-'
        uuid += '4'
        break
      case 16:
        uuid += '-'
        uuid += (Math.random() * 4 | 8).toString(16)
        break
      default:
        uuid += (Math.random() * 16 | 0).toString(16)
    }
  }
  return uuid
}

exports.isUuid = str => !!str.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
