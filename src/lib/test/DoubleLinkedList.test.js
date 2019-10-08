const expect = require('chai').expect
const DoubleLinkedList = require('../utils/DoubleLinkedList.js')

describe('DoubleLinkedList/*', () => {
  it('should create a DoubleLinkedList', async () => {
    const list = new DoubleLinkedList('a', null, null)
    expect(list).to.respondTo('append')
    expect(list).to.respondTo('getValue')
    expect(list).to.respondTo('getNext')
    expect(list).to.respondTo('getPrevious')
    expect(list).to.respondTo('getNodeByData')
  })

  it('should get node value', async () => {
    const list = new DoubleLinkedList('a', null, null)
    expect(list.getValue()).to.be.equal('a')
  })

  it('should return null if there\'s no next', async () => {
    const list = new DoubleLinkedList('a', null, null)
    expect(list.getNext()).to.be.equal(null)
  })

  it('should return null if there\'s no previous', async () => {
    const list = new DoubleLinkedList('a', null, null)
    expect(list.getNext()).to.be.equal(null)
  })

  it('should append a new node', async () => {
    const list = new DoubleLinkedList('a', null, null)
    list.append('b')
    const secondNode = list.getNext()
    expect(secondNode.getNext().getValue()).to.be.equal(list.getValue())
    expect(secondNode.getPrevious().getValue()).to.be.equal(list.getValue())
  })

  it('should find existing node', async () => {
    const list = new DoubleLinkedList('a', null, null)
    list.append('b')
    expect(list.getNodeByData('b').getValue()).to.be.equal('b')
  })
})
