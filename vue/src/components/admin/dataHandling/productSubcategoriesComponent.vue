<template>
  <br>
  search sub: <autocomplete :key="autocompleteKey" @input="receiveACinput" @itemSelected="itemFromSearch" :items=subCategoriesFromACquery />
  <br>


  <button class="btn btn-success" @click="addSubCategory">Přidat subkategorii</button>

  <div v-for="(sub,index) in subCategories" :key="index">
    {{sub.name}}
    <button class="btn btn-outline-dark" @click="deleteSubCategory(sub)">X</button>
  </div>

</template>

<script>
import axios from "axios";
import autocomplete from "@/components/admin/dataHandling/helpers/autocomplete";
import {ref} from "vue";
export default {
  name: "productSubCategoriesComponent",
  components:{
    autocomplete
  },
  props: {
    product: {
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

    receiveACinput(input){
      let app = this;
      axios.get("http://localhost:3000/subCategoriesSearch/"+input)
          .then(function(res){

            app.subCategoriesFromACquery = res.data;
          }).catch(function(e){
        console.log("Error" + e)
      })
    },
    itemFromSearch(item){
      console.log(item);
      this.selectedItem = item;
    },
    addAfterCreate(productId){
      console.log("AddAfterCreate");
      this.subCategories.forEach(item=>{

        let send = {
          idProduct: productId,
          idSubCategory: item.idSubCategory,
        }

        axios.post("http://localhost:3000/productSub/",send)
            .then(response=>{
              console.log(response);
              //  this.getAllProducts();

            })
            .catch((error) => {
              // Error
              if (error.response) {
                /*
                 * The request was made and the server responded with a
                 * status code that falls out of the range of 2xx
                 */
                alert("Error occured");
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received, `error.request`
                console.log(error.request);
              } else {
                // Something happened in setting up the request and triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
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




        this.subCategories.push({
          idSubCategory: this.selectedItem.idSubCategory,
          name: this.selectedItem.name,
        });

        if(this.edit===true){
          //axios
          let send = {
            idProduct: this.product.idProduct,
            idSubCategory: this.selectedItem.idSubCategory,
          }
          console.log(send);

          axios.post("http://localhost:3000/productSub/",send)
              .then(response=>{
                console.log(response);
                //  this.getAllProducts();
              })
              .catch(err=>{console.log(err);})


        }


       // console.log("add");
      }
      this.selectedItem=[];
    },
    fetchSubCategories(){


      //load subCategories for selected product
      axios.get("http://localhost:3000/productSub/"+this.product.idProduct)
          .then(item =>{
            this.subCategories=item.data;
            console.log(this.subCategories);
          })
      .catch(err=>{console.log(err);}
      )
    },
    deleteSubCategory(sub){
      //if editing then not slice work with db else wait for id i guess

      if(this.edit===true){
        let send = {
          idProduct: this.product.idProduct,
          idSubCategory: sub.idSubCategory
        }

        axios.delete("http://localhost:3000/productSub/",{data:send})
            .then(response=>{
              console.log(response);
              //  this.getAllProducts();
            })
      }
      //const index = this.categories.findIndex(x=> x.idCategory === this.product.Categories_idCategory);
      const index = this.subCategories.findIndex(x=>x.idSubCategory === sub.idSubCategory);
      if(index!==-1){
        this.subCategories.splice(index,1);
      }
  //    console.log("deleted");
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