let urlConexion = "http://129.151.107.164:8070/api";
//let urlConexion = "http://localhost:8070/api";
let moduloCategory = "/Category";
let moduloRoom = "/Room";
let moduloClient = "/Client";
let moduloMessage = "/Message";
let moduloReservation = "/Reservation";
let opcionGetAll = "/all";
let opcionSave = "/save";
let opcionUpdate = "/update";
let mail_format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Consultar datos de API
function consultarCategorias() {
    $.ajax({
        url: urlConexion + moduloCategory + opcionGetAll,
        type: 'GET',
        dataType: 'json',
        error: crearLista("Category", []),
        success: function (json) {
            crearLista("Category", json);
        }
    });
}

function consultarHabitaciones() {
    $.ajax({
        url: urlConexion + moduloRoom + opcionGetAll,
        type: 'GET',
        dataType: 'json',
        error: crearLista("Room", []),
        success: function (json) {
            crearLista("Room", json);
        }
    });
}

function consultarClientes() {
    $.ajax({
        url: urlConexion + moduloClient + opcionGetAll,
        type: 'GET',
        dataType: 'json',
        error: crearLista("Client", []),
        success: function (json) {
            crearLista("Client", json);
        }
    });
}

function consultarMensajes() {
    $.ajax({
        url: urlConexion + moduloMessage + opcionGetAll,
        type: 'GET',
        dataType: 'json',
        error: crearLista("Messages", []),
        success: function (json) {
            crearLista("Messages", json);
        }
    });
}

function consultarReservas() {
    $.ajax({
        url: urlConexion + moduloReservation + opcionGetAll,
        type: 'GET',
        dataType: 'json',
        error: crearLista("Reservation", []),
        success: function (json) {
            crearLista("Reservation", json);
        }
    });
}

function crearLista(panel, registros) {
    $("#pnlLista" + panel).empty();
    let tblRegistros = "<table id='tblRegistros' width='100%' border='1'>";
    if (typeof registros === 'undefined' || (typeof registros != 'undefined' && registros.length === 0)) {
        tblRegistros += "<tr>";
        tblRegistros += "<td colspan='5'><center><strong>No existen registros.</strong></center></td>";
        tblRegistros += "</tr>";
    } else {
        tblRegistros += crearHeaders(panel);
        tblRegistros += crearDatos(panel, registros);
    }
    tblRegistros += "</table>";
    $("#pnlLista" + panel).append(tblRegistros);
    $(':input').val('');
    $('#btnActualizar').attr('style', 'display: none !important');
    validarUsuario();
}

function crearHeaders(tabla) {
    let headers = "<tr>";
    if (tabla === "Category") {
        headers += "<td width='34%'><strong>Nombre</strong></td>";
        headers += "<td width='33%'><strong>Descripción</strong></td>";
        headers += "<td width='33%'><strong>Acciones</strong></td>";
    } else if (tabla === "Room") {
        headers += "<td width='16%'><strong>Nombre</strong></td>";
        headers += "<td width='16%'><strong>Hotel</strong></td>";
        headers += "<td width='16%'><strong>Estrellas</strong></td>";
        headers += "<td width='16%'><strong>Descripción</strong></td>";
        headers += "<td width='16%'><strong>Categoría</strong></td>";
        headers += "<td width='20%'><strong>Acciones</strong></td>";
    } else if (tabla === "Client") {
        headers += "<td width='20%'><strong>E-mail</strong></td>";
        headers += "<td width='20%'><strong>Contraseña</strong></td>";
        headers += "<td width='20%'><strong>Nombre</strong></td>";
        headers += "<td width='20%'><strong>Edad</strong></td>";
        headers += "<td width='20%'><strong>Acciones</strong></td>";
    } else if (tabla === "Messages") {
        headers += "<td width='25%'><strong>Mensaje</strong></td>";
        headers += "<td width='25%'><strong>Cliente</strong></td>";
        headers += "<td width='25%'><strong>Habitación</strong></td>";
        headers += "<td width='25%'><strong>Acciones</strong></td>";
    } else if (tabla === "Reservation") {
        headers += "<td width='20%'><strong>Fecha inicio</strong></td>";
        headers += "<td width='20%'><strong>Fecha devolución</strong></td>";
        headers += "<td width='20%'><strong>Cliente</strong></td>";
        headers += "<td width='20%'><strong>Habitación</strong></td>";
        headers += "<td width='20%'><strong>Acciones</strong></td>";
    }
    headers += "</tr>";
    return headers;
}

