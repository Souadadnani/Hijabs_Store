const URL_SERVER = "http://184.73.248.64:3000/";

document.addEventListener('DOMContentLoaded', ()=>{
    sesionIniciada();
    getAllHijabs();
    document.getElementById('buscar').addEventListener("input", buscar);
    document.getElementById('cerrarSesion').addEventListener("click", cerrarSesion);
    document.getElementById('tema').addEventListener('click', cambiarTema);
    document.getElementById('select_ordenar').addEventListener('change', ordenarHijabs);
});

function mostrarHijabs(hijabs){
    let section = document.querySelector('section');
    hijabs.forEach(element => {
        let article = document.createElement('article');
        article.id = element.id;

        let div = document.createElement('div');

        let img = document.createElement('img');
        img.src = element.url;

        let p = document.createElement('p');
        p.innerText = element.descripcion;

        let btnEliminar = document.createElement('input');
        btnEliminar.type = 'submit';
        btnEliminar.value = 'Eliminar';
        btnEliminar.addEventListener('click', eliminarHijab);
        
        div.append(img);
        article.append(div, p, btnEliminar);
        section.append(article);        
    });
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

function getAllHijabs(){
    fetch(`${URL_SERVER}hijabs`)
        .then(response=>{
            if(response.ok){
                return response.json();
            }else{throw new Error(`Error en la solicitud ${response.status} ${response.statusText}`);}
        })
        .then(hijabs=>{
            shuffle(hijabs);
            mostrarHijabs(hijabs);
        })
        .catch(error=>{
            console.error(error);
        })
}

function buscar(){
    let inputValue = document.getElementById('buscar').value;
    const containerHijabs = document.getElementById('articulos');
    while(containerHijabs.firstChild){
        containerHijabs.removeChild(containerHijabs.firstChild);
    }
    fetch(`${URL_SERVER}hijabs`)
        .then(response=>{
            if(response.ok){
                return response.json();
            }else{throw new Error(`Error en la solicitud ${response.status} ${response.statusText}`);}
        })
        .then(hijabsServer=>{
            const hijabsFiltrados = hijabsServer.filter(item=>item.descripcion.toLowerCase().includes(inputValue.toLowerCase()));
            /* document.getElementById('articulos').innerHTML = ""; */
            mostrarHijabs(hijabsFiltrados);                    
        })
        .catch(error=>{
            console.error(error);
        })
}

function eliminarHijab(e){
    const idHijab = e.target.parentElement.id;
    console.log(idHijab);
    const containerHijabs = document.getElementById('articulos');
    while(containerHijabs.firstChild){
        containerHijabs.removeChild(containerHijabs.firstChild);
    }
    fetch(`${URL_SERVER}hijabs/${idHijab}`, {method: 'DELETE'})
        .then(response=>{
            if(response.ok){
                return response.json();
            }else {throw new Error(`${response.status} ${response.statusText}`);}
        })
        .then(hijab=>{    
            getAllHijabs();
        })
        .catch(error=>{
            console.error(error);
        })
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

function ordenarHijabs(){
    fetch(`${URL_SERVER}hijabs`)
        .then(response=>{
            if(response.ok){
                return response.json();
            }else{throw new Error(`Error en la solicitud ${response.status} ${response.statusText}`);}
        })
        .then(hijabs=>{
            ordenarHijabsbyDate(hijabs);
            mostrarHijabs(hijabs);
        })
        .catch(error=>{
            console.error(error);
        })
}

function ordenarHijabsbyDate(hijabs){
    let ordenar = document.getElementById('select_ordenar').value;
    const containerHijabs = document.getElementById('articulos');
    while(containerHijabs.firstChild){
        containerHijabs.removeChild(containerHijabs.firstChild);
    }
    if(ordenar === "Más recientes"){
        const hijabsOrdenados = hijabs.sort((a, b)=>new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
        console.log(hijabsOrdenados);
        return hijabsOrdenados;
    }else if(ordenar === "Más antiguos"){
        const hijabsOrdenados = hijabs.sort((a, b)=>new Date(a.fechaCreacion) - new Date(b.fechaCreacion));
        console.log(hijabsOrdenados);
        return hijabsOrdenados;
    }
}

