/* eslint-disable indent */
/* eslint-disable strict */

class _Node {
    constructor(key, value) {
        this.key = key
        this.value = value;
        this.next = null
    }
}

class _hashList {
    constructor(){
        this.head = null;
    }
    insertFirst(item) {
        this.head = new _Node(item);
    }
    insertLast(item) {
        let tempNode = this.head;
        console.log(tempNode)
        while (tempNode.next !== null) {
            tempNode = tempNode.next;
        }
        tempNode.next = new _Node(item);
    }
}

class HashMap {
    constructor(initialCapacity = 8) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
    }

    get(key) {
        const index = this._findSlot(key);
        if (this._hashTable[index] === undefined) {
            throw new Error('Key error');
        }
        return this._hashTable[index].values;
    }

    set(key, value) {
        let node = new _Node(key, value);
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }
        //Find the slot where this key should be in
        const index = this._findSlot(key);

        if (!this._hashTable[index]) {
            let hList = new _hashList();
            hList.head = node
            this._hashTable[index] = {
                key, 
                values: hList,
            };
        }
        else{
        let list = this._hashTable[index]
        list.values.head.value = [list.values.head.value, value];
        console.log(list)
            if(list.key !== key) {
                list.values.head.next = node;
            }
        }
    }

    delete(key) {
        const index = this._findSlot(key);
        const slot = this._hashTable[index];
        if (slot === undefined) {
            throw new Error('Key error');
        }
        slot.DELETED = true;
        this.length--;
        this._deleted++;
    }

    _findSlot(key) {
        const hash = HashMap._hashString(key);
        const start = hash % this._capacity;

        for (let i = start; i < start + this._capacity; i++) {
            const index = i % this._capacity;
            const slot = this._hashTable[index];
            if (slot === undefined || (slot.key === key && !slot.DELETED)) {
                return index;
            }
        }
    }

    _resize(size) {
        const oldSlots = this._hashTable;
        this._capacity = size;
        // Reset the length - it will get rebuilt as you add the items back
        this.length = 0;
        this._deleted = 0;
        this._hashTable = [];

        for (const slot of oldSlots) {
            if (slot !== undefined && !slot.DELETED) {
                this.set(slot.key, slot.value);
            }
        }
    }

    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            //Bitwise left shift with 5 0s - this would be similar to
            //hash*31, 31 being the decent prime number
            //but bit shifting is a faster way to do this
            //tradeoff is understandability
            hash = (hash << 5) + hash + string.charCodeAt(i);
            //converting hash to a 32 bit integer
            hash = hash & hash;
        }
        //making sure has is unsigned - meaning non-negtive number. 
        return hash >>> 0;
    }
}

module.exports = HashMap;



function main() {
    let lor = new HashMap();
    lor.MAX_LOAD_RATIO = 0.5;
    lor.SIZE_RATIO = 3;
    lor.set('Hobbit', 'Bilbo')
    lor.set('Hobbit', 'Frodo')
    lor.set('Wizard', 'Gandlof')
    lor.set('Human', 'Aragon')
    lor.set('Elf', 'Legos')
    lor.set('Maiar', 'The Necromancer')
    lor.set('Maiar', 'Sauron')
    lor.set('RingBearer', 'Gollum')
    lor.set('RingBearer', 'Gala')
    lor.set('LadyOfLight', 'Galadriel')
    lor.set('HalfElven', 'Arwen')
    lor.set('Ent', 'Treebeard')
    console.log(lor._hashTable)
    console.log(lor.get("Maiar"))
    console.log(lor.get("Hobbit"))
    console.log(lor._capacity)
}

main();

const qTwo = function () {
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1, 10);
    map1.set(str2, 20);
    let map2 = new HashMap();
    // let str3 = str1;
    // let str4 = str2;
    // map2.set(str3, 20);
    // map2.set(str4, 10);
    console.log(map1._hashTable)
    console.log(map1.get(str1).head);
    // console.log(map2.get(str3));
}

qTwo();