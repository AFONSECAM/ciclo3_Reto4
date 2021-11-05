$().ready(getDataQuadbike);

function getCategories(){
    /* $('#category').empty().append('<option>Select an option</option>');  */
    $.ajax({
        dataType: 'json',
        url: "http://158.101.116.78:8080/api/Category/all",
        type: "GET",
        success: function (response) {             
            if(response.length == 0){
                $("#createCat").removeAttr("style");
            }           
            var misItems = response;            
            for (let i = 0; i < misItems.length; i++) {
                $("#category").append("<option value="+misItems[i].id+">"+misItems[i].name+"</option>");                
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function getDataQuadbike() {
    $("#info").removeAttr("style");    
    hideForm();
    $.ajax({
        dataType: 'json',
        url: "http://158.101.116.78:8080/api/Quadbike/all",
        type: "GET",
        success: function (response) {             
            if(response.length==0){
                $("#allItems").append("<tr><td>No se encontraron registros!</td></tr>");
            }           
            var misItems = response;
            for (let i = 0; i < misItems.length; i++) {
                $("#allItems").append("<tr>");
                $("#allItems").append("<td>" + misItems[i].brand + "</td>");
                $("#allItems").append("<td>" + misItems[i].year + "</td>");
                $("#allItems").append("<td>" + misItems[i].category.name ?misItems[i].category.name:"Null" + "</td>");
                $("#allItems").append("<td>" + misItems[i].name + "</td>");
                $("#allItems").append('<td><button class="btn btn-link" onclick="deleteQuadbikeData(' + misItems[i].id + ')">Borrar</button>');
                $("#allItems").append('<td><button class="btn btn-link" onclick="getDataQuadbikeById(' + misItems[i].id + ')">Editar</button>');
                $("#allItems").append("</tr>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function getDataQuadbikeById(idItem) {
    $("#formPost").removeAttr("style");
    $("#btnEditar").removeAttr("style");
    $("#info").attr("style", "display:none");
    $.ajax({
        dataType: 'json',
        url: "http://158.101.116.78:8080/api/Quadbike/" + idItem,
        type: 'GET',
        success: function (response) {            
            $('#category').empty().append("<option selected='selected' value="+response.category.id+">"+response.category.name+"</option>");                                                         
            var item = response;
                $('#id').val(item.id),
                $("#brand").val(item.brand),
                $("#year").val(item.year),
                $("#description").val(item.description),
                $("#category").val(item.category.name),
                $("#name").val(item.name)
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }

    });
}

function postQuadbikeData() {
    var elemento = {        
        brand: $("#brand").val(),
        year: $("#year").val(),
        category: { id:$("#category").val()},
        name: $("#name").val(),
        description: $("#description").val()
    }
    $.ajax({
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(elemento),
        url: "http://158.101.116.78:8080/api/Quadbike/save",
        type: "POST",
        success: function (response) {
            console.log(response);
            alert("Creación exitosa!");
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function editQuadbikeData() {
    var elemento = {
        id: $('#id').val(),
        brand: $("#brand").val(),
        year: $("#year").val(),
        category: { id:$("#category").val()},
        name: $("#name").val()
    }    
    var dataToSend = JSON.stringify(elemento);
    $.ajax({
        contentType: "application/json; charset=utf-8",        
        data: dataToSend,
        url: "http://158.101.116.78:8080/api/Quadbike/update",
        type: "PUT",
        success: function (response) {            
            alert("Edición exitosa!");
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function deleteQuadbikeData(idElemento) {
    $.ajax({
        contentType: "application/json; charset=utf-8",        
        url: "http://158.101.116.78:8080/api/Quadbike/" + idElemento,
        type: "DELETE",
        success: function (response) {
            alert("Eliminación exitosa!");
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


/* Funciones para el front */
function showForm() {
    $("#formPost").removeAttr("style");
    $("#btnGuardar").removeAttr("style");
    $("#btnCancelar").removeAttr("style");
    $("#buttons").attr("style", "display: none");    
    getCategories();
    hideTable();
}

function hideForm() {
    $("#formPost").attr("style", "display: none");
    $("#btnGuardar").attr("style", "display: none");
}

function hideTable(){
    $("#info").attr("style", "display: none");
}


