const set = require('./')

const s = set()

const n = s.add({
  hello: 'world'
})

s.add({
  hello: 'welt'
})

s.add({
  hello: 'verden'
})

s.add(n) // bump

s.toArray().forEach(function (n) {
  console.log('hello:', n.hello)
})
