export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input) 
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo nombre no puede estar vacio",
    },
    email: {
        valueMissing: "Este campo Email no puede estar vacio",
        typeMismatch: "El correo no es valido",
    },
    password: {
        valueMissing: "Este campo Password no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres maximo 12 debe contener una letra minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales.",
    },
    nacimiento: {
        valueMissing: "Este campo fecha no puede estar vacio",
        customError: "Debes ser mayor de edad para rellenar este formulario",
    },
    numero: {
        valueMissing: "El campo de telefono no puede estar vacio",
        patternMismatch: "El formato requerido es xxxxxxxxxx 10 numeros"
    },
    direccion: {
        valueMissing: "El campo de direccion no puede estar vacio",
        patternMismatch: "El formato debe contener entre 6 a 50 caracteres"
    },
    ciudad: {
        valueMissing: "El campo de ciudad no puede estar vacio",
        patternMismatch: "El formato debe contener entre 6 a 50 caracteres"
    },
    estado: {
        valueMissing: "El campo de estado no puede estar vacio",
        patternMismatch: "El formato debe contener entre 6 a 50 caracteres"
    },
};
//se arma un objeto para poder simplificar el archivo y asi las modificaciones sean para todos los input
const validadores = {
    nacimiento: (input) => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje= "";
    tipoDeErrores.forEach((error) => {
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

//con esta funcion nos ayuda a poder obtener el valor que el usuario esta ingresando desdde el input
function validarNacimiento(input){
    //para poder acceder a el valor de el input de nacimeinto se realiza esta funcion, el date es para poder crear una nueva instancia
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes ser mayor de edad para rellenar este formulario";
    }

    input.setCustomValidity(mensaje);
}

//verificacion de fecha para poder saber si es mayor de edad o no
// al realizar la validacion se utiliza el metodo de sumarle 18 al año de nacimiento ya que asi si esta es menor al año actual nps entrega un booleano true y si es menor un false que nos indica que esta persona es menor de edad.
function mayorDeEdad(fecha){
    const fechaActual = new Date();
    //los getUTC nos ayudan a acceder a la fecha 
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}