function crearDatos(tabla, datos) {
    let headers = "";
    if (tabla === "Category") {
        for (i = 0; i < datos.length; i++) {
            headers += "<tr>"
            headers += "<td>" + datos[i].name + "</td>";
            headers += "<td>" + datos[i].description + "</td>";
            headers += "<td><center><button class='btn btn-sm rounded-0 btn-primary' onclick='editarCategoria(" + datos[i].id + ");'>Editar</button>";
            headers += "<button class='btn btn-sm rounded-0 btn-danger' onclick='borrarCategoria(" + datos[i].id + ");'>Borrar</button></center></td>";
            headers += "</tr>";
        }
    } else if (tabla === "Room") {
        for (i = 0; i < datos.length; i++) {
            headers += "<tr>"
            headers += "<td>" + datos[i].name + "</td>";
            headers += "<td>" + datos[i].hotel + "</td>";
            headers += "<td>" + datos[i].stars + "</td>";
            headers += "<td>" + datos[i].description + "</td>";
            if (datos[i].category != null) {
                headers += "<td>" + datos[i].category.name + "</td>";
            } else {
                headers += "<td><em>Sin Definir</em></td>";
            }
            headers += "<td><center><button class='btn btn-sm rounded-0 btn-primary' onclick='editarHabitacion(" + datos[i].id + ");'>Editar</button>";
            headers += "<button class='btn btn-sm rounded-0 btn-danger' onclick='borrarHabitacion(" + datos[i].id + ");'>Borrar</button></center></td>";
            headers += "</tr>";
        }
    } else if (tabla === "Client") {
        for (i = 0; i < datos.length; i++) {
            headers += "<tr>"
            headers += "<td>" + datos[i].email + "</td>";
            headers += "<td>" + datos[i].password + "</td>";
            headers += "<td>" + datos[i].name + "</td>";
            headers += "<td>" + datos[i].age + "</td>";
            headers += "<td><center><button class='btn btn-sm rounded-0 btn-primary' onclick='editarCliente(" + datos[i].idClient + ");'>Editar</button>";
            headers += "<button class='btn btn-sm rounded-0 btn-danger' onclick='borrarCliente(" + datos[i].idClient + ");'>Borrar</button></center></td>";
            headers += "</tr>";
        }
    } else if (tabla === "Messages") {
        for (i = 0; i < datos.length; i++) {
            headers += "<tr>"
            headers += "<td>" + datos[i].messageText + "</td>";
            if (datos[i].client != null) {
                headers += "<td>" + datos[i].client.name + "</td>";
            } else {
                headers += "<td><em>Sin Definir</em></td>";
            }
            if (datos[i].room != null) {
                headers += "<td>" + datos[i].room.name + "</td>";
            } else {
                headers += "<td><em>Sin Definir</em></td>";
            }
            headers += "<td><center><button class='btn btn-sm rounded-0 btn-primary' onclick='editarMensaje(" + datos[i].idMessage + ");'>Editar</button>";
            headers += "<button class='btn btn-sm rounded-0 btn-danger' onclick='borrarMensaje(" + datos[i].idMessage + ");'>Borrar</button></center></td>";
            headers += "</tr>";
        }
    } else if (tabla === "Reservation") {
        for (i = 0; i < datos.length; i++) {
            headers += "<tr>"
            headers += "<td>" + datos[i].startDate + "</td>";
            headers += "<td>" + datos[i].devolutionDate + "</td>";
            if (datos[i].client != null) {
                headers += "<td>" + datos[i].client.name + "</td>";
            } else {
                headers += "<td><em>Sin Definir</em></td>";
            }
            if (datos[i].room != null) {
                headers += "<td>" + datos[i].room.name + "</td>";
            } else {
                headers += "<td><em>Sin Definir</em></td>";
            }
            headers += "<td><center><button class='btn btn-sm rounded-0 btn-primary' onclick='editarReserva(" + datos[i].idReservation + ");'>Editar</button>";
            headers += "<button class='btn btn-sm rounded-0 btn-danger' onclick='borrarReserva(" + datos[i].idReservation + ");'>Borrar</button></center></td>";
            headers += "</tr>";
        }
    }
    return headers;
}

