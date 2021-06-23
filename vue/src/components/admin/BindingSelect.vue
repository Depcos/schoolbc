<template>
<div>Zvolte nastavení atributu.</div>
  <div id="v-model-radiobutton">
    <input type="radio" id="one" value="BindByAttribute"  v-model="picked" />
    <label for="one">Nastavit na atribut</label>
    <br/>
    <div v-show="isRange===false">
    <input type="radio" id="two" value="BindByAttributeValue"  v-model="picked" />
    <label for="two">Nastavit na vlastnost atributu</label>
    </div>
    <br/>
    </div>






  <div v-if="picked" class="form-group">
Attributes:
  <select  multiple class="form-control" v-model="selectedAttribute" @change="attributeSelected">
    <option disabled value="">Please select one</option>
    <option v-for="(item) in attributes" :key="item.id" :value="item">{{item.name}}</option>
  </select>

    <div v-if="picked==='BindByAttributeValue'">
      <div v-if="selectedAttribute">

      <select v-model="selectedAttributeValue" @change="valueSelected">
        <option disabled value="">Please select one</option>
        <option v-for="(item) in attributesValues" :key="item.id" :value="item">{{item.value}}</option>
      </select>

      </div>
    </div>
  </div>


</template>

<script>
//import {ref} from 'vue';
import axios from "axios";

export default {

name: "BindingSelect",
  props:{
    attributesArray: Object,
    propData:{Type: Array,Default:null },
    category:Object,
    isRange:{Type: Boolean,
              Default: false
    }
  },
  created() {
  this.loadAttributes();
  },
  setup(){


  return{
  //  selectedAttribute
  }
  },
  emits: ['selectedBinding','sendData','loaded'],
  methods:
      {
        valueSelected(){
          this.sendData();
        },
        attributeSelected(){
          if(this.picked==="BindByAttributeValue"){

            this.loadAttributesValues(this.selectedAttribute[0] .idAttribute);
          }else{
            this.sendData();
          }
        },
        loadAttributes(){
          ///guideAttributes/:categoryId
          axios.get(`http://localhost:3000/guideAttributes/${this.category.idCategory}`)
              .then((response)=>{
                this.attributes=response.data;


              })
              .catch(error=>{
                console.log(error);
              });
        },
        loadAttributesValues(attId){

          axios.get(`http://localhost:3000/guideAttributesValues/${this.category.idCategory}/${attId}`)
              .then((response)=>{
                this.attributesValues = response.data;
                //console.log(this.attributesValues);
               // //console.log(response.data);
              })
              .catch(error=>{
                console.log(error);
              });
        },
        sendData(){
          let send = {
            //selectedBinding
            //selectedAttribute
            //attributeValue
            selectedBinding: this.picked,
            selectedAttribute: this.selectedAttribute,
            selectedValue: this.selectedAttributeValue
          };
          this.$emit('sendData',send);
        },

      },

  data(){
 return {
   AttributesForPrint:[],
   returningData:{SelectedBinding:"",list:[]},
   picked:"",
   attributes:[],
   attributesValues:[],
   selectedAttributeValue:[],
   selectedAttribute: []

   //selectedBinding: this.picked,
   //selectedAttribute: this.selectedAttribute,


  // selectedAttribute:(typeof this.propData ===undefined||typeof this.propData.values.bindingData===undefined)? "": this.propData.values.bindingData,
 }
  },mounted() {

  if(this.propData!==null) {
this.picked=this.propData.selectedBinding;
this.selectedAttribute = this.propData.bindedValue;
this.$emit('loaded');
if(this.propData.selectedBinding==="BindByAttributeValue")
  this.attributeSelected();
  }

  }



}
</script>

<style scoped>

</style>