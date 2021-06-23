<template>
<div>
  <select @change="sendFilter" v-model="selected">
    <option v-for="(option,index) in options" :key="`item-${index}`" :value="option.value">
      {{ option.text }}
    </option>
  </select>


  <input @change="sendFilter" type="radio" id="one" value="asc" v-model="picked" />
  <label for="one">Vzestupně</label>
  <input @change="sendFilter" type="radio" id="two" value="desc" v-model="picked" />
  <label for="two">Sestupně</label>
  <br />

</div>
</template>

<script>
//řadit dle názvu, ceny vzestupně sestupně
export default {
name: "filterComponent",
  emits:['sendFilter'],
  methods:{
  sendFilter(){
    let x = {orderBy:this.selected,order:this.picked}

    this.$emit('sendFilter',x);

  }
  },
  data() {
  return {
    selected: 'price',
    options: [
      {text: 'Dle názvu', value: 'name'},
      {text: 'Dle ceny', value: 'price'},
      {text: 'relevance',value: 'idProduct'},
      {text: 'hodnocení', value: 'rating'}

    ],picked: "asc"

  }
}
}
</script>

<style scoped>

</style>