<template>





    <!--  <div v-for="(item,index) in cat_with_subcat" :key="`item-${index}`" >{{item}}</div>
      <div v-for="(item,index) in cat_with_subcat :key="`item-${index}`">{{item}}</div>-->
  <ul v-for="(item,index) in cat_with_subcat" :key="`item-${index}`">
  <a class="list-group-item" @click="categoryClick(item.category_name)">{{ item.category_name }}</a>

      <a class="list-group-item"   @click="subCategoryClick(subitem.value,item.category_name)"
          v-for="(subitem,index)  in item.list" v-show="subitem.value!==null" :key="`item-${index}`">{{ subitem.value }}</a>

  </ul>



</template>

<script>
import axios from "axios";
import {ref} from "vue";
export default {
name: "CategoryComponent",
  emits:["categoryEmit"]
,setup(){

  const cat_with_subcat = ref([]);

  return {
    cat_with_subcat
  }
  },
  methods:{
  categoryClick(name){

    let x = {name:name,cat:"category"};
    this.$emit("categoryEmit",x);
  },
    subCategoryClick(name,catname){
    console.log(name);
    let x = {name:name,cat:"subcategory",mainCat:catname};
      this.$emit("categoryEmit",x);
    this.loadItems();
    },
  loadItems(){


  }
  },mounted() {

    axios.get(`http://localhost:3000/categoriesWithSubCategories`)
        //get categories into component data
        .then(response => {
              var x  = JSON.stringify(response.data);
              x =  x.replace(/\\/g, '');
              x = x.replace(/"\["/g,'[');
              x = x.replace(/"\]"/g,']');
              this.cat_with_subcat = JSON.parse(x);
               this.categoryClick(this.cat_with_subcat[0].category_name);
              //Umazání bordelu co tam přihodila databáze aby z toho byl json obj.

            }
        )


  }
  ,data(){
  return{

  };
  }
}

</script>

<style scoped>


</style>