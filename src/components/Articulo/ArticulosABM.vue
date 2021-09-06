<template>
    <div class="formulario">
        
        <div >
            <div>
                <h2> articulos</h2>
            </div>
            <div>        
                <label for="">nombre</label>
                <!-- <input type="text" v-model="datos.nombre">-->
            </div>
            <div>
                <label for="">precio</label>
                <!-- <input type="text" v-model="datos.precio"><br> -->
            </div>
            <div>
                <label for="">descripcion</label>
                <!--<input type="text" v-model="datos.precio"><br>-->
            </div>

            <div>
                <label for="">Rubro</label>
                <!-- <input type="text" v-model="datos.rubro_id"> -->
               <!-- <select v-model="datos.rubro_id">
                    <option v-for="(rubro, index) in rubros" :key="index" :value="rubro.id">    
                        {{rubro.nombre}}</option>
                </select> -->
              
            </div>
        <button @click="aceptar()">aceptar</button>
        <button @click="cancelar()">cancelar</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ArticulosABM',

}
</script>

