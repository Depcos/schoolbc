<template>
  <h1 class="mt-4">Správa kategorií</h1>
  <categoriesedit-dialog-component @close="closeEdit"  v-if="showEdit"  :key="componentKey" :category="categoryToEdit" ></categoriesedit-dialog-component>
<categories-add-dialog-component @close="closeAdd"  v-if="showAdd"  :key="componentKey"  ></categories-add-dialog-component>
  <div class="row justify-content-md-center">
    <div class="col-md-4">
  <autocomplete :key="autocompleteKey" @input="receiveACinput" @itemSelected="itemFromSearch" :items=categoriesFromACquery />
    </div></div>

  <br>
  <button class="btn btn-success" @click="addCategory">Přidat kategorii</button>




  <br>

  <div class="table-responsive-md">
  <table id="example" class="table table-striped table-bordered" style="width:100%">
    <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>

      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="category in categories" :key="category.idCategory">

      <td>  {{category.idCategory}}  </td>
      <td>{{category.name}}</td>
      <td>
      <button class="btn btn-primary" @click="edit(category)">edit</button>
        <button class="btn btn-secondary" @click="deleteme(category)">delete</button>
      </td>
    </tr>

    </tbody>
  </table>
  </div>








  <paginator
      :total-pages="totalPages"
      :per-page="perPage"
      :current-page="currentPage"
      :maxVisibleButtons="totalPages<3?totalPages:3"
      @pagechanged="onPageChange"
  />
</template>

<script>
import axios from "axios";
import categorieseditDialogComponent from "@/components/admin/dataHandling/categorieseditDialogComponent";
import categoriesAddDialogComponent from "@/components/admin/dataHandling/categoriesAddDialogComponent";
import paginator from "@/components/admin/dataHandling/helpers/paginator";
import autocomplete from "@/components/admin/dataHandling/helpers/autocomplete";
export default {

name: "categorieseditComponent",
  created(){
    this.preparePaginator();


  },
  components:{
  categorieseditDialogComponent,
    categoriesAddDialogComponent,
    paginator,
    autocomplete
  }
  ,mounted(){


  },computed:{
    getPagesCount(){
      let count = this.categoryCount / this.perPage;
      console.log(count);
      return Math.ceil(count);
    }
  },
  methods:{
    receiveACinput(input){
      let app = this;
      axios.get("http://localhost:3000/categoriesSearch/"+input)
          .then(function(res){
            console.log(res.data);
            app.categoriesFromACquery = res.data;

          }).catch(function(e){
        console.log("Error" + e)
      })
    },
    preparePaginator(){
      let $thisref =this;
      axios.get( "http://localhost:3000/categoriescount")
          .then(res=> {
                console.log(res);
                $thisref.categoryCount = res.data[0].count;
                $thisref.totalPages = $thisref.getPagesCount;
                this.getAllCategories();

              }
          )


    },
    onPageChange(page){
      this.currentPage=page;
      this.getAllCategories();
      console.log(this.currentPage);
    },itemFromSearch(item){
      console.log(item);
      this.edit(item);
    },
  addCategory(){
    this.showAdd = true;

  },
  forceRender(){
      this.componentKey++;
    },
    closeAdd(){
    this.showAdd = false;
this.getAllCategories();
    },
  closeEdit(){

    this.showEdit = false;

    this.forceRender();
    this.getAllCategories();
  },
  getAllCategories(){
    this.categories=[];
    const from = (this.currentPage - 1 )* this.perPage;
    axios.get(`http://localhost:3000/categoriesPaginated/${from}/${this.perPage}` )
        .then(response=>{
          response.data.forEach(item=>{
            this.categories.push(item);
          })
        })

  },
    edit(cat){
    console.log(cat);
    this.categoryToEdit=cat;
    this.forceRender();
    this.showEdit=true;
    },
    deleteme(cat){


    axios.delete("http://localhost:3000/categories",{data:cat})
      .then(response=>{
        console.log(response);
        this.getAllCategories();
      })

    },
  },
  data(){
  return{
    categories:[]
    ,showEdit:false,
    componentKey:0,
    categoryToEdit:[],
    showAdd:false,
    currentPage: 1,
    totalPages:5,
    perPage:10,
    categoryCount:0,
    categoriesFromACquery:[],
    autocompleteKey:0
  }
  }
}
</script>

<style scoped>
.table{
  table-layout: fixed;
}

</style>