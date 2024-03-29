/* eslint-disable indent */
/* eslint-disable strict */

class _Node(key, value){
    constructor() {
        this.key = key;
        this.value = value;
        this.next = null
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
        return this._hashTable[index].value;
    }

    set(key, value) {
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }
        //Find the slot where this key should be in
        const index = this._findSlot(key);

        if (!this._hashTable[index]) {
            this.length++;
        }
        this._hashTable[index] = {
            key,
            value,
            DELETED: false
        };
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
    let str3 = str1;
    let str4 = str2;
    map2.set(str3, 20);
    map2.set(str4, 10);

    console.log(map1.get(str1));
    console.log(map2.get(str3));
}

qTwo();

let test = [5, 28, 19, 15, 20, 33, 12, 17, 10]

let testH = []

test.map(num => {
    testH.push(num % 9)
})

console.log(testH)

// representation of q3.1  |22|88|' '|' '|4|15|28|17|59|31|10|

// representation of q3.2 |' '|[28,19,10]|20|12|' '|5|[15,33]|' '|17|


// function deleteDuplicate(str){
//     const hash = new HashMap();
//     hash.MAX_LOAD_RATIO=0.5;
//     hash.SIZE_RATIO=3;
//     let list = str.split('')
//     hash._capacity=list.length;
//     for (let i=str.length-1; i>=0; i--){
//         hash.set(list[i],i)
//     }
//     let out='';
//     hash._hashTable.sort((a,b)=>a.value-b.value);
//     hash._hashTable.forEach(l => out+=l.key);
//     console.log(out);

// }
// deleteDuplicate("google all that you think can think of");

// function anagramGroup(words){
//     const anagrams = new HashMap;
//     words.forEach((word)=>{
//         const sortedWord = word.split('').sort().join('');
//         try{
//             anagrams.set(sortedWord, [...anagrams.get(sortedWord), word])
//         }
//         catch{
//             anagrams.set(sortedWord,[word])
//         }
//     });
//     let output=[]
//     anagrams._hashTable.forEach(key =>{
//         output.push(key.value)
//     })
//     return output
// }

// console.log(anagramGroup(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']))

