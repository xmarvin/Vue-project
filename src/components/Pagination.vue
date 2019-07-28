<template>
    <div class="pagination">
          <p>{{$store.getters.totalPostCount}} items total</p>
          <ul>
              <router-link
              v-if="$store.state.currentPageNumber>1"
               :to="'/'+$store.state.mediaSource+'/1'"
               tag="li"
               ><a>First</a>
              </router-link>

              <router-link
               v-if="$store.state.currentPageNumber>1"
               :to="'/'+$store.state.mediaSource+'/'+($store.state.currentPageNumber - 1)"
               tag="li"
               ><a>Prev</a>
              </router-link>

              <router-link
                v-for="pageNumber in arrayOfPageNumbers"
                v-bind:data="pageNumber"
                v-bind:key="pageNumber"
                tag="li"
                :to="'/'+$store.state.mediaSource+'/'+pageNumber"
                :class="{'active': $store.state.currentPageNumber == pageNumber}"
                v-if="pageNumber > 0 && pageNumber <= $store.getters.totalPageCount"
              >
                <a>{{pageNumber}}</a>
              </router-link>

             <router-link
               v-if="$store.state.currentPageNumber<$store.getters.totalPageCount"
               :to="'/'+$store.state.mediaSource+'/'+($store.state.currentPageNumber + 1)"
               tag="li"
               ><a>Next</a>
              </router-link>

             <router-link
               v-if="$store.state.currentPageNumber<$store.getters.totalPageCount"
               :to="'/'+$store.state.mediaSource+'/'+$store.getters.totalPageCount"
               tag="li"
               ><a>Last</a>
              </router-link>
          </ul>
    </div>
</template>

<script>

export default {
    data() {
        return {
            arrayOfPageNumbers: [],
        }
    },
    methods: {
        setCurrentPage(pageNumber) {
            let startIndex;
            if (!pageNumber || pageNumber < 1) {
                pageNumber = 1
            };
            if (pageNumber > this.$store.getters.totalPageCount) {
                pageNumber = this.$store.getters.totalPageCount;
            };
            startIndex = this.$store.state.maxCountOfPostsOnPage * (pageNumber - 1);

            this.generateAnArrayOfPageNumbers(pageNumber);
            const postsToList = this.$store.state.arrayOfFilteredPosts.slice(startIndex, startIndex + this.$store.state.maxCountOfPostsOnPage);
            this.$store.commit(`setPostsToListOnCurrentPage`, postsToList);
        },
        generateAnArrayOfPageNumbers(pageNumber) {
            const totalPageCount = this.$store.getters.totalPageCount;
            this.arrayOfPageNumbers = [];

            if (this.$store.getters.totalPageCount <= 10) {
                for (let i = 1; i <= this.$store.getters.totalPageCount; i++) {
                    this.arrayOfPageNumbers.push(i);
                };
                return;
            };
            if (pageNumber + 9 < this.$store.getters.totalPageCount) {
                for (let i = pageNumber; i <= pageNumber + 6; i++) {
                    this.arrayOfPageNumbers.push(i);
                };
                return;
            };
            if (pageNumber + 9 >= this.$store.getters.totalPageCount) {
                for (let i = this.$store.getters.totalPageCount - 10; i <= this.$store.getters.totalPageCount; i++) {
                    this.arrayOfPageNumbers.push(i);
                };
                return;
            }
        },
    },

    watch: {
    '$route' (to, from) {
      if (from.params.source==to.params.source){
        const page = to.params.page || 1
        this.$store.commit(`setCurrentPage`, page);
      }
    }
  },
    mounted() {
       this.$store.watch(
        (state, getters) => state.currentPageNumber,
        () => {
         this.setCurrentPage(this.$store.state.currentPageNumber);
        });

      this.$store.watch(
        (state, getters) => state.mediaSource,
        () => {
         this.setCurrentPage(1)
        });
     this.$store.watch(
        (state, getters) => state.arrayOfFilteredPosts,
        () => {
         this.setCurrentPage(1)
        });

      this.$store.watch(
        (state, getters) => state.mediaSource,
        () => {
         this.setCurrentPage(1)
        });
    }
}
</script>

<style scoped>

    .pagination {
        display: grid;
        grid-template-columns: auto auto;
        grid-row-gap: .5rem;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
    }
    .pagination ul {
        /* display: flex; */
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .pagination ul li {
        display: inline-block;
        padding: .25rem .75rem;
        border: 1px solid #aaaaaa;
        color: #aaaaaa;
        font-weight: 600;
        cursor: pointer;
        margin-right: .15rem;
    }
    .pagination ul li.active {
        background: #cacaca;
        color: #636363;
    }
    @media screen and (max-width: 800px) {
        .pagination {
            grid-template-columns: 1fr;
            font-size: .7rem;
            justify-items: center;
            padding: 1rem;
        }
        .pagination ul {
            display: grid;
            grid-template-columns: repeat(15, 1fr);
        }
        .pagination p {
            padding: 0;
            margin: 0;
        }
    }
</style>


