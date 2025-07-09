import { readFileSync } from 'fs';
import User from './User.mjs';
import AVLTree from './AVLTree.mjs';
import RedBlackTree from './RedBlackTree.mjs';

function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function readFile(file) {
    try {
        const data = readFileSync(file, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error reading ${file}`, err);
        return null;
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let array = [];

let data = readFile('users.json');
data.forEach(e => {
    array.push(new User(e.login, e.userid, e.region, e.password));
});

shuffle(array);

let avlTree = new AVLTree();
array.forEach(user => {
    avlTree.insert(user);
});

let redBlackTree = new RedBlackTree();
array.forEach(user => {
    redBlackTree.insert(user);
});

console.log("AVL Tree:");
console.log(avlTree.printTree());

console.log("Red-Black Tree:");
console.log(redBlackTree.printTree());

array.forEach(user => {
    if (isPrime(user.userid)) {
        avlTree.removeById(user.userid);
        redBlackTree.removeById(user.userid);
    }
});

console.log("AVL Tree after removing prime userids:");
console.log(avlTree.printTree());
console.log("Red-Black Tree after removing prime userids:");
console.log(redBlackTree.printTree());