const URL_SERVER = "http://184.73.248.64:3000/";

document.addEventListener('DOMContentLoaded', ()=>{
    sesionIniciada();
    document.getElementById("nombre").addEventListener("blur", validarNombre);
    document.getElementById("apellidos").addEventListener("blur", validarApellidos);
    document.getElementById("dni").addEventListener("blur", validarDNI);
    document.getElementById("email").addEventListener("blur", validarEmail);
    document.getElementById("telefono").addEventListener("blur", validarTelefono);
    document.getElementById("password").addEventListener("input", validarPassword);
    document.getElementById("submit").addEventListener("click", validarFormulario);
    document.getElementById('cerrarSesion').addEventListener("click", cerrarSesion);
    document.getElementById('tema').addEventListener('click', cambiarTema);
}, {once: true});

function validarNombre(){
    let nombre = document.getElementById("nombre");
    const errorNombre = document.getElementById("error_nombre");
    nombre.required = true;
    if(nombre.value.length <= 3){
        /* let inputNombre = document.querySelector('input=[name="nombre]');  
        let span = document.createElement('span');
        inputNombre.after(span);
        span.id = "error_nombre"; */
        nombre.classList.add("invalid");
        errorNombre.innerText = "El nombre debe tener más de 3 caracteres"
        return false;
    }
    let nombreTransformado = nombre.value.charAt(0).toUpperCase() + nombre.value.substring(1, nombre.value.length).toLowerCase();
    nombre.value = nombreTransformado;
    nombre.classList.remove("invalid");
    errorNombre.innerText = "";
    return true;
}

function validarApellidos(){
    let apellidos = document.getElementById("apellidos");
    let errorApellidos = document.getElementById("error_apellidos");
    apellidos.required = true;
    if(apellidos.value.length <= 3){
        apellidos.classList.add("invalid");
        errorApellidos.innerText = "Los apellidos debe tener mas de 3 caracteres";
        return false;
    }

    let arrayApellidos = apellidos.value.split(" ");
    let apellidosMayus = arrayApellidos.map(item=>{
        return item.charAt(0).toUpperCase() + item.substring(1).toLowerCase();
    });
    apellidos.value = apellidosMayus.join(" ");
    apellidos.classList.remove("invalid");
    errorApellidos.innerText = "";
    return true;
}

function validarDNI(){
    let dni = document.getElementById("dni");
    let errorDNI = document.getElementById("error_dni");
    dni.required = true;
    const regex = /[0-9]{8}[A-Z]$/;
    if(dni.value.length === 9 && regex.test(dni.value)){
        let letrasDNI =  ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];
        let numerosDNI = dni.value.substring(0, 8);
        let indexLetra = parseInt(numerosDNI) % 23;
        
        if(letrasDNI[indexLetra] !== dni.value[8]){
            dni.classList.add("invalid");
            errorDNI.innerText = "La letra del DNI no es valida";
            return false;
        }else{
            dni.classList.remove("invalid");
            errorDNI.innerText = "";
            return true; 
        }
    }else{
        dni.classList.add("invalid");
        errorDNI.innerText = "El formato del DNI es invalida";
        return false;
    }
}

function validarPassword(){
    let password = document.getElementById("password");
    let errorPassword = document.getElementById("error_password"); 
    password.required = true;
    const patron = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if(!patron.test(password.value)){
        if(password.value.length < 8){
            errorPassword.innerText = "La contraseña debe tener al menos 8 caracteres";
        }else if(!/\d/.test(password.value)){
            errorPassword.innerText = "La contraseña tiene que tener al menos un numero";
        }else if(!/[a-z]/.test(password.value)){
            errorPassword.innerText = "la contraseña debe tener al menos una letra minuscula";
        }else if(!/[A-Z]/.test(password.value)){
            errorPassword.innerText = "la contraseña debe tener al menos una letra mayuscula";
        }else{
            errorPassword.innerText = "El formato de la contraseña no es valido";
        }
        password.classList.add("invalid");
        return false;
    }else{
        password.classList.remove("invalid");
        errorPassword.innerText = "";
        return true;
    }
}

function validarEmail(){
    let email = document.getElementById('email');
    let errorEmail = document.getElementById('error_email');
    const patron = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    email.required = true;
    if(!patron.test(email.value)){
        errorEmail.innerText = "El formato del email es invalido";
        email.classList.add('invalid');
        return false;
    }else{
        email.classList.remove('invalid');
        errorEmail.innerText = "";
        return true;
    }
}

function validarTelefono(){
    let telefono = document.getElementById('telefono');
    let errorTelefono = document.getElementById('error_telefono');
    const patron = /^((6|7)[0-9]{8})$/gi;
    if(!patron.test(telefono.value)){
        errorTelefono.innerText = "El formato del telefono es incorrecto";
        telefono.classList.add('invalid');
        return false;
    }else{
        errorTelefono.innerText = "";
        telefono.classList.remove('invalid');
        return true;
    }
}

