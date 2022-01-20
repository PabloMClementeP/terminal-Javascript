const d = document;

const $screen = d.querySelector(".screen");
let $input = d.querySelector(".input-line");
let $output = d.querySelector(".output");

let inputText = "";
let time, saludoNum;

const newLine = `
    <p class="prompt">O.S. v0.1 $</p>
    <div class="input input-line" contenteditable></div>
    <div class="result output"></div>
`;

const saludos = [
    "Hola usuario...",
    "Saludos terricola",
    "Buenas .... un placer.",
    "Hola amigo",
    "Hola, soy 'la terminal' en javascript.",
    "Buenas, buenas!!"
];

// expresion regular para chequear caracteres validos
let cadena = /^[a-zA-ZÀ-ÿ\s]{3,100}$/;


d.addEventListener('DOMContentLoaded', () => {
    $input.focus();
  });

d.addEventListener("click", ()=>{
    $input.focus();
})


// chequeo de tecla precionada

$screen.addEventListener("keydown", (e)=>{
    // chequeo que sea la tecla enter
    if(e.keyCode === 13){
        e.preventDefault();
        // compruebo que se a tecleado
        checkCommand();

        // quito atributo editable al div
        $input.removeAttribute('contenteditable');
        $input.classList.remove('input-line');

        $output.classList.remove("output");

        // inserto nuevo div editable
        $screen.insertAdjacentHTML('beforeend', newLine);
        $input = d.querySelector(".input-line");
        
        $output = d.querySelector(".output");
        
        inputText = ""
        $input.focus();

    }else if(e.keyCode === 8){
        console.log("back") 
        inputText = inputText.slice(0, -1);     

    }else{ 
        console.log(e.keyCode)
        let texto = e.key;
        if(!cadena.test(texto)){
            inputText += e.key; 
            console.log(inputText)
        }
    }
});


function checkCommand(){
    switch (inputText) {
        case "":
            console.log("empty text");
            break;
        
        case "help":
            console.log("help line");
            $output.textContent = "help -> Esta ayuda \r\n"  
            $output.textContent += "clear -> Limpiar la pantalla \r\n"  
            $output.textContent += "saludo -> Un saludo de la terminal \r\n"  
            $output.textContent += "hora -> Hora del sistema \r\n"  
            $output.textContent += "fecha -> Fecha del sistema \r\n"  
            $output.textContent += "exit -> Salir del sistema? \r\n"  
            $output.innerHTML = $output.innerHTML.replace(/\n\r?/g, '<br />');
            break;

        case "clear":
            $screen.innerHTML = "" 
            break;

        case "hora":
            console.log("dando la hora");
            time = new Date();
            let hora = time.toLocaleTimeString();
            $output.textContent = "En estos momentos son las: " + hora;  
            break;

        case "fecha":
            console.log("dando la fecha");
            time = new Date();
            let fecha = time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear();
            $output.textContent = "Hoy es: " + fecha;  
            break;

        case "saludo":
            saludoNum = Math.round(Math.random()*6);
            console.log("saludando" + saludoNum);
            $output.textContent = saludos[saludoNum];  
            break;

        case "exit":
            console.log("exit");
            $output.textContent = "Por favor no te vallas aún, terminal se siente sola ...\r\n "   
            $output.textContent += "Prueba otro comando."  
            $output.innerHTML = $output.innerHTML.replace(/\n\r?/g, '<br />');
            break;

        default:
            $output.textContent = "'" + inputText + "'" + " no es un comando valido \r\n"  
            $output.textContent += "'help' para obtener ayuda"  
            $output.innerHTML = $output.innerHTML.replace(/\n\r?/g, '<br />');
            break;
    }
}