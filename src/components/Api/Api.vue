<script>
export default {
    
    methods:{
        traerDatosPorId(ruta, id){
<<<<<<< HEAD
            let direccion= "http://127.0.0.1:8000/api/" + ruta + "/" + id;
=======
            let direccion= "http://127.0.0.1:8000/Api" + ruta + "/" + id;
>>>>>>> f0e31e475e139d9385a609f33beb7e5944a32b72
            console.log("Traer datos por id ",direccion)
            return fetch(direccion,
            {
                method: 'GET',
                headers:{
                    'content-type': 'application/json'
                }
            })
            .then (respuesta =>{
                return respuesta.json()
            })
        },

        obtenerDatos(ruta){
<<<<<<< HEAD
            let direccion = "http://127.0.0.1:8000/api/" + ruta;
=======
            let direccion = "http://127.0.0.1:8000/Api" + ruta;
>>>>>>> f0e31e475e139d9385a609f33beb7e5944a32b72
            console.log("obtener datos",direccion);
             return fetch(direccion,
            {
                method: 'GET',
                headers:{
                    'Content-type': 'application/json'
                }
            })
            .then(respuesta =>{
                return respuesta.json()
            })
        },
        insertarDatosApi(ruta, agregarDatos){
<<<<<<< HEAD
            let direccion ="http://127.0.0.1:8000/api/" +  ruta
=======
            let direccion ="http://127.0.0.1:8000/Api" +  ruta
>>>>>>> f0e31e475e139d9385a609f33beb7e5944a32b72
            console.log("insertar datos api",direccion)
             return fetch(direccion,
            {
                method: 'POST',
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(agregarDatos)
            })
            .then(respuesta =>{
                return respuesta.json()
            })
        },EditarDatosApi(ruta, id, agregarDatos){
<<<<<<< HEAD
            let direccion ="http://127.0.0.1:8000/api/" + ruta+ "/" +id
=======
            let direccion ="http://127.0.0.1:8000/Api" + ruta+ "/" +id
>>>>>>> f0e31e475e139d9385a609f33beb7e5944a32b72
            console.log("editar datos api",direccion)
             return fetch(direccion,
            {
                method: 'PUT',
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(agregarDatos)
            })
             .then(respuesta =>{
                return respuesta.json()
            })
            

        },EliminarDatosApi(ruta, id){
<<<<<<< HEAD
          let direccion ="http://127.0.0.1:8000/api/" + ruta + "/" + id
=======
          let direccion ="http://127.0.0.1:8000/Api" + ruta + "/" + id
>>>>>>> f0e31e475e139d9385a609f33beb7e5944a32b72
          console.log("eliminar Datos api",direccion)
            return fetch(direccion,
            {
                method: 'DELETE',
                headers:{
                    'Content-type': 'application/json'
                },
               
               
            }) 
            //  .catch(let error => {
            //      console.log("error");
            //  })
        }
    }
}
</script>