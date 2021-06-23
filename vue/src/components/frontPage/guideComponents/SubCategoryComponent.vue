<template>

  {{propData.description}}
  <div class="container ">
  <div class="row justify-content-center">
  <div class="border-bottom border-top" @change="dataChanged(item)" v-for="(item) in subCat" :key="item.id" >
    <div class="col-md-4 ">
      <label>
      <input type="radio" :id="item.id" :value="item.value" v-model="selectedSub">
      <label :for="item.id">{{item.value}}</label>
        ({{item.count}})
      <div
          class="imagePreviewWrapper"
          :style="{ 'background-image': `url(${propData.imgs[item.id]})` }"
      >

      </div>
        </label>
    </div>
  </div>
    <!-- v-for vyhody nevyhody -->
  </div>
  </div>
  {{selectedSub}}
</template>

<script>
import {ref} from "vue";
import axios from "axios";
export default {
  name: "SubCategoryComponent",
  props: {
    id: Number,
    propData: {Type: Object, default: null},
    selectedIds:{Type:Array,default:null}
  },setup(){
    const selectedSub = ref('');


    return {selectedSub}
  },mounted() {

    if(this.propData!==null && typeof this.propData.values!=="undefined") {

      this.propData.values.forEach(item => {

        this.subCat.push({id: item.id, value: item.value});

      });
      this.getAttCount();
    }


  },
  activated() {

    this.getAttCount();
  }
  ,data(){
    return {
      subCat: [],
      outIds: [],

    }
  },emits:['sendData'],
  methods:{

    dataChanged(item) {


      if (this.selectedItem !== "") {
    if(item.filteredProductIds.length===0){
      this.outIds=null;
    }else {
      this.outIds = item.filteredProductIds;
    }
     // console.log(this.outIds);
      }

    },
    sendData(){
      if(this.selectedSub!==""){
      let send = {
        id:this.propData.id,
        form:this.propData.form,
        selectedBinding: this.propData.selectedBinding,
        selectedValue: this.selectedSub,
        bindedValue: this.propData.bindedValue,
        filteredIds:  this.outIds,
        empty:false
      };
      this.$emit('sendData',send);
    }else{
        let send = {
          id: this.propData.id,
          empty:true
        }
        this.$emit('sendData',send);
      }
    },getAttCount() {

      this.subCat.forEach(item => {

        let sendObj = {
          type:"subcategory",
          value:item.value,
          productList: this.selectedIds
        };


        axios.post(`http://localhost:3000/getparamcount`,sendObj)
            .then(response =>
                {
                  item.count = response.data.length;
                  item.filteredProductIds=response.data;


                }

            );


      })
    }
  }
}
</script>

<style scoped>
.imagePreviewWrapper {
  width: 250px;
  height: 250px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
}

/* IMAGE STYLES */
[type=radio] + img {
  cursor: pointer;
}

/* CHECKED STYLES */
[type=radio]:checked + img {
  outline: 2px solid #f00;
}
</style>