<template>
  <!--

  <div>You selected {{selectedCategory}}</div>
  -->




  <div id="dynamic-component-demo" class="row">

    <div class="list-group list-group-flush col-md-2">
      <select class="form-control  form-select"  v-model="selected">
        <option disabled value="">Please select one</option>
        <option v-for="(item) in items" :key="item.id">{{item.text}}</option>
      </select>


    <button
        v-for="tab in componentArr"
        v-bind:key="tab.form"
        v-bind:class="['tab-button', { active: currentTab === tab }]"
        v-on:click="[getDataFromComponent(),currentTab = tab]"
    >
      <!-- nastavení currentTabu a získání dat z ex elementu -->
      {{ tab.form }}
    </button>
    </div>



    <div class="col-md-8" >
      <button  class="float-left btn btn-secondary" @click="AddNewComponent">Přidat krok</button>
      <div v-if="componentArr.length!==0">
      <button style="margin-left: 10px" class="float-left btn btn-success" @click="saveData">Uložit</button>

<keep-alive>
    <component  v-bind:is="currentTabComponent.form"
               :key="currentTabComponent.id"
               @delete="clearAndDelete"
               :id = "currentTabComponent.id"
               :attributesArray="attributesArray"
               :propData="currentTabComponent"
               :category="selectedCategory"
               @sendData = "dataFromComponent"
               ref="element"
                            >

    </component>
</keep-alive>

    </div>
    </div>





</div>

<!--

  <button type="button" @click="clearCurrentTab">ClearCurrentTab</button>
  -->
  <footer>
    <br><br><br>
  </footer>
</template>

<script>
//todo: get data from all components. sending data from component and sorting in into one big array .
//array of returned data, from which component.

// attributtes[{attributname attributvalues}] only in that category.

//data beru na localhost:8081/categories/"category"
import {ref} from 'vue';
import formRadioSelect from "@/components/admin/formRadioSelect";
import RangeSelect from "@/components/admin/RangeSelect";
import VersusComponent from "@/components/admin/VersusComponent";
import CheckBoxComponent from "@/components/admin/CheckBoxComponent";
import SubCategoryComponent from "@/components/admin/SubCategoryComponent";
import axios from "axios";

const selected = ref('');
const componentArr = ref([]);
let CompCount=0;


