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

