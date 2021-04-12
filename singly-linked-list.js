// a linked list is make up of nodes that hold some data 
// and point to the next node on the list
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }

    setNextNode(node) {
        if (node instanceof Node || node === null) {
            this.next = node;
        } else {
            throw new Error(`Next node must be a memeber of the node class`);
        }
    }

    getNextNode() {
        return this.next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    addToHead(data) {
        // create a new node with the provided data
        const newHead = new Node(data);
        // save the current head so we can use it later
        const currentHead = this.head;
        // reassign the head 
        this.head = newHead;
        // if the current head is not null set it has the next node of the new head
        if (currentHead) {
            this.head.setNextNode(currentHead);
        }
    }

    addToTail(data) {
        // we have to traverse the list from top to bottom to find the tail
        let tail = this.head;
        // tail is null here that means the list is empty
        // assign the data as the head node (only node so also the tail)
        if (!tail) {
            this.head = new Node(data);
        } else {
            // this will find teh last node in the list
            while (tail.getNextNode() !== null) {
                tail = tail.getNextNode();
            }
            // once the last node is found, add a new node to the end of the list
            tail.setNextNode(new Node(data))
        }
    }

    removeHead() {
        const removedHead = this.head;
        // if removedHead is null here then the list is empty and we can return.
        if (!removedHead) return;
        // otherwise set the head at the current head's next node
        this.head = removedHead.getNextNode();
        return removedHead.data;
    }

    removeByData(data) {
        let currentNode = this.head;
        let previousNode = null;
        if (currentNode.data === data) {
            this.removeHead();
            return;
        } 
        previousNode = currentNode;
        currentNode = this.head.getNextNode();
        while (currentNode !== null) {
            if (currentNode.data === data) {
                previousNode.setNextNode(currentNode.getNextNode());
            }
            return currentNode;
        }
    }

    printList() {
        let currentNode = this.head;
        let output = "<head> ";
        while (currentNode !== null) {
            output += currentNode.data + " ";
            currentNode = currentNode.getNextNode();
        }
        output += "<tail>";
        console.log(output);
        return output;
    } 

}

// other methods to build out:
//   -- insert new node after a given node
//   -- search for a value
//   -- update the data of a given node
//   -- sorting
//   -- merging two linked lists


