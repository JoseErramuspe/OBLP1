let sist=new Sistema();
let numero=0;
let ordenAlfabeticoInf=true;
let ordenAlfabeticoArt=true;
let grafBurbujas = null;

window.addEventListener("load", inicio)

function inicio() {
    cargarGraficoBurbujas();
    document.getElementById("botonCanInf").addEventListener("click", cancelarInfluencer);
    document.getElementById("botonAgrInf").addEventListener("click", agregarInfluencer);
    document.getElementById("botonListInf").addEventListener("click", cambiarOrdenInf);
    document.getElementById("botonCanArt").addEventListener("click", cancelarArticulo);
    document.getElementById("botonAgrArt").addEventListener("click", agregarArticulo);
    document.getElementById("botonListArt").addEventListener("click", cambiarOrdenArt);
    document.getElementById("botonAltaVen").addEventListener("click", altaVenta);
    document.getElementById("botonCanVen").addEventListener("click", cancelarVenta);
    document.getElementById("botonAgrVen").addEventListener("click", agregarVenta);
}

function agregarInfluencer() {
    if (document.getElementById("formInfluencer").reportValidity()){
        let nombre=document.getElementById("idNombre").value;
        let mail=document.getElementById("idMail").value;
        let comision=document.getElementById("idComision").value;
        let nuevoInf=new Influencer(nombre, mail, comision);
        sist.listaInfluencers.push(nuevoInf);
        document.getElementById("idNombre").value="";
        document.getElementById("idMail").value="";
        document.getElementById("idComision").value="";
        cargarTablaInf();
        cargarSelectInf();
    }
}

function cancelarInfluencer() {
    document.getElementById("idNombre").value="";
    document.getElementById("idMail").value="";
    document.getElementById("idComision").value="";
    document.getElementById("dialogFormInfluencer").close();
}