export default {
  name: "ComponentManager",
  props:['selectedCategory'],
  setup() {

     let hidden=true;
     const divs = ref([]);
      let componentData =[];
    componentData.splice(0);
    componentArr.value.splice(0);
    CompCount=0;

    function dataFromComponent(data){
      //console.log("Loggin data recived:");
      //update or insert
      //todo: get index from data and search in componentArr i guess
       const getIndex = componentArr.value.findIndex(element => element.id ===data.id);


      //const getIndex = componentData.findIndex(element => element.id === data.id)

      ////console.log("Index1: "+getIndex+"index2 "+getIndex2);

      if(getIndex!=-1){
       // componentData[getIndex] = data;
        componentArr.value[getIndex] = data;
       // componentArr[getIndex].value.da
      }else{
        componentArr.value.push(data);
        //componentData.push(data);
      }

      /*
      //console.log(data.form);
      //console.log(data.values)
      //console.log(data.selectedBinding);
      */
//posbírat data tak aby tam nešli submit 2x
  //console.log("Component DATA: "+JSON.stringify(componentArr.value));
    }

    //click and create component
//keep alive component to store data.
    function AddNewComponent() {
//switch of components
      //arr of components
      switch (selected.value) {
        case "radio": {
          //this.currentTab="radio";
          componentArr.value.push({
            id: CompCount,
            form: 'form-radio'
          });
          //console.log("radio");
        }
          break;
        case "range":
          componentArr.value.push({
            id: CompCount,
            form: 'form-range'
          });
          break;
        case "versus":
          componentArr.value.push({
            id: CompCount,
            form: 'form-versus'
          });
          break;
        case "subcat":
          componentArr.value.push({
            id: CompCount,
            form: 'form-subcat'
          });
          break;
        case "multiple":
          componentArr.value.push({
            id: CompCount,
            form: 'form-multiple'
          });

          break;
        default:
          break;
      }

      CompCount++;
     // //console.log(componentArr);
    }

 function DeleteComponent(pass_id){
//this.clearCurrentTab();
//najíti indexu a smazání z arr of components
      let indexCounter=0;
    componentArr.value.forEach(
        (index) => {
          if(index.id==pass_id){
            componentArr.value.splice(indexCounter,1);
            const indexOfComponentData = componentData.findIndex(element => element.id === pass_id)
           if(indexOfComponentData!==-1) componentData.splice(indexOfComponentData,1);
          }
          indexCounter++;
        }
    )
    if(componentArr.value[0]==null){
      CompCount=0;
    }
    }



    return {
      AddNewComponent,
      selected,
      componentArr,
      DeleteComponent,
      dataFromComponent,hidden,divs,CompCount,componentData
    }
  },
  components: {
    'form-radio': formRadioSelect,
    'form-range': RangeSelect,
    'form-versus': VersusComponent,
    'form-multiple':CheckBoxComponent,
    'form-subcat': SubCategoryComponent
    //componenty další
  }, mounted(){

    axios.get(`http://localhost:3000/categories/${this.selectedCategory.name}`)
        //get categories into component data
        .then(response => {
          var x  = JSON.stringify(response.data);
              x =  x.replace(/\\/g, '');
              x = x.replace(/"\["/g,'[');
              x = x.replace(/"\]"/g,']');
              this.attributesArray = JSON.parse(x);
              //Umazání bordelu co tam přihodila databáze aby z toho byl json obj.
              // this.attributesArray=response.data
        }
        )

    //load existujicich dat
    axios.get(`http://localhost:3000/settingsJson/${this.selectedCategory.name}`)
    .then((response)=>{
        load(response.data);
        //console.log(response.data);
    })
    .catch(error=>{
      console.log(error);
    });

    function load(data){
      //load components
      //load there values
      //componentArr.push();
   ////console.log(componentArr);
//console.log("Load data: "+JSON.stringify(data));
//console.log(data);

      data.componentData.forEach(item =>
      {
        componentArr.value.push({
          id: CompCount,
          form: item.form,
          selectedBinding:item.selectedBinding,
          values: item.values,
          bindedValue:item.bindedValue,
          description: item.description,
          imgs: item.imgs
        })
        CompCount++;
      }

      )
      //console.log("datalog "+JSON.stringify( componentArr.value));


      }





    }


  ,
    data() {
      return {
        items: [
          {id: 1, text: "radio"},
          {id: 2, text: "range"},
          {id: 3, text: "versus"},
          {id: 4, text: "subcat"},
          {id: 5, text: "multiple"}
        ],
        attributesArray: [],
        itemRefs:[],
       // tabs:[],
        currentTab:[],
        CatProp: this.selectedCategory.name
        //tabs:["radio","range","versus","helpers","multiple"]
    }
      },methods: {
      clearCurrentTab(){
        this.currentTab= [];
      },
      clearAndDelete(data){
        this.clearCurrentTab();
        this.DeleteComponent(data)
      },
      getDataFromComponent(){
      //volání childcomponentu a jeho funkce která pošle data, jelikož nešlo volat funkci ve všech.

        if(Object.keys(this.$refs.element).length === 0){
          //not is empty
         // this.$refs.element.sendData();
          //console.log("empty!");
        }else{
          //console.log("not empty");
          this.$refs.element.sendData();
        }


      },

    saveData(){


  //this.$refs.element.sendData();
  //this.getCurrentData();
  //console.log("Save data componentData+ "+componentArr.value)
  //console.log("Myarrvalue: "+componentArr.value);
 // //console.log(props);
  if(this.currentTab.length!==0){
    this.$refs.element.sendData();
  }


  let sendObject = {category: this.CatProp,componentData: componentArr.value };
  //console.log("send + "+JSON.stringify(sendObject));

  axios.post(`http://localhost:3000/settingsJson`,sendObject);
},

  getCurrentData(){
    this.$refs.element.sendData();
  }

  },computed:{
    currentTabComponent(){
      return this.currentTab;
    }
  }
}



</script>

<style scoped>

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;

}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
</style>
