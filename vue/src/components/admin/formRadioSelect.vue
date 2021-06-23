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

  <div v-if="isConfirmable">
    <button @click="AddRadioButton">Add</button>

    <div id="v-model-multiple-RadioButtons">
      <div  v-for="(RadioButton,index) in createdRadioButtons" :key="RadioButton.id">
        <div class="row justify-center">
          <div class="col-md-4"></div>
          <div class="col-md-2">
        <input  type="radio" v-bind:id="index" v-bind:value="RadioButton.value"    />
        <label v-bind:for="index">{{ RadioButton.value }}asdasd</label>
          </div>
        <button @click="RemoveRadioButton(index)">X</button>
          <input class="col-md-4" placeholder="Desc.." v-model="RadioButton.valueDescription"  />
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import BindingSelect from "@/components/admin/BindingSelect";
import {ref} from "vue";
export default {
  name: "formRadioSelect",
//todo: create add button for RadioButton, which data to bind.
  //bind to attribute or value of attribute

  props: {
    id: Number,
    attributesArray: Array,
    propData: {Type: Object, default: null},
    category:Object
  }, setup() {
    //console.log("log " + JSON.stringify(props));

    let idgen = 0;

    //onAdd disable Selecting Binding
const description = ref ('');
    const selected = ref('');
    //  data:{"selectedBinding":item.selectedBinding,values:item.values}
    return {


      selected,
      idgen,
      description
    }
  },
//todo: add component based on returning values from child, cant do the same value for two buttons
  emits: ['delete', 'sendData'],
  methods:
      {
        AddRadioButton() {
          //console.log(this.receivedData);
          //console.log(this.receivedData);

          let val ;
    if(this.receivedData.selectedBinding==="BindByAttribute"){
      val = this.receivedData.selectedAttribute[0].name;
    }else{
    val = this.receivedData.selectedValue.value;
    }

//console.log(val);
    this.createdRadioButtons.push({
      id: this.idgen++,
      value: val,
      valueDescription: ""
    })
        },
        RemoveRadioButton(index) {
          // //console.log(index);
         this.createdRadioButtons.splice(index, 1);
        },

        receiveBindingData(data){
          //console.log(data);
          this.receivedData=data;
          //console.log(this.receivedData);
          this.isConfirmable=true;

         /* this.returningData.SelectedBinding="BindByAttributeValue";
          this.returningData.selectedBindingValue=this.selectedAttribute;
          this.returningData.SelectedBinding="BindByAttribute";


          */
  //dodělat

        //if(this.receivedData.selectedBinding==="BindByAttributeValue")
          this.bindedValue = this.receivedData.selectedAttribute;
          this.selectedBinding = this.receivedData.selectedBinding;
        },

        Delete() {
          this.$emit('delete', this.id);
        },
        sendData() {

          let x = {
            id: this.$props.id,
            form: "form-radio",
            selectedBinding: this.selectedBinding,
            values: this.createdRadioButtons,
            bindedValue:this.bindedValue,
            description: this.description
          };
          this.$emit('sendData', x);
        },
        loadData(){
          if (JSON.stringify(this.propData) !== null&&this.propData!==null) {

            //if(this.propData.selectedBinding==="BindByAttributeValue")
            //  this.selected=this.propData.bindedValue;



            if(typeof this.propData.values !== "undefined") {
              this.description=this.propData.description;

              this.bindedValue = this.propData.bindedValue;
               this.selectedBinding = this.propData.selectedBinding;



              this.propData.values.forEach(item => {
                this.createdRadioButtons.push({
                  id: this.idgen,
                  value: item.value,
                  valueDescription: item.valueDescription
                });
                this.idgen++;
              });


              this.isConfirmable=true;

             // this.bindedValue = this.propData.selectedAttribute;
             // this.selectedBinding = this.propData.selectedBinding;
            }

          }
        }
      },
  components: {
    BindingSelect
  }, data() {
    return {
      ReturnedData: {},
      isConfirmable: false,
      SelectedRadioButtons: [],
      selectedBinding: "",
      bindedValue: "",
      receivedData:[],
      createdRadioButtons:[]
      //  picked:(this.selectedValue ===undefined)? "": this.selectedValue.selectedBinding
    }
  }, mounted() {
    //load buttons if exists :)

    //console.log("Propdata: " + JSON.stringify(this.propData));



    //this.createdRadioButtons = this.propData.values
  }
}


</script>

<style scoped>

</style>
