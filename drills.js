const HashMap = require('./hashMap');


function main() {
    let lor = new HashMap();
    lor.MAX_LOAD_RATIO = 0.5
    lor.SIZE_RATIO = 3;
    lor.set('Hobbit','Bilbo')
    lor.set('Hobbit','Frodo')
    lor.set('Wizard','Gandlof')
    lor.set('Human','Aragon')
    lor.set('Elf','Legos')
    lor.set('Maiar','The Necromancer')
    lor.set('Maiar','Sauron')
    lor.set('RingBearer','Gollum')
    lor.set('RingBearer','Gala')
    lor.set('LadyOfLight','Galadriel')
    lor.set('HalfElven','Arwen')
    lor.set('Ent','Treebeard')
    console.log(lor._hashTable)
    console.log(lor.get("Maiar"))
    console.log(lor.get("Hobbit"))
    console.log(lor._capacity)
}

main();

const qTwo = function(){
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    // str1 and str2 are bothe the same string so they will occuby the same key in the hash map

    let map1 = new HashMap();
    map1.set(str1,10);
    map1.set(str2,20);
    //in map1 the HelloWorld key value is initialized to 10 then updated to 20
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3,20);
    map2.set(str4,10);
     //in map2 the HelloWorld key value is initialized to 20 then updated to 10
    console.log(map1.get(str1));
    console.log(map2.get(str3));
}

qTwo();

function deleteDuplicate(str){
    const hash = new HashMap();
    hash.MAX_LOAD_RATIO=0.5;
    hash.SIZE_RATIO=3;
    let list = str.split('')
    hash._capacity=list.length;
    for (let i=str.length-1; i>=0; i--){
        hash.set(list[i],i)
    }
    let out='';
    hash._hashTable.sort((a,b)=>a.value-b.value);
    hash._hashTable.forEach(l => out+=l.key);
    console.log(out);

}
deleteDuplicate("google all that you think can think of");

// function isPalin(str) {
//     str += str;
//     console.log(str)
//     const hash = new HashMap();
//     let list = str.split('');
//     hash._capacity=list.length;
//     console.log(hash._findSlot('test'))
//     list.map(char => {
//         try {
//             if(hash.get(char) === true){
//                 hash.set(char, )
//             }
//         }
//         catch {

//         }
//     })

// }

// isPalin("test");

function isPalindrome(str){
    const hash2 = new HashMap();
    let list = str.split('');
    list.forEach(l => {
        try {hash2.set(l,!hash2.get(l))}
        catch{hash2.set(l,false)}
    })

    if(hash2.length%2==0){
        let falseCount=0
        hash2._hashTable.forEach(e => {
            if (!e.value){
                falseCount++
            }
        })
        if (falseCount>1){
            return false
        }
        return true
    }
    else{
        hash2._hashTable.forEach(l => {
            if(!l.value){
                return false
            }
        })
    return true
    }
}
console.log(isPalindrome('aaasss'))
console.log(isPalindrome('acecarr'))
console.log(isPalindrome('abcabc'))

function anagramGroup(words){
    const anagrams = new HashMap;
    words.forEach((word)=>{
        const sortedWord = word.split('').sort().join('');
        try{
            anagrams.set(sortedWord, [...anagrams.get(sortedWord), word])
        }
        catch{
            anagrams.set(sortedWord,[word])
        }
    });
    let output=[]
    anagrams._hashTable.forEach(key =>{
        output.push(key.value)
    })
    return output
}

console.log(anagramGroup(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']))