<template>
  <div class="autocomplete">
    <input
        type="text"
        @input="onChange"
        v-model="search"
        @keydown.down="onArrowDown"
        @keydown.up="onArrowUp"
        @keydown.enter="onEnter"
        placeholder="search..."
    />
    <div v-if="items.length!==0" >
    <ul
        id="autocomplete-results"
        v-show="isOpen"
        class="autocomplete-results"
    >

      <li
          class="loading"
          v-if="isLoading"
      >
        Loading results...
      </li>
      <li
          v-else
          v-for="(result, i) in results "
          :key="i"
          @click="setResult(result)"
          class="autocomplete-result"
          :class="{ 'is-active': i === arrowCounter }"
      >
        {{ result.name }}
      </li>

    </ul>
    </div>

  </div>


  <li v-for="(index,item) in searchResults" :key="index">
    <div class="box text-center">
      <div class="text-center">
        <span>{{item.name}}</span>
      </div>
    </div>
  </li>
</template>

<script>

export default {
name: "autocomplete",
  emits:['itemSelected','input'],
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    isAsync: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
      results: [],
      search: '',
      isLoading: false,
      arrowCounter: -1,
      query:"",
      searchResults:[
      ]
    };
  },
  watch: {
    items: function (value, oldValue) {
      if (value.length !== oldValue.length) {
        this.results = value;
        this.isLoading = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)
  },
  unmounted() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {

    setResult(result) {
      console.log(result);
      this.search = result.name;
      this.isOpen = false;
      this.$emit('itemSelected',result);
    },
    filterResults() {
      this.results = this.items.filter((item) => {

        return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
    onChange() {
      this.$emit('input', this.search);

      if (this.isAsync) {
        this.isLoading = true;
      } else {
        this.filterResults();
        this.isOpen = true;
      }
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
      this.search = this.results[this.arrowCounter];
      this.isOpen = false;
      this.arrowCounter = -1;
    },
  },
}
</script>

<style scoped>
.autocomplete {
  position: relative;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  overflow: auto;
  position: absolute ;
  background-color: white ;
  z-index: 100000 ;
}
.autocomplete-noresults {
  padding: 0;
  margin: 0;
  border: 0px solid #eeeeee;
  height: 0px;
  overflow: auto;
}
.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #4AAE9B;
  color: white;
}
</style>