import  {customer_db} from "../db/DB.js";
import CustomerModel from "../model/CustomerModel.js";

let idx = -1

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("id")) {
        loadCustomerIds();
    }

});

$("#customer_save").on('click',function (){
    let id = $('#id').val();
    let name = $('#name').val();
    let address = $('#address').val();
    let contact = $('#contact').val();

    if (id === '' || name === '' || address === '' || contact === ''){
        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        loadCustomerIds();
    }else {
        let customer_data = new CustomerModel(id,name,address,contact);

        customer_db.push(customer_data);

        console.log(customer_db);

        loadStudents();

        clear();

        Swal.fire({
            title: "Added Successfully!",
            icon: "success",
            draggable: true
        });
        loadCustomerIds();
    }
})

function loadStudents() {
    $('#customer_tbody').empty();
    customer_db.map((item,index) => {
        let id = item.id;
        let name = item.name;
        let address = item.address;
        let contact = item.contact;

        let data = `<tr>
                            <td>${index +1}</td>
                            <td>${name}</td>
                            <td>${address}</td>
                            <td>${contact}</td>
                        </tr>`

        $('#customer_tbody').append(data);
    })
}

$("#customer_tbody").on('click', 'tr', function(){
    idx = $(this).index();
    console.log(idx);
    let obj = customer_db[idx];
    console.log(obj);

    let id = obj.id;
    let name = obj.name;
    let address = obj.address;
    let contact = obj.contact;

    $("#id").val(id);
    $("#name").val(name);
    $("#address").val(address);
    $("#contact").val(contact);
});

$("#customer_update").on('click', function(){
    if (idx === -1) {
        alert("Please select a Customer to update.");
        return;
    }

    // Get updated values from input fields
    let id = $("#id").val();
    let name = $("#name").val();
    let address = $("#address").val();
    let contact = $("#contact").val();

    // Update student object
    customer_db[idx].id = id;
    customer_db[idx].name = name;
    customer_db[idx].address = address;
    customer_db[idx].contact = contact;

    //Reload table();
    loadStudents();

    // Clear fields and selection
    idx = -1;
    clear();

    Swal.fire({
        title: "Updated Successfully!",
        icon: "success",
    });
});

$("#customer_delete").on('click', function () {
    if (idx === -1) {
        alert("Please select a Customer to delete.");
        return;
    }

    // Confirm before deleting
    Swal.fire({
        title: 'Are you sure?',
        text: "This Customer will be removed permanently.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'

    }).then((result) => {
        if (result.isConfirmed) {
            customer_db.splice(idx, 1);

            // Reload the table
            loadStudents();

            // Clear fields and reset index
            idx = -1;
            clear();

            Swal.fire({
                title: 'Deleted!',
                text: 'The Customer has been removed.',
                icon: 'success'
            });
            loadCustomerIds();
        }
    });
});

function loadCustomerIds(){
    let count = customer_db.length + 1;
    let newId = "C" + count.toString().padStart(3, "0");
    $('#id').val(newId);
}

function clear(){
    $('#id').val('');
    $('#name').val('');
    $('#address').val('');
    $('#contact').val('');
}