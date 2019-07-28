<template>
    <ul class="post-status-filter">
        <li @click="selectPostsByStatus(`pending`, $store.state.arrayOfPendingPosts)" :class="{'active': $store.state.selectedPostStatus == `pending`}">pending</li>
        <li @click="selectPostsByStatus(`approved`, $store.state.arrayOfApprovedPosts)" :class="{'active': $store.state.selectedPostStatus == `approved`}">approved</li>
        <li @click="selectPostsByStatus(`rejected`, $store.state.arrayOfRejectedPosts)" :class="{'active': $store.state.selectedPostStatus == `rejected`}">rejected</li>
    </ul>
</template>

<script>
export default {
    methods: {
        selectPostsByStatus(status, arrayOfPosts) {
            this.$store.commit(`setSelectedPostStatus`, status);
            this.$store.commit(`setFilteredPosts`, arrayOfPosts);
        },
    },
    mounted() {
      this.$store.watch(
        (state, getters) => state.loading,
        (isLoading) => {
          if (!isLoading){
            this.selectPostsByStatus(`pending`, this.$store.state.arrayOfPendingPosts);
          }
        });
    }
}
</script>

<style scoped>
    .post-status-filter {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
        list-style-type: none;
        justify-content: start;
        margin: 0;
        padding: 0;
        grid-row-gap: 0;
    }
    .post-status-filter li {
        padding: .5rem;
        text-transform: uppercase;
        text-align: center;
        font-weight: 600;
        border-bottom: 2px solid transparent;
        cursor: pointer;
    }
    .post-status-filter li.active {
        border-bottom: 2px solid #1e90ff;
        color: #43a1ff;
    }
    @media screen and (max-width: 800px) {
         .post-status-filter {
            grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
            justify-content: space-between;
        }
    }
</style>