function cambiarOrdenInf(){
    ordenAlfabeticoInf=!ordenAlfabeticoInf;
    cargarTablaInf();
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

function asignarEtiquetas(influAsign) {
    let topCom = false;
    let noVentas = false;
    let ventaMasCara = false;
    // Top comision
    let topComInflu = [];
    let topComVenta = 0;
    for (influencer of sist.listaInfluencers) {
        if (calcularComision(influencer) > topComVenta) {
            topComVenta = calcularComision(influencer);
            topComInflu = [];
            topComInflu.push(influencer);
        } else if (calcularComision(influencer) == topComVenta) {
            topComInflu.push(influencer);
        }
    }
    if (topComInflu.includes(influAsign)) {
        topCom = true;
    }
    // noVentas
    let ventasInflu = [];
    for (let venta of sist.listaVentas) {
        if (venta.influencer == influAsign) {
            ventasInflu.push(venta);
        }
    }
    if (ventasInflu.length == 0) {
        noVentas = true;
    }
    // ventaCara
    // La etiqueta de ventaCara anda mal, me está poniendo esa etiqueta en todos los influencers con ventas, no solo el que hizo la más cara
    let ventaCara = [];
    let ventaCaraPrecio = 0;
    for (let venta of sist.listaVentas) {
        if (venta.articulo.precio*venta.cantidad > ventaCaraPrecio) {
            ventaCaraPrecio = venta.articulo.precio*venta.cantidad;
            ventaCara = [];
            ventaCara.push(venta.influencer);
        } else if (venta.articulo.precio*venta.cantidad == ventaCaraPrecio) {
            ventaCara.push(venta.influencer);
        }
        console.log(ventaCara);
    }
    if (ventaCara.includes(influAsign)) {
        ventaMasCara = true;
    }
    let etiquetas = "";
    if (topCom && !noVentas) {
        etiquetas += "🔥 "
    }
    if (noVentas) {
        etiquetas += "🧊"
    }
    if (ventaMasCara && !noVentas) {
        etiquetas += "🟢"
    }
    return etiquetas;
}

function botonVentas(influencer) {
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

function cargarTablaInf() {
    sist.ordenarTablaInf(ordenAlfabeticoInf);
    let tabla=document.getElementById("tablaInf");
    tabla.innerHTML="";
    let headerRow = tabla.insertRow();
    let th1 = document.createElement("th");
    let botonOrden = document.createElement("input");
    botonOrden.type = "button";
    botonOrden.value = "Nombre ↑↓";
    botonOrden.id = "botonListInf";
    botonOrden.addEventListener("click", cambiarOrdenInf);
    th1.appendChild(botonOrden);
    headerRow.appendChild(th1);
    let th2 = document.createElement("th");
    th2.innerHTML = "Email";
    headerRow.appendChild(th2);
    let th3 = document.createElement("th");
    th3.innerHTML = "% Comisión";
    headerRow.appendChild(th3);
    let th4 = document.createElement("th");
    th4.innerHTML = "Total a cobrar";
    headerRow.appendChild(th4);
    let th5 = document.createElement("th");
    th5.innerHTML = "Etiquetas";
    headerRow.appendChild(th5);
    let th6 = document.createElement("th");
    th6.innerHTML = "Detalles";
    headerRow.appendChild(th6);
    for (let influencer of sist.listaInfluencers){
        let fila=tabla.insertRow();
        let celda1=fila.insertCell();
        celda1.innerHTML=influencer.nombre;
        let celda2=fila.insertCell();
        celda2.innerHTML=influencer.mail;
        let celda3=fila.insertCell();
        celda3.innerHTML=influencer.comision + "%";
        let celda4=fila.insertCell();
        celda4.innerHTML="$ " + calcularComision(influencer);
        let celda5=fila.insertCell();
        celda5.innerHTML=asignarEtiquetas(influencer);
        let celda6=fila.insertCell();
        let botonDetalles = document.createElement("input");
        botonDetalles.type = "button";
        botonDetalles.id = "ventasDetalleBoton" + influencer.nombre;
        botonDetalles.value = "Ventas"
        botonDetalles.addEventListener("click", () => botonVentas(influencer));
        celda6.appendChild(botonDetalles);
    }
}

function agregarArticulo() {
    if (document.getElementById("formArticulo").reportValidity()){
        let codigo=document.getElementById("idCodigo").value;
        let descripcion=document.getElementById("idDesc").value;
        let precio=document.getElementById("idPrecio").value;
        let nuevoArt=new Articulo(codigo, descripcion, precio);
        sist.listaArticulos.push(nuevoArt);
        document.getElementById("idCodigo").value="";
        document.getElementById("idDesc").value="";
        document.getElementById("idPrecio").value="";
        cargarTablaArt();
        cargarSelectArt();
    }
}

function cancelarArticulo() {
    document.getElementById("idCodigo").value="";
    document.getElementById("idDesc").value="";
    document.getElementById("idPrecio").value="";
    document.getElementById("dialogArticulo").close();
}

function cambiarOrdenArt() {
    ordenAlfabeticoArt=!ordenAlfabeticoArt;
    cargarTablaArt();
}

function artMasVendido(artAsign) {
    let masVendidos = [];
    let cantVentas = 0;
    for (let articulo of sist.listaArticulos) {
        if (sist.contarVentas(articulo) > cantVentas) {
            cantVentas = sist.contarVentas(articulo);
            masVendidos = [];
            masVendidos.push(articulo);
        } else if (sist.contarVentas(articulo) == cantVentas) {
            masVendidos.push(articulo);
        }
    }
    let etiquetas = "";
    if (masVendidos.includes(artAsign) && cantVentas!=0) {
        etiquetas += "⭐";
    }
    return etiquetas;
}

function cargarTablaArt() {
    sist.ordenarTablaArt(ordenAlfabeticoArt);
    let tabla=document.getElementById("tablaArt");
    tabla.innerHTML="";
    let headerRow = tabla.insertRow();
    let th1 = document.createElement("th");
    let botonOrden = document.createElement("input");
    botonOrden.type = "button";
    botonOrden.value = "Código ↑↓";
    botonOrden.id = "botonListArt";
    botonOrden.addEventListener("click", () => cambiarOrdenArt());
    th1.appendChild(botonOrden);
    headerRow.appendChild(th1);
    let th2 = document.createElement("th");
    th2.innerHTML = "Descripción";
    headerRow.appendChild(th2);
    let th3 = document.createElement("th");
    th3.innerHTML = "Precio";
    headerRow.appendChild(th3);
    for (let articulo of sist.listaArticulos){
        let fila=tabla.insertRow();
        let celda1=fila.insertCell();
        celda1.innerHTML=articulo.codigo + artMasVendido(articulo);
        let celda2=fila.insertCell();
        celda2.innerHTML=articulo.descripcion;
        let celda3=fila.insertCell();
        celda3.innerHTML="$ " + articulo.precio;
    }
}

function altaVenta() {
    if(sist.listaInfluencers.length==0){
        event.preventDefault();
        alert("No se pueden hacer ventas porque no hay influencers registrados");
    }
    else if(sist.listaArticulos.length==0){
        event.preventDefault();
        alert("No se pueden hacer ventas porque no hay artículos registrados");
    }
    else{
        document.getElementById("idNum").innerHTML = "Nro: " + (numero+1);
    }
}

function cancelarVenta() {
    document.getElementById("codigoVen").selectedIndex=0;
    document.getElementById("infVen").selectedIndex=0;
    document.getElementById("idCantidad").value="";
    document.getElementById("medioVen").selectedIndex=0;
    document.getElementById("dialogVenta").close();
}

function agregarVenta() {
    if (document.getElementById("formVenta").reportValidity()){
        numero++;
        let articulo=sist.listaArticulos[document.getElementById("codigoVen").selectedIndex];
        let influencer=sist.listaInfluencers[document.getElementById("infVen").selectedIndex];
        let cantidad=document.getElementById("idCantidad").value;
        let medio=document.getElementById("medioVen").value;
        let nuevaVen=new Venta(numero, articulo, influencer, cantidad, medio);
        sist.listaVentas.push(nuevaVen);
        document.getElementById("codigoVen").selectedIndex=0;
        document.getElementById("infVen").selectedIndex=0;
        document.getElementById("idCantidad").value="";
        document.getElementById("medioVen").selectedIndex=0;
        cargarTablaInf();
        cargarTablaArt();
        cargarTablaVen();
        altaVenta();
    }
}

function cargarSelectArt() {
    let lista=document.getElementById("codigoVen");
    lista.innerHTML="";
    let articulosSelect=sist.listaArticulos.toSorted(function(a,b){ return a.codigo.localeCompare(b.codigo) });
    for (let i=0; i<articulosSelect.length; i++){
        let nodo=document.createElement("option");
        nodo.innerHTML=articulosSelect[i].codigo;
        lista.appendChild(nodo);
    }
}

function cargarSelectInf() {
    let lista=document.getElementById("infVen");
    lista.innerHTML="";
    let influencersSelect=sist.listaInfluencers.toSorted(function(a,b){ return a.nombre.localeCompare(b.nombre) });
    for (let i=0; i<influencersSelect.length; i++){
        let nodo=document.createElement("option");
        nodo.innerHTML=influencersSelect[i].nombre;
        lista.appendChild(nodo);
    }
}

// Esta función me da errores, no pone los datos en la tabla y la consola da este error "Uncaught TypeError: Cannot read properties of undefined (reading "codigo)" en la línea 346 
function cargarTablaVen() {
    let tabla=document.getElementById("tablaVen");
    tabla.innerHTML="";
    let headerRow = tabla.insertRow();
    let th1 = document.createElement("th");
    th1.innerHTML="Nro Venta";
    headerRow.appendChild(th1);
    let th2 = document.createElement("th");
    th2.innerHTML = "Código de Artículo";
    headerRow.appendChild(th2);
    let th3 = document.createElement("th");
    th3.innerHTML = "Nombre de influencer";
    headerRow.appendChild(th3);
    let th4 = document.createElement("th");
    th4.innerHTML = "Cantidad";
    headerRow.appendChild(th4);
    let th5 = document.createElement("th");
    th5.innerHTML = "Medio";
    headerRow.appendChild(th5);
    let th6 = document.createElement("th");
    th6.innerHTML = "Acción";
    headerRow.appendChild(th6);
    for (let venta of sist.listaVentas){
        let fila=tabla.insertRow();
        let celda1=fila.insertCell();
        celda1.innerHTML=venta.numero;
        let celda2=fila.insertCell();
        celda2.innerHTML=venta.articulo.codigo;
        let celda3=fila.insertCell();
        celda3.innerHTML=venta.influencer.nombre;
        let celda4=fila.insertCell();
        celda4.innerHTML=venta.cantidad;
        let celda5=fila.insertCell();
        celda5.innerHTML=venta.medio;
        let celda6=fila.insertCell();
        let botonBorrar = document.createElement("input");
        botonBorrar.type = "button";
        botonBorrar.id = "botonBorrarVenta" + venta.numero;
        botonBorrar.value = "❌"
        botonBorrar.addEventListener("click", () => borrarVenta(venta));
        celda6.appendChild(botonBorrar);
    }
    grafBurbujas.destroy();
    cargarGraficoBurbujas();
}

function borrarVenta(venta) {
    let lugarABorrar=sist.listaVentas.indexOf(venta);
    sist.listaVentas.splice(lugarABorrar, 1);
    cargarTablaInf();
    cargarTablaArt();
    cargarTablaVen();
}

function cargarGraficoBurbujas() {
    let valorVentas = [0,0,0,0,0,0];
    for(let venta of sist.listaVentas) {
        let medio = venta.medio.split("-").pop();
        if(medio == "Instagram") {
            valorVentas[0] += parseInt(venta.articulo.precio)*parseInt(venta.cantidad);
        } else if (medio == "YouTube") {
            valorVentas[1] += parseInt(venta.articulo.precio)*parseInt(venta.cantidad);
        } else if (medio == "X") {
            valorVentas[2] += parseInt(venta.articulo.precio)*parseInt(venta.cantidad);
        } else if (medio == "TikTok") {
            valorVentas[3] += parseInt(venta.articulo.precio)*parseInt(venta.cantidad);
        } else if (medio == "Facebook") {
            valorVentas[4] += parseInt(venta.articulo.precio)*parseInt(venta.cantidad);
        } else {
            valorVentas[5] += parseInt(venta.articulo.precio)*parseInt(venta.cantidad);
        }
    }
    let ctx = document.getElementById("graficoBurbujas").getContext("2d");
    let data = {
        datasets: [
            {
                label: "Instagram",
                data: [{ x: 1, y: 1, r: valorVentas[0] }],
                backgroundColor: "red"
            },
            {
                label: "YouTube",
                data: [{ x: 2, y: 1, r: valorVentas[1] }],
                backgroundColor: "blue"
            },
            {
                label: "X",
                data: [{ x: 3, y: 1, r: valorVentas[2] }],
                backgroundColor: "green"
            },
            {
                label: "TikTok",
                data: [{ x: 4, y: 1, r: valorVentas[3] }],
                backgroundColor: "orange"
            },
            {
                label: "Facebook",
                data: [{ x: 5, y: 1, r: valorVentas[4] }],
                backgroundColor: "purple"
            },
            {
                label: "Otras",
                data: [{ x: 6, y: 1, r: valorVentas[5] }],
                backgroundColor: "brown"
            }
        ]
    };
    let config = {
        type: "bubble",
        data: data,
        options: {
            scales: {
            x: { display: false },
            y: { display: false }
            }
        }
    };
    grafBurbujas = new Chart(ctx, config);
}
