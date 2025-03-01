const monedaOrigen = document.getElementById('moneda-uno');
const monedaDestino = document.getElementById('moneda-dos');
const cantidadOrigen = document.getElementById('cantidad-uno');
const cantidadDestino = document.getElementById('cantidad-dos');
const textoCambio = document.getElementById('cambio');
const cambiar = document.getElementById('switch');


// Función asincrónica para obtener y calcular la tasa de cambio
async function calculate(){   
  
    try{
        textoCambio.classList.remove('error'); 
      
    
  // Validamos que la cantidad ingresada no sea negativa 
    if(cantidadOrigen.value < 0){
        textoCambio.innerText = "El monto no puede ser negativo";
        textoCambio.classList.add('error');
        cantidadDestino.value = 0;
        return;
    }

    // Si la cantidad ingresada es mayor  a cero:
    const moneda_one = monedaOrigen.value;
    const moneda_two = monedaDestino.value;

    // Llamamos a la API para obtener la tasa de cambio
   const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${moneda_one}`)

   const data = await response.json();
   const tasa = data.rates[moneda_two];
// Mostramos la tasa de cambio, realizamos la conversión y mostramos el valor de la cantidad destino
        textoCambio.innerText = `1 ${moneda_one} = ${tasa} ${moneda_two}`;
        cantidadDestino.value = (cantidadOrigen.value * tasa).toFixed(2);


    }catch (error) {
        console.error(error);
        textoCambio.innerText = "Error al obtener la tasa de cambio";
        textoCambio.classList.add('error');
    }
    
}

monedaOrigen.addEventListener('change', calculate);
cantidadOrigen.addEventListener('input', calculate);
monedaDestino.addEventListener('change', calculate);
cantidadDestino.addEventListener('input', calculate);

cambiar.addEventListener('click', () =>{
    const temp = monedaOrigen.value;
    monedaOrigen.value = monedaDestino.value;
    monedaDestino.value = temp;
    calculate();
} );

calculate();


//Función para mostrar la fecha y hora actual
function mostrarFechaHora() {

    let ahora = new Date();
    

    let fechaHoraString = ahora.toLocaleString('es-ES', { hour12: true });
    

    let elementoFechaHora = document.getElementById('fechaHora');
    elementoFechaHora.innerText = fechaHoraString;
}

// Llamar a la función para que se ejecute cuando se cargue la página
mostrarFechaHora();

// Actualizar la hora cada segundo
setInterval(mostrarFechaHora, 1000);


//Para obtener el año actual y mostrarlo en el footer

document.getElementById('year').textContent = new Date().getFullYear();