import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
 state: {
    arrayOfPendingPosts: [],
    arrayOfApprovedPosts: [],
    arrayOfRejectedPosts: [],
    arrayOfFilteredPosts: [],
    arrayOfPostsToListOnCurrentPage: [],
    mediaSource: '',
    selectedPostStatus: '',
    currentPageNumber: 0,
    maxCountOfPostsOnPage: 8,
    loading: false
  },
  mutations: {
    setLoading(state, val){
      state.loading = val
    },
    setArrayOfPendingPosts(state, arrayOfPosts) {
      state.arrayOfPendingPosts = arrayOfPosts;
    },
    setArrayOfApprovedPosts(state, arrayOfPosts) {
      state.arrayOfApprovedPosts = arrayOfPosts;
    },
    setArrayOfRejectedPosts(state, arrayOfPosts) {
      state.arrayOfRejectedPosts = arrayOfPosts;
    },
    setFilteredPosts(state, arrayOfPosts) {
      state.arrayOfFilteredPosts = arrayOfPosts || [];
    },
    setPostsToListOnCurrentPage(state, arrayOfPosts) {
      state.arrayOfPostsToListOnCurrentPage = arrayOfPosts;
    },
    setMediaSource(state, mediaSourceName) {
      state.mediaSource = mediaSourceName;
    },
    setSelectedPostStatus(state, postStatus) {
      state.selectedPostStatus = postStatus;
    },
    setCurrentPage(state, pageNumber) {
      state.currentPageNumber = pageNumber;
    },
    pushItemToArrayOfApprovedPosts(state, item) {
      state.arrayOfApprovedPosts.push(item);
    },
    pushItemToArrayOfRejectedPosts(state, item) {
      state.arrayOfRejectedPosts.push(item);
    },
    removeItemFromArrayOfApprovedPosts(state, item) {
      const index = state.arrayOfApprovedPosts.indexOf(item);
      state.arrayOfApprovedPosts.splice(index, 1);
    },
    removeItemFromArrayOfRejectedPosts(state, item) {
      const index = state.arrayOfRejectedPosts.indexOf(item);
      state.arrayOfRejectedPosts.splice(index, 1);
    },
    removeItemFromArrayOfPendingPosts(state, item) {
      const index = state.arrayOfPendingPosts.indexOf(item);
      state.arrayOfPendingPosts.splice(index, 1);
    }
  },
  getters: {
    currentStatusPostsCount: state => {
      switch(state.selectedPostStatus){
        case 'approved': return state.arrayOfApprovedPosts.length;
        case 'rejected': return state.arrayOfRejectedPosts.length;
        case 'pending': return state.arrayOfPendingPosts.length;
      }
    },
    totalPageCount: state => {
      return Math.ceil(state.arrayOfFilteredPosts.length / state.maxCountOfPostsOnPage);
    },
    totalPostCount: state => {
      return state.arrayOfFilteredPosts.length;
    },
    getPostsFilteredBySource: state => arrayOfPosts => {
      return arrayOfPosts.filter(post => post.social_network.toLowerCase() === state.mediaSource.toLowerCase());
    },
  },

  actions: {
    async fetchPosts({ commit }) {
      const url = 'http://localhost:8080/static/data.json';
      const arrayOfPendingPosts = await fetch(`${url}`).then(response => response.json()).catch(() => commit('setLoading', true));
      const arrayOfApprovedPosts = await fetch(`${url}`).then(response => response.json()).catch(() => commit('setLoading', true));
      const arrayOfRejectedPosts = await fetch(`${url}`).then(response => response.json()).catch(() => commit('setLoading', true));
      commit(`setArrayOfPendingPosts`, arrayOfPendingPosts.media);
      commit(`setArrayOfApprovedPosts`, arrayOfApprovedPosts.media);
      commit(`setArrayOfRejectedPosts`, arrayOfRejectedPosts.media);
    },
  }
})
