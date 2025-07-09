class AVLNode {
    constructor(user) {
        this.user = user;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    insert(user) {
        this.root = this._insert(this.root, user);
    }

    _insert(node, user) {
        if (!node) return new AVLNode(user);

        if (user.userid < node.user.userid) {
            node.left = this._insert(node.left, user);
        } else if (user.userid > node.user.userid) {
            node.right = this._insert(node.right, user);
        } else {
            return node;
        }

        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
        return this.balance(node);
    }

    removeById(userid) {
        this.root = this._removeById(this.root, userid);
    }

    _removeById(node, userid) {
        if (!node) return node;

        if (userid < node.user.userid) {
            node.left = this._removeById(node.left, userid);
        } else if (userid > node.user.userid) {
            node.right = this._removeById(node.right, userid);
        } else {
            if (!node.left) return node.right;
            if (!node.right) return node.left;

            const minNode = this._getMinNode(node.right);
            node.user = minNode.user;
            node.right = this._removeById(node.right, minNode.user.userid);
        }

        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
        return this.balance(node);
    }

    getHeight(node) {
        return node ? node.height : 0;
    }

    balance(node) {
        const balanceFactor = this.getBalanceFactor(node);

        if (balanceFactor > 1) {
            if (this.getBalanceFactor(node.left) < 0) {
                node.left = this.rotateLeft(node.left);
            }
            return this.rotateRight(node);
        }
        if (balanceFactor < -1) {
            if (this.getBalanceFactor(node.right) > 0) {
                node.right = this.rotateRight(node.right);
            }
            return this.rotateLeft(node);
        }
        return node;
    }

    getBalanceFactor(node) {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    _getMinNode(node) {
        while (node.left) {
            node = node.left;
        }
        return node;
    }

    rotateLeft(z) {
        const y = z.right;
        z.right = y.left;
        y.left = z;
        z.height = 1 + Math.max(this.getHeight(z.left), this.getHeight(z.right));
        y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
        return y;
    }

    rotateRight(z) {
        const y = z.left;
        z.left = y.right;
        y.right = z;
        z.height = 1 + Math.max(this.getHeight(z.left), this.getHeight(z.right));
        y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));
        return y;
    }

    printTree() {
        const result = [];
        this._printTree(this.root, result, "", true);
        return result.join("\n");
    }

    _printTree(node, result, prefix, isLeft) {
        if (node) {
            result.push(`${prefix}${isLeft ? "├── " : "└── "}${node.user.login}`);
            this._printTree(node.left, result, `${prefix}${isLeft ? "│   " : "    "}`, true);
            this._printTree(node.right, result, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
    }
}

export default AVLTree;