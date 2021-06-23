<template>
  <button class="btn btn-warning float-left" style="margin-left: 10px" @click="Delete">Smazat krok</button>
  <br>
  <div class="form-group">
    <label for="Desc">Popis:</label>
    <textarea class="form-control" id="Desc" rows="3" v-model="description" ></textarea>
  </div>

  <binding-select
      @loaded="loadData"
      @sendData="receiveBindingData"
      :propData="propData"
      :category="category"
      :isRange="false"
  >
  </binding-select>
  <div>
  </div>

  <div v-if="isConfirmable">
  <button @click="AddCheckBox">Add</button>

    <div id="v-model-multiple-checkboxes">

    <div v-for="(checkbox,index) in createdCheckBoxes" :key="checkbox.id">

    <input type="checkbox" v-bind:id="index" v-bind:value="checkbox.value" v-model="SelectedBoxes" />
    <label v-bind:for="index">{{ checkbox.value }}</label>
    <button @click="RemoveCheckBox(index)">X</button>
      <input class="col-md-4" placeholder="Desc.." v-model="checkbox.valueDescription"  />
    </div>
  {{SelectedBoxes}}
  </div>
  </div>




</template>

<script>
import BindingSelect from "@/components/admin/BindingSelect";
import {ref} from "vue";
export default {
  name: "CheckBoxComponent",
//todo: create add button for checkbox, which data to bind.
  //bind to attribute or value of attribute
  props: {
    id: Number,
    attributesArray: Array,
    propData: {Type: Object, default: null},
    category:Object
  }, setup() {
  let idgen =0;

    //onAdd disable Selecting Binding
const description = ref ('');
  const selected  = ref('');




    return{

      selected,
      idgen,description

    }
  },
//todo: add component based on returning values from child, cant do the same value for two buttons
  emits: ['delete','sendData'],
  methods:
      {
       AddCheckBox(){
         let val ;
         if(this.receivedData.selectedBinding==="BindByAttribute"){
           val = this.receivedData.selectedAttribute[0].name;
         }else{
           val = this.receivedData.selectedValue.value;
         }



  this.createdCheckBoxes.push({
    id:this.idgen++,
    value:val,
    valueDescription: ""
  });

},
 RemoveCheckBox(index){
  //console.log(index);
  this.createdCheckBoxes.splice(index, 1);
},
        receiveBindingData(data){
          //console.log(data);
          this.receivedData=data;
          //console.log(this.receivedData);
          this.isConfirmable=true;
          this.bindedValue = this.receivedData.selectedAttribute;
          this.selectedBinding = this.receivedData.selectedBinding;
        },


        Delete() {
          this.$emit('delete', this.id);
        },
  sendData(){
    let x = {id:this.$props.id,
      form:"form-multiple",
      selectedBinding:this.selectedBinding,
      description:this.description,
      values:this.createdCheckBoxes,
      bindedValue:this.bindedValue
    };
    this.$emit('sendData',x);


  }
,loadData(){
          if (JSON.stringify(this.propData) !== null&&this.propData!==null) {
            if(typeof this.propData.values !== "undefined") {
              this.description=this.propData.description;
              this.bindedValue = this.propData.bindedValue;
              this.selectedBinding = this.propData.selectedBinding;

              this.propData.values.forEach(item => {
                this.createdCheckBoxes.push({
                  id: this.idgen++,
                  value: item.value,
                  valueDescription: item.valueDescription
                });

              });
              this.isConfirmable=true;
            }

          }
        }


      },
  components:{
    BindingSelect
  },data(){
    return {
        ReturnedData:{},
      isConfirmable:false,
      SelectedBoxes: [],
      selectedBinding: "",
        bindedValue:"",
      createdCheckBoxes:[],
      receivedData:[]
    }
  },
  mounted(){
    /*
    if(this.propData!==null&&typeof this.propData.values!=="undefined") {
      this.description=this.propData.description;
      this.propData.values.forEach(item => {
        this.createdCheckBoxes.push({id:this.idgen,value:item.value});
        //this.createdRadioButtons.push({id:this.idgen,value:item.value});
        this.idgen++;
      });
    }


     */
  }

}
</script>

<style scoped>

</style>
