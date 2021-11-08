<script>
export default {
    methods:{
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

        insertarPedidos(ruta, agregarDatos){
            let direccion ="http://127.0.0.1:8000/api/" +  ruta
            console.log("agregando pedidos",direccion)
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
        },

         EditarDatosApi(ruta, id, agregarDatos){
            let direccion ="http://127.0.0.1:8000/api/" + ruta+ "/" +id
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
            

        },
        
        EliminarDatosApi(ruta, id){
          let direccion ="http://127.0.0.1:8000/api/" + ruta + "/" + id
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

        traerDatosPorIdApi(ruta, id){
            let direccion= "http://127.0.0.1:8000/api/" + ruta + "/" + id;
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

        
        cambiarEstadoMesa(ruta, id, flag){
            let direccion= "http://127.0.0.1:8000/" + ruta +  "/" + id;
            console.log("Pidiendo la cuenta", direccion)
            return fetch(direccion,
            {
                method: 'PATCH',
                headers:{
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ idm: id , habilitar: flag})
            })
            .then(respuesta =>{
                return respuesta.json()
            })

        }

       
    }
}
</script>