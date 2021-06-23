<template>
  <nav class="navbar navbar-dark bg-dark navbar-default">
    <div class="container row">
      <a class="navbar-brand col-md-4" >Inteligentní průvodce</a>
      <div class="col-md-4">
        <div class="autocomplete-results">
      <autocomplete class="autocomplete"  :key="autocompleteKey" @input="receiveACinput" @itemSelected="itemFromSearch" :items=productsFromACquery />
        </div>
    </div>
    </div>
  </nav>
<div style="margin-top: 60px"></div>
  <div class="container">
    <guide-component @close="closeMe"  v-if="showGuide" :category="guideCategory"  >
    </guide-component>
    <div class="row">
      <div class="col-lg-3">


<div style="margin-top: 35px">
        <button class="btn btn-success" v-show="guideAvailable" @click="openGuide">Zobrazit průvodce</button>
</div>
        <h1 class="my-4">Kategorie</h1>
        <div class="list-group">
          <CategoryComponent @categoryEmit="ReceiveCategory"></CategoryComponent>

        </div>

      </div>
      <!-- /.col-lg-3 -->

      <div class="col-lg-9">

        <div class="my-4" >
          <products-component :key="componentKey" :filters="filters.value" ref="products_component"></products-component>
        </div>


        <!-- /.row -->

      </div>
      <!-- /.col-lg-9 -->

    </div>
    <!-- /.row -->

  </div>
  <!-- /.container -->

  <!-- Footer -->
  <footer class="py-5 bg-dark">
    <div class="container">
      <p class="m-0 text-center text-white ">Inteligentní nástroj pro vyhledávání</p>
    </div>
    <!-- /.container -->
  </footer>

</template>

<script>
import {ref} from 'vue';
import CategoryComponent from "@/components/frontPage/CategoryComponent";
import productsComponent from "@/components/frontPage/productsComponent";
import GuideComponent from "@/components/frontPage/guideComponent";
import autocomplete from "@/components/admin/dataHandling/helpers/autocomplete";
import axios from "axios";

export default {
name: "frontPageComponent",
  setup(){
  const filters = ref([]);
  return{
    filters
  }
  },
  components:{
    GuideComponent,
  CategoryComponent,
    productsComponent,
autocomplete
  },methods:{
  forceRender(){
    this.componentKey++;
  },
    receiveACinput(input){
      let app = this;
      axios.get("http://localhost:3000/productsSearch/"+input)
          .then(function(res){
            console.log(res.data);
            app.productsFromACquery = res.data;

          }).catch(function(e){
        console.log("Error" + e)
      })
    },
    itemFromSearch(item){
      console.log(item);
      //this.edit(item);
      this.$refs.products_component.openDetail(item.idProduct);
    },
  ReceiveCategory(data){
    //this.$refs.filter.sendFilter();

   // console.log("received "+JSON.stringify( data));
    this.categorySetting=data;
   // this.showFilter=true;
  //  console.log(data);

    if(data.cat==="subcategory"){
      this.guideCategory=data.mainCat;
    }else{
    this.guideCategory=data.name;
    }


    this.createFilter();


//ijsaedbnfaiuwhebfaweouzhif

this.setGuideAvailable();
    //check for available guide
    axios.get(`http://localhost:3000/settingsJson/${this.guideCategory}`)
        .catch(error => {
          console.log(error);
         this.resetGuideAvailable();
          //eror
        });




    //this.filters.value=data;

  }

    ,createFilter(){
    //console.log("createFilter");
      this.filters.value=this.categorySetting;
      this.forceRender();
    },
    openGuide(){
    this.showGuide=true;
    },closeMe(data){
    this.showGuide=false;

if(typeof data !== "undefined"){
  console.log("VYPINÁM GUIDE SORTÍM DATA");

  console.log(data);
if(data.length===0){
  this.filter.value=this.categorySetting;
}else {

  this.filters.value = {values: data, category: this.guideCategory};
}

  this.forceRender();


}

    }
    , isCheckBox(data){
    if(data.form==="form-multiple"){
      return true;
    }else{
      return false;
    }
}, isRange(data){
      if(data.form==="form-range"){
        return true;
      }else{
        return false;
      }
    },
    setGuideAvailable(){
    this.guideAvailable=true;
    },
    resetGuideAvailable(){
    this.guideAvailable=false;
    }



  },data(){
  return{
    componentKey:0,
  categorySetting:Object,
    sortingSetting:Object,
    productsFromACquery:[],
    showGuide:false,
    guideCategory:"",
    guideAvailable:false,
    autocompleteKey:0
  }
  }
}
</script>

<style scoped>
.navbar{

  position: absolute;
  top: 0;
  width: 100%;
}
.autocomplete-results {

}
.navbar-nav.navbar-center {
  position: absolute;
  left: 50%;
  transform: translatex(-50%);

}

</style>