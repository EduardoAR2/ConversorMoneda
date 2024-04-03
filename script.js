const monedaEl_one = document.getElementById('moneda-uno');
const monedaEl_two = document.getElementById('moneda-dos');
const cantidadEl_one = document.getElementById('cantidad-uno');
const cantidadEl_two = document.getElementById('cantidad-dos');
const cambioEl = document.getElementById('cambio');
const tazaEl = document.getElementById('taza');


// Fetch Exchange Rate and Update the DOM
function calculate(){
    const moneda_one = monedaEl_one.value;
    const moneda_two = monedaEl_two.value;

   fetch(`https://api.exchangerate-api.com/v4/latest/${moneda_one}`)
   .then(res => res.json() )
   .then(data => {
       const taza = data.rates[moneda_two];
       
       cambioEl.innerText = `1 ${moneda_one} = ${taza} ${moneda_two}`;

       cantidadEl_two.value = (cantidadEl_one.value * taza).toFixed(2);

    } );
    
}

//Event listeners
monedaEl_one.addEventListener('change', calculate);
cantidadEl_one.addEventListener('input', calculate);
monedaEl_two.addEventListener('change', calculate);
cantidadEl_two.addEventListener('input', calculate);

taza.addEventListener('click', () =>{
    const temp = monedaEl_one.value;
    monedaEl_one.value = monedaEl_two.value;
    monedaEl_two.value = temp;
    calculate();
} );


calculate();

function mostrarFechaHora() {
    // Obtener la fecha y hora actual
    var ahora = new Date();
    
    // Formatear la fecha y hora como string (incluyendo segundos)
    var fechaHoraString = ahora.toLocaleString('es-ES', { hour12: false });
    
    // Mostrar la fecha y hora en el elemento HTML
    var elementoFechaHora = document.getElementById('fechaHora');
    elementoFechaHora.innerText = fechaHoraString;
}

// Llamar a la función para que se ejecute cuando se cargue la página
mostrarFechaHora();

// Actualizar la hora cada segundo
setInterval(mostrarFechaHora, 1000);
