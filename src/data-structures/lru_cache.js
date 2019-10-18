const DoublyLinkedList = require("./doubly_linked_list");

class LRUCache {
  constructor(limit) {
    this.limit = limit;
    this.storage = {};
    this.size = 0;
    this.order = new DoublyLinkedList();
  }

  get(key) {
    if (key in this.storage && this.size > 0) {
      let getNode = this.storage[key];
      if (this.order._length > 1) {
        this.order.deleteNode(getNode);
        this.order.insertAfter(this.order._tail, getNode);
      }

      return getNode.value[1];
    }
    return "No such key in this cache.";
  }

  set(key, value) {
    if (key in this.storage) {
      let setNode = this.storage[key];
      setNode.value = [key, value];
      this.order.deleteNode(setNode);
      this.order.insertAfter(this.order._tail, setNode);
      return;
    }

    if (this.size >= this.limit) {
      let oldestNode = this.order._head;
      delete this.storage[oldestNode.value[0]];
      this.order.deleteNode(this.order._head);
      this.size--;
    }

    if (this.order._length > 1) {
      this.order.insertAfter(this.order._tail, [key, value]);
      this.storage[key] = this.order._tail;
    } else {
      this.order.push([key, value]);
    }

    this.size++;
  }
}