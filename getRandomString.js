
function generateRandomString() {
  const rootString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' //62

  const rootStringToArray = [...rootString]

  let randomString = ''

  for (let i = 0; i < 5; i++) {
    const index = getRandomIndex()
    randomString += rootStringToArray[index]
  }

  return randomString
}

function getRandomIndex() {
  const index = Math.floor(Math.random() * 62)
  return index
}

module.exports = generateRandomString 