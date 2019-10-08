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
    while (node.data !== value) {
      node = node.getNext()
    }
    return node
  }
}

module.exports = DoubleLinkedList
