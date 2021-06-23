<template>
  <button class="btn btn-warning float-left" style="margin-left: 10px" @click="Delete">Smazat krok</button>
  <br>
  <sub-category-binding @selectedSubCategory="bindingData($event)"></sub-category-binding>



  <button @click="createBind">Zvolit</button>
  <div class="form-group">
    <label for="Desc">Popis:</label>
    <textarea class="form-control" id="Desc" rows="3" v-model="description" ></textarea>
  </div>
  <div v-for="(item) in binded" :key="item.id" >

      <input type="radio" :id="item.id" :value="item.value">
      <label :for="item.id">{{item.value}}</label>
      <button class="btn btn-danger" @click="unbindMe(item.id)">unbind</button>
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




    <!-- v-for vyhody nevyhody -->
  </div>


</template>

<script>
//todo: vypis kategorii, přidání, odebrání
import SubCategoryBinding from "@/components/admin/SubCategoryBinding";
//import {ref} from "vue";

export default {
name: "SubCategoryComponent",
  props: {
    id: Number,
    attributesArray: Array,
    propData: {Type: Object, default: null},
    category:Object
  }
    ,
  emits:['delete','sendData'],
  beforeUpdate() {
  //console.log("updateimgrefs");
    this.imgRefs = []
  },
  methods:
      {
        setItemRef(el) {
          if (el) {
            this.imgRefs.push(el);
          }
        },
        bindingData(data){
          this.selectedBindingData=data;
        },
        Delete() {
          this.$emit('delete',this.id);
        },
        sendData(){
          let x = {id:this.$props.id,form:"form-subcat",selectedBinding:this.selectedBinding,description:this.description, values:this.binded,imgs:this.imgs};
          this.$emit('sendData',x);


        }, pickFile (id) {
          console.log(id);
          console.log(this.$refs.fileInput);

          let input = this.imgRefs[id];
          //console.log(input);

          let file = input.files
          if (file && file[0]) {
            let reader = new FileReader
            reader.onload = e => {
              this.imgs[id]=e.target.result;
              this.previewImage = e.target.result
            }
            reader.readAsDataURL(file[0])
            // this.$emit('input', file[0])
          }
        },

      createBind(){

  if(this.selectedBindingData){
   this.binded.push(
        {id: this.idgen, value: this.selectedBindingData});
    // //console.log(binded.value);
    this.idgen++;
  }
  //console.log("bindedData "+JSON.stringify( binded.value));
},
 unbindMe(index){
  // binded.value.indexOf(index);
  const indexof = this.binded.findIndex(element => element.id === index)

  this.binded.splice(indexof,1);
}},

  setup(){
    let selectedBindingData ="";




 return{
      selectedBindingData
    }

  },
  components:{
  SubCategoryBinding
  },mounted() {
  //console.log("propdata-_");
//console.log(JSON.stringify(this.propData))
    if(this.propData!==null && typeof this.propData.values!=="undefined") {
      this.imgs=this.propData.imgs;
      this.description=this.propData.description;
      this.propData.values.forEach(item => {
       // this.createdRadioButtons.push({id:this.idgen,value:item.value});
        this.binded.push({id: this.idgen, value: item.value})
        this.idgen++;
      });
    }



  }
  ,data(){
  return {
    previewImage:null,
    imgs:[],
    imgRefs:[]
    ,idgen:0,
     description :"",
     binded :[]
  }

  }

}
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
