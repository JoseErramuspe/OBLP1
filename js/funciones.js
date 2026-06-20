let sist=new Sistema();
let numero=0;
let ordenAlfabeticoInf=true;
let ordenAlfabeticoArt=true;

window.addEventListener("load", inicio)

function inicio(){
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
    sist.ordenarTablaInf(ordenAlfabeticoInf);
    for (let influencer of sist.listaInfluencers){
        let fila=tabla.insertRow();
        let celda1=fila.insertCell();
        celda1.innerHTML=influencer.nombre;
        let celda2=fila.insertCell();
        celda2.innerHTML=influencer.mail;
        let celda3=fila.insertCell();
        celda3.innerHTML=influencer.comision;
        let celda4=fila.insertCell();
        celda4.innerHTML=calcularComision(influencer);
        let celda5=fila.insertCell();
        //Acá va una función que calcule qué etiquetas le corresponden al influencer
        let celda6=fila.insertCell();
        celda6.innerHTML="<input type='button' id='idBoton" + influencer.nombre +"' value:'Ventas'";
        //Falta agregar un addEventListener para que cada botón llame a la función con su respectivo influencer como parámetro
        //No sé si se hace poniendo un addEventListener dentro del for o de otra manera
    }
}

function cambiarOrdenInf(){
    if(ordenAlfabeticoInf){
        ordenAlfabeticoInf=false;
    }
    else{
        ordenAlfabeticoInf=true;
    }
    cargarTablaInf();
}


function cancelarInfluencer(){
    document.getElementById("idNombre").value="";
    document.getElementById("idMail").value="";
    document.getElementById("idComision").value="";
}

function calcularComision(influCalc) {
    let comision = 0;
    for (let venta of sist.listaVentas) {
        if (venta.influencer == influCalc) {
            comision += ((venta.articulo.precio)*venta.cantidad)*(venta.influencer.comision/100);
        }
    }
    return comision;
}

function botonVentas(influencer){
    let ventasInfluencer="Ventas: \n";
    for (let venta of sist.listaVentas) {
        if (venta.influencer == influencer) {
            ventasInfluencer+=venta+"\n";
        }
    }
    if (ventasInfluencer=="Ventas: \n"){
        ventasInfluencer+="Sin datos"
    }
    alert(ventasInfluencer);
}
