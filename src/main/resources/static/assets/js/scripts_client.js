$().ready(getClientData);
//  FUNCIONES PARA LOS CLIENTES
function getClientData() {
    $("#info").removeAttr("style");
    hideForm();
    $.ajax({
        dataType: 'json',
        url: "http://158.101.116.78:8080/api/Client/all",
        type: "GET",
        success: function (response) {
            console.log(response);
            if(response.length == 0){
                $("#allItems").append("<tr><td>No se encontraron registros!</td></tr>");
            }  
            var misItems = response;
            for (let i = 0; i < misItems.length; i++) {
                $("#allItems").append("<tr>");
                $("#allItems").append("<td>" + misItems[i].name + "</td>");
                $("#allItems").append("<td>" + misItems[i].email + "</td>");
                $("#allItems").append("<td>" + misItems[i].age + "</td>");
                $("#allItems").append('<td><button class="btn btn-link" onclick="deleteClientData(' + misItems[i].id + ')">Borrar</button>');
                $("#allItems").append('<td><button class="btn btn-link" onclick="getClientDataById(' + misItems[i].id + ')">Editar</button>');
                $("#allItems").append("</tr>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function getClientDataById(idItem) {
    $("#formPost").removeAttr("style");
    $("#btnEditar").removeAttr("style");
    $("#info").attr("style", "display:none");
    $.ajax({
        dataType: 'json',
        url: "http://158.101.116.78:8080/api/Client/" + idItem,
        type: 'GET',
        success: function (response) {
            var item = response;
                $('#id').val(item.idClient),
                $("#name").val(item.name),
                $("#email").val(item.email),
                $("#age").val(item.age),
                $("#password").val(item.password)
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }

    });
}

function postClientData() {
    var elemento = {        
        name: $("#name").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        age: $("#age").val()
    }

    $.ajax({
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(elemento),
        url: "http://158.101.116.78:8080/api/Client/save",
        type: "POST",
        success: function (response) {
            alert("Creación exitosa!");
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function editClientData() {
    var elemento = {
        idClient: $("#id").val(),
        name: $("#name").val(),
        email: $("#email").val(),
        age: $("#age").val(),
        password: $("#password").val()
    }
    var dataToSend = JSON.stringify(elemento);
    $.ajax({
        contentType: "application/json; charset=utf-8",   
        data: dataToSend,
        url: "http://158.101.116.78:8080/api/Client/update",
        type: "PUT",
        success: function (response) {
            alert("Edición exitosa!");
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function deleteClientData(idElemento) {
    $.ajax({
        contentType: "application/json; charset=utf-8",           
        url: "http://158.101.116.78:8080/api/Client/" + idElemento,
        type: "DELETE",
        success: function (response) {
            alert("Eliminación exitosa!");
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function showForm() {
    $("#formPost").removeAttr("style");
    $("#btnGuardar").removeAttr("style");
    $("#btnCancelar").removeAttr("style");
    $("#buttons").attr("style", "display: none");    
    hideTable();
}


function hideForm() {
    $("#formPost").attr("style", "display: none");
    $("#btnGuardar").attr("style", "display: none");
}

function hideTable(){
    $("#info").attr("style", "display: none");
}