// Consultar listas desplegables con datos de API
function consultarCategoriasLista() {
    $.ajax({
        url: urlConexion + moduloCategory + opcionGetAll,
        type: 'GET',
        dataType: 'json',
        error: crearLista2("Category", []),
        success: function (json) {
            crearLista2("Category", json);
        }
    });
}

function consultarClientesLista() {
    $.ajax({
        url: urlConexion + moduloClient + opcionGetAll,
        type: 'GET',
        dataType: 'json',
        error: crearLista2("Client", []),
        success: function (json) {
            crearLista2("Client", json);
        }
    });
}

function consultarHabitacionesLista() {
    $.ajax({
        url: urlConexion + moduloRoom + opcionGetAll,
        type: 'GET',
        dataType: 'json',
        error: crearLista2("Room", []),
        success: function (json) {
            crearLista2("Room", json);
        }
    });
}

function crearLista2(panel, registros) {
    $("#pnlSel" + panel).empty();
    let tblRegistros = "<select class='form-control rounded-0 border-top-0 border-right-0 border-left-0' id='sel" + panel + "' name='sel" + panel + "' >";
    tblRegistros += crearItemInicial(panel);
    if (typeof registros != 'undefined' && registros.length != 0) {
        tblRegistros += crearDatosLista(panel, registros);
    }
    tblRegistros += "</select>";
    $("#pnlSel" + panel).append(tblRegistros);
}

function crearItemInicial(tabla) {
    let headers = "";
    if (tabla === "Category") {
        headers += "<option value=''>Categoria...</option>";
    } else if (tabla === "Client") {
        headers += "<option value=''>Cliente...</option>";
    } else if (tabla === "Room") {
        headers += "<option value=''>Habitación...</option>";
    }
    return headers;
}

function crearDatosLista(tabla, datos) {
    let headers = "";
    if (tabla === "Category" || tabla === "Room") {
        for (i = 0; i < datos.length; i++) {
            headers += "<option value=" + datos[i].id + ">" + datos[i].name + "</option>";
        }
    } else if (tabla === "Client") {
        for (i = 0; i < datos.length; i++) {
            headers += "<option value=" + datos[i].idClient + ">" + datos[i].name + "</option>";
        }
    }
    return headers;
}

// Guardar datos en API
function agregarCategoria() {
    event.preventDefault();
    if ($("#txtName").val() === "") {
        alert('Ingrese el Nombre de la Categoría.');
        $("#txtName").focus();
    } else if ($("#txtDescription").val() === "") {
        alert('Ingrese la Descripción de la Categoría.');
        $("#txtDescription").focus();
    } else {
        registrarNuevo("Category");
    }
}

function agregarHabitacion() {
    event.preventDefault();
    if ($("#txtName").val() === "") {
        alert('Ingrese el Nombre de la Habitación.');
        $("#txtName").focus();
    } else if ($("#txtStars").val() === "") {
        alert('Ingrese las Estrellas de la Habitación.');
        $("#txtStars").focus();
    } else if ($("#selCategory").val() === "") {
        alert('Indique la categoría de la Habitación.');
        $("#selCategory").focus();
    } else if ($("#txtHotel").val() === "") {
        alert('Ingrese el Hotel de la Habitación.');
        $("#txtHotel").focus();
    } else if ($("#txtDescription").val() === "") {
        alert('Ingrese la Descripción de la Habitación.');
        $("#txtDescription").focus();
    } else {
        registrarNuevo("Room");
    }
}

function agregarCliente() {
    event.preventDefault();
    if ($("#txtName").val() === "") {
        alert('Ingrese el nombre del Cliente.');
        $("#txtName").focus();
    } else if ($("#txtEmail").val() === "") {
        alert('Ingrese el e-mail del Cliente.');
        $("#txtEmail").focus();
    } else if (!mail_format.test(($("#txtEmail").val()))) {
        alert('Ingrese un E-mail de Cliente válido');
        $("#txtEmail").focus();
    } else if ($("#txtPassword").val() === "") {
        alert('Ingrese la contrasña del Cliente.');
        $("#txtPassword").focus();
    } else if ($("#txtAge").val() === "") {
        alert('Ingrese la edad del Cliente.');
        $("#txtAge").focus();
    } else {
        registrarNuevo("Client");
    }
}

