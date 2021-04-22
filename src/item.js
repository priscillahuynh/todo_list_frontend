class Item {
    constructor(item) {
        this.id = item.id 
        this.description = item.description
        this.list_id = item.list_id 
        Item.all.push(this)
    }
    render () {
        return `
            <i class="far fa-circle"></i>
            ${this.description}
            <i class="fas fa-times-circle"></i>
            <br>`
    }
}

Item.all = []
