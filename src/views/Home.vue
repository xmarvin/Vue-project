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
        async selectSource(store, sourceName) {
            store.commit('setLoading', true);
            await store.dispatch(`fetchPosts`);
            const arrayOfPendingPosts = store.state.arrayOfPendingPosts.filter(post => post.social_network.toLowerCase() == sourceName.toLowerCase());
            const arrayOfApprovedPosts = store.state.arrayOfApprovedPosts.filter(post => post.social_network.toLowerCase() == sourceName.toLowerCase());
            const arrayOfRejectedPosts = store.state.arrayOfRejectedPosts.filter(post => post.social_network.toLowerCase() == sourceName.toLowerCase());
            store.commit('setArrayOfPendingPosts', arrayOfPendingPosts);
            store.commit('setArrayOfApprovedPosts', arrayOfApprovedPosts);
            store.commit('setArrayOfRejectedPosts', arrayOfRejectedPosts);
            store.commit('setLoading', false);
            const page = parseInt(this.$route.params.page || 1)
            await store.commit(`setMediaSource`, sourceName);
            store.commit('setCurrentPage', page);
        },
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