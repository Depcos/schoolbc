<template>
  <h1 class="mt-4">Správa subkategorií </h1>
  <subcategoriesedit-dialog-component @close="closeEdit"  v-if="showEdit"  :key="componentKey" :subcategory="subcategoryToEdit" ></subcategoriesedit-dialog-component>
<subcategories-add-dialog-component @close="closeAdd"  v-if="showAdd"  :key="componentKey"  ></subcategories-add-dialog-component>
  <div class="row justify-content-md-center">
    <div class="col-md-4">
  <autocomplete :key="autocompleteKey" @input="receiveACinput" @itemSelected="itemFromSearch" :items=subcategoriesFromACquery />
    </div></div>
  <br>
  <button class="btn btn-success" @click="addCategory">Přidat subkategorii</button>

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
    <tr v-for="subcategory in subcategories" :key="subcategory.idCategory">

      <td>  {{subcategory.idSubCategory}}  </td>
      <td>  {{subcategory.name}}</td>
      <td>
        <button class="btn btn-primary" @click="edit(subcategory)">edit</button>
        <button class="btn btn-secondary" @click="deleteme(subcategory)">delete</button>
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
import subcategorieseditDialogComponent from "@/components/admin/dataHandling/subcategorieseditDialogComponent";
import subcategoriesAddDialogComponent from "@/components/admin/dataHandling/subcategoriesAddDialogComponent";
import paginator from "@/components/admin/dataHandling/helpers/paginator";
import autocomplete from "@/components/admin/dataHandling/helpers/autocomplete";
export default {
  //vypis všeh
  //insert
  //update
  //delete
name: "subcategorieseditComponent",
  created(){
    this.preparePaginator();

//this.getAllSubCategories();

  },
  components:{
  subcategorieseditDialogComponent,
    subcategoriesAddDialogComponent,
    paginator,
    autocomplete
    },
  computed:{
    getPagesCount(){
      let count = this.subcategoryCount / this.perPage;
      console.log(count);
      return Math.ceil(count);
    }
  }

  ,mounted(){


  },
  methods:{
    receiveACinput(input){
      let app = this;
      axios.get("http://localhost:3000/subcategoriesSearch/"+input)
          .then(function(res){

            app.subcategoriesFromACquery = res.data;
            //app.autocompleteKey++;

            //  this.subcategoriesFromACquery = res.data;
            // app.results=res.data;
          }).catch(function(e){
        console.log("Error" + e)
      })
    },preparePaginator(){

      let $thisref =this;
      axios.get( "http://localhost:3000/subcategoriescount")
          .then(res=> {

                $thisref.subcategoryCount = res.data[0].count;
                $thisref.totalPages = $thisref.getPagesCount;
                this.getAllSubCategories();
                //console.log($thisref.subcategoryCount);
              }
          )

      //get subcategory count
      //LIMIT 15, 10
    },
    onPageChange(page){
      this.currentPage=page;
      this.getAllSubCategories();

    },itemFromSearch(item){

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
this.getAllSubCategories();
    },
  closeEdit(){

    this.showEdit = false;

    this.forceRender();
    this.getAllSubCategories();
  },
  getAllSubCategories(){
    this.subcategories = [];
    const from = (this.currentPage - 1 )* this.perPage;

    //console.log(from);

    //page page-1*10   1 * 10
    //page  page-1*10   2 * 10


    axios.get(`http://localhost:3000/subcategoriesPaginated/${from}/${this.perPage}` )
        .then(response=>{
          response.data.forEach(item=>{
            this.subcategories.push(item);
          })
        })
    /*
    this.subcategories=[];
    axios.get("http://localhost:3000/subcategories/",)
        .then(response=>{

          response.data.forEach(item=>{
            this.subcategories.push(item);
          })
        })

     */
  },
    edit(cat){
    //console.log(cat);
    this.subcategoryToEdit=cat;
    this.forceRender();
    this.showEdit=true;
    },
    deleteme(cat){

   // console.log(cat);
    axios.delete("http://localhost:3000/subcategories",{data:cat})
      .then(response=>{
        console.log(response);
        this.getAllSubCategories();
      })

    },
  },
  data(){
  return{
    subcategories:[]
    ,showEdit:false,
    componentKey:0,
    subcategoryToEdit:[],
    showAdd:false,
    currentPage: 1,
    totalPages:5,
    perPage:10,
    subcategoryCount:0,
    subcategoriesFromACquery:[],
    autocompleteKey:0
  }
  }
}
</script>

<style scoped>

</style>