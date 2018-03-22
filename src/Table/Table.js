import Table__data from './Table__data.js';
import Table__row from './Table__row.js';

class Table {
    constructor(container){
        this.container = container;
        this.table = document.createElement('table');
        this.table.className = 'table table-striped';

        this.thead = document.createElement('thead');
        this.tableTitle = document.createElement('tr');

        this.tableTitle__name = document.createElement('th');
        this.tableTitle__name.scope = 'col';
        this.tableTitle__name.innerHTML = 'Наименование';

        this.tableTitle__value = document.createElement('th');
        this.tableTitle__value.scope = 'col';
        this.tableTitle__value.innerHTML = 'Значение';

        this.tbody = document.createElement('tbody');

        this.tableTitle.appendChild(this.tableTitle__name);
        this.tableTitle.appendChild(this.tableTitle__value);
        this.thead.appendChild(this.tableTitle);
        this.table.appendChild(this.thead);
        this.table.appendChild(this.tbody);
        this.container.appendChild(this.table);

        for (let [index, data] of Table__data.entries()){

            let row = new Table__row(this.tbody, data.name, data.value);
            console.dir(row)
            row.index = document.createElement('td')
            row.index.innerText = index;

            row.insertBefore(row.index, row.firstChild);

            row.add = document.createElement('td');
            row.add.innerText = 'del';
            row.tr.appendChild(row.add);
        }

    }
}

export default Table;

//module.exports = Table;