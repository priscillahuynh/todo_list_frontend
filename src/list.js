class List {
    constructor(list, listAttributes) {
        this.id = list.id
        this.title = listAttributes.title
        List.all.push(this)
    }

    renderListTitle() {
        return `
            <h3>${this.title}</h3>
            `
        }

    renderListForm() {
        return `
            <form class="add-item">
            <input type="hidden", name="list_id", value="${this.id}">
            <input type="text" name="description" placeholder="Add new item">
            <button type="submit" name="submit">Submit</button>
            </form>
            <br>`
    }   
}

List.all = [];