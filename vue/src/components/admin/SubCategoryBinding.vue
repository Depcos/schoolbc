<template>

<br>
  <div style="align-content: center">Select category <select class="form-control align-items-center selected" v-model="selected" @change="selectedSubCategory" >
  <option v-for="(category) in categories" :key="category.idsubCategory">{{category.name}}</option>
  </select>
  </div>
</template>

<script>
import axios from 'axios';
import {ref} from 'vue';
//todo: v každém componentu udělat namapovaní na buď ATRIBUT nebo všechny hodnoty atributu.
export default {

  name: "SubCategoryBinding",
  setup(){
    const selected =  ref('');
    return{selected};
  },
  mounted(){
    axios.get("http://localhost:3000/SubCategories")
        //get categories into component data
        .then(response => (this.categories=response.data))
  },data(){
    return {
      showComp:false,
      categories:[],
    };
  },components:{
  },methods:{
    selectedSubCategory() {
      this.$emit('selectedSubCategory', this.selected);
      //console.log(this.selected);
     // console.log("From child"+this.selected);
    }, Delete() {
      this.$emit('delete', this.id);
    }


},
  emits:['selectedSubCategory']

}

</script>

<style scoped>

</style>