function agregarMensaje() {
    event.preventDefault();
    if ($("#txtMessageText").val() === "") {
        alert('Ingrese el texto del Mensaje.');
        $("#txtMessageText").focus();
    } else if ($("#selClient").val() === "") {
        alert('Indique el cliente del Mensaje.');
        $("#selClient").focus();
    } else if ($("#selRoom").val() === "") {
        alert('Indique la habitación del Mensaje.');
        $("#selRoom").focus();
    } else {
        registrarNuevo("Message");
    }
}

function agregarReserva() {
    event.preventDefault();
    if ($("#txtStartDate").val() === "") {
        alert('Ingrese la fecha de inicio de la Reserva.');
        $("#txtStartDate").focus();
    } else if ($("#txtDevolutionDate").val() === "") {
        alert('Ingrese la fecha de devolución de la Reserva.');
        $("#txtDevolutionDate").focus();
    } else if ($("#selClient").val() === "") {
        alert('Indique el cliente de la Reserva.');
        $("#selClient").focus();
    } else if ($("#selRoom").val() === "") {
        alert('Indique la habitación de la Reserva.');
        $("#selRoom").focus();
    } else {
        registrarNuevo("Reservation");
    }
}

function registrarNuevo(modulo) {
    event.preventDefault();
    if (modulo === "Category") {
        $.ajax({
            url: urlConexion + moduloCategory + opcionSave,
            data: JSON.stringify({
                "name": $("#txtName").val(),
                "description": $("#txtDescription").val()
            }),
            type: 'POST',
            contentType: 'application/json',
            dataType: 'text',
            error: function (result) {
                alert('Error: Ver log para detalles.');
                console.log(result);
            },
            success: function () {
                alert('Categoría Agregada.');
                consultarCategorias();
            }
        });
    } else if (modulo === "Room") {
        $.ajax({
            url: urlConexion + moduloRoom + opcionSave,
            data: JSON.stringify({
                "name": $("#txtName").val(),
                "stars": $("#txtStars").val(),
                "category": { "id": $("#selCategory").val() },
                "hotel": $("#txtHotel").val(),
                "description": $("#txtDescription").val()
            }),
            type: 'POST',
            contentType: 'application/json',
            dataType: 'text',
            error: function (result) {
                alert('Error: Ver log para detalles.');
                console.log(result);
            },
            success: function () {
                alert('Habitación Agregada.');
                consultarHabitaciones();
            }
        });
    } else if (modulo === "Client") {
        $.ajax({
            url: urlConexion + moduloClient + opcionSave,
            data: JSON.stringify({
                "name": $("#txtName").val(),
                "email": $("#txtEmail").val(),
                "password": $("#txtPassword").val(),
                "age": $("#txtAge").val()
            }),
            type: 'POST',
            contentType: 'application/json',
            dataType: 'text',
            error: function (result) {
                alert('Error: Ver log para detalles.');
                console.log(result);
            },
            success: function () {
                alert('Cliente Agregado.');
                consultarClientes();
            }
        });
    } else if (modulo === "Message") {
        $.ajax({
            url: urlConexion + moduloMessage + opcionSave,
            data: JSON.stringify({
                "messageText": $("#txtMessageText").val(),
                "client": { "idClient": $("#selClient").val() },
                "room": { "id": $("#selRoom").val() }
            }),
            type: 'POST',
            contentType: 'application/json',
            dataType: 'text',
            error: function (result) {
                alert('Error: Ver log para detalles.');
                console.log(result);
            },
            success: function () {
                alert('Mensaje Agregado.');
                consultarMensajes();
            }
        });
    } else if (modulo === "Reservation") {
        $.ajax({
            url: urlConexion + moduloReservation + opcionSave,
            data: JSON.stringify({
                "startDate": $("#txtStartDate").val(),
                "devolutionDate": $("#txtDevolutionDate").val(),
                "client": { "idClient": $("#selClient").val() },
                "room": { "id": $("#selRoom").val() }
            }),
            type: 'POST',
            contentType: 'application/json',
            dataType: 'text',
            error: function (result) {
                alert('Error: Ver log para detalles.');
                console.log(result);
            },
            success: function () {
                alert('Reserva Agregada.');
                consultarReservas();
            }
        });
    }
}

// Borrar datos en API
function borrarCategoria(codigo) {
    borrarRegistro("Category", codigo);
}

function borrarCliente(codigo) {
    borrarRegistro("Client", codigo);
}

