class RedBlackNode {
    constructor(user) {
        this.user = user;
        this.color = 'red';
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

class RedBlackTree {
    constructor() {
        this.root = null;
    }

    insert(user) {
        const newNode = new RedBlackNode(user);
        if (!this.root) {
            newNode.color = 'black';
            this.root = newNode;
        } else {
            this._bstInsert(this.root, newNode);
            this.fixViolation(newNode);
        }
    }

    _bstInsert(root, node) {
        if (node.user.userid < root.user.userid) {
            if (!root.left) {
                root.left = node;
                node.parent = root;
            } else {
                this._bstInsert(root.left, node);
            }
        } else {
            if (!root.right) {
                root.right = node;
                node.parent = root;
            } else {
                this._bstInsert(root.right, node);
            }
        }
    }

    removeById(userid) {
        const node = this._findNode(this.root, userid);
        if (!node) return;
        this._deleteNode(node);
    }

    _deleteNode(z) {
        let y = z;
        let yOriginalColor = y.color;
        let x;

        if (!z.left) {
            x = z.right;
            this._transplant(z, z.right);
        } else if (!z.right) {
            x = z.left;
            this._transplant(z, z.left);
        } else {
            y = this._minimum(z.right);
            yOriginalColor = y.color;
            x = y.right;

            if (y.parent === z) {
                if (x) x.parent = y;
            } else {
                this._transplant(y, y.right);
                y.right = z.right;
                if (y.right) y.right.parent = y;
            }

            this._transplant(z, y);
            y.left = z.left;
            if (y.left) y.left.parent = y;
            y.color = z.color;
        }

        if (yOriginalColor === 'black') {
            this._fixDelete(x, z.parent); // passa parent fallback se x for null
        }
    }

    _transplant(u, v) {
        if (!u.parent) {
            this.root = v;
        } else if (u === u.parent.left) {
            u.parent.left = v;
        } else {
            u.parent.right = v;
        }
        if (v) v.parent = u.parent;
    }

    _minimum(node) {
        while (node.left) node = node.left;
        return node;
    }

    _fixDelete(x, fallbackParent) {
        while (x !== this.root && (!x || x.color === 'black')) {
            const parent = x ? x.parent : fallbackParent;
            let w;

            if (x === parent.left) {
                w = parent.right;
                if (w && w.color === 'red') {
                    w.color = 'black';
                    parent.color = 'red';
                    this.rotateLeft(parent);
                    w = parent.right;
                }
                if (
                    (!w.left || w.left.color === 'black') &&
                    (!w.right || w.right.color === 'black')
                ) {
                    if (w) w.color = 'red';
                    x = parent;
                } else {
                    if (!w.right || w.right.color === 'black') {
                        if (w.left) w.left.color = 'black';
                        if (w) w.color = 'red';
                        this.rotateRight(w);
                        w = parent.right;
                    }
                    if (w) w.color = parent.color;
                    parent.color = 'black';
                    if (w.right) w.right.color = 'black';
                    this.rotateLeft(parent);
                    x = this.root;
                }
            } else {
                w = parent.left;
                if (w && w.color === 'red') {
                    w.color = 'black';
                    parent.color = 'red';
                    this.rotateRight(parent);
                    w = parent.left;
                }
                if (
                    (!w.right || w.right.color === 'black') &&
                    (!w.left || w.left.color === 'black')
                ) {
                    if (w) w.color = 'red';
                    x = parent;
                } else {
                    if (!w.left || w.left.color === 'black') {
                        if (w.right) w.right.color = 'black';
                        if (w) w.color = 'red';
                        this.rotateLeft(w);
                        w = parent.left;
                    }
                    if (w) w.color = parent.color;
                    parent.color = 'black';
                    if (w.left) w.left.color = 'black';
                    this.rotateRight(parent);
                    x = this.root;
                }
            }
        }

        if (x) x.color = 'black';
    }

    rotateLeft(x) {
        const y = x.right;
        x.right = y.left;

        if (y.left) y.left.parent = x;

        y.parent = x.parent;

        if (!x.parent) {
            this.root = y;
        } else if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }

        y.left = x;
        x.parent = y;
    }

    rotateRight(y) {
        const x = y.left;
        y.left = x.right;

        if (x.right) x.right.parent = y;

        x.parent = y.parent;

        if (!y.parent) {
            this.root = x;
        } else if (y === y.parent.left) {
            y.parent.left = x;
        } else {
            y.parent.right = x;
        }

        x.right = y;
        y.parent = x;
    }

    fixViolation(node) {
        while (node !== this.root && node.parent.color === 'red') {
            if (node.parent === node.parent.parent.left) {
                const uncle = node.parent.parent.right;
                if (uncle && uncle.color === 'red') {
                    node.parent.color = 'black';
                    uncle.color = 'black';
                    node.parent.parent.color = 'red';
                    node = node.parent.parent;
                } else {
                    if (node === node.parent.right) {
                        node = node.parent;
                        this.rotateLeft(node);
                    }
                    node.parent.color = 'black';
                    node.parent.parent.color = 'red';
                    this.rotateRight(node.parent.parent);
                }
            } else {
                const uncle = node.parent.parent.left;
                if (uncle && uncle.color === 'red') {
                    node.parent.color = 'black';
                    uncle.color = 'black';
                    node.parent.parent.color = 'red';
                    node = node.parent.parent;
                } else {
                    if (node === node.parent.left) {
                        node = node.parent;
                        this.rotateRight(node);
                    }
                    node.parent.color = 'black';
                    node.parent.parent.color = 'red';
                    this.rotateLeft(node.parent.parent);
                }
            }
        }
        this.root.color = 'black';
    }

    _findNode(root, userid) {
        if (!root) return null;
        if (userid < root.user.userid) return this._findNode(root.left, userid);
        if (userid > root.user.userid) return this._findNode(root.right, userid);
        return root;
    }



    printTree(node = this.root, prefix = '', isLeft = true) {
        if (node === null) return '';
        let result = prefix + (isLeft ? '├── ' : '└── ') + `${node.user.userid} (${node.color})\n`;
        result += this.printTree(node.left, prefix + (isLeft ? '│   ' : '    '), true);
        result += this.printTree(node.right, prefix + (isLeft ? '│   ' : '    '), false);
        return result;
    }
}

export default RedBlackTree;
