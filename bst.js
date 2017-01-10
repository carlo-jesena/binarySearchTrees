var BinarySearchTree = function(key, value, parent) {
  this.key = key || null;
  this.value = value || null;
  this.parent = parent || null;
  this.left = null;
  this.right = null;
}

BinarySearchTree.prototype.insert = function(key, value) {
    // if node doesn't exist, crete it
    console.log(this.key)
    if (this.key == null ) {
        this.key = key;
        this.value = value;
    }
    // if node exists, update it
    else if (this.key === key) {
        this.value = value;
    }
    // if key is less than existing key
    // check if null, create a new btree obj w/ key, value, this
    // else recursively call insert until null node is found
    else if (key < this.key) {
        if (this.left == null) {
            this.left = new BinarySearchTree(key, value, this);
        }
        else {
            this.left.insert(key, value);
        }
    }
    // else check the right side
    // check if right side is null, create new btree obj w/ key, value, this
    // else recursive call insert until null node is found
    else {
        if (this.right == null) {
            this.right = new BinarySearchTree(key, value, this);
        }
        else {
            this.right.insert(key, value);
        }
    }
};

BinarySearchTree.prototype.get = function(key) {
    // return value if current node key is equal to key
    if (this.key == key) {
        return this.value;
    }
    // if the key is less than current node key and points to the left,
    // return this.left.get(key) recursively until we find the matching key
    else if (key < this.key && this.left) {
        return this.left.get(key);
    }
    // if the key is greater than current node key and points to the right,
    // return this.right.get(key) recursively until we find the matching key
    else if (key > this.key && this.right) {
        return this.right.get(key);
    }
    // else throw error (this shouldn't happen, key doesn't exist)
    else {
        throw new Error('Key Error');
    }
};

var btree = new BinarySearchTree()
btree.insert(5,5)
btree.insert(3, 33)
btree.insert(3, 50)
btree.insert(1, 22)
btree.insert(10, 10)
btree.insert(11, 31)
btree.insert(9, 32)
console.log(btree)