function borrarMensaje(codigo) {
    borrarRegistro("Message", codigo);
}

function borrarReserva(codigo) {
    borrarRegistro("Reservation", codigo);
}

function borrarHabitacion(codigo) {
    borrarRegistro("Room", codigo);
}

function borrarRegistro(modulo, id) {
    event.preventDefault();
    if (modulo === "Category") {
        $.ajax({
            url: urlConexion + moduloCategory + "/" + id,
            type: 'DELETE',
            contentType: 'application/json',
            dataType: 'text',
            error: function (result) {
                alert('Error: Ver log para detalles.');
                console.log(result);
            },
            success: function () {
                alert('Categoría Eliminada.');
                consultarCategorias();
            }
        });
    } else if (modulo === "Client") {
        $.ajax({
            url: urlConexion + moduloClient + "/" + id,
            type: 'DELETE',
            contentType: 'application/json',
            dataType: 'text',
            error: function (result) {
                alert('Error: Ver log para detalles.');
                console.log(result);
            },
            success: function () {
                alert('Cliente Eliminado.');
                consultarClientes();
            }
        });
    } else if (modulo === "Message") {
        $.ajax({
            url: urlConexion + moduloMessage + "/" + id,
            type: 'DELETE',
            contentType: 'application/json',
            dataType: 'text',
            error: function (result) {
                alert('Error: Ver log para detalles.');
                console.log(result);
            },
            success: function () {
                alert('Mensaje Eliminado.');
                consultarMensajes();
            }
        });
    } else if (modulo === "Reservation") {
        $.ajax({
            url: urlConexion + moduloReservation + "/" + id,
            type: 'DELETE',
            contentType: 'application/json',
            dataType: 'text',
            error: function (result) {
                alert('Error: Ver log para detalles.');
                console.log(result);
            },
            success: function () {
                alert('Reserva Eliminada.');
                consultarReservas();
            }
        });
    } else if (modulo === "Room") {
        $.ajax({
            url: urlConexion + moduloRoom + "/" + id,
            type: 'DELETE',
            contentType: 'application/json',
            dataType: 'text',
            error: function (result) {
                alert('Error: Ver log para detalles.');
                console.log(result);
            },
            success: function () {
                alert('Habitación Eliminada.');
                consultarHabitaciones()();
            }
        });
    }
}

// Cargar Registro desde API para edición
function editarCategoria(id) {
    $.ajax({
        url: urlConexion + moduloCategory + "/" + id,
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            $('#btnAgregar').attr('style', 'display: none !important');
            $('#btnActualizar').attr('style', 'display: block !important');
            $('#btnActualizar').attr('onclick', 'actualizarCategoria(' + json.id + ')');
            $('#txtName').val(json.name);
            $('#txtDescription').val(json.description);
        }
    });
}

function editarHabitacion(id) {
    $.ajax({
        url: urlConexion + moduloRoom + "/" + id,
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            $('#btnAgregar').attr('style', 'display: none !important');
            $('#btnActualizar').attr('style', 'display: block !important');
            $('#btnActualizar').attr('onclick', 'actualizarHabitacion(' + json.id + ')');
            $('#txtName').val(json.name);
            $('#txtStars').val(json.stars);
            $('#selCategory').val(json.category.id);
            $('#txtHotel').val(json.hotel);
            $('#txtDescription').val(json.description);
        }
    });
}

function editarCliente(id) {
    $.ajax({
        url: urlConexion + moduloClient + "/" + id,
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            $('#btnAgregar').attr('style', 'display: none !important');
            $('#btnActualizar').attr('style', 'display: block !important');
            $('#btnActualizar').attr('onclick', 'actualizarCliente(' + json.idClient + ')');
            $('#txtName').val(json.name);
            $('#txtEmail').val(json.email);
            $('#txtPassword').val(json.password);
            $('#txtAge').val(json.age);
        }
    });
}

function editarMensaje(id) {
    $.ajax({
        url: urlConexion + moduloMessage + "/" + id,
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            $('#btnAgregar').attr('style', 'display: none !important');
            $('#btnActualizar').attr('style', 'display: block !important');
            $('#btnActualizar').attr('onclick', 'actualizarMensaje(' + json.idMessage + ')');
            $('#txtMessageText').val(json.messageText);
            $('#selClient').val(json.client.idClient);
            $('#selRoom').val(json.room.id);
        }
    });
}

