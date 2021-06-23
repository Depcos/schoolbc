<template>
  <br>
  search sub: <autocomplete :key="autocompleteKey" @input="receiveACinput" @itemSelected="itemFromSearch" :items=subCategoriesFromACquery />
  <br>


  <button @click="addSubCategory">AddSub</button>

  <div v-for="(sub,index) in subCategories" :key="index">
    {{sub.name}}
    <button @click="deleteSubCategory(sub)">X</button>
    Zobrazit :
    <input @change="changedVisibility(sub)" type="checkbox" v-model="sub.isVisible">

  </div>

</template>

<script>
import axios from "axios";
import autocomplete from "@/components/admin/dataHandling/helpers/autocomplete";
import {ref} from "vue";
export default {
  name: "categoriesSubCategoriesComponent",
  components:{
    autocomplete
  },
  props: {
    category: {
      Type: Object,
      required: false
    },
    edit: {
      Type: Boolean,
      default: false
    }
  }
  ,
  created() {
    if(this.edit===true)
      this.fetchSubCategories();

  },
  setup(){
    const valueref = ref('');
    return{
      valueref
    }
  },
  methods:{
changedVisibility(sub){
  console.log(sub);
  let send = {
    idCategory: this.category.idCategory,
    idSubCategory: sub.idSubCategory,
    isVisible:sub.isVisible
  }
  axios.put("http://localhost:3000/categorySub/",send)
      .then(response=>{
        console.log(response);
        //  this.getAllCategorys();
      })


},
    receiveACinput(input){
      let app = this;
      axios.get("http://localhost:3000/subCategoriesSearchAvailable/"+input)
          .then(function(res){
            console.log(res.data);
            app.subCategoriesFromACquery = res.data;
          }).catch(function(e){
        console.log("Error" + e)
      })
    },
    itemFromSearch(item){
      console.log(item);
      this.selectedItem = item;
    },
    addAfterCreate(categoryId){
      console.log("AddAfterCreate");
      this.subCategories.forEach(item=>{
        console.log("adding cat:");
        console.log(item);
        let send = {
          idCategory: categoryId,
          idSubCategory: item.idSubCategory,
        }

        axios.post("http://localhost:3000/categorySub/",send)
            .then(response=>{
              console.log(response);
              //  this.getAllCategorys();
            })
      })

    },
    addSubCategory(){

      if(this.selectedItem.unit!==null||this.selectedItem.length!==0){
        if(this.selectedItem.unit!==null){

          this.selectedAttValue = {
            name: this.valueref
          }

        }

        console.log(this.selectedItem);
        console.log(this.subCategories);


        this.subCategories.push({
          idSubCategory: this.selectedItem.idSubCategory,
          name: this.selectedItem.name,
          isVisible:false
        });

        if(this.edit===true){
          //axios
          let send = {
            idCategory: this.category.idCategory,
            idSubCategory: this.selectedItem.idSubCategory,
            isVisible:false
          }
          console.log(send);

          axios.post("http://localhost:3000/categorySub/",send)
              .then(response=>{
                console.log(response);
                //  this.getAllCategorys();
              })
              .catch(err=>{console.log(err);})


        }


        console.log("add");
      }
      this.selectedItem=[];
    },
    fetchSubCategories(){


      //load subCategories for selected category
      axios.get("http://localhost:3000/categorySub/"+this.category.idCategory)
          .then(item =>{
           // this.subCategories=item.data;
            //console.log(item.data);

           item.data.forEach(x=>{
             this.subCategories.push({
               idSubCategory: x.idSubCategory,
               name: x.name,
               isVisible: x.isVisible===0?false:true
             })
           })



          })
          .catch(err=>{console.log(err);}
          )
    },
    deleteSubCategory(sub){
      //if editing then not slice work with db else wait for id i guess

      if(this.edit===true){
        let send = {
          idCategory: this.category.idCategory,
          idSubCategory: sub.idSubCategory
        }

        axios.delete("http://localhost:3000/categorySub/",{data:send})
            .then(response=>{
              console.log(response);
              //  this.getAllCategorys();
            })
      }
      //const index = this.categories.findIndex(x=> x.idCategory === this.category.Categories_idCategory);
      const index = this.subCategories.findIndex(x=>x.idSubCategory === sub.idSubCategory);
      if(index!==-1){
        this.subCategories.splice(index,1);
      }
      console.log("deleted");
      //find index

    }

  },
  data(){
    return{
      subCategories:[],
      subCategoriesFromACquery:[],
      subCategoriesAttVal:[],
      subCategoriesFromACqueryAttVal:[],
      autocompleteKey:0,
      selectedItem:[],
      autocompleteKeyAttVal:0,
      selectedAttValue:[]
    }
  }


}
</script>

<style scoped>

</style>