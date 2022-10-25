const swal = window.swal
function remera(talle, color, precio) {
    this.talle = talle;
    this.color = color;
    this.precio = precio;
}
function generarArreglo() {
    let array = []
    for (let i = 0; i < 10; i++) {
        let aleatorio = Math.random()
        if (aleatorio > 0.75) {
            array.push(new remera("xl", "rojo", Math.trunc(aleatorio * 3000)))
            array.push(new remera("xl", "blanco", Math.trunc(aleatorio * 1500)))
        } else if (aleatorio => 0.25) {
            array.push(new remera("xl", "azul", Math.trunc(aleatorio * 2000)))
            array.push(new remera("xs", "blanco", Math.trunc(aleatorio * 1500)))
            array.push(new remera("xs", "rojo", Math.trunc(aleatorio * 2000)))
        } else {
            array.push(new remera("xs", "azul", Math.trunc(aleatorio * 2000)))
            array.push(new remera("xs", "rojo", Math.trunc(aleatorio * 2000)))
        }
        console.log(aleatorio)
    }
    return array;
}
function filtrarArreglo(talle, color, presupuesto, array) {
    array = array.filter(array => array.talle == talle)
    array = array.filter(array => array.color == color)
    array = array.filter(array => array.precio <= presupuesto)
    return array
}
function resultados ()
{
    aux = filtrarArreglo(talle, color, precioRango, productos);
    let lista = document.getElementById("lista");
    lista.innerHTML = "";
    console.log(aux)
    console.log(aux)
    if (aux.length == 0) {
        lista.innerHTML = ("<h2> No tenemos nada acorde a tus necesidades :( </h2>")
    } else {
        let iamgen
        for (let index = 0; index < aux.length; index++) {
        if (aux[index].color == "rojo") {
            imagen = colorRemeras[0]
        }
        else if (aux[index].color == "azul") {
            imagen = colorRemeras[1]
        }
        else
        {
            imagen = colorRemeras[2]
        }
        lista.innerHTML += `<div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${imagen}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title"></h5>
          <p class="card-text">Color:${aux[index].color} Talle:${aux[index].talle} Precio:${aux[index].precio}</p>
          <button type="button" class="btn bg-success btn-info btn-lg botoncarrito"">Agregar a carrito</button>
        </div>
      </div>`
    }
   }
}
function botones() 
{
    let aux = filtrarArreglo(talle, color, precioRango, productos);
    for (index in aux) {
        let botones = document.getElementsByClassName("botoncarrito")
        botones[index].addEventListener("click",function(evt)
        {
            AddCarrito(evt,aux[index])
        })
    }
}
function showCarrito()
{
    let totalcarrito = document.createElement("ul")
    let totalPrecio = 0;
    if(carrito.length == 0)
    {
        totalcarrito.innerHTML = `<h2>No tienes productos en su carrito</h2`
        hayItems = false;
    }
    else
    {
        let imagen;
        for(index in carrito)
        {
        if (carrito[index].color == "rojo") {
            imagen = colorRemeras[0]
        }
        else if (carrito[index].color == "azul") {
            imagen = colorRemeras[1]
        }
        else
        {
            imagen = colorRemeras[2]
        }
        totalcarrito.innerHTML += `<div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${imagen}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title"></h5>
          <p class="card-text">Color:${carrito[index].color} Talle:${carrito[index].talle} Precio:${carrito[index].precio}</p>
          <button type="button" class="btn w-5 bg-success btn-info btn-lg botoncarritodel" data-toggle="modal" data-target="#exampleModal">Eliminar del carrito</button>
        </div>
        </div>`
        totalPrecio += carrito[index].precio
        }
        totalcarrito.innerHTML += `<h2>Precio :${totalPrecio}</h2>`
    }
    console.log(totalcarrito)
    let mySwal = function() {
        swal(arguments[0]);
        if (arguments[0].showCloseButton) {
          closeButton = document.createElement('button');
          closeButton.className = 'swal2-close';
          closeButton.onclick = function() { swal.close(); };
          closeButton.textContent = '×';
          modal = document.querySelector('.swal-modal');
          modal.appendChild(closeButton);
        }
      }
    mySwal({
        title: "Aqui tiene su carrito",
        content: totalcarrito,
        icon: "info", 
        buttons: [
          "Seguir comprando", 
          "comprar" 
        ],
        focusConfirm: false,
        showCloseButton: true
      });
    let delbtn = document.getElementsByClassName("botoncarritodel")
    for(index2 in carrito) {
        delbtn[index2].addEventListener("click",function(evt)
        {
            delCarrito(evt,index2)
            showCarrito();
        })     
    }

}
function delCarrito(evt,numero)
{
    carrito.splice(numero-1,1)
    window.localStorage.setItem("carrito",JSON.stringify(carrito))
}
function AddCarrito(evt,remera)
{
    swal({
        position: 'top-end',
        icon: 'success',
        title: 'Compra agregada a carrito',
        showConfirmButton: false,
        timer: 1500
      })
    carrito.push(remera)
    window.localStorage.setItem("carrito",JSON.stringify(carrito))
}   
if (window.localStorage.getItem("carrito") != undefined) {
    var carrito = JSON.parse(localStorage.getItem("carrito"))
}
else
{
    var carrito = []
}

function callApi() {
    return fetch("https://api2.binance.com/api/v3/ticker/24hr")
    .then((response) => { 
        return response.json().then((data) => {
            console.log(data);
            return data;
        }).catch((err) => {
            console.log(err);
        }) 
    });
    ;
  }
let productos = generarArreglo()
let colorRemeras = ["https://tribuwear.com/wp-content/uploads/2021/08/Camiseta-organica-hombre-heart-rosa-600x744.jpg","https://tribuwear.com/wp-content/uploads/2021/08/Camiseta-organica-hombre-circulo-navy-600x744.jpg","https://tribuwear.com/wp-content/uploads/2021/09/Camiseta-organica-hombre-brain-blanca-600x744.jpg"]
let colorSelect = document.getElementById("color")
let talleSelect= document.getElementById("talle")
let talle = "xl"
let color = "rojo"
let precioRango ="10000"
let precioRangos = document.getElementById("precio")
let boton = document.getElementById("boton")
let botonCarrito = document.getElementById("carrito")
let adaprecio = document.getElementById("ada-price")
let ethprecio = document.getElementById("eth-price")
let btcprecio = document.getElementById("btc-price")
let precios;
let hola = callApi().then((data) => {
    precios = data
    ethprecio.innerText = `${Math.trunc(precios[12].lastPrice)}`
    btcprecio.innerText = `${Math.trunc(precios[11].lastPrice)}`
    adaprecio.innerText = `${precios[486].lastPrice}`
 })
 console.log(hola)        
botonCarrito.addEventListener("click",showCarrito)
talleSelect.addEventListener("change",()=> talle = talleSelect.options[talleSelect.selectedIndex].value) ;
colorSelect.addEventListener("change",()=> color = colorSelect.options[colorSelect.selectedIndex].value) 
precioRango = precioRangos.addEventListener("change",()=> precioRango = precioRangos.value)
boton.addEventListener("click",resultados)
boton.addEventListener("click",botones)