function editarReserva(id) {
    $.ajax({
        url: urlConexion + moduloReservation + "/" + id,
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            $('#btnAgregar').attr('style', 'display: none !important');
            $('#btnActualizar').attr('style', 'display: block !important');
            $('#btnActualizar').attr('onclick', 'actualizarReserva(' + json.idReservation + ')');
            $('#txtStartDate').val(json.startDate.split('T')[0]);
            $('#txtDevolutionDate').val(json.devolutionDate.split('T')[0]);
            $('#selClient').val(json.client.idClient);
            $('#selRoom').val(json.room.id);
        }
    });
}

// Actualizar registro en API
function actualizarCategoria(id) {
    event.preventDefault();
    if ($("#txtName").val() === "") {
        alert('Ingrese el Nombre de la Categoría.');
        $("#txtName").focus();
    } else if ($("#txtDescription").val() === "") {
        alert('Ingrese la Descripción de la Categoría.');
        $("#txtDescription").focus();
    } else {
        actualizarRegistro("Category", id);
    }
}

function actualizarHabitacion(id) {
    event.preventDefault();
    if ($("#txtName").val() === "") {
        alert('Ingrese el Nombre de la Habitación.');
        $("#txtName").focus();
    } else if ($("#txtStars").val() === "") {
        alert('Ingrese las Estrellas de la Habitación.');
        $("#txtStars").focus();
    } else if ($("#selCategory").val() === "") {
        alert('Indique la categoría de la Habitación.');
        $("#selCategory").focus();
    } else if ($("#txtHotel").val() === "") {
        alert('Ingrese el Hotel de la Habitación.');
        $("#txtHotel").focus();
    } else if ($("#txtDescription").val() === "") {
        alert('Ingrese la Descripción de la Habitación.');
        $("#txtDescription").focus();
    } else {
        actualizarRegistro("Room", id);
    }
}

function actualizarCliente(id) {
    event.preventDefault();
    if ($("#txtName").val() === "") {
        alert('Ingrese el nombre del Cliente.');
        $("#txtName").focus();
    } else if ($("#txtEmail").val() === "") {
        alert('Ingrese el e-mail del Cliente.');
        $("#txtEmail").focus();
    } else if (!mail_format.test(($("#txtEmail").val()))) {
        alert('Ingrese un E-mail de Cliente válido');
        $("#txtEmail").focus();
    } else if ($("#txtPassword").val() === "") {
        alert('Ingrese la contrasña del Cliente.');
        $("#txtPassword").focus();
    } else if ($("#txtAge").val() === "") {
        alert('Ingrese la edad del Cliente.');
        $("#txtAge").focus();
    } else {
        actualizarRegistro("Client", id);
    }
}

function actualizarMensaje(id) {
    event.preventDefault();
    if ($("#txtMessageText").val() === "") {
        alert('Ingrese el texto del Mensaje.');
        $("#txtMessageText").focus();
    } else if ($("#selClient").val() === "") {
        alert('Indique el cliente del Mensaje.');
        $("#selClient").focus();
    } else if ($("#selRoom").val() === "") {
        alert('Indique la habitación del Mensaje.');
        $("#selRoom").focus();
    } else {
        actualizarRegistro("Message", id);
    }
}

function actualizarReserva(id) {
    event.preventDefault();
    if ($("#txtStartDate").val() === "") {
        alert('Ingrese la fecha de inicio de la Reserva.');
        $("#txtStartDate").focus();
    } else if ($("#txtDevolutionDate").val() === "") {
        alert('Ingrese la fecha de devolución de la Reserva.');
        $("#txtDevolutionDate").focus();
    } else if ($("#selClient").val() === "") {
        alert('Indique el cliente de la Reserva.');
        $("#selClient").focus();
    } else if ($("#selRoom").val() === "") {
        alert('Indique la habitación de la Reserva.');
        $("#selRoom").focus();
    } else {
        actualizarRegistro("Reservation", id);
    }
}

