class Item {
    constructor(item) {
        this.id = item.id 
        this.description = item.description
        this.list_id = item.list_id 

        this.element = document.createElement("p")
        this.element.id = item.description
        Item.all.push(this)
    }
    render() {
        const list = document.getElementById(`${this.list_id}`)
        this.element.innerHTML = `
            <i class="far fa-circle"></i>
            ${this.description}
            <i class="fas fa-times-circle"></i>
            `
        list.appendChild(this.element)
    }

}

Item.all = []
