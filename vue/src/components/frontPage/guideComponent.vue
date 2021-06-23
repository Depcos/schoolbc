<template>

  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-body">
            <slot name="description">
<keep-alive>

                <component v-bind:is="currentTabComponent.form"
                           :key="currentTab.id"
                           :id="componentKey"
                           :propData="currentTabComponent.data"
                           :selectedIds="lastData"
                           ref="element"
                           @sendData="receiveData"

                >
                </component>
</keep-alive>



            </slot>
          </div>
          <div style="margin-bottom: 60px" >

            <button  class="float-left btn btn-secondary" @click="previous">Předchozí</button>
            <button class="float-right btn btn-primary" @click="next">Další</button>
          </div>

          <div class="modal-footer">

            <slot name="footer">

              <button style="margin-right: -10px"  class="btn btn-light float-right" @click="$emit('close')">
                Odejít
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
import axios from "axios";
import {ref } from "vue";
import CheckBoxComponent from "@/components/frontPage/guideComponents/CheckBoxComponent";
import RadioComponent from "@/components/frontPage/guideComponents/RadioComponent";
import RangeComponent from "@/components/frontPage/guideComponents/RangeComponent";
import SubCategoryComponent from "@/components/frontPage/guideComponents/SubCategoryComponent";
import VersusComponent from "@/components/frontPage/guideComponents/VersusComponent";
//import {onMounted} from "vue";
export default {
name: "guideComponent",
  emits:["close"],
  props: ['category']
  ,setup() {

const componentArr= ref([]);



    return {
componentArr
    }
  },created() {
  //console.log("created");

  },methods:{



    receiveData(data){



  if (data.empty === true) {
    this.guideValues[this.currentTabIndex] = null;
  } else {
    this.guideValues[this.currentTabIndex] = data.filteredIds;
  }


  console.log(this.guideValues);

  const indexOfComponentData = this.receivedData.findIndex(element => element.id === data.id);
  if (indexOfComponentData !== -1) this.receivedData.splice(indexOfComponentData, 1);
  if (data.empty !== true) {

    this.lastData = data.filteredIds;

  }


  this.receivedData.push(data);


    },

  next(){




  if (this.currentTabIndex < this.getCompCount) {
    this.$refs.element.sendData();

    if (this.lastData === null) {
      alert("nebudou zobrazeny žádné výsledky!");
      let index=this.currentTabIndex;
      index=index-1;
      while(this.guideValues[index]===null&&index!==0){

        index--;
      }

     if(index!==0){
       this.lastData=this.guideValues[index];
     }

    } else {
      //console.log("chaningindex");
      this.currentTabIndex++;


      if (this.currentTabIndex < this.getCompCount) {


        if (typeof this.guideValues[this.currentTabIndex - 1] === "undefined") {
          this.actualProductset = this.lastData;
        } else {
          this.actualProductset = this.guideValues[this.currentTabIndex - 1];
        }


        this.currentTab = this.componentArr[this.currentTabIndex];

      } else if (this.currentTabIndex === 0) {
        this.actualProductset = [];
      }




    if (this.currentTabIndex === this.getCompCount) {
      //send data and close

      this.$emit("close", this.lastData);
    }



  }
  }
  },
  previous(){




    if(this.currentTabIndex>0){

      this.currentTabIndex--;



      if(this.guideValues[this.currentTabIndex-1]!==null){

        this.lastData = this.guideValues[this.currentTabIndex-1];
        //nastavení dat pro poslední předchozí element
      }else{

        if(this.currentTabIndex!==0){

          let index=this.currentTabIndex;
          index=index-1;

          while(this.guideValues[index]===null&&index!==0){

            index--;
          }


          if(index===0){
            this.lastData=[];
            this.actualProductset=[];
          }else{
            this.lastData = this.guideValues[index];
          //  this.actualProductset=this.guideValues[index];
          }

        }

      }
      /*
     if(this.currentTabIndex!==0){
       this.actualProductset=this.guideValues[this.currentTabIndex-1];
     }else{
       this.actualProductset=[];
     }
*/


      this.currentTab = this.componentArr[this.currentTabIndex];




    }
    this.forceRender();
  },
    forceRender(){
      this.componentKey++;
    }

  }
  ,computed:{
  getCompCount(){
    return this.componentArr.length;
  },
      currentTabComponent(){
        return this.currentTab;
      },

    },mounted() {



    axios.get(`http://localhost:3000/settingsJson/${this.category}`)
        .then((response) => {

          response.data.componentData.forEach(item => {
            this.componentArr.push({
              id: this.CompCount,
              form: item.form,
             data: item
            })
            this.CompCount++;
          });

          this.currentTab=this.componentArr[0];




        })
        .catch(error => {
          console.log(error);
        });


    this.$nextTick(() => { this.componentKey++; });

    },
  components: {
    'form-radio': RadioComponent,
    'form-range': RangeComponent,
    'form-versus': VersusComponent,
    'form-multiple':CheckBoxComponent,
    'form-subcat': SubCategoryComponent
    //componenty další
  },data(){
  return{
    currentTab:[],
    currentTabIndex:0,
    CompCount:0,
    receivedData:[],
    returnfilters:[],
    actualProductset:[],
    guideValues:[],
    componentKey:0,
    lastData:[]
  }
  }



}
</script>

<style scoped>
@media screen and (max-width: 400px) {
  .modal-container{
    width: 100% !important;
  }

}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {

  width: 65%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}


.modal-body {
  margin: 20px 0;
  word-wrap: break-word;
  max-height: calc(100vh - 210px);
  overflow-y: auto;
}

img{
  width: 160px;
  height: 100px;
}

.modal-default-button {
  display: block;
  margin-top: 1rem;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
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
</style>