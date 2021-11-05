$().ready(getMessageData);
//  FUNCIONES PARA LOS MENSAJES
function getMessageData() {
    $("#info").removeAttr("style");
    hideForm();
    $.ajax({
        dataType: 'json',
        url: "http://158.101.116.78:8080/api/Message/all",
        type: "GET",
        success: function (response) {
            if(response.length==0){
                $("#allItems").append("<tr><td>No se encontraron registros!</td></tr>");
            }  
            var misItems = response;
            for (let i = 0; i < misItems.length; i++) {
                $("#allItems").append("<tr>");
                $("#allItems").append("<td>" + misItems[i].messageText + "</td>");
                $("#allItems").append("<td>" + misItems[i].client.name + "</td>");
                $("#allItems").append("<td>" + misItems[i].quadbike.name + "</td>");
                $("#allItems").append('<td><button onclick="deleteMessageData(' + misItems[i].id + ')">Borrar</button>');
                $("#allItems").append('<td><button onclick="getMessageDataById(' + misItems[i].id + ')">Editar</button>');
                $("#allItems").append("</tr>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function getMessageDataById(idItem) {
    $("#formPost").removeAttr("style");
    $("#btnEditar").removeAttr("style");
    $("#info").attr("style", "display:none");
    $.ajax({
        dataType: 'json',
        url: "http://158.101.116.78:8080/api/Message/" + idItem,
        type: 'GET',
        success: function (response) {
            $('#client').empty().append("<option selected='selected' value="+response.client.idClient+">"+response.client.name+"</option>");
            getClients();
            $('#quadbike').empty().append("<option selected='selected' value="+response.quadbike.id+">"+response.quadbike.name+"</option>");
            getQuadbikes();
            var item = response;
                $('#idMessage').val(item.idMessage),
                $("#messageText").val(item.messageText),
                $("#client").val(item.client.name),
                $("#quadbike").val(item.quadbike.name)
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }

    });
}

function getClients(){
    /* $('#client').empty().append('<option>Select an option</option>');  */
    $.ajax({
        dataType: 'json',
        url: "http://158.101.116.78:8080/api/Client/all",
        type: "GET",
        success: function (response) {
            if(response.length == 0){
                $("#createCli").removeAttr("style");
            }               
            var misItems = response;            
            for (let i = 0; i < misItems.length; i++) {
                $("#client").append("<option value="+misItems[i].idClient+">"+misItems[i].name+"</option>");                
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function getQuadbikes(){
    /* $('#quadbike').empty().append('<option>Select an option</option>');  */
    $.ajax({
        dataType: 'json',
        url: "http://158.101.116.78:8080/api/Quadbike/all",
        type: "GET",
        success: function (response) {      
            if(response.length == 0){
                $("#createQuad").removeAttr("style");
            }         
            var misItems = response;            
            for (let i = 0; i < misItems.length; i++) {
                $("#quadbike").append("<option value="+misItems[i].id+">"+misItems[i].name+"</option>");                
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function postMessageData() {
    var elemento = {        
        messageText: $("#messageText").val(),        
        client: {idClient: $("#client").val()},
        quadbike: {id: $("#quadbike").val()}
    }

    $.ajax({
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(elemento),
        url: "http://158.101.116.78:8080/api/Message/save",
        type: "POST",
        success: function (response) {
            alert("Creación exitosa!");
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function editMessageData() {
    var elemento = {
        idMessage: $("#id").val(),
        messageText: $("#messageText").val(),
        client: {idClient:$("#client").val()},
        quadbike: {id:$("#quadbike").val()}
    }
    var dataToSend = JSON.stringify(elemento);
    $.ajax({
        contentType: "application/json; charset=utf-8",   
        data: dataToSend,
        url: "http://158.101.116.78:8080/api/Message/update",
        type: "PUT",
        success: function (response) {
            alert("Edición exitosa!");
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function deleteMessageData(idElemento) {
    $.ajax({
        contentType: "application/json; charset=utf-8",          
        url: "http://158.101.116.78:8080/api/Message/" + idElemento,
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
    getClients();
    getQuadbikes();    
    hideTable();
}

function hideForm() {
    $("#formPost").attr("style", "display: none");
    $("#btnGuardar").attr("style", "display: none");
}

function hideTable(){
    $("#info").attr("style", "display: none");
}



