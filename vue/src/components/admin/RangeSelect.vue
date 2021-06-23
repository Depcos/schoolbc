<template>
  <button class="btn btn-warning float-left" style="margin-left: 10px" @click="Delete">Smazat krok</button>
  <br>
  <div>

    <!--
    <input v-model="range" type="range"  name="volume"
           :min="minValue" :max="maxValue">

-->


    <div class="form-group">
      <label for="Desc">Popis:</label>
      <textarea class="form-control" id="Desc" rows="3" v-model="description" ></textarea>

    </div>

    <input style="justify-content: center" type="number" min="0" placeholder="1" step="1" v-model="minRange">
   <br>
   <input style="justify-content: center" type="number" min="0" placeholder="0" step="1" v-model="maxRange">
        <div id="app">
          <div class='range-slider'>
            <input type="range" :min="minRange" :max="maxRange" step="1" v-model="sliderMin">
            <input style="display: none" type="number" :min="minRange" :max="maxRange" step="1" v-model="sliderMin">
            <input type="range" :min="minRange" :max="maxRange" step="1" v-model="sliderMax">
            <input style="display:none" type="number" :min="minRange" :max="maxRange" step="1" v-model="sliderMax">
          </div>
        </div>



      </div>
  <binding-select
      @loaded="loadData"
      @sendData="receiveBindingData"
      :propData="propData"
      :category="category"
      :isRange="true"
  >

  </binding-select>

    </template>

    <script>
      import {ref} from 'vue';
      import BindingSelect from "@/components/admin/BindingSelect";


//todo: range dodělat binding jen na attribut.
      export default {
        props: {
          id: Number,
          attributesArray: Array,
          propData: {Type: Object, default: null},
          category:Object
        }
        ,
        name: "RangeSelect",
        emits:['delete','sendData'],

        methods:
            {
              reload(){
                //console.log("rangereload");
                this.getAttCount();
              },
              receiveBindingData(data){
                this.receivedData=data;
                //console.log(data);
                this.bindedValue = this.receivedData.selectedAttribute;
                this.selectedBinding = this.receivedData.selectedBinding;
              },

              Delete() {
                this.$emit('delete',this.id);
              },
        sendData(){


          let x = {
            id:this.$props.id,
            form:"form-range",
            selectedBinding:this.selectedBinding,
            bindedValue: this.bindedValue,
            description:this.description,
            values:{max:this.maxRange,
              min:this.minRange,
              }
           };
         //console.log("Sending data from "+JSON.stringify( x));
          this.$emit('sendData',x);

          /*
          //this.$emit('sendData',"HelloWorld");
          let x = {id:this.$props.id,form:"RangeSelectForm",values:{min:this.maxRange,max:this.minRange}};
         // {id:this.$props.id,form:"",values:{min:this.maxRange,max:this.minRange},binding:}
          this.$emit('sendData',x);
           */

        },  loadData(){
                if(this.propData!==null&&typeof this.propData.values!=="undefined") {
                  this.description=this.propData.description;
                  this.maxRange=this.propData.values.max;
                  this.minRange=this.propData.values.min;
                  ////console.log("propdatavaluebindingdata: "+this.propData.values.bindingData);
                  this.bindedValue = this.propData.bindedValue;
                  this.selectedBinding = this.propData.selectedBinding;
                }

              }
            },
        setup(){
          //console.log("rangeprops "+JSON.stringify( props));
         // const selected  = ref('');
          const range = ref('');
          const minRange = ref('');
          const maxRange = ref('');
          const description = ref ('');

          return{
            range,minRange,maxRange,description
          }
        },  mounted(){


        },
        data(){
          return {
            //pass attribute and get his max and min from api.
              minAngle:0,
            maxAngle:50,
            ReturnedData:{},
            isConfirmable:false,
            //selected: (typeof this.propData.values.bindingData ===undefined)?"":this.propData.values.bindingData
            selectedBinding: "",
            bindedValue: "",
            receivedData:[],

            // selectedAttribute:(typeof this.selectedValue ===undefined||typeof this.selectedValue.values.bindingData===undefined)? "": this.selectedValue.values.bindingData,
          }},components:
            {BindingSelect},
        computed: {
          sliderMin: {
            get: function() {
              var val = parseInt(this.minAngle);
              return val;
            },
            set: function(val) {
              val = parseInt(val);
              if (val > this.maxAngle) {
                this.maxAngle = val;
              }
              this.minAngle = val;
            }
          },
          sliderMax: {
            get: function() {
              var val = parseInt(this.maxAngle);
              return val;
            },
            set: function(val) {
              val = parseInt(val);
              if (val < this.minAngle) {
                this.minAngle = val;
              }
              this.maxAngle = val;
            }
          }
        }
      }
      //emit value from rangeComponent

    </script>

    <style scoped>
      .range-slider {
        width: 300px;
        margin: auto;
        text-align: center;
        position: relative;
        height: 6em;
      }

      .range-slider input[type=range] {
        position: absolute;
        left: 0;
        bottom: 0;
      }

      input[type=number] {
        border: 1px solid #ddd;
        text-align: center;
        font-size: 1.6em;
        -moz-appearance: textfield;
      }

      input[type=number]::-webkit-outer-spin-button,
      input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }

      input[type=number]:invalid,
      input[type=number]:out-of-range {
        border: 2px solid #ff6347;
      }

      input[type=range] {
        -webkit-appearance: none;
        width: 100%;
      }

      input[type=range]:focus {
        outline: none;
      }

      input[type=range]:focus::-webkit-slider-runnable-track {
        background: #2497e3;
      }

      input[type=range]:focus::-ms-fill-lower {
        background: #2497e3;
      }

      input[type=range]:focus::-ms-fill-upper {
        background: #2497e3;
      }

      input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 5px;
        cursor: pointer;
        animate: 0.2s;
        background: #2497e3;
        border-radius: 1px;
        box-shadow: none;
        border: 0;
      }

      input[type=range]::-webkit-slider-thumb {
        z-index: 2;
        position: relative;
        box-shadow: 0px 0px 0px #000;
        border: 1px solid #2497e3;
        height: 18px;
        width: 18px;
        border-radius: 25px;
        background: #a1d0ff;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -7px;
      }
    </style>
