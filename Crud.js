let arr = [];
let editable= false;
let editId =0;

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("data")) {
      arr = JSON.parse(localStorage.getItem("data"));
      showData();
    }
  });

function submit() {
 
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let city = document.getElementById("city").value;
  let address = document.getElementById("address").value;
   if(!name || !age || !city || !address){
    alert("provide values");
    return;
  }

  if(editable){
    let index = arr.findIndex(item=>item.id === editId);
    arr[index].name = name;
    arr[index].age = age;
    arr[index].city = city;
    arr[index].address = address;
    editable = false;
    editId =0;
}else{

    let obj = {
      id: new Date().getTime(),
      name: name,
      age: age,
      city: city,
      address: address,
    }
    arr.push(obj);   //1st
}
localStorage.setItem("data", JSON.stringify(arr));

  document.getElementById('name').value = "";
  document.getElementById('age').value = "";
  document.getElementById('city').value = "";
  document.getElementById('address').value = "";
  showData();
}
function showData() {
  let tbody = document.querySelector("#display tbody");
  tbody.innerHTML = "";
  if (arr.length > 0) {
    arr.forEach((item) => {
      let tr = document.createElement("tr");
      let trhtml = `
        <td>${item.name} </td>
        <td>${item.age} </td>
        <td>${item.city} </td>
        <td>${item.address} </td>
        <td><button onclick="edit(${item.id})">Edit</button></td>
        <td><button onclick="Delete(${item.id})">Delete</button></td>
        `
      tr.innerHTML = trhtml;
      tbody.appendChild(tr);
    })
  }
}
function edit(id){
    document.getElementById("cancel").hidden=false;
    editId = id;
    editable= true;
let index= arr.findIndex(item=>item.id === id);
if (index>-1){
    document.getElementById('name').value = arr[index].name;
    document.getElementById('age').value = arr[index].age;
    document.getElementById('city').value = arr[index].city;
    document.getElementById('address').value = arr[index].address;
}
}
function Delete(id){
    let index = arr.findIndex(item=>item.id === id);
    if(index > -1){
      arr.splice(index,1)
    }

    localStorage.setItem("data", JSON.stringify(arr));

    document.getElementById('name').value = "";
    document.getElementById('age').value = "";
    document.getElementById('city').value = "";
    document.getElementById('address').value = "";
    showData();

}
function cancel(){

    document.getElementById('cancel').hidden = true;
    document.getElementById('name').value = "";
    document.getElementById('age').value = "";
    document.getElementById('city').value = "";
    document.getElementById('address').value = "";
    showData();
}
showData();
document.getElementById("submit").addEventListener("click", submit);
document.getElementById('cancel').addEventListener('click',cancel)
