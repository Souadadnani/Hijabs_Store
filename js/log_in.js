const URL_SERVER = "http://184.73.248.64:3000/";

document.addEventListener('DOMContentLoaded', ()=>{
    sesionIniciada();
    document.getElementById("submit").addEventListener("click", logIn);
    document.getElementById('cerrarSesion').addEventListener("click", cerrarSesion);
    document.getElementById('tema').addEventListener('click', cambiarTema);
}, {once:true});

function logIn(e){
    e.preventDefault();
    const form = document.getElementById('iniciar_sesion');
    const mensaje = document.createElement("span");

    const user ={
        "email": form.email.value,
        "password": form.password.value
    };
  
    fetch(`${URL_SERVER}usuarios/?email=${user.email}`)
        .then(response => {
            if(response.ok){
                return response.json();
            }else {throw new Error(`Error en la solicitud ${response.status} ${response.statusText}`);}
        })
        .then(users=> {
            console.log(users);
            if(users.length === 1){            
                const user = users[0];
                if(user.password === form.password.value){
                    localStorage.setItem("email", JSON.stringify(user.email));
                    localStorage.setItem("nombre", JSON.stringify(user.nombre));
                    localStorage.setItem("idUsuario", JSON.stringify(user.id));
                    sesionIniciada();     
                    limpiarCampos();              
                }else{
                    mensaje.innerText = `La contraseña es incorrecta.`;
                    document.querySelector('form> p').after(mensaje);
                }

            }else {
                mensaje.innerText = `Esta cuenta no exite. Registrate para poder acceder`;
                document.querySelector('form> p').after(mensaje); 
            }
        })
        .catch(error=>{
            document.querySelector('form').innerHTML = (`<p>Error ${error.message}</p>`);
        })
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
        document.getElementById("altaHijab").classList.toggle('oculto');
    }
}

function cerrarSesion(){ 
    localStorage.removeItem("email");
    localStorage.removeItem("nombre");
    localStorage.removeItem("idUsuario");
   
    document.getElementById('sesionIniciada').classList.toggle('oculto');
    document.getElementById('cerrarSesion').classList.toggle('oculto');
    document.getElementById("altaHijab").classList.toggle('oculto');
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