function actualizarRegistro(modulo, id) {
    event.preventDefault();
    if (modulo === "Category") {
        $.ajax({
            url: urlConexion + moduloCategory + opcionUpdate,
            data: JSON.stringify({
                "id": id,
                "name": $("#txtName").val(),
                "description": $("#txtDescription").val()
            }),
            type: 'PUT',
            contentType: 'application/json',
            dataType: 'text',
            error: function (result) {
                alert('Error: Ver log para detalles.');
                console.log(result);
            },
            success: function () {
                alert('Categoría Actualizada.');
                consultarCategorias();
            }
        });
    } else if (modulo === "Room") {
        $.ajax({
            url: urlConexion + moduloRoom + opcionUpdate,
            data: JSON.stringify({
                "id": id,
                "name": $("#txtName").val(),
                "stars": $("#txtStars").val(),
                "category": { "id": $("#selCategory").val() },
                "hotel": $("#txtHotel").val(),
                "description": $("#txtDescription").val()
            }),
            type: 'PUT',
            contentType: 'application/json',
            dataType: 'text',
            error: function (result) {
                alert('Error: Ver log para detalles.');
                console.log(result);
            },
            success: function () {
                alert('Habitación Actualizada.');
                consultarHabitaciones();
            }
        });
    } else if (modulo === "Client") {
        $.ajax({
            url: urlConexion + moduloClient + opcionUpdate,
            data: JSON.stringify({
                "idClient": id,
                "name": $("#txtName").val(),
                "email": $("#txtEmail").val(),
                "password": $("#txtPassword").val(),
                "age": $("#txtAge").val()
            }),
            type: 'PUT',
            contentType: 'application/json',
            dataType: 'text',
            error: function (result) {
                alert('Error: Ver log para detalles.');
                console.log(result);
            },
            success: function () {
                alert('Cliente Actualizado.');
                consultarClientes();
            }
        });
    } else if (modulo === "Message") {
        $.ajax({
            url: urlConexion + moduloMessage + opcionUpdate,
            data: JSON.stringify({
                "idMessage": id,
                "messageText": $("#txtMessageText").val(),
                "client": { "idClient": $("#selClient").val() },
                "room": { "id": $("#selRoom").val() }
            }),
            type: 'PUT',
            contentType: 'application/json',
            dataType: 'text',
            error: function (result) {
                alert('Error: Ver log para detalles.');
                console.log(result);
            },
            success: function () {
                alert('Mensaje Actualizado.');
                consultarMensajes();
            }
        });
    } else if (modulo === "Reservation") {
        $.ajax({
            url: urlConexion + moduloReservation + opcionUpdate,
            data: JSON.stringify({
                "idReservation": id,
                "startDate": $("#txtStartDate").val(),
                "devolutionDate": $("#txtDevolutionDate").val(),
                "client": { "idClient": $("#selClient").val() },
                "room": { "id": $("#selRoom").val() }
            }),
            type: 'PUT',
            contentType: 'application/json',
            dataType: 'text',
            error: function (result) {
                alert('Error: Ver log para detalles.');
                console.log(result);
            },
            success: function () {
                alert('Reserva Actualizada.');
                consultarReservas();
            }
        });
    }
    $('#btnAgregar').attr('style', 'display: block !important');
    $('#btnActualizar').attr('style', 'display: none !important');
}

// Cargar información de usuario autenticado en GitHub
function validarUsuario() {
    $.get("/user", function (data) {
        $("#user").html(data.name);
        $(".unauthenticated").hide()
        $(".authenticated").show()
    });
}

// Reportes
function generarReporte(idReporte) {
    event.preventDefault();
    let urlReporte = "";
    if (idReporte === 1) {
        if ($("#txtStartDate").val() === "") {
            alert('Ingrese la fecha inicial del reporte.');
            $("#txtStartDate").focus();
        } else if ($("#txtEndDate").val() === "") {
            alert('Ingrese la fecha final del reporte.');
            $("#txtEndDate").focus();
        } else {
            urlReporte = "/report-dates/" + $("#txtStartDate").val() + "/" + $("#txtEndDate").val()
        }
    }
    else if (idReporte === 2) {
        urlReporte = "/report-status";
    } else if (idReporte === 3) {
        urlReporte = "/report-clients";
    }
    if (urlReporte != "") {
        $.ajax({
            url: urlConexion + moduloReservation + urlReporte,
            type: 'GET',
            dataType: 'json',
            error: crearListaReporte(idReporte, []),
            success: function (json) {
                crearListaReporte(idReporte, json);
            }
        });
    }
}

