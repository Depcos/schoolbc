<template>
  <filter-component v-show="showFilter" @sendFilter="ReceiveFilter" ref="filter"></filter-component>
  <div class="row">
    <div class="col-lg-4 col-md-6 mb-4" v-for="(product,index) in Products" :key="`item-${index}`">
      <div class="card h-100">
        <img class="img-fluid" alt="Responsive image" :src="product.imgLink">
        <div class="card-body">
          <h4 class="card-title">
            <a @click="openDetail(product.idProduct)" >{{ product.name }}</a>
          </h4>
          <h5>Cena:{{ product.price }}</h5>

          <p class="card-text">{{ product.Description.substring(0, 100) }}...</p>

        </div>
        <div class="align-items-center">
          <div class="d-flex justify-content-center">
          <star-rating

              class="rating"
              :star-size="25"
              :read-only="true"
              :increment="0.1"
              v-model:rating="product.rating"
          ></star-rating>
          </div>
        <div class="card-footer">
          <button class="btn btn-dark" @click="openDetail(product.idProduct)">detail</button>
        </div>
        </div>
      </div>
    </div>


  </div>

  <paginator
      v-if="showFilter"
     :key="paginatorKey"
      :total-pages="totalPages"
      :per-page="perPage"
      :max-visible-buttons="totalPages<3?totalPages:3"
      :current-page="currentPage"
      @pagechanged="onPageChange"
  >

  </paginator>


  <product-detail-component @close="closeMe" v-if="showProduct" :id="selectedProductId"
                            :key="selectedProductId"></product-detail-component>


</template>

<script>
//import axios from "axios";

import filterComponent from "@/components/frontPage/filterComponent";
import StarRating from 'vue-star-rating'

import axios from "axios";

import ProductDetailComponent from "@/components/frontPage/productDetailComponent";
import paginator from "@/components/admin/dataHandling/helpers/paginator";

export default {
  name: "productsComponent",
  components: {paginator, ProductDetailComponent, filterComponent,StarRating},
  props: {
    filters: {Type: Object, default: null},
    default: null
  }
  ,
  setup() {




    return {}
  }, mounted() {
    //get count
    //then get
    this.$refs.filter.sendFilter();

//console.log("Log props "+JSON.stringify(this.props));
    let a = this;


    if (a.filters !== null) {
      this.preparePaginator();

    }


  }, methods: {
    preparePaginator() {

      if(typeof this.filters.values!=="undefined"){
       this.productCount =  this.filters.values.length;
       this.totalPages = this.getPagesCount;
       this.getAllProducts();
      }else {


        let $thisref = this;
        axios.post("http://localhost:3000/productsFilteredCount",this.filters)
            .then(res => {

                  $thisref.productCount = res.data[0].count;
                  $thisref.totalPages = $thisref.getPagesCount;
                  this.getAllProducts();

                }
            )
      }
    }, onPageChange(page) {
      this.currentPage = page;
      this.getAllProducts();

    },
    getAllProducts() {

      if(this.filters!==null) {

        this.Products = [];
        const from = (this.currentPage - 1) * this.perPage;


        let send = {filter: this.filters, limit: {from: from, to: this.perPage}, SortFilter: this.SortingFilter}


        axios.post(`http://localhost:3000/products`, send)
            .then(response => { //console.log(response.data);
                  this.Products = response.data;
                  this.showFilter = true;


                }
            );



        //page page-1*10   1 * 10
        //page  page-1*10   2 * 10

      }
    },
    sortByName() {

      this.SortingFilter.sortBy = "Name";

    }, sortByPrice() {
      //little hack bcs cant sort by price -> varchar issues
      this.SortingFilter.sortBy = "ABS(price)";
    },



    ReceiveFilter(data) {



      switch (data.orderBy) {
        case "price":
          this.sortByPrice();
          break;
        case "name":
          this.sortByName();
          break;
          case "idProduct":
            this.SortingFilter.sortBy = "idProduct";
            break;
              case "rating":
                this.SortingFilter.sortBy = "rating";
                break;
      }

      if (data.order === "desc") {
        this.SortingFilter.orderBy="desc";
      }else{
        this.SortingFilter.orderBy="asc";
      }


this.getAllProducts();

      //orderby
      //asc-desc

    },


    openDetail(id) {
      this.selectedProductId = id;
      this.showProduct = true;

    //  console.log("id open" + id);
    },
    closeMe() {
      this.showProduct = false;
    }
  }, computed: {
    getPagesCount() {

      let count = this.productCount / this.perPage;
     // console.log(count);
      return Math.ceil(count);
    }

  },
  data() {
    return {
      showProduct: false,
      selectedProductId: 0,
      showModal: false,
      showFilter: false,
      sortData: Object,
      Products: [],
      currentPage: 1,
      totalPages: 5,
      perPage: 9,
      productCount: 1,
      paginatorKey:0,
      SortingFilter:{
        sortBy: "Price",
        orderBy: "asc"
      }
    }
  }
}
</script>

<style scoped>
.vue-star-rating{
  display: block !important;
}
</style>