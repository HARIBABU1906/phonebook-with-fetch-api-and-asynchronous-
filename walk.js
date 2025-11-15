let contacts = [
 {id:1, name:"Johnsone",phone:"11467564789"},
 {id:2, name:"Don", phone:"277777789676"},
 { id: 3, name: "Charlie Brown", phone: "555-500-6000" },
 { id: 4, name: "Diana Prince", phone: "555-700-8000" },
    
];
let nextId = 3;

function delay(ms){ return new Promise(res => setTimeout(res, ms)); }

async function loadContacts(){
    document.getElementById("list").innerHTML = "Loading...";
    await delay(300);
    displayContacts(contacts);
}

function displayContacts(data){
    let html = "";
    data.forEach(c => {
        html += `<div class="contact">
                    <b>${c.name}</b> - ${c.phone}
                    <button onclick="editContact(${c.id})">Edit</button>
                    <button onclick="deleteContact(${c.id})">Delete</button>
                 </div>`;
    });
    document.getElementById("list").innerHTML = html || "No contacts found";
}

async function saveContact(){
    let id = document.getElementById("contactId").value;
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();

    if(!name || !phone){ alert("Enter name and phone!"); return; }

    await delay(300);

    if(id){
        let contact = contacts.find(c => c.id == id);
        contact.name = name;
        contact.phone = phone;
    } else {
        contacts.push({id: nextId++, name, phone});
    }

    clearForm();
    loadContacts();
}

function editContact(id){
    let c = contacts.find(x => x.id == id);
    document.getElementById("contactId").value = c.id;
    document.getElementById("name").value = c.name;
    document.getElementById("phone").value = c.phone;
}

async function deleteContact(id){
    await delay(200);
    contacts = contacts.filter(c => c.id != id);
    loadContacts();
}

function clearForm(){
    document.getElementById("contactId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
}

async function searchContacts(){
    let q = document.getElementById("search").value.toLowerCase();
    await delay(200);
    let result = contacts.filter(c => 
        c.name.toLowerCase().includes(q) || c.phone.includes(q)
    );
    displayContacts(result);
}

loadContacts();