"use strict"
const inputNombre = document.querySelector("#inputNombre");
const inputApellido = document.querySelector("#inputApellido");
const inputEdad = document.querySelector("#inputEdad");

const divClientes = document.querySelector("#divClientes");

const arrayClientes = [];

const botonGuardar = document.querySelector("#botonGuardar");

let indiceEditando = -1;

botonGuardar.addEventListener("click", guardarCliente);


function guardarCliente(){

const nombreCliente = inputNombre.value;
const apellidoCliente = inputApellido.value;
const edadCliente = inputEdad.value;

if(nombreCliente.length === 0){
    alert("El nombre es obligatorio");
    return;
}
if(apellidoCliente.length === 0){
    alert("El apellido es obligatorio");
    return;
}
if(edadCliente.length === 0){
    alert("La edad es obligatoria");
    return;
}

const ObjetoCliente = {
    nombre: nombreCliente,
    apellido: apellidoCliente,
    edad: edadCliente
}
if (indiceEditando !== -1) {
    arrayClientes[indiceEditando] = ObjetoCliente;
    indiceEditando = -1;
} else {
    arrayClientes.push(ObjetoCliente);
}

mostrarArrayClientes();

restablecer();
}

function mostrarArrayClientes(){
    divClientes.innerHTML = "";
    for(let i = 0; i < arrayClientes.length; i++){
        const ObjetoCliente = arrayClientes[i];
        
        divClientes.innerHTML +=
        "<p>" +
        ObjetoCliente.nombre +
        " - " +
        ObjetoCliente.apellido +
        " - " +
        ObjetoCliente.edad +
        " años <button class='botonesEditar' data-indice='" +
        i +
        "'>Editar</button> <button class='botonesEliminar' data-indice='" +
        i +
        "'>Eliminar</button></p>";
    }
    
    const botonesEliminar = document.querySelectorAll(".botonesEliminar");
    
    for(let i = 0; i < botonesEliminar.length; i++){
        
        const botonesFor = botonesEliminar[i]
        
        botonesFor.addEventListener("click", eliminarCliente);//si algun dia hacen click ejecuta la funcion
    }

    const botonesEditar = document.querySelectorAll(".botonesEditar");
    
    for(let i = 0; i < botonesEditar.length; i++){
        
        const botonesFor = botonesEditar[i]
        
        botonesFor.addEventListener("click", editarCliente);
        
        
    }
    
};
function editarCliente(objetoQueCreaElEvento){
    const indiceQueDaElEvento = objetoQueCreaElEvento.target.dataset.indice;
    const ObjetoCliente = arrayClientes[indiceQueDaElEvento]; //aca agarra el objeto de arrayClientes con el indice de la vuelta for del data set
    inputNombre.value = ObjetoCliente.nombre; // y aca se los pone a los inputs
    inputApellido.value = ObjetoCliente.apellido;
    inputEdad.value = ObjetoCliente.edad;
    
    indiceEditando = indiceQueDaElEvento;
    botonGuardar.textContent = "Actualizar";
};


function eliminarCliente(objetoQueCreaElEvento){
    
    const indiceQueDaElEvento = objetoQueCreaElEvento.target.dataset.indice;
    
    arrayClientes.splice(indiceQueDaElEvento,1);

    mostrarArrayClientes();
};

function restablecer(){
    inputNombre.value = "";
    inputApellido.value = "";
    inputEdad.value = "";
    
    inputNombre.focus();
    botonGuardar.textContent = "Guardar";
}
