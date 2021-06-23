<template>

  {{propData.description}}
  <div id="app" class="row" >



    <div class='range-slider' @mouseup="getAttCount">
      {{outitems.length}}
      <div class="row"></div>
      <input type="range" :min="minRange" :max="maxRange" step="1" v-model="sliderMin">
      <input type="number" :min="minRange" :max="maxRange" step="1" v-model="sliderMin">
      <input type="range" :min="minRange" :max="maxRange" step="1" v-model="sliderMax">
      <input type="number" :min="minRange" :max="maxRange" step="1" v-model="sliderMax">
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import axios from "axios";

export default {
  name: "RangeComponent",
  props: {
    id: Number,
    propData: {Type: Object, default: null},
    selectedIds:{Type:Array,default:null}
  },emits:['sendData'],
  setup(){

//console.log("Welcome to range");
//console.log("received c");
////console.log(this.selectedIds);
////console.log(props);

    const range = ref('');
    const minRange = ref('');
    const maxRange = ref('');

    return{
      range,minRange,maxRange
    }
  }, activated() {
    //console.log("activated");
    this.getAttCount();
  },methods:{

    getAttCount() {
      //console.log("GETTATTCOUNT");

        let sendObj = {
          type:"range",
          value:this.propData.bindedValue,
          productList: this.selectedIds,
          min: this.sliderMin,
          max: this.sliderMax
        };

        //console.log(sendObj);
////console.log("sending..");
        axios.post(`http://localhost:3000/getparamcount`,sendObj)
            .then(response =>
                { ////console.log(response.data);
                  //  //console.log("response");
                  // //console.log(response.data);
                //  item.count = response.data.length;
                //  item.filteredProductIds=response.data;
                  //console.log(response.data);
                  this.outitems=response.data;
                  //this.sendData();
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


    },
reload(){
      this.getAttCount();
},


    sendData(){
      if(this.outitems!==null){
       if( this.outitems.length===0) {
         this.outitems = null;
       }

      }

      let send = {
        id:this.propData.id,
        form:this.propData.form,
        selectedBinding: this.propData.selectedBinding,
        selectedValue: {min:this.sliderMin,max:this.sliderMax},
        bindedValue: this.propData.values.bindedValue,
        filteredIds:  this.outitems,
        empty:false
      };
      //console.log("rangeprop");
      //console.log(send);
      this.$emit('sendData',send);
    }
  }, mounted() {
    if(this.propData!==null&&typeof this.propData.values!=="undefined") {
      this.maxRange=this.propData.values.max;
      this.minRange=this.propData.values.min;
      this.maxAngle=this.propData.values.max;
      ////console.log("propdatavaluebindingdata: "+this.propData.values.bindingData);

      this.getAttCount();
    }
  },data(){
    return{
      minAngle:0,
      maxAngle:this.propData.maxRange,
      outitems:[]
    }
  },watch: {


  },

  computed: {
    sliderMin: {
      get: function() {
        let val = parseInt(this.minAngle);
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
        let val = parseInt(this.maxAngle);
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