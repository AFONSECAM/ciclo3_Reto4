$().ready(getCategoryData);
//  FUNCIONES PARA LAS CATEGORÍAS
function getCategoryData() {
    $("#info").removeAttr("style");
    hideForm();
    $.ajax({
        dataType: 'json',
        url: "http://158.101.116.78:8080/api/Category/all",
        type: "GET",
        success: function (response) {
            console.log(response)
            if(response.length==0){
                $("#allItems").append("<tr><td colspan='3' class='text-center'>No se encontraron registros!</td></tr>");
            }  
            var misItems = response;
            for (let i = 0; i < misItems.length; i++) {                
                $("#allItems").append("<tr>");
                $("#allItems").append("<td>" + misItems[i].name + "</td>");
                $("#allItems").append("<td>" + misItems[i].description + "</td>");
                if(misItems[i].quadbikes.length == 0){
                    $("#allItems").append("<td>Sin quadbikes</td>");
                }                                  
                for(let j = 0; j < misItems[i].quadbikes.length; j++){
                    $("#allItems").append("<li>" + misItems[i].quadbikes[j].name + "</li>");                
                }                                
                $("#allItems").append('<td><button class="btn" onclick="deleteCategoryData(' + misItems[i].id + ')">Borrar</button>');
                $("#allItems").append('<td><button class="btn" onclick="getCategoryDataById(' + misItems[i].id + ')">Editar</button>');
                $("#allItems").append("</tr>");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function getCategoryDataById(idItem) {
    $("#formPost").removeAttr("style");
    $("#btnEditar").removeAttr("style");
    $("#info").attr("style", "display:none");
    $.ajax({
        dataType: 'json',
        url: "http://158.101.116.78:8080/api/Category/" + idItem,
        type: 'GET',
        success: function (response) {
            console.log(response);
            var item = response; 
                $("#id").val(item.id),                               
                $("#name").val(item.name),
                $("#description").val(item.description)             
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }

    });
}

function postCategoryData() {
    var elemento = {        
        name: $("#name").val(),
        description: $("#description").val(),        
    }
    $.ajax({        
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(elemento),
        url: "http://158.101.116.78:8080/api/Category/save",
        type: "POST",
        success: function (response) {
            console.log(response.textStatus);
            alert("Creación exitosa!");
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function editCategoryData() {
    var elemento = {     
        id: $("#id").val(),             
        name: $("#name").val(),
        description: $("#description").val()                 
    }    
    var dataToSend = JSON.stringify(elemento);
    $.ajax({
        contentType: "application/json; charset=utf-8",
        data: dataToSend,
        url: "http://158.101.116.78:8080/api/Category/update",
        type: "PUT",
        success: function (response) {
            alert("Edición exitosa!");
            location.reload();
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function deleteCategoryData(idElemento) {
    $.ajax({
        contentType: "application/json; charset=utf-8",        
        url: "http://158.101.116.78:8080/api/Category/"+ idElemento,
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



