class Sistema{
    constructor(){
        this.listaInfluencers=[];
        this.listaArticulos=[];
        this.listaVentas=[];
    }
    ordenarTablaInf(alfabetico){
        if(alfabetico){
            this.listaInfluencers.sort(function(a,b){
                a.localeCompare(b);
            })
        }
        else{
            this.listaInfluencers.sort(function(a,b){
                b.localeCompare(a);
            })
        }
    }
}

class Influencer{
    constructor(nombre, mail, comision){
        this.nombre=nombre;
        this.mail=mail;
        this.comision=comision;
    }
    toString(){
        return this.nombre;
    }
}

class Articulo{
    constructor(codigo, descripcion, precio){
        this.codigo=codigo;
        this.descripcion=descripcion;
        this.precio=precio;
    }
}

class Venta{
    constructor(numero, articulo, influencer, cantidad, medio){
        this.numero=numero;
        this.articulo=articulo;
        this.influencer=influencer;
        this.cantidad=cantidad;
        this.medio=medio;
    }
}
