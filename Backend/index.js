//declarar las dependencias a utilizar
const express =  require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//Creacion del Backend usando el framework express
const app = express();
/*PUERTO que yo quiero abrir de mi computadora en el cual 
queremos que se abra el backend*/
const PORT = 5000;

//Especificarle al framework que vamos a usar body-parser y los cors
app.use(bodyParser.json);
app.use(cors());


//levantar nuestro servidor por primera vez
//VAMOS A UTILIZAR UNA FUNCION FLECHA
app.listen(PORT, ()=>{
    console.log(`servidor escuchando en el puerto: ${PORT}`);
});