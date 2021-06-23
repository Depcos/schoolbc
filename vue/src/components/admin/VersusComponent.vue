<template>
  <button class="btn btn-warning float-left" style="margin-left: 10px" @click="Delete">Smazat krok</button>
  <br>

  <sub-category-binding @selectedSubCategory="bindingData($event)"></sub-category-binding>

  <button class="btn btn-primary" @click="createBind">Zvolit</button>

  <div class="form-group">
    <label for="Desc">Popis:</label>
    <textarea class="form-control" id="Desc" rows="3" v-model="description" ></textarea>
  </div>
<div class="container">
  <div class="row">

<div class="col-md-6" v-for="(item) in binded" :key="item.id" >
   <div>
     <input type="radio" :id="item.id" :value="item.value">

     <div>
       <div
           class="imagePreviewWrapper"
           :style="{ 'background-image': `url(${imgs[item.id]})` }"
           >
       </div>
       <input
           :ref="setItemRef"
           type="file"
           @input="pickFile(item.id)">
     </div>

     <label :for="item.id">{{item.value}}</label>
     <button class="btn btn-danger" @click="unbindMe(item.id)">unbind</button>
     <button class="btn btn-success" @click="addPro(item.id)">Přidat pro</button>
<div v-for="(pro) in item.attributeList.pros" :key="pro.id">
       <input :placeholder="pro.value" v-model="pro.value" />
      <button class="btn btn-outline-dark" @click="removePro(item.id,pro.id)">X</button>
</div>
     <button class="btn btn-success" @click="addCon(item.id)">Přidat proti</button>
     <div v-for="(con) in item.attributeList.cons" :key="con.id">

       <input :placeholder="con.value" v-model="con.value" />

       <button class="btn btn-outline-dark"  @click="removeCon(item.id,con.id)">X</button>
     </div>


   </div>
</div>
       <!--   <v-for="(pro) in item.attributeList.pros" :key="pro.id" >
           {{pro.value}}
          <button @click="removeTodo(index)">Remove Todo</button>
         -->


   </div>
<!-- v-for vyhody nevyhody -->
</div>
  <!--
<button @click="sendData">submit</button>
¨-->
</template>





<script>
//todo: take all data.
//na výběr -> nabinduje se do do 1 pak do 2.
//výhody nevýhody
//todo: bug after loading cant remove cons&props

import SubCategoryBinding from "@/components/admin/SubCategoryBinding";
import {ref} from 'vue';
//select subcategory -> udělat subcategory -> select všech subcategories
export default {
name: "VersusComponent",
  props: { id: Number,
    attributesArray: Array,
    propData: {Type: Object, default: null},
    category:Object
    },
  emits:['delete','sendData'],
  beforeUpdate() {
this.imgRefs=[];
  },
  methods:
      {
        setItemRef(el) {
          if (el) {
            this.imgRefs.push(el);
          }
        },
        bindingData(data){
          this.selectedData=data;

        },
        Delete() {
          this.$emit('delete',this.id);
        },
    sendData(){


      let x = {id:this.$props.id,form:"form-versus",selectedBinding:this.selectedBinding,description:this.description,values:this.binded,imgs:this.imgs};
      this.$emit('sendData',x);

       },
        selectImage () {
          this.$refs.fileInput.click()
        },
        pickFile (id) {

let input = this.imgRefs[id];



          let file = input.files
          if (file && file[0]) {
            let reader = new FileReader
            reader.onload = e => {
            this.imgs[id]=e.target.result;
              this.previewImage = e.target.result
            }
            reader.readAsDataURL(file[0])

          }
        }
      },
  setup(){
  const picked = ref('');
  const binded = ref ([]);
const description = ref('');
  let selectedData="";
// 0 or 1

    let bindableIndex = 0;


      function addPro(index){
        binded.value[index].attributeList.pros.push({id:Date.now(),value:""});
      }
    function removePro(id,index){

      const indexb = binded.value[id].attributeList.pros.findIndex(element => element.id === index)
      if(indexb!==-1) binded.value[id].attributeList.pros.splice(indexb,1);



    }

  function addCon(index){
    binded.value[index].attributeList.cons.push({id:Date.now(),value:""});
  }

  function removeCon(id,index){

    const indexb = binded.value[id].attributeList.cons.findIndex(element => element.id === index)
    if(indexb!==-1) binded.value[id].attributeList.cons.splice(indexb,1);

    binded.value[id].attributeList.cons.splice(index,1);
  }


   function createBind(){

     if(binded.value.length<2) {
       binded.value.push(
           {
             id: bindableIndex, value: this.selectedData, attributeList: {
               pros: [{id: 0, value: ""}], cons: [{id: 0, value: ""}]
             }
           }
       );
    if(bindableIndex==0){bindableIndex++;}

     }

    }

    function unbindMe(index){
     binded.value.splice(index,1);
     bindableIndex=index;
    }
      return {
        picked, createBind,unbindMe,binded,selectedData,addPro,removePro,addCon,removeCon,description
      }

  },components:{
  SubCategoryBinding
  },data(){
  return{
    conText:{},
    previewImage: null,
    imgs:[2],
    imgRefs:[]
  }
  },mounted() {

    if(this.propData!==null&&typeof this.propData.values!=="undefined") {

      this.imgs=this.propData.imgs;

this.description = this.propData.description;


      this.propData.values.forEach(item => {
      let varpros=[];
        item.attributeList.pros.forEach(item=>{
          varpros.push({id:item.id,value:item.value})
        })
        let varcons=[];
        item.attributeList.cons.forEach(item=>{
          varcons.push({id:item.id,value:item.value})
        })


        this.binded.push(
            {
              id: item.id, value: item.value, attributeList: {
                pros: varpros, cons: varcons
              }
            }

        );



      });


    }


  }
}
//jeden typ produktů vs druhý typ produktů, + jejich výhody a nevýhody.
</script>

<style scoped>
.imagePreviewWrapper {
  width: 250px;
  height: 250px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
}
</style>
