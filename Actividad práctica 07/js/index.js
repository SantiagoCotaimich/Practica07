let turnos = [];
const clientes = ['Santiago', 'Matías', 'Cotaimich'];

function cargarTurno() {
    const $id = document.getElementById("id");
    const $fecha = document.getElementById("fecha");
    const $hora = document.getElementById("hora");
    const $cliente = document.getElementById("cliente");

    let cod = parseInt($id.value);
    let fh = $fecha.value;
    let hr = $hora.value;
    let cl = $cliente.value;

    if (isNaN(cod) || fh === '' || hr === '' || cl === '') {
        alert('Debe completar todos los campos requeridos');
        return;
    }

    const existeCod = turnos.some(turno => turno.id === cod);
    if (existeCod) {
        alert('Código ya asignado a otro turno');
        return;
    }

    const nuevoTurno = {
        id: cod, 
        fecha: fh,
        hora: hr,
        cliente: cl
    };

    turnos.push(nuevoTurno);
    mostrarTurnosCargados();
    mostrarTurnosPorCliente();
    alert('Turno cargado con éxito');
}


function mostrarTurnosCargados() {
    const $tbody = document.querySelector('#total-turnos tbody');
    $tbody.innerHTML = '';

    turnos.forEach(turno => {
        const tr = document.createElement('tr');
        const tdCliente = document.createElement('td');
        const tdCodigo = document.createElement('td');
        const tdFecha = document.createElement('td');
        const tdHora = document.createElement('td');

        tdCliente.textContent = turno.cliente;
        tdCodigo.textContent = turno.id;
        tdFecha.textContent = turno.fecha;
        tdHora.textContent = turno.hora;

        tr.appendChild(tdCliente);
        tr.appendChild(tdCodigo);
        tr.appendChild(tdFecha);
        tr.appendChild(tdHora);
        $tbody.appendChild(tr);
    });
}

function mostrarTurnosPorCliente() {
    const contadorTurnos = {};

    turnos.forEach(turno => {
        contadorTurnos[turno.cliente] = (contadorTurnos[turno.cliente] || 0) + 1;
    });

    const $tbodyClientes = document.querySelector('#total-turnos-cliente tbody');
    $tbodyClientes.innerHTML = '';

    for (const cliente in contadorTurnos) {
        const tr = document.createElement('tr');
        const tdCliente = document.createElement('td');
        const tdCantidad = document.createElement('td');

        tdCliente.textContent = cliente;
        tdCantidad.textContent = contadorTurnos[cliente];

        tr.appendChild(tdCliente);
        tr.appendChild(tdCantidad);
        $tbodyClientes.appendChild(tr);
    }
}


function inicializarTurnos() {
    turnos = [
        { id: 1, fecha: '2024-10-01', hora: '09:00', cliente: 'Santiago' },
        { id: 2, fecha: '2024-10-26', hora: '11:00', cliente: 'Matías' }
    ];
    mostrarTurnosCargados();
    mostrarTurnosPorCliente();
}

const $clienteSelect = document.getElementById("cliente");
clientes.forEach(cliente => {
    const option = document.createElement("option");
    option.value = cliente;
    option.textContent = cliente;
    $clienteSelect.appendChild(option);
});

function mostrarSeccion(id) {
    const sections = document.querySelectorAll('section');
    sections.forEach(seccion => {
        seccion.style.display = 'none';
    });

    const seccionSeleccionada = document.getElementById(id);
    seccionSeleccionada.style.display = 'block';
}


window.onload = inicializarTurnos;


