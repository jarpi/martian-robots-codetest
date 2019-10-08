class DoubleLinkedList {
  constructor (data, next, previous) {
    this.data = data
    this.next = next
    this.previous = previous
    this.lastNode = this
  }

  append (data) {
    this.lastNode.next = new DoubleLinkedList(data, this, this.lastNode)
    this.previous = this.lastNode.next
    this.lastNode = this.lastNode.next
    this.nodeCount += 1
    return this
  }

  getValue () {
    return this.data
  }

  getNext () {
    return this.next
  }

  getPrevious () {
    return this.previous
  }

  getNodeByData (value) {
    let node = this
    const lastValue = node.getPrevious().data
    while (node.data !== value && node.data !== lastValue) {
      node = node.getNext()
    }
    if (node.getValue() === value) {
      return node
    }
    throw new Error(`unexisting_node::${value}`)
  }
}

module.exports = DoubleLinkedList
