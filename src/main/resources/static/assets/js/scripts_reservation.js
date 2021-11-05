$().ready(getReservationData);
//  FUNCIONES PARA LOS MENSAJES
function getReservationData() {
    $("#info").removeAttr("style");
    hideForm();
    $.ajax({
        dataType: 'json',
        url: "http://158.101.116.78:8080/api/Reservation/all",
        type: "GET",
        success: function (response) {
            if(response.length==0){
                $("#allItems").append("<tr><td>No se encontraron registros!</td></tr>");
            }  
            var misItems = response;
            for (let i = 0; i < misItems.length; i++) {
                $("#allItems").append("<tr>");
                $("#allItems").append("<td>" + misItems[i].id + "</td>");
                $("#allItems").append("<td>" + misItems[i].startDate + "</td>");
                $("#allItems").append("<td>" + misItems[i].devolutionDate + "</td>");
                $("#allItems").append("<td>" + misItems[i].quadbike.name + "</td>");
                $("#allItems").append("<td>" + misItems[i].client.name + "</td>");
                $("#allItems").append('<td><button onclick="deleteReservationData(' + misItems[i].id + ')">Borrar</button>');
                $("#allItems").append('<td><button onclick="getReservationDataById(' + misItems[i].id + ')">Editar</button>');
                $("#allItems").append("</tr>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function getReservationDataById(idItem) {
    $("#formPost").removeAttr("style");
    $("#btnEditar").removeAttr("style");
    $("#info").attr("style", "display:none");
    $.ajax({
        dataType: 'json',
        url: "http://158.101.116.78:8080/api/Reservation/" + idItem,
        type: 'GET',
        success: function (response) {            
            var item = response;
                $('#id').val(item.id),
                $("#startDate").val(item.startDate),
                $("#devolutionDate").val(item.devolutionDate),
                $("#client").val(item.client.name)
                $("#quadbike").val(item.quadbike.name)
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function getClients(){
    $('#client').empty().append('<option>Select an option</option>'); 
    $.ajax({
        dataType: 'json',
        url: "http://158.101.116.78:8080/api/Client/all",
        type: "GET",
        success: function (response) {            
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
    $('#quadbike').empty().append('<option>Select an option</option>'); 
    $.ajax({
        dataType: 'json',
        url: "http://158.101.116.78:8080/api/Quadbike/all",
        type: "GET",
        success: function (response) {            
            var misItems = response;            
            for (let i = 0; i < misItems.length; i++) {
                $("#quadbike").append("<option value="+misItems[i].id+">"+misItems[i].name+"</option>");                
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function postReservationData() {
    var elemento = {        
        startDate: $("#startDate").val(),        
        devolutionDate: $("#devolutionDate").val(),        
        client: {idClient: $("#client").val()},
        quadbike: {id: $("#quadbike").val()}
    }

    $.ajax({
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(elemento),
        url: "http://158.101.116.78:8080/api/Reservation/save",
        type: "POST",
        success: function (response) {
            alert("Creación exitosa!");
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function editReservationData(){
    var elemento = {
        idReservation: $("#id").val(),
        startDate: $("#startDate").val(),
        devolutionDate: $("#devolutionDate").val(),
        devolutionDate: $("#client").val(),
        devolutionDate: $("#quadbike").val(),
        status: "created",
    }
    var dataToSend = JSON.stringify(elemento);
    $.ajax({
        contentType: "application/json; charset=utf-8",   
        data: dataToSend,
        url: "http://158.101.116.78:8080/api/Reservation/update",
        type: "PUT",
         success: function (response) {
            alert("Edición exitosa!");
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function deleteReservationData(idElemento) {
    $.ajax({
      contentType: "application/json; charset=utf-8",          
        url: "http://158.101.116.78:8080/api/Reservation/" + idElemento,
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



