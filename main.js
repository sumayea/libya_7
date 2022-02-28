let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count =document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
//console.log(title, price, taxes, ads, discount, total, count, category, submit);


let mood = 'create';
let tmp;

// get total

function getTotal(){
    //console.log('done');
    if(price.value != ''){
        let result = (+price.value + +taxes.value +  +ads.value) - +discount.value;
        total.innerHTML= result;
        total.style.background ='#040';
    }else{
        total.innerHTML='';
        total.style.background ='#a00d02';
    }
}


// create product ---//save localstorage
let dataPro;
if (localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro =[];
}


  submit.onclick = function(){

    let newPro = {

     title:title.value.toLowerCase(),
     price:price.value,
     taxes:taxes.value,
     ads:ads.value,
     discount:discount.value,
     total:total.innerHTML,
     count:count.value,
     category:category.value.toLowerCase(),
    }

 
   if (title.value != '' 
   && price.value != '' 
   && category.value != ''
   && newPro.count < 100 ){

    if (mood === 'create'){
        if(newPro.count > 1){
            for(let i = 0; i < newPro.count; i++){
                dataPro.push(newPro);
            }
        }else{
    dataPro.push(newPro);

    }

    clearData();
}else{
    dataPro[tmp]   = newPro;
    mood ='create';
    submit.innerHTML = 'Create';
    count.style.display ='block';
}

   }

   
    localStorage.setItem('product', JSON.stringify(dataPro));
   
    showData();
    //console.log(dataPro);
  }


// clear inputs
function clearData(){

    title.value ='';
    price.value ='';
     taxes.value ='';
     ads.value = '';
     discount.value = '';
     total.innerHTML ='';
     count.value ='';
     category.value ='';

}
//read 
function showData(){
    getTotal();
    let table ='';
    for (let i = 0; i < dataPro.length; i++){
        table += `
        <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td> ${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td> <button  onclick ="update(${i})" id ="update"> update</button></td>

                    <td> <button onclick ="delData(${i})" id ="del"> delete</button></td>

        </tr>

        `
        //console.log(table);

    }
    document.getElementById('tbody').innerHTML = table;
let btnDel = document.getElementById('deleteAll');
    if(dataPro.length > 0)
{
 btnDel.innerHTML = `

 <button onclick ="delall()"> Delete All (${dataPro.length})</button>
 `
}else{
    btnDel.innerHTML = ''; 
}
}
showData();







// delete
 function delData(i){

//console.log(i);
dataPro.splice(i,1);
localStorage.product = JSON.stringify(dataPro);
showData();
 }

 //delALL

 function delall(){
     localStorage.clear();
     dataPro.splice(0);
     showData();
 }

//update

 function update(i){
     //console.log(i);
     title.value = dataPro[i].title;
     price.value = dataPro[i].price;
     taxes.value = dataPro[i].taxes;
     ads.value = dataPro[i].ads;
     discount.value = dataPro[i].discount;
     getTotal();
     count.style.display = 'none';
     category.value = dataPro[i].category;
     submit.innerHTML = 'Update';
     mood = 'update';
     tmp = i;
     scroll({
         top:0,
         behavior: 'smooth'
         })

 }
//search

let searchMode = 'title';

function getSearchMode(id){
    let search = document.getElementById('search');
 if (id == 'searchTitle'){
    searchMode = 'title';
   
 }else{
    searchMode = 'category';
    
 }
 search.placeholder = 'Search By '+ searchMode;
 search.focus();
 search.value = '';
 showData();


}

function searchData(value ){
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
if (searchMode == 'title'){
if (dataPro[i].title.includes(value.toLowerCase())){

    table += `
    <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td> ${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td> <button  onclick ="update(${i})" id ="update"> update</button></td>

                <td> <button onclick ="delData(${i})" id ="del"> delete</button></td>

    </tr>

    ` 
}



}else{
        if (dataPro[i].category.includes(value.toLowerCase())){
        
            table += `
            <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td> ${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td> <button  onclick ="update(${i})" id ="update"> update</button></td>
        
                        <td> <button onclick ="delData(${i})" id ="del"> delete</button></td>
        
            </tr>
        
            ` 
        }
        
        }

}
document.getElementById('tbody').innerHTML = table;

}







//clean data