function validarFormulario(e){
    e.preventDefault();
    if(!validarNombre()){
        document.getElementById('error_nombre').innerText = "No se ha podido completar el registro, revisa el campo nombre";
        document.getElementById('nombre').focus();
    }
    else if(!validarApellidos()){
        document.getElementById('error_apellidos').innerText = "No se ha podido completar el registro, revisa el campo apellidos";
        document.getElementById('apellidos').focus();
    }
    else if(!validarDNI()){
        document.getElementById('error_dni').innerText = "No se ha podido completar el registro, revisa el campo DNI";
        document.getElementById('dni').focus();
    }
    else if(!validarEmail()){
        document.getElementById('error_email').innerText = "No se ha podido completar el registro, revisa el campo email";
        document.getElementById('email').focus();
    }
    else if(!validarTelefono()){
        document.getElementById('error_telefono').innerText = "No se ha podido completar el registro, revisa el campo telefono";
        document.getElementById('telefono').focus();
    }
    else if(!validarPassword()){
        document.getElementById('error_password').innerText = "No se ha podido completar el registro, revisa el campo de contraseña";
        document.getElementById('password').focus();
    }
    else{
        console.log("hola usuario");
        newAccount(e);
    }
}

function newAccount(e){
    e.preventDefault();
    const formulario = document.getElementById("registrar");
    if(formulario){
        const user = {
            "nombre": formulario.nombre.value,
            "apellidos": formulario.apellidos.value,
            "dni": formulario.dni.value,
            "email": formulario.email.value,
            "telefono": formulario.telefono.value,
            "password": formulario.password.value
        };
        const options ={
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        };
        fetch(`${URL_SERVER}usuarios/`, options)
            .then(response=> {
                if(response.ok) {
                    return response.json();
                }else {throw new Error(`${response.status}`);}
            })
            .then(user=>{
                localStorage.setItem("email", JSON.stringify(user.email));
                localStorage.setItem("nombre", JSON.stringify(user.nombre));
                localStorage.setItem("idUsuario", JSON.stringify(user.id));
                sesionIniciada();
                limpiarCampos();
            })
            .catch(error=> {
                document.querySelector('form').innerHTML = (`<p>Error ${error.message}</p>`);
            })
    }else{
        console.log("no se puede registrar");
    }
}

function limpiarCampos(){
    const form = document.querySelectorAll('form input:not([type="submit"])');
    form.forEach(item=>item.value="");
}

function sesionIniciada(){
    const emailLS = JSON.parse(localStorage.getItem("email"));
    const nombreLS = JSON.parse(localStorage.getItem("nombre"));
    const temaLS = JSON.parse(localStorage.getItem("tema"));

    let divUsuario = document.querySelector('#sesionIniciada');
    if(emailLS){
        divUsuario.innerText = nombreLS.charAt(0).toUpperCase();
        divUsuario.classList.toggle('oculto');
        document.getElementById('cerrarSesion').classList.toggle('oculto');
    }
}

function cerrarSesion(){ 
    localStorage.removeItem("email");
    localStorage.removeItem("nombre");
    localStorage.removeItem("idUsuario");
   
    document.getElementById('sesionIniciada').classList.toggle('oculto');
    document.getElementById('cerrarSesion').classList.toggle('oculto');
}

function cambiarTema(){
    /* const tema = document.getElementById('tema'); */
    const articles = document.querySelectorAll('article');
    const body = document.querySelector('body');
    if(body.classList.contains('tema')){
        body.classList.remove('tema');
        articles.forEach(article=>article.classList.remove('tema'));
        localStorage.removeItem("tema");
    }else{
        body.classList.add('tema');
        articles.forEach(article=>article.classList.add('tema'));
        localStorage.setItem("tema", JSON.stringify("oscuro"));
    }
}
/* function comprobarEmail(){
    console.log("hay mas usuarios???");
    const form = document.getElementById('registrar');
    let errorEmail = document.getElementById('error_email');
    let email =  form.email.value;
    console.log(email);
    fetch(`${URL_SERVER}users/?email=${email}`)
        .then(response => {
            if(response.ok){
                return response.json();
            }else {throw new Error(`Error en la solicitud ${response.status} ${response.statusText}`);}
        })
        .then(users=> {
            console.log(users);
            if(users.length > 0){
                errorEmail.innerText = `Este correo esta asociado a una cuenta`;
                return false;
            }else{
                return true;
            }
        })
        .catch(error=>{
            document.body.innerHTML += `<p>Error ${error.message}</p>`;
        })
} */