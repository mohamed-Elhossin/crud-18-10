let addProductBtn = document.getElementById("addProductBtn");
let product_name = document.getElementById("name");
let category = document.getElementById("category");
let cost_inputs = document.querySelectorAll("#cost_inputs input");
let counts = document.getElementById("counts");
// let image = document.getElementById("MyImage");
// Tables Data 
let empty_tasks = document.getElementById("empty_tasks");
let products_div = document.getElementById("products_div");
let tbody = document.getElementById("tbody");
let clearAllBtn = document.getElementById("clearAllBtn");
let layout = document.getElementById("layout");
 

let globalId;
let mood = 'create';
if (localStorage.myProducts == null) {
    all_product = []
} else {
    all_product = JSON.parse(localStorage.getItem("myProducts"));
}

let checkEmpty = () => {
    if (tbody.childElementCount == 0 || localStorage.length == 0 || all_product.length == 0) {
        empty_tasks.classList.remove("none");
        products_div.classList.add("none");
        clearAllBtn.classList.add("none");
    } else {
        empty_tasks.classList.add("none");
        products_div.classList.remove("none");
        clearAllBtn.classList.remove("none");

    }
}
checkEmpty();


// Function to Get Product Net Profit
let get_profit = () => {
    let cost = cost_inputs[0].value;
    let tax = cost_inputs[1].value;
    let my_return = cost_inputs[2].value;
    let discount = cost_inputs[3].value;
    let sale_cost = cost_inputs[4].value;
    let net_profit = cost_inputs[5].value;
    //  String
    let Tax_Cost = +cost * (+tax / 100); // 1000
    //    1100
    let costAfterAddTax = +cost + +Tax_Cost; // 100
    // 1100                                  500
    let my_return_profit = +costAfterAddTax + +my_return;
    //          1600           , 100
    let discountCost = +my_return_profit * (+discount / 100);
    // let sales_Cost_FinalAfterDiscount = my_return_profit -discountCost;
    let my_return_profitAfter_discount = +my_return_profit - +discountCost;
    cost_inputs[4].value = Math.ceil(+my_return_profitAfter_discount);
    cost_inputs[5].value = Math.ceil(+my_return_profitAfter_discount - +costAfterAddTax);

}
for (let i = 0; i < cost_inputs.length; i++) {
    cost_inputs[i].addEventListener('keyup', get_profit);
}


let resetInputs = () => {
    product_name.value = "";
    category.value = "";
    cost_inputs[0].value = "";
    cost_inputs[1].value = "";
    cost_inputs[2].value = "";
    cost_inputs[3].value = "";
    cost_inputs[4].value = "";
    cost_inputs[5].value = "";
    image.value = "";
}

// Create Object 
let create_object = () => {
    let new_product = {
        product_name: product_name.value,
        category: category.value,
        cost: cost_inputs[0].value,
        tax: cost_inputs[1].value,
        my_return: cost_inputs[2].value,
        discount: cost_inputs[3].value,
        sale_cost: cost_inputs[4].value,
        net_profit: cost_inputs[5].value,
        image: image.value,
    }

    if (mood == 'create') {
        if (counts.value <= 0) {
            all_product.push(new_product);
        } else {
            for (let i = 1; i <= counts.value; i++) {
                all_product.push(new_product);
            }
        }
    } else {
        all_product[globalId] = new_product;
        counts.disabled = false;
        addProductBtn.innerHTML = `Add Product `;
        addProductBtn.classList.replace("btn-warning", 'btn-info');
        mood = 'create';

    }

    localStorage.setItem("myProducts", JSON.stringify(all_product));
    show_data();
    checkEmpty();
    resetInputs();
}
addProductBtn.addEventListener("click", create_object);
// ---------------------------------------------------------
let show_data = () => {

    let tabelRow = "";

    for (let i = 0; i < all_product.length; i++) {
        tabelRow += `
        <tr>
        <th> ${i + 1} </th>
        <th> ${all_product[i].product_name} </th>
        <th> ${all_product[i].category} </th>
         <td> <i  onclick="viewOneItem(${i})" class="text-primary fa-solid fa-eye"></i></td>
        <td> <i onclick="removeOneitem(${i})"  class="text-danger fa-solid fa-trash-can"></i>  </td>
        <td> <i  onclick="update(${i})" class="text-warning fa-solid fa-pen-to-square"></i> </td>
         </tr>
        `
    }
    tbody.innerHTML = tabelRow;
    checkEmpty();
}

show_data();
// Remove One Item . 
let removeOneitem = (i) => {

    all_product.splice(i, 1);
    localStorage.myProducts = JSON.stringify(all_product);
    show_data();

}
let closeModel = () => {
    layout.style.display = 'none';
}

layout.addEventListener("click", closeModel);

let viewOneItem = (i) => {
    layout.style.display = 'flex';
    layout.innerHTML = `
            <div id="Mymodel" class="Mymodel col-6">
     <div class="card col-12 mx-auto  ">
                <div class="card-body">
                    <button onclick="closeModel()" type="button"  class="bg-danger p-1 btn-close float-end my-2 " aria-label="Close"> </button>
 
                    <h6 class='mt-4'>Product Name  : ${all_product[i].product_name}  </h6>
                    <hr>
                    <h6>Product category  : ${all_product[i].category}  </h6>
                    <hr>
                    <h6>Product cost  : ${all_product[i].cost}  </h6>
                    <hr>
                    <h6>Product tax  : ${all_product[i].tax}  </h6>
                    <hr>
                    <h6>Product my_return  : ${all_product[i].my_return}  </h6>
                    <hr>
                    <h6>Product discount  : ${all_product[i].discount}  </h6>
                    <hr>
                    <h6>Product sale_cost  : ${all_product[i].sale_cost}  </h6>
                    <hr>
                    <h6>Product net_profit  : ${all_product[i].net_profit}  </h6>
                    <hr>
                    <h6>Product discount  : ${all_product[i].discount}  </h6>
                    <hr>
                   <img src='${all_product[i].image}' width='80'>
                    <hr>
  
                </div>
            </div> 
            </div>
    `
}

let clearAll = () => {
    if (confirm("Are Your Sure  ! ")) {
        localStorage.clear();
        all_product.splice(0);
        show_data();
    }
}
clearAllBtn.addEventListener("click", clearAll);
// -------------------------

let update = (i) => {
    globalId = i;
    mood = 'update';
    product_name.value = all_product[i].product_name;
    category.value = all_product[i].category;
    cost_inputs[0].value = all_product[i].cost;
    cost_inputs[1].value = all_product[i].tax;
    cost_inputs[2].value = all_product[i].my_return;
    cost_inputs[3].value = all_product[i].discount;
    cost_inputs[4].value = all_product[i].sale_cost;
    cost_inputs[5].value = all_product[i].net_profit;
    image.value = all_product[i].image;
    counts.disabled = true;
    addProductBtn.innerHTML = `Update Product ${i  +1}`;
    addProductBtn.classList.replace("btn-info", 'btn-warning');
}

