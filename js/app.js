'use strict';
//Variables
const btnEnviar = document.querySelector('#enviar');
const inputEmail = document.querySelector('#email');
const inputAsunto = document.querySelector('#asunto');
const inputMensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('#enviar-mail');


eventListener();
//Event listeners
function eventListener() {
    //Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);
    //Campos del formulario
    inputEmail.addEventListener('blur', validarContenidoFormulario)
    inputAsunto.addEventListener('blur', validarContenidoFormulario)
    inputMensaje.addEventListener('blur', validarContenidoFormulario)
}

//Funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('curso-not-allowed', 'opacity-50');
}

function validarContenidoFormulario(e) {
    if (e.target.value.length > 0) {
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.add('border', 'border-red-500');
        mostrarError();
    }
}

function mostrarError() {
    const imprimirError = document.createElement('div');
    imprimirError.textContent = 'Todos los campos son obligatorios';
    imprimirError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');
    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        formulario.appendChild(imprimirError);
    }
}