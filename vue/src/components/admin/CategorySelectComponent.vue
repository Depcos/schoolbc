<template>

  <div >
<br>

  <select  class="form-control align-items-center selected"  v-model="selected" @change="onChange($event)">
    <option  v-for="(category) in categories" :key="category.idCategory" :value="category">
      {{category.name}}
    </option>
  </select>
    <button class="btn btn-primary" style="margin-left: 10px" @click="showComponent">Zvolit kategorii</button>
  </div>
<br>


<component-manager v-if="showComp"
                   :key="componentManagerKey"
                   :selectedCategory="selected">
</component-manager>




</template>

<script>
import axios from 'axios';
import {ref} from 'vue';
import ComponentManager from "@/components/admin/ComponentManager";


import router from "@/router";
//todo: v každém componentu udělat namapovaní na buď ATRIBUT nebo všechny hodnoty atributu.

export default {

name: "CategorySelectComponent",
  setup(){
    const selected =  ref('');
    return{
      selected
    };

  },
  mounted(){
  axios.get("http://localhost:3000/categories")
      //get categories into component data
    .then(response => (this.categories=response.data))
  },data(){
  return {
    showComp:false,
    categories:[],
    componentManagerKey:0,
    logged:false
  };
  },components:{

  ComponentManager


  },methods:{
    logout: function () {
      axios
          .get("http://localhost:3000/api/logout")
          .then(() => {
            router.push("/")
          })
    },
  onChange(){
    this.showComp=false;
    this.forceRender();
  },
  showComponent(){
    this.forceRender();
    this.showComp=true;
  },
    forceRender(){
    this.componentManagerKey+=1;
    this.$forceUpdate();
    },
userLogged(){
    this.logged=true;
}
  }
}
</script>

<style scoped>
.selected{
  width: 30%;
  vertical-align: middle;
  display: inline-block;
}

</style>