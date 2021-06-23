<template>

  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="description">

              <div class="form-group">

              Název Produktu:<input class="form-control" v-model="nameref" :placeholder="product.name">     <br>

              link Produktu: <input class="form-control" v-model="linkref" :placeholder="product.link">     <br>

              imglink Produktu:<input class="form-control" v-model="imglinkref" :placeholder="product.imgLink">     <br>

              popis Produktu:<textarea class="form-control" v-model="Descriptionref" :placeholder="product.Description">   </textarea>
<br>
                Kategorie:
              <select class="form-control" @change="setCategory($event)" v-model="selected">
                <option  v-for="(category) in categories" :key="category.idCategory">{{category.name}}</option>
              </select>

              <div class="col-md-4">
              Rating:  <input  class="form-control" type="number" min="0" max="5" step="0.1" v-model="rating" />
              </div>
              </div>

            </slot>
            <div class="row">
            <div class="col-md-6" name="attributes">
              <ProductAttributesComponent
              :product = product
              :edit="true"
              ></ProductAttributesComponent>
            </div>
              <div class="col-md-6" name="attributes">
                <product-subcategories-component
                    :product = product
                    :edit="true"
                ></product-subcategories-component>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">
                zpět
              </button>
              <button class="modal-default-button" @click="edit">
                edit and save
              </button>

            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
import axios from "axios";
//import {ref} from "vue";
import ProductAttributesComponent from "@/components/admin/dataHandling/ProductAttributesComponent";
import productSubcategoriesComponent from "@/components/admin/dataHandling/productSubcategoriesComponent";
export default {
  components:{
    ProductAttributesComponent,productSubcategoriesComponent
  },
  name: "categorieseditDialogComponent",
  props:['product'],
  setup(){


    return{

    }
  },
  created() {
    this.initCat();
  },
  methods:{
    setCategory(e){

      const index = this.categories.findIndex(x=> x.name === e.target.value);
      if(index!==-1){
        this.selectedCategory = this.categories[index];
      }

    },
    getCategory(){
      const index = this.categories.findIndex(x=> x.idCategory === this.product.Categories_idCategory);
      if(index!==-1){
        this.selected = this.categories[index].name;
        this.selectedCategory = this.categories[index];
    }},
    initCat(){
      let $thisref = this;
      axios.get("http://localhost:3000/categories")
          //get categories into component data
          .then(response => {
        $thisref.categories=response.data
          $thisref.getCategory();
          }

          )

    },
    edit() {

      let update = {
        idProduct : this.product.idProduct,
        name: this.nameref,
        link: this.linkref,
        imgLink:this.imglinkref,
        Description:this.Descriptionref,
        Categories_idCategory: this.selectedCategory.idCategory,
        rating: parseFloat(this.rating)
      }

      if (this.nameref !== "") {

        axios.put(`http://localhost:3000/products`, update)
            .then(res => {
              console.log(res);
              this.$emit('close');
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
      }else{
        alert("Nevyplněné jméno");

      }
    }
  },data(){
    return{
       nameref : this.product.name,
       linkref : this.product.link,
       imglinkref : this.product.imgLink,
       Descriptionref : this.product.Description,
       categoryRef : this.product.Categories_idCategory,
      categories:[],
      selectedCategory:[],
      selected:"",
      rating: parseFloat( this.product.rating)
    }
  }

}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}


.modal-container {
  width: 65%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  word-wrap: break-word;
  max-height: calc(100vh - 210px);
  overflow-y: auto;
}

img{width: 100px;height: 100px;}
.modal-default-button {
  display: block;
  margin-top: 1rem;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>