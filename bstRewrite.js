var BinarySearchTree = function(key, value, parent) {
  this.key = key || null;
  this.value = value || null;
  this.parent = parent || null; //points to parent, root node = null
  this.left = null; //points to left child
  this.right = null; //points to right child
}

BinarySearchTree.prototype.insert = function(key, value) {
    // if node key doesn't exist(null), set key & value properties
    if (this.key === null) {
      this.key = key;
      this.value = value;
    }
    // if node key exists, update the value property
    else if(this.key === key) {
      this.value = value;
    }
    // if key is less than existing key
    // check if null, create a new btree obj w/ key, value, this params
    // else recursively call insert until null node is found
    else if (key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this)
      } else {
        this.left.insert(key, value)
      }
    }
    else {
    // else check the right side
    // check if right side is null, create new btree obj w/ key, value, this
    // else recursive call insert until null key is found
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this)
      } else {
        this.right.insert(key, value)
      }
    }
}

BinarySearchTree.prototype.get = function(key) {
    // return value if current node key is equal to key
    if (this.key === key) {
      return this.value;
    }

    // if the key is less than current node key and left child exists,
    // return this.left.get(key) recursively until we find the matching key
    else if (key < this.key && this.left) {
      return this.left.get(key);
    }

    // if the key is greater than current node key and right child exists,
    // return this.right.get(key) recursively until we find the matching key
    else if (key > this.key && this.right) {
      return this.right.get(key);
    }

    // else throw error (this shouldn't happen, key doesn't exist)
    else {
      throw new Error('.get key parameter incorrect');
    }

};

BinarySearchTree.prototype.remove = function(key) {
  // if current node key equals key means we've found the node to work on
  if (this.key === key){
    // console.log('.remove key === this.key', key);
    //if there is a left and right, make child on right the successor
    if (this.left && this.right){
      // _findMin on right side & store that key to successor
      // set this.key & this.value w/ successor key & value
      // remove the successor node (i.e. old minumum node) from tree
      var successor = this.right._findMin();
      this.key = successor.key;
      this.value = succesor.key;
      succesor.remove(succesor.key);
    }
    else if ( this.left) {
      // else if only child on left, this._replaceWith(this.left) to
      // replace it w/ one on the left
      this._replaceWith(this.left);
    }
    else if (this.right){
      // else if only child on right, this._replaceWith(this.right) to
      // replace it w/ one on the right
      this._replaceWith(this.right);
    }
    else {
      // if node has not children, this._replaceWith(null)
      this._replaceWith(null);
    }
  }
  else if (key < this.key && this.left){
    // if key < thi.key && this is left child node exists
    // recursively call this.letf.remove passing in the key
    this.left.remove(key)
  }
  else if (key > this.key && this.right){
    // if key > this.key && this is right node
    // recursively call this.right.remove passing in the key
    this.right.remove(key)
  }
  else {
  // else invalid key, so throw an error
    throw new Error('.remove key argument invalid')
  }

};

BinarySearchTree.prototype._findMin = function() {
  // if this.left is null then return this
  if (!this.left) {
    return this;
  }
  // otherwise, recurviely call this.left._findMin() until there
  // is a left child node that is null
  return this.left._findMin();
};

BinarySearchTree.prototype._findMax = function() {
  if (!this.right) {
    return this;
  }
  return this.right._findMax();
};

var minCounter = 0;
BinarySearchTree.prototype._findMinHeight = function() {
  // this.counter = counter || 0;
  minCounter++;
  // console.log('findMinHeight counter: ', minCounter)
  if (!this.left) {
    return this
  }
  return this.left._findMinHeight()

}

var maxCounter = 0;
BinarySearchTree.prototype._findMaxHeight = function() {
  // this.counter = counter || 0;
  maxCounter++;
  // console.log('findMaxHeight counter: ', maxCounter)
  if (!this.right) {
    return this
  }
  return this.right._findMaxHeight()

}

BinarySearchTree.prototype._replaceWith = function(node) {
    // if there is a parent node
    if (this.parent) {
      // if the current node is the left child of the parent
      // set parents left child to current node
      if (this === this.parent.left) {
        this.parent.left = node;
      }
      // if the current node is the right child of the parent
      // set parents right child to current node
      else if (this === this.parent.right) {
        this.parent.right = node;
      }
      // if current node exists, set it node to parent
      if (node) {
        node.parent = this.parent;
      }
    }
    // else if we're at the root node
    else {
      // if this is the root node, copy properties from node to this
      if (node){
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
        this.parent = node.parent;
      }
      // else set the properties to null
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
        this.parent = null;
      }
    }
};

var btree = new BinarySearchTree()
btree.insert(5, 9)
btree.insert(3, 6)
btree.insert(6, 3)
btree.insert(1, 4)
btree.insert(4, 9)
btree.insert(8, 6)
btree.insert(0, 3)
btree.insert(2, 4)
btree.insert(7, 9)
// btree.insert(9, 6)
// btree.remove(6)
// btree.remove(3)
// console.log(btree.get(9))
// btree.insert(6, 66)
// console.log(btree)

// 1) Write an algorithm to find the height
//    of a binary search tree.
//
btree._findMaxHeight();
console.log("Find max", maxCounter)
btree._findMinHeight();
console.log('Find min: ', minCounter)
var height = Math.max(maxCounter, minCounter);
console.log('The height is:', height)

// 2) Write an algorithm to check whether an
// arbitrary binary tree is a binary search tree,
// assuming the tree does not contain duplicates



// 3) Write an algorithm to find the third
//    largest node in a binary search tree.

findMax
then find max.parent.parnet
