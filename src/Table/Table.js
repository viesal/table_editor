import Table__row from './Table__row.js';

class Table {
    constructor(container){
        this.container = container;
        this.table = document.createElement('table');
        this.table.className = 'table table-sm table-striped table-hover';

        this.thead = document.createElement('thead');
        this.tbody = document.createElement('tbody');
        this.tableTitle = document.createElement('tr');

        this.tableTitle__index = this.create_th('#');
        this.tableTitle__name = this.create_th('Наименование');
        this.tableTitle__value = this.create_th('Значение');
        this.tableTitle__act = this.create_th(' ');


        this.div_button = document.createElement('div');

        this.button_add_row = document.createElement('button');
        this.button_add_row.type = 'button';
        this.button_add_row.className = 'btn btn-light';
        this.button_add_row.innerText = 'Добавить строку';
        this.button_add_row.addEventListener('click', ()=>{
            this.add_row(this.tbody.getElementsByTagName('tr').length+1, '', '');
        });

        this.button_unload_json = document.createElement('button');
        this.button_unload_json.type = 'button';
        this.button_unload_json.className = 'btn btn-light float-left';
        this.button_unload_json.innerText = 'Выгрузить в JSON';
        this.button_unload_json.addEventListener('click', ()=>{
            this.textarea.value = this.data_to_json()
        });

        this.button_load_json = document.createElement('button');
        this.button_load_json.type = 'button';
        this.button_load_json.className = 'btn btn-light float-left';
        this.button_load_json.innerText = 'Загрузить из JSON';
        this.button_load_json.addEventListener('click', ()=>{
            this.json_to_data()
        });

        this.button_unload_csv = document.createElement('button');
        this.button_unload_csv.type = 'button';
        this.button_unload_csv.className = 'btn btn-light float-left';
        this.button_unload_csv.innerText = 'Выгрузить в csv';
        this.button_unload_csv.addEventListener('click', ()=>{
            this.json_to_csv()
        });

        this.textarea = document.createElement('textarea');
        this.textarea.style.width = '100%';
        
        this.div_button.appendChild(this.button_unload_json);
        this.div_button.appendChild(this.button_load_json);
        this.div_button.appendChild(this.button_unload_csv);
        this.div_button.appendChild(this.button_add_row);

        this.tableTitle.appendChild(this.tableTitle__index);
        this.tableTitle.appendChild(this.tableTitle__name);
        this.tableTitle.appendChild(this.tableTitle__value);
        this.tableTitle.appendChild(this.tableTitle__act);

        this.thead.appendChild(this.tableTitle);
        this.table.appendChild(this.thead);
        this.table.appendChild(this.tbody);

        this.container.appendChild(this.table);
        this.container.appendChild(this.div_button);
        this.container.appendChild(this.textarea);

        this.drag = {
            elem: false,
            avatar: false
        };
    }

    add_row(index, name, value){
        let row = new Table__row(this.tbody, index, name, value);
        row.del = document.createElement('td');
        row.del__icon = document.createElement('span');
        row.del__icon.className = 'glyphicon glyphicon-trash float-right';

        row.del__icon.addEventListener('click', ()=>{
            this.del_row(row.index.innerHTML);
        });

        row.tr.onmousedown = (e)=>{this.drag_el(e)};
        row.tr.onmousemove = (e)=>{this.move_el(e)};
        row.tr.onmouseup = (e)=>{this.drop_el(e)};

        document.onmouseup = (e)=>{
            if (this.drag.avatar){
                this.drag.avatar.rollback();
                this.drag = {};
            }
        }

        row.del.appendChild(row.del__icon);
        row.tr.appendChild(row.del);
    }

    del_row(index){
        let del_el = this.tbody.getElementsByClassName('Table__row')[index-1];
        if (del_el.getElementsByTagName('input')[0] == undefined){
            del_el.remove()
        }
        this.number_row();
    }

    number_row(){
        let i = 0;
        for (let data of this.tbody.rows){
            i++;
            data.cells[0].innerHTML=i;
        }
    }

    create_th(name){
        let el = document.createElement('th');
        el.scope = 'col';
        el.innerHTML = name;
        return el;
    }

    drag_el(e){
        if (e.which != 1) return;
        let elem = e.target.closest('tr');
        if (!elem) return;
        this.drag.elem = elem;
        this.drag.downX = e.pageX;
        this.drag.downY = e.pageY;
    }

    move_el(e){
        if (!this.drag.elem) return;
        if ( !this.drag.avatar ) {
            let moveX = e.pageX - this.drag.downX;
            let moveY = e.pageY - this.drag.downY;
            if ( Math.abs(moveX) < 3 && Math.abs(moveY) < 3 ) return
            this.drag.avatar = this.createAvatar(e);
            if (!this.drag.avatar) {
                this.drag = {};
                return;
            }
            let coords = this.getCoords(this.drag.avatar);
            this.drag.shiftX = this.drag.downX - coords.left;
            this.drag.shiftY = this.drag.downY - coords.top;

            let avatar = this.drag.avatar;
            avatar.style.position = 'absolute';
            this.table.appendChild(avatar);
        }
        this.drag.avatar.style.top = e.pageY - this.drag.shiftY + 'px';
        return false;
    }

    createAvatar(e) {
        let avatar = this.drag.elem;
        let old = {
            parent: avatar.parentNode,
            nextSibling: avatar.nextSibling,
            position: avatar.position || '',
            left: avatar.left || '',
            top: avatar.top || '',
            zIndex: avatar.zIndex || ''
        };

        avatar.rollback = function() {
            old.parent.insertBefore(avatar, old.nextSibling);
            avatar.style.position = old.position;
            avatar.style.left = old.left;
            avatar.style.top = old.top;
            avatar.style.zIndex = old.zIndex
        };

        return avatar;
    }

    drop_el(e){
        if (this.drag.avatar) {
            this.finishDrag(e);
        }
        this.drag = {};
    }

    finishDrag(e) {
        let dropElem = document.elementFromPoint(e.clientX, e.clientY).closest('tr');
        if (dropElem) {
            this.tbody.insertBefore(this.drag.avatar, dropElem)
            this.drag.avatar.style.position = 'inherit';
            this.number_row()
        } else {
            this.drag.avatar.rollback()
        }
    }

    getCoords(elem) {
        const box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };

    }

    data_to_json(){
        let arr = [];
        for (let child of this.tbody.childNodes){
            let data = {
                name: child.childNodes[1].innerHTML,
                value: child.childNodes[2].innerHTML
            }
            arr.push(data);
        }
        return JSON.stringify(arr)
    }

    json_to_data(){
        try{
            let json = JSON.parse(this.textarea.value);
            for (let [index, data] of json.entries()) {
                this.add_row(this.tbody.getElementsByTagName('tr').length+1, data.name, data.value);
            } 
        }
        catch(err){
            alert(err);
        }
    }

    json_to_csv(){
        let json = JSON.parse(this.data_to_json())
        var csv = 'name,value\n';
        for (let row of json){
                csv += `${row.name},${row.value}`;
                csv += "\n";
            };
        let hid = document.createElement('a');
        hid.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hid.target = '_blank';
        hid.download = 'data.csv';
        hid.click();    
    }
}

export default Table;