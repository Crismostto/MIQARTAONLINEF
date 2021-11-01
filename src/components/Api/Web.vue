<script>
export default {
    
    methods:{
        traerDatosPorId(ruta, id){
            let direccion= "http://127.0.0.1:8000/" + ruta + "/" + id;
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

        ObtenerDatos(ruta){            
            let direccion = "http://127.0.0.1:8000/" + ruta
            console.log("obteniendo datos",direccion)
             return fetch(direccion,
            {
                method: 'GET',
                headers:{
                    'Content-type': 'application/json'
                }
            })
            .then(respuesta =>{
                respuesta = respuesta.json()
                console.log(respuesta)
                return respuesta
            })
        },
        insertarDatosApi(ruta, agregarDatos){
            let direccion ="http://127.0.0.1:8000/" +  ruta
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
            let direccion ="http://127.0.0.1:8000/" + ruta+ "/" +id
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
          let direccion ="http://127.0.0.1:8000/" + ruta + "/" + id
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
        },

           cierrePedido(ruta, agregarDatos){
            let direccion ="http://127.0.0.1:8000/api/" +  ruta
            console.log("cerrando pedido",direccion)
             return fetch(direccion,
            {
                method: 'POST',
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ id: agregarDatos})
            })
            .then(respuesta =>{
                return respuesta.json()
            })
        },

         cambiarEstadoMesa(ruta, id){
            let direccion= "http://127.0.0.1:8000/" + ruta +  "/" + id;
            console.log("Cambiando el estado de mesa a ocupada", direccion)
            return fetch(direccion,
            {
                method: 'PATCH',
                 headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(id)
            })
            .then(respuesta =>{
                return respuesta.json()
            })

        }

    }
}
</script>