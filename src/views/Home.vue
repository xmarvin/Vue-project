<template>
  <div id="home">
   <main>
      <SocialMediaSelector></SocialMediaSelector>
      <PostStatusFilter></PostStatusFilter>
      <KeywordFilter></KeywordFilter>
      <div class="list-block">
        <Pagination></Pagination>
        <PostList></PostList>
      </div>
    </main>
  </div>
</template>

<script>

import SocialMediaSelector from '../components/SocialMediaSelector';
import PostStatusFilter from '../components/PostStatusFilter';
import KeywordFilter from '../components/KeywordFilter';
import Pagination from '../components/Pagination';
import PostList from '../components/PostList';

export default {
  components: {
    SocialMediaSelector,
    PostStatusFilter,
    KeywordFilter,
    Pagination,
    PostList
  },
  methods: {
          async loadData(url, sourceName,arrayName){
          const postsAll = await fetch(`${url}`).then(response => response.json()).catch(() => commit('setLoading', true));
          const posts = postsAll.media.filter(post => post.social_network.toLowerCase() == sourceName.toLowerCase());

          this.$store.commit(arrayName, posts);
        },
        async selectSource(store, sourceName) {
   store.commit('setLoading', true);
  const url = 'http://localhost:8080/static/data.json';
 await  this.loadData(url,sourceName,'setArrayOfPendingPosts');
 await   this.loadData(url,sourceName,'setArrayOfApprovedPosts');
 await   this.loadData(url,sourceName,'setArrayOfRejectedPosts');

  store.commit('setLoading', false);
   const page = parseInt(this.$route.params.page || 1)
    await store.commit('setMediaSource', sourceName);
    store.commit('setCurrentPage', page);
}
    },
        watch: {
    '$route' (to, from) {
      const old_source = to.params.source
      const source = to.params.source
      this.selectSource(this.$store, source)
    }
  },
    mounted() {
        this.selectSource(this.$store, this.$route.params.source || 'instagram')
    }
};
</script>

<style scoped>
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      list-style-type: none;
      text-decoration: none;
  }
  #home {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: grid;
    grid-row-gap: .5rem;
  }
  main {
    box-shadow: 0 2px 4px #adadad;
    border-radius: 3px;
  }
  .list-block {
    background: #f8f8f8;
  }

</style>