function crearListaReporte(panel, registros) {
    $("#pnlReporte" + panel).empty();
    let tblRegistros = "<table id='tblRegistros' width='100%' border='1'>";
    if (typeof registros === 'undefined' || (typeof registros != 'undefined' && registros.length === 0)) {
        tblRegistros += "<tr>";
        tblRegistros += "<td colspan='5'><center><strong>No existen registros para este reporte.</strong></center></td>";
        tblRegistros += "</tr>";
    } else {
        tblRegistros += crearHeadersReporte(panel);
        tblRegistros += crearDatosReporte(panel, registros);
    }
    tblRegistros += "</table>";
    $("#pnlReporte" + panel).append(tblRegistros);
    validarUsuario();
}

function crearHeadersReporte(tabla) {
    let headers = "<tr>";
    if (tabla === 1) {
        headers += "<td width='25%'><strong>Fecha inicio</strong></td>";
        headers += "<td width='25%'><strong>Fecha devolución</strong></td>";
        headers += "<td width='25%'><strong>Cliente</strong></td>";
        headers += "<td width='25%'><strong>Habitación</strong></td>";
    } else if (tabla === 2) {
        headers += "<td width='50%'><strong>Estado</strong></td>";
        headers += "<td width='50%'><strong>Número Reservas</strong></td>";
    } else if (tabla === 3) {
        headers += "<td rowspan='2' width='12.5%'><strong>Total</strong></td>";
        headers += "<td colspan='4'><center><strong>Cliente</strong></center></td>";
        headers += "<td colspan='4'><center><strong>Reserva</strong></center></td>";
        headers += "</tr>";
        headers += "<tr>";
        headers += "<td width='12.5%'><strong>E-mail</strong></td>";
        headers += "<td width='12.5%'><strong>Contraseña</strong></td>";
        headers += "<td width='12.5%'><strong>Nombre</strong></td>";
        headers += "<td width='12.5%'><strong>Edad</strong></td>";
        headers += "<td width='12.5%'><strong>Fecha inicio</strong></td>";
        headers += "<td width='12.5%'><strong>Fecha devolución</strong></td>";
        headers += "<td width='12.5%'><strong>Habitación</strong></td>";
    }
    headers += "</tr>";
    return headers;
}

function crearDatosReporte(tabla, datos) {
    let headers = "";
    if (tabla === 1) {
        for (i = 0; i < datos.length; i++) {
            headers += "<tr>"
            headers += "<td>" + datos[i].startDate + "</td>";
            headers += "<td>" + datos[i].devolutionDate + "</td>";
            if (datos[i].client != null) {
                headers += "<td>" + datos[i].client.name + "</td>";
            } else {
                headers += "<td><em>Sin Definir</em></td>";
            }
            if (datos[i].room != null) {
                headers += "<td>" + datos[i].room.name + "</td>";
            } else {
                headers += "<td><em>Sin Definir</em></td>";
            }
            headers += "</tr>";
        }
    } else if (tabla === 2) {
        headers += "<tr>";
        headers += "<td>Completados</td>";
        headers += "<td>" + datos["completed"] + "</td>";
        headers += "</tr><tr>";
        headers += "<td>Cancelados</td>";
        headers += "<td>" + datos["cancelled"] + "</td>";
        headers += "</tr>";
    } else if (tabla === 3) {
        for (i = 0; i < datos.length; i++) {
            headers += "<tr>"
            headers += "<td rowspan='" + datos[i].total + "'>" + datos[i].total + "</td>";
            headers += "<td  rowspan='" + datos[i].total + "'>" + datos[i].client.email + "</td>";
            headers += "<td  rowspan='" + datos[i].total + "'>" + datos[i].client.password + "</td>";
            headers += "<td  rowspan='" + datos[i].total + "'>" + datos[i].client.name + "</td>";
            headers += "<td  rowspan='" + datos[i].total + "'>" + datos[i].client.age + "</td>";
            for (i2 = 0; i2 < datos[i].client.reservations.length; i2++) {
                headers += "<td>" + datos[i].client.reservations[i2].startDate + "</td>";
                headers += "<td>" + datos[i].client.reservations[i2].devolutionDate + "</td>";
                if (datos[i].client.reservations[i2].room != null) {
                    headers += "<td>" + datos[i].client.reservations[i2].room.name + "</td>";
                } else {
                    headers += "<td><em>Sin Definir</em></td>";
                }
                headers += "</tr>"
            }
            headers += "</tr>";
        }
    }
    return headers;
}