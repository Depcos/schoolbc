<template>

  <div id="v-model-multiple-checkboxes">
    {{propData.description}}

    <div @change="dataChanged(checkbox)" v-for="(checkbox,index) in createdCheckBoxes" :key="checkbox.id">
({{checkbox.count}})
      <input type="checkbox" v-bind:id="index" v-bind:value="checkbox.value" v-model="SelectedBoxes" />

      <label v-bind:class="[{ tooltip : checkbox.valueDescription!=='' },'']"  v-bind:for="index">{{ checkbox.value }}
        <span  class="tooltiptext">{{checkbox.valueDescription}}</span>
      </label>

    </div>

  </div>


</template>

<script>
import {ref} from "vue";
import axios from "axios";
export default {
  name: "CheckBoxComponent",
  props: {
    id: Number,
    propData: {Type: Object, default: null},
    selectedIds:{Type:Array,default:null}
  },setup(){
    const SelectedBoxes = ref([]);
    const createdCheckBoxes = ref([]);
    return {SelectedBoxes,createdCheckBoxes}
  },
  activated() {
    this.idList=this.selectedIds;
    this.getAttCount(true);
  },

    mounted() {


    if(this.propData!==null&&typeof this.propData.values!=="undefined") {
      this.propData.values.forEach(item => {

        this.createdCheckBoxes.push({id:this.idgen,value:item.value,valueDescription:item.valueDescription});

      });
    }
    this.getAttCount(true);
  },emits:['sendData']
 ,

  data(){
    return{
      outIds: [],
     idList:this.selectedIds
    }
  },


  methods:{

    dataChanged() {

      if(this.propData.selectedBinding==="BindByAttribute"){
        //vzít všechny prvky a udělat konj mezi nima

let intersect=[] ;

intersect=this.selectedIds;
          this.SelectedBoxes.forEach(selected=>{
            this.createdCheckBoxes.forEach(box=>{

              if(box.value===selected){
                if((intersect===null||intersect.length===0) && this.SelectedBoxes.length===0){

                  intersect = box.filteredProductIds;
                }else {
                  //intersect = intersect.idProduct.filter(x => box.filteredProductIds.includes(x));
                  intersect = intersect.filter(a=>box.filteredProductIds.some(b=> a.idProduct===b.idProduct))
                  // list1.filter(a => list2.some(b => a.userId === b.userId));
                }

              }
            })

          })
        if(intersect.length!==0){
          this.idList=intersect;
          this.outIds=intersect;
        }else{
          this.idList=null;
          this.outIds=null;
        }




if(this.SelectedBoxes.length!==0 && (intersect===null|| intersect.length===0)){
  this.createdCheckBoxes.forEach(item =>
  item.count=0)
}else {
  this.getAttCount(false);
}
 // this.idList=this.selectedIds;

      }else{
        let union=[];
        this.SelectedBoxes.forEach(selected=>{
          this.createdCheckBoxes.forEach(box=>{

            if(box.value===selected){


            union = [...new Set([...box.filteredProductIds, ...union])];

             this.outIds=union;
                // list1.filter(a => list2.some(b => a.userId === b.userId));
              }


          })

        })
      }


      //nastavit prvního, pak dalšího a dalšího / odebrat

    },
    sendData(){


      if(this.SelectedBoxes.length!==0){
      let send = {
        id:this.propData.id,
        form:this.propData.form,
        selectedBinding: this.propData.selectedBinding,
        selectedValue: this.SelectedBoxes,
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
      this.idList=this.selectedIds;

    },   getAttCount(write) {

      this.createdCheckBoxes.forEach(item => {


        let sendObj = {
          type:"checkbox",
          value:item.value,
          productList: this.idList,
          selectedBinding: this.propData.selectedBinding,
          bindedValue: this.propData.bindedValue
        };

        // console.log(sendObj);
//console.log("sending..");
        axios.post(`http://localhost:3000/getparamcount`,sendObj)
            .then(response =>
                {
                  item.count = response.data.length;
                  if(write) {
                    item.filteredProductIds = response.data;
                  }
                }
            );
      })
    }
  }
}
</script>

<style scoped>
.modal-body{
  height: 300px ;
}
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
  opacity: 1;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: -5px;
  left: 105%;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

#v-model-multiple-checkboxes{
  height: 250px;
}

</style>