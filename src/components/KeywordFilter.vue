<template>
  <div class="keyword-filter-container" v-if="this.$store.state.selectedPostStatus == `pending`">
    <div class="keyword-list-container">
      <ul class="keyword-filter">
        <li class="keyword-filter__keyword-container" v-for="keyword in keywords" :key="keyword">
            <span class="keyword-filter__keyword-container_value">{{keyword}}</span>
            <span class="keyword-filter__keyword-container_remove-button" @click="removeKeyword(keyword)">&times;</span>
        </li>
        <li class="keyword-filter__keyword-input-container">
          <input type="text" placeholder="+keyword" @keyup.enter="addKeyWord" v-model="inputData">
        </li>
      </ul>
    </div>
    <div class="filter-button-container">
      <div class="filter-button" @click="filterByKeywords">filter</div>
    </div>
  </div>
</template>

<script>

export default {
	data() {
		return {
			inputData: '',
			keywordToRemove: '',
			keywords: [],
			backUpArray: [],
		};
	},
	methods: {
		addKeyWord() {
			if (!this.keywords.includes(this.inputData)) {
			this.keywords.push(this.inputData);
			}
			this.inputData = '';
		},

		removeKeyword(keyword) {
			const index = this.keywords.indexOf(keyword);
			this.keywords.splice(index, 1);
		},

		filterByKeywords() {
      let postsFilteredByKeywords;
			if (!this.keywords.length) {
        postsFilteredByKeywords = this.backUpArray;
			} else {
        postsFilteredByKeywords = this.$store.state.arrayOfFilteredPosts.filter(post => {
          return this.keywords.some(keyword => post.caption.toLowerCase().includes(keyword.toLowerCase()));
        });
      };

			this.$store.commit(`setFilteredPosts`, postsFilteredByKeywords);
		},
	},
	mounted() {
    this.$store.watch(
      (state, getters) => state.selectedPostStatus,
      (status) => {
        if (status == 'pending'){
          this.backUpArray = this.$store.state.arrayOfPendingPosts;
          this.filterByKeywords();
        }
    });
	}
}
</script>

<style scoped>
    .keyword-filter-container {
      background: #f8f8f8;
      padding-top: .15rem;
      display: grid;
      grid-template-columns: 1fr auto;
      grid-gap: .15rem .15rem;
    }
    .keyword-list-container {
      padding: .5rem;
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      background: #ffffff;
    }
    .keyword-filter {
        list-style: none;
        padding: 0rem;
        margin: 0;
    }
    .keyword-filter__keyword-container {
        background: #cacaca;
        padding: .3rem .5rem;
        border-radius: 50px;
        display: inline-grid;
        grid-template-columns: auto auto;
        grid-column-gap: .2rem;
        color: #474747;
        margin: 0 .1rem;
    }
    .keyword-filter__keyword-container_value {
        font-size: .8rem;
        line-height: .9rem;
        font-weight: 600;
    }
    .keyword-filter__keyword-container_remove-button {
        font-size: 1.5rem;
        line-height: .62rem;
        cursor: pointer;
    }
    .keyword-filter__keyword-input-container {
      display: inline-block;
    }
    input {
      border: none;
      background: none;
      padding: .5rem;
    }
    .filter-button {
      padding: .5rem 2rem;
      color: #ffffff;
      font-weight: 600;
      background: #1e90ff;
      box-shadow: 0 1px 2px #8e8e8e;
      border-radius: 3px;
      border-radius: 2px;
      cursor: pointer;
      display: inline-block;
    }
    .filter-button-container {
      text-transform: uppercase;
      display: grid;
      place-content: center center;
      background: #ffffff;
      padding: 0 .5rem;
      height: 100%;
    }
</style>