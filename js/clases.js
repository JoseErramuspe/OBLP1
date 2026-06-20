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
            this.listaInfluencers.sort(function(a,b){
                return a.codigo.localeCompare(b.codigo);
            })
        }
        else{
            this.listaInfluencers.sort(function(a,b){
                return b.codigo.localeCompare(a.codigo);
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
        return "Nro "+numero+"→"+articulo+"→"+" $"+this.articulo.precio+"c/u Total $"+(this.articulo.precio*this.cantidad)+"→"+" Comision: $"+(this.influencer.comision*this.articulo.precio*this.cantidad/100);
    }
}
