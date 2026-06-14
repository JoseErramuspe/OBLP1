window.addEventListener("load", inicio)

function inicio(){
    let sist=new Sistema();
    let numero=0;
    let ordenAlfabetico=true;
    document.getElementById("botonAltaInf").addEventListener("click", );
    document.getElementById("botonCanInf").addEventListener("click", cancelarInfluencer);
    document.getElementById("botonAgrInf").addEventListener("click", agregarInfluencer);
    document.getElementById("botonListInf").addEventListener("click", cambiarOrdenInf);
    document.getElementById("botonAltaArt").addEventListener("click", );
    document.getElementById("botonCanArt").addEventListener("click", );
    document.getElementById("botonAgrArt").addEventListener("click", );
    document.getElementById("botonListArt").addEventListener("click", );
    document.getElementById("botonAltaVen").addEventListener("click", );
    document.getElementById("botonCanVen").addEventListener("click", );
    document.getElementById("botonAgrVen").addEventListener("click", );
}

function agregarInfluencer(){
    if (document.getElementById("formInfluencer").reportValidity()){
        let nombre=document.getElementById("idNombre").value;
        let mail=document.getElementById("idMail").value;
        let comision=document.getElementById("idComision").value;
        let nuevoInf=new Influencer(nombre, mail, comision);
        sist.listaInfluencers.push(nuevoInf);
        cargarTablaInf();
        cancelarInfluencer();
    }
}

function cargarTablaInf(){
    let tabla=document.getElementById("tablaInf");
    tabla.innerHTML="";
    sist.ordenarTablaInf(ordenAlfabetico);
    for (let influencer of sist.listaInfluencers){
        let fila=tabla.insertRow();
        let celda1=fila.insertCell();
        celda1.innerHTML=influencer.nombre;
        let celda2=fila.insertCell();
        celda2.innerHTML=influencer.mail;
        let celda3=fila.insertCell();
        celda3.innerHTML=influencer.comision;
        let celda4=fila.insertCell();
        celda4.innerHTML=influencer.comision*ventas/100;
        //ventas no es una variable definida, hay que cambiarlo
        let celda5=fila.insertCell();
        //Acá va una función que calcule qué etiquetas le corresponden al influencer
        let celda6=fila.insertCell();
        //Acá va un botón con las ventas del influencer
    }
}

function cambiarOrdenInf(){
    if(ordenAlfabetico){
        ordenAlfabetico=false;
    }
    else{
        ordenAlfabetico=true;
    }
    cargarTablaInf();
}


function cancelarInfluencer(){
    document.getElementById("idNombre").value="";
    document.getElementById("idMail").value="";
    document.getElementById("idComision").value="";
}
