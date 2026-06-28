// José Gabriel Erramuspe Rodríguez - 353422
// Damián Agustín Torres Aramburu - 371643

class Sistema{
    constructor(){
        this.listaInfluencers=[];
        this.listaArticulos=[];
        this.listaVentas=[];
    }
    ordenarTablaInf(alfabetico){
        if(alfabetico){
            this.listaInfluencers.sort(function(a,b){
                return a.nombre.localeCompare(b.nombre);
            })
        }
        else{
            this.listaInfluencers.sort(function(a,b){
                return b.nombre.localeCompare(a.nombre);
            })
        }
    }
    ordenarTablaArt(alfabetico){
        if(alfabetico){
            this.listaArticulos.sort(function(a,b){
                return a.codigo.localeCompare(b.codigo);
            })
        }
        else{
            this.listaArticulos.sort(function(a,b){
                return b.codigo.localeCompare(a.codigo);
            })
        }
    }
    contarVentas(articulo){
        let ventasArt=0;
        for(let venta of this.listaVentas){
            if(venta.articulo == articulo){
                ventasArt+=venta.cantidad;
            }
        }
        return ventasArt;
    }
}

class Influencer{
    constructor(nombre, mail, comision){
        this.nombre=nombre;
        this.mail=mail;
        this.comision=comision;
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
    toString(){
        return "Nro "+this.numero+"→"+this.articulo.codigo+"→"+" $"+this.articulo.precio+"c/u Total $"+(this.articulo.precio*this.cantidad)+"→"+" Comision: $"+(this.influencer.comision*this.articulo.precio*this.cantidad/100);
    }
}
