<template>
  <h1 class="mt-4">Správa attributů</h1>
  <attributesedit-dialog-component @close="closeEdit"  v-if="showEdit"  :key="componentKey" :attribute="attributeToEdit" ></attributesedit-dialog-component>
<attributes-add-dialog-component @close="closeAdd"  v-if="showAdd"  :key="componentKey"  ></attributes-add-dialog-component>
  <div class="row justify-content-md-center">
    <div class="col-md-4">
  <autocomplete :key="autocompleteKey" @input="receiveACinput" @itemSelected="itemFromSearch" :items=attributesFromACquery />
    </div></div>
  <br>
  <button class="btn btn-success" @click="addAttribute">Přidat atribut</button>

  <div class="table-responsive-md">
  <table id="example" class="table table-striped table-bordered" style="width:100%">
    <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Unit</th>
      <th>Description</th>
      <th></th>
    </tr>
    </thead>
    <tbody>



  <tr v-for="attribute in attributes" :key="attribute.idAttribute">

      <td> {{attribute.idAttribute}} </td>
      <td>{{attribute.name}}</td>
      <td>{{attribute.unit}}</td>
      <td v-if="attribute.Description">{{attribute.Description.substring(0, 120)}}</td>
      <td v-else></td>
      <td>
        <button class="btn btn-primary" @click="edit(attribute)">edit</button>
        <button class="btn btn-secondary" @click="deleteme(attribute)">delete</button>
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
import attributeseditDialogComponent from "@/components/admin/dataHandling/attributeseditDialogComponent";
import attributesAddDialogComponent from "@/components/admin/dataHandling/attributesAddDialogComponent";

import paginator from "@/components/admin/dataHandling/helpers/paginator";
import autocomplete from "@/components/admin/dataHandling/helpers/autocomplete";
export default {
  //vypis všeh
  //insert
  //update
  //delete
name: "attributeseditComponent",
  created(){

this.preparePaginator();

  },
  components:{
  attributeseditDialogComponent,
    attributesAddDialogComponent,
    paginator,
    autocomplete
  }
  ,mounted(){


  },computed:{
  getPagesCount(){
      let count = this.attributeCount / this.perPage;
      console.log(count);
      return Math.ceil(count);
    }
    },
  methods:{
    receiveACinput(input){
      let app = this;
      axios.get("http://localhost:3000/attributesSearch/"+input)
          .then(function(res){

            app.attributesFromACquery = res.data;

          }).catch(function(e){
        console.log("Error" + e)
      })
    },preparePaginator(){
      let $thisref =this;
      axios.get( "http://localhost:3000/attributescount")
          .then(res=> {
                console.log(res);
                $thisref.attributeCount = res.data[0].count;
                $thisref.totalPages = $thisref.getPagesCount;
                this.getAllAttributes();

              }
          )


    },
    onPageChange(page){
      this.currentPage=page;
      this.getAllAttributes();
      console.log(this.currentPage);
    },itemFromSearch(item){
      console.log(item);
      this.edit(item);
    },

  addAttribute(){
    this.showAdd = true;

  },
  forceRender(){
      this.componentKey++;
    },
    closeAdd(){
    this.showAdd = false;
this.getAllAttributes();
    },
  closeEdit(){

    this.showEdit = false;
    this.forceRender();
    this.getAllAttributes();
  },
  getAllAttributes(){
      this.attributes = [];
    const from = (this.currentPage - 1 )* this.perPage;

    console.log(from);


    axios.get(`http://localhost:3000/attributesPaginated/${from}/${this.perPage}` )
        .then(response=>{
          response.data.forEach(item=>{
            this.attributes.push(item);
          })
        })

  },
    edit(cat){
    console.log(cat);
    this.attributeToEdit=cat;
    this.forceRender();
    this.showEdit=true;
    },
    deleteme(att){

    console.log(att);
    axios.delete("http://localhost:3000/attributes",{data:att})
      .then(response=>{
        console.log(response);
        this.getAllAttributes();
      })

    },
  },
  data(){
  return{
    attributes:[]
    ,showEdit:false,
    componentKey:0,
    attributeToEdit:[],
    showAdd:false,currentPage: 1,
    totalPages:5,
    perPage:10,
    attributeCount:0,
    attributesFromACquery:[],
    autocompleteKey:0
  }
  }
}
</script>

<style scoped>

</style>