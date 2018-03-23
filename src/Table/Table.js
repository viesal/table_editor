import Table__data from './Table__data.js';
import Table__row from './Table__row.js';

class Table {
    constructor(container){
        this.container = container;
        this.table = document.createElement('table');
        this.table.className = 'table table-striped table-hover';

        this.thead = document.createElement('thead');
        this.tableTitle = document.createElement('tr');

        this.tableTitle__index = document.createElement('th');
        this.tableTitle__index.scope = 'col';
        this.tableTitle__index.innerHTML = '#';

        this.tableTitle__name = document.createElement('th');
        this.tableTitle__name.scope = 'col';
        this.tableTitle__name.innerHTML = 'Наименование';

        this.tableTitle__value = document.createElement('th');
        this.tableTitle__value.scope = 'col';
        this.tableTitle__value.innerHTML = 'Значение';

        this.tbody = document.createElement('tbody');

        this.tableTitle.appendChild(this.tableTitle__index);
        this.tableTitle.appendChild(this.tableTitle__name);
        this.tableTitle.appendChild(this.tableTitle__value);
        
        this.thead.appendChild(this.tableTitle);
        this.table.appendChild(this.thead);
        this.table.appendChild(this.tbody);
        this.container.appendChild(this.table);

        for (let [index, data] of Table__data.entries()){
           this.add_row(index+1, data.name, data.value);
        }

        this.number_row()
    }

    add_row(index, name, value){
        let row = new Table__row(this.tbody, index, name, value);
        row.del = document.createElement('td');

        row.del__icon = document.createElement('span');

        row.del__icon.className = 'glyphicon glyphicon-trash';


        row.del.addEventListener('click', ()=>{
            this.del_row(row.index.innerHTML);
        })
        row.del.appendChild(row.del__icon);
        row.tr.appendChild(row.del);
    }

    del_row(index){
        this.tbody.getElementsByClassName('Table__row')[index-1].remove();
        this.number_row();
    }

    number_row(){
        let i = 0;
        for (let data of this.tbody.rows){
            i++;
            data.cells[0].innerHTML=i;
        };
    }


}

export default Table;

//module.exports = Table;