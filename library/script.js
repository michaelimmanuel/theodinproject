var library = {};
var book_id = 0;

window.addEventListener('DOMContentLoaded', ()=>{
    const overlay = document.querySelector("#overlay");
    const popup_form = document.querySelector("#popup-form");
    const form_submit = document.querySelector('#form-submit');

    popup_form.addEventListener('click', ()=>{
        overlay.classList.remove('hidden');
        overlay.classList.add('flex');
    });

    form_submit.addEventListener('click', ()=>{
        overlay.classList.remove('flex');
        overlay.classList.add('hidden');
        get_inputVal();
    })

})

class Book{
    constructor(name = '', author = '', pages = '0', status = false){
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

function get_inputVal(){
    let dict ={};
    let field = document.querySelectorAll(".input-field");
    field.forEach(items => {

        let key = items.dataset.input;
        if(items.type=="checkbox"){
            var val = items.checked;
        }
        else{
            var val = items.value;
        }
        dict[key] = val;
    });
    //library.push(new Book(dict.title, dict.author, dict.page, dict.status));
    library[book_id] = new Book(dict.title, dict.author, dict.page, dict.status);
    book_id = 0;
    // add_table(dict);
    update_table();
}

function add_table(val){
    const table = document.querySelector("table");
    let row = document.createElement("tr");
    for(const item in val){
        let th = document.createElement("td");
        th.className = "px-6 py-3";
        th.scope = "col";

        if(item == "status"){
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = val[item];
            checkbox.className = "text-green-500 w-8 h-8 mr-3 border border-gray-300 rounded"
            th.appendChild(checkbox);
        }
        else{
            th.appendChild(document.createTextNode(val[item]));
        }
        row.appendChild(th);
    }

    table.appendChild(row);
}

function update_table(){
   // add book from library to table
    const table = document.querySelector("table");
    // remove all child exept the first one
    while(table.childElementCount > 1){
        table.removeChild(table.lastChild);
    }
    for(const item in library){
        add_table(library[item]);
    }

}








