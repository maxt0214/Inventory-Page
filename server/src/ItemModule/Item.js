class Item {
    constructor(id, name, stock) {
        this.id = id;
        this.name = name;
        this.stock = stock;
    }
    
    addStock(added) {
        this.stock += added;
    }

    editStock(stock) {
        this.stock = stock;
    }

    //convert to the format that works for the client
    convert() {
        return {
            name: this.name,
            stock: this.stock
        }
    }
}

module.exports = Item;