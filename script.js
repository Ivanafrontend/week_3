var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}
id = 0;

function readFormData() {
    id++;
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["address"] = document.getElementById("address").value;
    formData["city"] = document.getElementById("city").value;
    formData["pcode"] = document.getElementById("pcode").value;
    formData["country"] = document.getElementById("country").value;
    return formData;
}

function insertNewRecord(data) {

    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell0 = newRow.insertCell(0);
    cell0.innerHTML = id;
    cell1 = newRow.insertCell(1);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(2);
    cell2.innerHTML = data.address;
    cell3 = newRow.insertCell(3);
    cell3.innerHTML = data.city;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = data.pcode;
    cell5 = newRow.insertCell(5);
    cell5.innerHTML = data.country;
    cell6 = newRow.insertCell(6);
    cell6.innerHTML = `<a id="readButton${id}"><i class="fa fa-eye" title="Read"></i></a>
                       <a onClick="onEdit(this)"><i class="fa fa-pencil-alt" title="Update"></i></a>
                       <a onClick="onDelete(this)"> <i class="fa fa-trash" title="Delete"></i></a>`;
    var readInfo = document.getElementById(`readButton${id}`)
    readInfo.addEventListener("click", function() {
        console.log("READ is clicked")
        alert("Name: " + data.fullName + "\n" +
            "Address: " + data.address + "\n" +
            "City: " + data.city + "\n" +
            "Pin Code: " + data.pcode + "\n" + "Country: " + data.country);
    })
}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("address").value = "";
    document.getElementById("city").value = "";
    document.getElementById("pcode").value = "";
    document.getElementById("country").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("submit").style.display = "none";
    document.getElementById("fullName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("address").value = selectedRow.cells[2].innerHTML;
    document.getElementById("city").value = selectedRow.cells[3].innerHTML;
    document.getElementById("pcode").value = selectedRow.cells[4].innerHTML;
    document.getElementById("country").value = selectedRow.cells[5].innerHTML;
    document.getElementById("save").style.display = "block";

}

function updateRecord(formData) {
    selectedRow.cells[1].innerHTML = formData.fullName;
    selectedRow.cells[2].innerHTML = formData.address;
    selectedRow.cells[3].innerHTML = formData.city;
    selectedRow.cells[4].innerHTML = formData.pcode;
    selectedRow.cells[5].innerHTML = formData.country;
    document.getElementById("save").style.display = "none";
    document.getElementById("submit").style.display = "block";

}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate() {
    isValid = true;
    if (document.getElementById("fullName").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}