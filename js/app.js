'use strict';
//Variables
const btnEnviar = document.querySelector('#enviar');
const inputEmail = document.querySelector('#email');
const inputAsunto = document.querySelector('#asunto');
const inputMensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('#enviar-mail');
const btnReset = document.querySelector('#resetBtn');

//Expreciones regulares en Js para validar formularios (https://emailregex.com/)
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


eventListener();
//Event listeners
function eventListener() {
    //Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);
    //Campos del formulario
    inputEmail.addEventListener('blur', validarContenidoFormulario);
    inputAsunto.addEventListener('blur', validarContenidoFormulario);
    inputMensaje.addEventListener('blur', validarContenidoFormulario);
    btnReset.addEventListener('click', resetearFormulario);
    formulario.addEventListener('submit', enviarFormulario);
}

//Funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('curso-not-allowed', 'opacity-50');
}

function validarContenidoFormulario(e) {
    validarCamposVacios(e);
    validarCampoEmail(e);
    validacionSuccessful();
}

function mostrarError(mensaje) {
    const imprimirError = document.createElement('p');
    imprimirError.textContent = mensaje;
    imprimirError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');
    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        formulario.appendChild(imprimirError);
    }
}

function validarCamposVacios(e){
    if (e.target.value.length > 0) {
        const errorDelate = document.querySelector('p.error');
        if (errorDelate) {
            errorDelate.remove();
        }
        e.target.classList.remove('border','border-red-500');
        e.target.classList.add('border', 'border-green-500');
    }
    else {
        e.target.classList.remove('border','border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }
}

function validarCampoEmail(e){
    if(e.target.type === 'email'){
        if(er.test(e.target.value)){
            const errorDelate = document.querySelector('p.error');
            if (errorDelate) {
                errorDelate.remove();
            }
            e.target.classList.remove('border','border-red-500');
            e.target.classList.add('border', 'border-green-500');
        }else {
            e.target.classList.remove('border','border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no valido');
        }
    }
}

function validacionSuccessful(){
    if(er.test(inputEmail.value) && inputAsunto.value !== '' && inputMensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('curso-not-allowed', 'opacity-50');
        console.log('Pasaste validacion');
    }else{
        console.log('No la pasaste');
    }
}

function enviarFormulario(e) {
    e.preventDefault();

    //Mostrar spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';
    
    // Después de 3 segundos ocultar el spinner y mostrar el mensaje
    setTimeout(()=>{
        spinner.style.display = 'none';
        const confirmationMessage = document.createElement('p');
        confirmationMessage.textContent ='El mensaje se envio correctamente';
        confirmationMessage.classList.add('border', 'bg-green-500', 'text-white', 'p-3', 'my-5', 'text-center', 'font-bold');
        //Insertar mensaje de confirmacion antes del spinner
        formulario.insertBefore(confirmationMessage, spinner);
        setTimeout(() => {
            confirmationMessage.remove();
            formulario.reset();
        }, 2000);
    }, 3000);
}

//FUncion para resetear formulario
function resetearFormulario(e){
    e.preventDefault();
    formulario.reset();
    iniciarApp();
}