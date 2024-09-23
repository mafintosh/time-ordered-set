const test = require('brittle')
const TOS = require('./')

test('add', function (t) {
  const s = new TOS()

  s.add({
    hello: 'world'
  })

  s.add({
    hello: 'welt'
  })

  s.add({
    hello: 'verden'
  })

  const arr = s.toArray()

  t.is(s.length, 3)
  t.is(arr.length, 3)
  t.is(arr[0].hello, 'world')
  t.is(arr[1].hello, 'welt')
  t.is(arr[2].hello, 'verden')
})

test('remove', function (t) {
  const s = new TOS()

  s.add({
    hello: 'world'
  })

  const node = s.add({
    hello: 'welt'
  })

  s.add({
    hello: 'verden'
  })

  s.remove(node)

  const arr = s.toArray()

  t.is(s.length, 2)
  t.is(arr.length, 2)
  t.is(arr[0].hello, 'world')
  t.is(arr[1].hello, 'verden')
})

test('remove oldest', function (t) {
  const s = new TOS()

  const node = s.add({
    hello: 'world'
  })

  s.add({
    hello: 'welt'
  })

  s.add({
    hello: 'verden'
  })

  s.remove(node)

  const arr = s.toArray()

  t.is(s.length, 2)
  t.is(arr.length, 2)
  t.is(arr[0].hello, 'welt')
  t.is(arr[1].hello, 'verden')
})

test('remove last one', function (t) {
  const s = new TOS()

  const node = s.add({ hello: 'world' })
  t.ok(s.has(node))
  s.remove(node)
  t.is(s.oldest, null)
  t.is(s.latest, null)
})

test('remove latest', function (t) {
  const s = new TOS()

  s.add({
    hello: 'world'
  })

  s.add({
    hello: 'welt'
  })

  const node = s.add({
    hello: 'verden'
  })

  s.remove(node)

  const arr = s.toArray()

  t.is(s.length, 2)
  t.is(arr.length, 2)
  t.is(arr[0].hello, 'world')
  t.is(arr[1].hello, 'welt')
})

test('maintains time order', function (t) {
  const s = new TOS()

  s.add({
    hello: 'world'
  })

  const n = s.add({
    hello: 'welt'
  })

  s.add({
    hello: 'verden'
  })

  s.add(n)

  const arr = s.toArray()

  t.is(s.length, 3)
  t.is(arr.length, 3)
  t.is(arr[0].hello, 'world')
  t.is(arr[1].hello, 'verden')
  t.is(arr[2].hello, 'welt')
})

test('toArray subset', function (t) {
  const s = new TOS()

  s.add({
    hello: 'world'
  })

  s.add({
    hello: 'welt'
  })

  s.add({
    hello: 'verden'
  })

  const arr = s.toArray({ limit: 2 })

  t.is(s.length, 3)
  t.is(arr.length, 2)
  t.is(arr[0].hello, 'world')
  t.is(arr[1].hello, 'welt')
})

test('toArray subset reverse', function (t) {
  const s = new TOS()

  s.add({ value: '1' })
  s.add({ value: '2' })
  s.add({ value: '3' })
  s.add({ value: '4' })

  const subset = s.toArray({ limit: 3, reverse: true })

  t.is(s.length, 4)
  t.is(subset.length, 3)
  t.is(subset[0].value, '4')
  t.is(subset[1].value, '3')
  t.is(subset[2].value, '2')
})
