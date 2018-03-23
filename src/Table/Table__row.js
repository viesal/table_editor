class Table__row {
    constructor(container, index, key, value){
        this.container = container;
        this.tr = document.createElement('tr');
        this.tr.className = 'Table__row'

        this.index = document.createElement('th');
        this.index.innerText = index;
        this.index.scope = 'row';

        this.name = document.createElement('td');
        this.name.innerText = key;

        this.value = document.createElement('td');
        this.value.innerText = value;

        this.tr.appendChild(this.index);
        this.tr.appendChild(this.name);
        this.tr.appendChild(this.value);
        this.container.appendChild(this.tr)
    }
}

export default Table__row;
//module.exports = Table__row;