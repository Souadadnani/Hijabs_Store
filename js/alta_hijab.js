const URL_SERVER = "http://184.73.248.64:3000/";

document.addEventListener('DOMContentLoaded', ()=>{
    sesionIniciada();
    document.getElementById('btnAlta').addEventListener('click', altaHijab);
    document.getElementById('cerrarSesion').addEventListener("click", cerrarSesion);
    document.getElementById('tema').addEventListener('click', cambiarTema);
});


function altaHijab(e){
    e.preventDefault();
    const formAltaHijab = document.getElementById('formAlta');
    const idUsuario = JSON.parse(localStorage.getItem('idUsuario'));
    const fechaCreacion = new Date();
    if(formAltaHijab){
        const hijab = {
            "descripcion": formAltaHijab.descripcion.value,
            "tamaño": formAltaHijab.hijabSize.value,
            "color": formAltaHijab.color.value,
            "material": formAltaHijab.material.value,
            "cantidad": formAltaHijab.cantidad.value,
            "url": formAltaHijab.url.value,
            "fechaCreacion": fechaCreacion.toISOString(),
            "Usuario": idUsuario
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hijab)
        }

        fetch(`${URL_SERVER}hijabs`, options)
            .then(response=>{
                if(response.ok){
                    return response.json();
                }else{throw new Error(`Error en la solicitud ${response.status} ${response.statusText}`);}
            })
            .then(hijab=>{
                console.log(hijab);
                document.querySelectorAll('form input:not([type="submit"], [name="rectangular"], [name="cuadrado"])').forEach(element => element.value = "");
            })
            .catch(error=>{
                console.error(error);
            })
    }
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

