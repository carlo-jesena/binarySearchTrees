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

BinarySearchTree.prototype.remove = function(key) {
    // if current node key equals key means we've found the node to work on
    if (this.key == key) {
      //if there is a left and right, make child on right the successor
        if (this.left && this.right) {
            // _findMin on right side & store that key to successor
            // set this.key & this.value w/ successor key & value
            // remove the successor node (i.e. old minumum node) from tree
            var successor = this.right._findMin();
            this.key = successor.key;
            this.value = successor.value;
            successor.remove(successor.key);
        }
        // else if only child on left, this._replaceWith(this.left) to
        // replace it w/ one on the left
        else if (this.left) {
            this._replaceWith(this.left);
        }
        // else if only child on right, this._replaceWith(this.right) to
        // replace it w/ one on the right
       else if (this.right) {
            this._replaceWith(this.right);
        }
        // if node has not children, this._replaceWith(null)
        else {
            this._replaceWith(null);
        }
    }
    // if key < thi.key && this is left node
    // recursively call this.letf.remove passing in the key
    else if (key < this.key && this.left) {
        this.left.remove(key);
    }
    // if key > this.key && this is right node
    // recursively call this.right.remove passing in the key
    else if (key > this.key && this.right) {
        this.right.remove(key);
    }
    // else invalid key, so throw an error
    else {
        throw new Error('Key Error');
    }
};

BinarySearchTree.prototype._findMin = function() {
  // if this.left is null then return this
  // otherwise, recurviely call this.left._findMin() until there
  // is a left child node that is null
  if (!this.left) {
    return this;
  }
  return this.left._findMin();
};

BinarySearchTree.prototype._replaceWith = function(node) {
    // if there is a parent node
    if (this.parent) {
      // if the current node is the left child of the parent
      // set parents left child to current node
        if (this == this.parent.left) {
            this.parent.left = node;
        }
        // if the current node is the right child of the parent
        // set parents right child to current node
        else if (this == this.parent.right) {
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
        if (node) {
            this.key = node.key;
            this.value = node.value;
            this.left = node.left;
            this.right = node.right;
        }
        // else set the properties to null
        else {
            this.key = null;
            this.value = null;
            this.left = null;
            this.right = null;
        }
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
