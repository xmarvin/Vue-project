<template>
    <ul class="post-list">
        <li v-for="post in $store.state.arrayOfPostsToListOnCurrentPage">
            <PostCard :post="post"></PostCard>
        </li>
    </ul>
</template>

<script>
import PostCard from './PostCard';

export default {
    components: {
        PostCard,
    },
}
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .post-list {
        list-style-type: none;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
        grid-gap: 1rem 1rem;
        margin: 0;
        padding: 0 1.5rem 1.5rem 1.5rem;
    }
    p {
        font-weight: 600;
        padding: 0;
        margin: 0;
    }
    
    @media screen and (max-width: 800px) {
          .container {
            padding: 0.5rem 0.5rem 2rem 0.5rem;
        }
        .post-list {
            grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
        }
    }
</style>