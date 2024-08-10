class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null; 
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.nodeMapping = new Map();
    }

    append(value) {
        const newNode = new Node(value);

        if (!this.head) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail; 
            this.tail = newNode; 
        }

        this.nodeMapping.set(value.id, newNode);

        return this;
    }


    deleteById(id){
        if (this.nodeMapping.has(id)){
           return this.delete(this.nodeMapping.get(id))
        }

        return this;
        
    }

    delete(nodeToDelete) {

        this.nodeMapping.delete(nodeToDelete.value.id);

        if (!this.head) return this;

        if (nodeToDelete === this.head) {
            this.head = this.head.next;
            if (this.head) {
                this.head.prev = null;
            } else {
                this.tail = null;
            }
            return this;
        }

        if (nodeToDelete === this.tail) {
            this.tail = this.tail.prev;
            if (this.tail) {
                this.tail.next = null;
            } else {
                this.head = null;
            }
            return this;
        }

        let prev = nodeToDelete.prev;
        let next = nodeToDelete.next;

        if (prev) {
            prev.next = next;
        }
        if (next) {
            next.prev = prev;
        }

        return this;
    }

    static fromParsedObject(parsedLinkedList, dataTransformer) {
        const list = new LinkedList();

        function createNodeFromObject(nodeObject) {
            if (!nodeObject) return null;
            const nodeVal = dataTransformer(nodeObject.value);
            const node = new Node(dataTransformer(nodeObject.value));
            list.nodeMapping.set(nodeVal.id, node);
            node.next = createNodeFromObject(nodeObject.next);
            if (node.next) {
                node.next.prev = node; 
            }
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
                value: node.value,
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