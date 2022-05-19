class Warehouse {
    constructor(id, name, address) {
        this.id = id;
        this.name = name;
        this.address = address;
    }

    //convert to the format that works for the client
    convert() {
        return {
            name: this.name,
            address: this.address
        }
    }
}

module.exports = Warehouse;