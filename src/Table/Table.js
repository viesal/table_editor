import Table__data from './Table__data.js';
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

        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.className = 'btn btn-light float-right';
        this.button.innerText = 'Добавить строку';
        this.button.addEventListener('click', ()=>{
            this.add_row(this.tbody.getElementsByTagName('tr').length+1, '', '');
        });

        this.tableTitle.appendChild(this.tableTitle__index);
        this.tableTitle.appendChild(this.tableTitle__name);
        this.tableTitle.appendChild(this.tableTitle__value);
        this.tableTitle.appendChild(this.tableTitle__act);

        this.thead.appendChild(this.tableTitle);
        this.table.appendChild(this.thead);
        this.table.appendChild(this.tbody);
        this.container.appendChild(this.table);
        this.container.appendChild(this.button);

        this.drag = {
            elem: false,
            avatar: false
        };

        for (let [index, data] of Table__data.entries()){
           this.add_row(index+1, data.name, data.value);
        }
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
        this.tbody.getElementsByClassName('Table__row')[index-1].remove();
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
            this.startDrag(e);
        }

        // this.drag.avatar.style.left = e.pageX - this.drag.shiftX + 'px';
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

    startDrag(e) {
        let avatar = this.drag.avatar;
        this.table.appendChild(avatar);
        //avatar.style.zIndex = 9999;
        avatar.style.position = 'absolute';
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
}

export default Table;