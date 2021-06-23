<template>


  <div id="v-model-multiple-RadioButtons">
{{propData.description}}
    <div @change="dataChanged(RadioButton)" v-for="(RadioButton,index) in createdRadioButtons" :key="RadioButton.id">
      ({{RadioButton.count}})
      <input type="radio" v-bind:id="index" v-bind:value="RadioButton.value" v-model="SelectedRadio" />
       <label v-bind:class="[{ tooltip : RadioButton.valueDescription!=='' },'']"  v-bind:for="index">{{ RadioButton.value }}
        <span class="tooltiptext">{{RadioButton.valueDescription}}</span>
      </label>

    </div>
{{SelectedRadio}}
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
export default {
  name: "RadioComponent",
  props: {
    id: Number,
    propData: {Type: Object, default: null},
    selectedIds:{Type:Array,default:null}
  },setup(){
    const SelectedRadio = ref('');

    return {SelectedRadio}
  },mounted() {
    if (JSON.stringify(this.propData) !== null&&this.propData!==null) {
      //if(this.propData.selectedBinding==="BindByAttributeValue")
      //  this.selected=this.propData.bindedValue;


      if(typeof this.propData.values !== "undefined") {
        this.propData.values.forEach(item => {
          //console.log(item.value);
          this.createdRadioButtons.push({id: item.id, value: item.value,valueDescription:item.valueDescription});
          this.idgen++;
        });
      }

    }
    this.getAttCount();
  },data(){
    return {
      createdRadioButtons:[],
      idgen:0,
      outIds: []
    }
  },emits:['sendData'],
  activated() {
    //console.log("activated");
  this.getAttCount();
    },
  methods:{



    dataChanged(item) {
      //console.log(item);

      if (this.selectedItem !== "") {
        this.outIds = item.filteredProductIds;

      }
    },

    sendData(){
      if(this.SelectedRadio!==""){
//console.log("sendata radio");
      if(this.outIds!==null){
        if(this.outIds.length===0){
          this.outIds=null;
        }
      }
console.log(this.outIds);
      let send = {
        id:this.propData.id,
        form:this.propData.form,
        selectedBinding: this.propData.selectedBinding,
        selectedValue: this.SelectedRadio,
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
    },
    getAttCount() {
      //console.log("GETTATTCOUNT");
      this.createdRadioButtons.forEach(item => {
        //console.log(item);

        let sendObj = {
          type:"radio",
          value:item.value,
          productList: this.selectedIds,
          selectedBinding: this.propData.selectedBinding,
          bindedValue: this.propData.bindedValue
        };
        console.log("_____________________________");
        console.log(sendObj);
        console.log("_____________________________");

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


      })
    }
  }

}
</script>

<style scoped>

</style>