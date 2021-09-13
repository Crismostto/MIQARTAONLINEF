<template>
    <div class="formulario">
        
        <div >
            <div>
                <h2> Rubros</h2>
            </div>
            <div>        
                <label for="">tipo</label>
                <input type="text" v-model="datos.tipo">
            </div>
        
            <div>
                <label for="">nombre</label>
                <input type="text" v-model="datos.nombre"><br>
            </div>

        <button @click="aceptar()">aceptar</button>
        <button @click="cancelar()">cancelar</button>
        </div>
    </div>
</template>

<script>
import Api from '@/components/Api/Api.vue';

export default {
    props: ['AbmAccion', 'AbmId'],
    mixins:[Api],
    data(){
        return{
            datos:{
                
                id: 0,
                nombre: '',
                tipo:'',
            }
        }
    },
    created(){
        if(this.AbmAccion != 'agregar'){
            this.traerDatosPorId('articulos/categorias',this.AbmId)
                .then(respuesta=>{
                    this.datos = respuesta
                })
  
        }
    },
    methods:{
        aceptar(){
            if(this.AbmAccion == 'agregar'){
                this.$emit('salirDeAbmRubros', true)
                this.insertarDatosApi('articulos/categorias', this.datos)
                    .then(respuesta => respuesta.json())
                    .then(respuesta => {
                        
                        if(respuesta.id != 0){
                            console.log("exito")
                        }else{
                            console.log("fracaso")
                        }
                        this.$emit('salirDeAbmRubros', true)
                    })
            }
            if(this.AbmAccion == 'editar'){
                this.EditarDatosApi('articulos/categorias', this.AbmId,this.datos)
                    .then(respuesta => {
                        this.$emit('salirDeAbmRubros', true)
                        this.datos = respuesta
                         
                    })
            }
            if(this.AbmAccion =='eliminar'){
                this.EliminarDatosApi('articulos/categorias',this.AbmId)
                   .then(respuesta => {
                       this.$emit('salirDeAbmRubros', true)
                         this.datos = respuesta
                         
                    })
            }
           
        },
        cancelar(){
            this.$emit('salirDeAbmRubros', false)
        },
    }
}
</script>