class Node {
    constructor(message) {
        this.message = message;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(message) {
        const newNode = new Node(message);

        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        return this;
    }

    delete(nodeToDelete) {
        if (!this.head) return 0;

        if (nodeToDelete === this.head) {
            this.head = this.head.next;
            if (this.head === null) {
                this.tail = null;
            }
            return 1;
        }

        let prev = null;
        let current = this.head;

        while (current && current !== nodeToDelete) {
            prev = current;
            current = current.next;
        }

        if (current) {
            prev.next = current.next;
            if (current === this.tail) {
                this.tail = prev; 
            }
            return 1;
        }

        return 0;
    }

    static fromParsedObject(parsedLinkedList, dataTransformer) {
        const list = new LinkedList();

        function createNodeFromObject(nodeObject) {
            if (!nodeObject) return null;
            const node = new Node(dataTransformer(nodeObject.message));
            node.next = createNodeFromObject(nodeObject.next);
            return node;
        }

        list.head = createNodeFromObject(parsedLinkedList.head);

        let current = list.head;
        while (current && current.next) {
            current = current.next;
        }
        list.tail = current; 
        return list;
    }

    static fromString(stringifedLinkedList, dataTransformer) {
        if (stringifedLinkedList) {
            const parsed = JSON.parse(stringifedLinkedList);
            return LinkedList.fromParsedObject(parsed, dataTransformer);
        }
        return new LinkedList();
    }

    // Custom JSON serialization to omit internal properties
    toJSON() {
        function serializeNode(node) {
            if (!node) return null;
            return {
                message: node.message,
                next: serializeNode(node.next) 
            };
        }
        return {
            head: serializeNode(this.head)
        };
    }

    toStringified(){
        return JSON.stringify(this);
    }
}


export default LinkedList;