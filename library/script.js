var library = [];
var book_id = 0;

window.addEventListener('DOMContentLoaded', ()=>{
    const overlay = document.querySelector("#overlay");
    const popup_form = document.querySelector("#popup-form");
    const form_submit = document.querySelector('#form-submit');
    const delete_btn = document.querySelector('#delete');
    const search_bar = document.querySelector('#search-bar');

    popup_form.addEventListener('click', ()=>{
        overlay.classList.remove('hidden');
        overlay.classList.add('flex');
    });

    form_submit.addEventListener('click', ()=>{
        overlay.classList.remove('flex');
        overlay.classList.add('hidden');
        get_inputVal();
    });
    delete_btn.addEventListener('click', ()=>{
        delete_book();
    });
    search_bar.addEventListener('keyup', ()=>{
        search_book();
    });
})

class Book{
    constructor(chk = false, name = '', author = '', pages = '0', status = false){
        this.chk = chk;
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
    library.push(new Book(false, dict.title, dict.author, dict.page, dict.status));
    // library[book_id] = new Book(false, dict.title, dict.author, dict.page, dict.status);

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

        if(item == "status" || item == "chk"){
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            
            if(item === "status"){
            checkbox.className = "text-green-500 w-8 h-8 mr-3 border border-gray-300 rounded"
            checkbox.checked = val["status"];
            }
            else{
                checkbox.className = "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500";
                checkbox.id = "checkbox";
                checkbox.checked = false;
            }
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

function delete_book(){
    const table = document.querySelector("table");
    const checkbox = document.querySelectorAll("#checkbox");
    for(let i = 0; i < checkbox.length; i++){
        if(checkbox[i].checked){
            library.pop(i);
        }
    }
    update_table();
}

function search_book(){
    // let input = document.querySelector('#search-bar');
    // let filter = input.value.toUpperCase();
    // let table = document.querySelector("table");
    // let tr = table.getElementsByTagName("tr");

    var input, filter, found, table, tr, td, i, j;
    input = document.getElementById("search-bar");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");
    
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td") ; 
        for(j=0 ; j<td.length ; j++)
        {
            let tdata = td[j] ;
            if (tdata) {
                if (tdata.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                break ; 
                } else {
                    tr[i].style.display = "none";
                }
            } 
        }
    }
}








