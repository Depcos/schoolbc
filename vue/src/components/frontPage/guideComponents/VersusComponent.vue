<template>
  {{propData.description}}
  <br>
  <br>
  <div class="container">
    <div class="row">
  <div  class="col-md-6 border border-light" @change="dataChanged(item)"  v-for="(item) in versusData" :key="item.id" >
    <div>
      <label :for="item.id">{{item.value}}
      <input  type="radio" :id="item.id" :value="item.value" v-model="selectedItem">
      ({{item.count}})
      <div
          class="imagePreviewWrapper"
          :style="{ 'background-image': `url(${propData.imgs[item.id]})` }"
      >
      </div>


      </label>
      <div style="margin-left:3px" class="row" v-for="(pro) in item.attributeList.pros" :key="pro.id">
        <div class="text-left">
          <font-awesome-icon style="color:green" icon="plus-circle" />{{" "+pro.value}}</div>
      </div>

      <div style="margin-left:3px" class="row" v-for="(con) in item.attributeList.cons" :key="con.id">
        <div v-if="con.value">
          <div class="text-left">
          <font-awesome-icon style="color:red" icon="minus-circle" />{{" "+con.value}}</div>
        </div>
      </div>
    </div>
  </div>
    </div>
  </div>






</template>

<script>
import {ref} from "vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from "axios";

export default {

name: "VersusComponent",
  props: {
    id: Number,
    propData: {Type: Object, default: null},
selectedIds:{Type:Array,default:null}
  },
  setup(){
const selectedItem = ref('');
    //const count = ref(0)


return{
  selectedItem
}
  },watch:{

  }

  ,components:{
  FontAwesomeIcon
  } ,data(){
  return{
    versusData: [],
    outIds: []
  }

  },mounted() {
    if(this.propData!==null&&typeof this.propData.values!=="undefined") {

      //console.log("this propdata "+JSON.stringify(this.propData))

      this.propData.values.forEach(item => {
        let varpros=[];
        item.attributeList.pros.forEach(item=>{
          varpros.push({id:item.id,value:item.value})
        })
        let varcons=[];
        item.attributeList.cons.forEach(item=>{
          varcons.push({id:item.id,value:item.value})
        })


        this.versusData.push(
            {
              id: item.id, value: item.value, attributeList: {
                pros: varpros, cons: varcons
              }
            }

        );


        //console.log(item.attributeList.pros);
        //console.log(item.attributeList.cons);


        // this.createdRadioButtons.push({id:this.idgen,value:item.value});

      });

this.getAttCount();
    }

  },emits:['sendData'],
  activated() {
    //console.log("activated");
    this.getAttCount();
  },
  methods: {
    dataChanged(item) {
      //console.log(item);

      if (this.selectedItem !== "") {
        this.outIds = item.filteredProductIds;

      }
    },
    sendData() {




      //console.log(item);
      //console.log("sendData!");

      if (this.selectedItem !== "") {

        let send = {
          id: this.propData.id,
          form: this.propData.form,
          selectedBinding: this.propData.selectedBinding,
          selectedValue: this.selectedItem,
          bindedValue: this.propData.bindedValue,
          filteredIds:  this.outIds,
          empty:false
        };

        this.$emit('sendData', send);
      }else{
        let send = {
          id: this.propData.id,
          empty:true
        }
        this.$emit('sendData',send);
      }
    }
    , getAttCount() {
      //console.log("GETTATTCOUNT");
      this.versusData.forEach(item => {
        //console.log(item);
        let sendObj = {
          type:"subcategory",
          value:item.value,
          productList: this.selectedIds
        };

//console.log(sendObj);
////console.log("sending..");
        axios.post(`http://localhost:3000/getparamcount`,sendObj)
            .then(response =>
                { ////console.log(response.data);
                //  //console.log("response");
                // //console.log(response.data);
                   item.count = response.data.length;
                   item.filteredProductIds=response.data;
                //  //console.log(item.count);
                  /*
                  this.Products.value = response.data;
                  this.showFilter=true;
                  this.$refs.filter.sendFilter();
                  //console.log(response.data);
                  */

                }

            );
        //versus

      })
    }
  }
}
</script>

<style scoped>
.imagePreviewWrapper {
  width: 160px;
  height: 250px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
}
</style>