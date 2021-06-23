<template>

  <h1 class="mt-4">Správa produktů</h1>
  <productsedit-dialog-component @close="closeEdit"  v-if="showEdit"  :key="componentKey" :product="productToEdit" ></productsedit-dialog-component>
<products-add-dialog-component @close="closeAdd"  v-if="showAdd"  :key="componentKey"  ></products-add-dialog-component>
  <div class="row justify-content-md-center">
<div class="col-md-4">
  <autocomplete :key="autocompleteKey" @input="receiveACinput" @itemSelected="itemFromSearch" :items=productsFromACquery />
</div>
  </div>
  <br>
  <button class="btn btn-success" @click="addProduct">Přidat produkt</button>


  <div  class="table-responsive-md">
  <table class="table table-striped table-bordered" >
    <thead>
    <tr>

      <th >ID</th>
      <th >Name</th>
      <th >link</th>
      <th  >imgLink</th>
      <th >Description</th>
      <th  ></th>
    </tr>
    </thead>
    <tbody>
    <tr  v-for="product in products" :key="product.idProduct">
      <td >{{product.idProduct}} </td>
      <td>{{product.name}}</td>
      <td  class="text-truncate" >{{product.link}}</td>
      <td  class="text-truncate" >{{product.imgLink}}</td>
      <td  class="text-truncate">{{product.Description}}</td>
      <td class="noower">
        <button class="btn btn-primary" @click="edit(product)">edit</button>
        <button class="btn btn-secondary" @click="deleteme(product)">delete</button>
      </td>
    </tr>

    </tbody>
  </table>
  </div>






  <br>
  <div class="align-content-between">
  <paginator
      :total-pages="totalPages"
      :per-page="perPage"
      :current-page="currentPage"
      @pagechanged="onPageChange"
  />
  </div>

</template>

<script>
import axios from "axios";
import productseditDialogComponent from "@/components/admin/dataHandling/productseditDialogComponent";
import productsAddDialogComponent from "@/components/admin/dataHandling/productsAddDialogComponent";
import paginator from "@/components/admin/dataHandling/helpers/paginator";
import autocomplete from "@/components/admin/dataHandling/helpers/autocomplete";
export default {


name: "productseditComponent",
  created(){


this.preparePaginator();
  },
  components:{
  productseditDialogComponent,
    productsAddDialogComponent,
    autocomplete,
    paginator
  }
  ,mounted(){


  },
  computed:{
  getPagesCount(){

   let count = this.productCount / this.perPage;

   return Math.ceil(count);
  }
  },
  methods:{
  receiveACinput(input){
    let app = this;
    axios.get("http://localhost:3000/productsSearch/"+input)
        .then(function(res){
          app.productsFromACquery = res.data;
        }).catch(function(e){
      console.log("Error" + e)
    })
  },
  preparePaginator(){
    let $thisref =this;
    axios.get( "http://localhost:3000/productscount")
        .then(res=> {
              $thisref.productCount = res.data[0].count;
              $thisref.totalPages = $thisref.getPagesCount;
              this.getAllProducts();
            }
        )


  },
  onPageChange(page){
    this.currentPage=page;
    this.getAllProducts();

  }
  ,
  itemFromSearch(item){

    this.edit(item);
  },
  addProduct(){
    this.showAdd = true;

  },
  forceRender(){
      this.componentKey++;
    },
    closeAdd(){
    this.showAdd = false;

    },
  closeEdit(){

    this.showEdit = false;

    this.forceRender();
   this.getAllProducts();
  },
  getAllProducts(){
    this.products=[];
    const from = (this.currentPage - 1 )* this.perPage;


    axios.get(`http://localhost:3000/productsPaginated/${from}/${this.perPage}` )
        .then(response=>{
          response.data.forEach(item=>{
            this.products.push(item);
          })
        })
  },
    edit(cat){

    this.productToEdit=cat;
    this.forceRender();
    this.showEdit=true;
    },
    deleteme(cat){


    axios.delete("http://localhost:3000/products",{data:cat})
      .then(response=>{
        console.log(response);
        this.getAllProducts();

      })

    },
  },
  data(){
  return{
    products:[]
    ,showEdit:false,
    componentKey:0,
    productToEdit:[],
    showAdd:false,
    currentPage: 1,
    totalPages:5,
    perPage:10,
    productCount:0,
    productsFromACquery:[],
    autocompleteKey:0

  }
  }
}
</script>

<style scoped>
/*
.table {
  table-layout: fixed;
}
.table {
  table-layout:fixed;
}

 */
@media(min-width: 768px) {
  .table {
    table-layout:fixed;

  }
}
.table td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}



.noower{
  overflow: visible;
  text-overflow: unset;
}


</style>