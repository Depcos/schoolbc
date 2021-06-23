<template>
<br>
  search attribute: <autocomplete :key="autocompleteKey" @input="receiveACinput" @itemSelected="itemFromSearch" :items=attributesFromACquery />
  <br>
  <div v-show="selectedItem.length!==0 ">
  <div v-show="selectedItem.unit!==null">
 {{selectedItem.unit}}   <input  v-model="valueref" >
  </div>
    <div v-show="selectedItem.unit==null&&selectedItem.Description===null">

      Value: <autocomplete :key="autocompleteKeyAttVal" @input="receiveACinputAttVal" @itemSelected="itemFromSearchAttVal" :items=attributesFromACqueryAttVal />

     <!-- Value:    <input  v-model="valueref" > -->
    </div>

  </div>


  <button class="btn btn-success" @click="addAttribute">Přidat atribut</button>
<div v-for="(att,index) in attributes" :key="index">

  {{att.name}}
  <button class="btn btn-outline-dark" @click="deleteAttribute(att)">X</button>
</div>
</template>

<script>
import axios from "axios";
import autocomplete from "@/components/admin/dataHandling/helpers/autocomplete";
import {ref} from "vue";
export default {
name: "ProductAttributesComponent",
  components:{
  autocomplete
  },
  props: {
    product: {
      Type: Object,
      required: true
    },
    edit: {
      Type: Boolean,
      default: false
    }
  }
  ,
    created() {
    if(this.edit===true)
    this.fetchAttributes();
    },
    setup(){
const valueref = ref('');
return{
  valueref
}
    },
    methods:{
      receiveACinput(input){
this.selectedAttValue=[];

        let app = this;
        axios.get("http://localhost:3000/attributesSearch/"+input)
            .then(function(res){
              console.log(res.data);
              app.attributesFromACquery = res.data;
              app.autocompleteKeyAttVal++;
              //app.autocompleteKey++;

              //  this.attributesFromACquery = res.data;
              // app.results=res.data;
            }).catch(function(e){
          console.log("Error" + e)
        })
      },
      itemFromSearch(item){


        console.log(item);
        this.selectedItem = item;
      },
      receiveACinputAttVal(input){
        console.log("receiveACinputATTval");
        console.log(input);
        this.selectedAttValue= {
          name: input
        }

        let app = this;

        axios.get("http://localhost:3000/attributesSearchValue/"+this.selectedItem.idAttribute+"/"+input)
            .then(function(res){
              console.log(res.data);
              app.attributesFromACqueryAttVal = res.data;


            }).catch(function(e){
          console.log("Error" + e)
        })
      },
      itemFromSearchAttVal(item){
        console.log(item);
        console.log("item receved§!");
        this.selectedAttValue = item;
      },
addAfterCreate(productId){

        this.attributes.forEach(item=>{
          console.log("adding attribute:");
console.log(item);
          let send = {
            idProduct: productId,
            idAttribute: item.idAttribute,
            value: item.value
          }
          axios.post("http://localhost:3000/productatt/",send)
              .then(response=>{
                console.log(response);
              })

        })
},
    addAttribute(){

if(typeof this.selectedItem!=="undefined"){
  if(this.selectedItem.unit!==null){
    this.selectedAttValue = {
      name: this.valueref
    }
  }


  let value;
if(typeof this.selectedAttValue.name === "undefined"){
  value = null;
}else{
 value = this.selectedAttValue.name;
}

  this.attributes.push({
    idAttribute: this.selectedItem.idAttribute,
    name: this.selectedItem.name,
    value: value
  });

  if(this.edit===true){
    //axios
    let send = {
      idProduct: this.product.idProduct,
      idAttribute: this.selectedItem.idAttribute,
      value: value
    }
console.log(send);

    axios.post("http://localhost:3000/productatt/",send)
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
  }





  console.log("add");
}
this.selectedItem=[];
    },
    fetchAttributes(){


      //load attributes for selected product
    axios.get("http://localhost:3000/productatt/"+this.product.idProduct)
      .then(item =>{
        this.attributes=item.data;
        console.log(this.attributes);
      })
    },
      deleteAttribute(att){
        //if editing then not slice work with db else wait for id i guess

        if(this.edit===true){
          let send = {
            idProduct: this.product.idProduct,
            idAttribute: att.idAttribute
          }

          axios.delete("http://localhost:3000/productatt/",{data:send})
              .then(response=>{
                console.log(response);
                //  this.getAllProducts();
              })
        }
        //const index = this.categories.findIndex(x=> x.idCategory === this.product.Categories_idCategory);
        const index = this.attributes.findIndex(x=>x.idAttribute === att.idAttribute);
        if(index!==-1){
          this.attributes.splice(index,1);
        }
        console.log("deleted");
        //find index

      }

    },
  data(){
  return{
    attributes:[],
    attributesFromACquery:[],
    attributesAttVal:[],
    attributesFromACqueryAttVal:[],
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