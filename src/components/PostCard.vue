<template>
  <div class="post">
      <header>
          <img :src="post.author_pic" alt="author_pic" class="author_pic">
          <h5 class="author_username">{{`@${post.author_username}`}}</h5>
          <a :href="post.link" target="_blank">{{post.social_network}}</a>
      </header>
      <main>
          <figure class="post-image">
                <img :src="post.pic" alt="pic">
                <div class="post-image-caption">
                    <p>{{post.caption}}</p>
                </div>
          </figure>
          <ul class="post-statistic">
              <li>
                  <h5>likes</h5>
                  <h3>{{post.likes_number}}</h3>
              </li>
              <li>
                  <h5>comments</h5>
                  <h3>{{post.comments_number}}</h3>
              </li>
          </ul>
      </main>
      <nav>

        <button
        class="reject-button"
        v-if="$store.state.selectedPostStatus != 'rejected'"
        @click="moveToRejected(post)"
        >
        reject
        </button>

        <button
        class="approve-button"
        v-if="$store.state.selectedPostStatus != 'approved'"
        @click="moveToApproved(post)"
        >
        approve
        </button>

      </nav>
  </div>
</template>

<script>

export default {
    props: [`post`],
    methods: {
        moveToApproved(item) {
            const currentStatus = this.$store.state.selectedPostStatus;
            if (currentStatus == `pending`) this.$store.commit(`removeItemFromArrayOfPendingPosts`, item);
            if (currentStatus == `rejected`) this.$store.commit(`removeItemFromArrayOfRejectedPosts`, item);

            this.$store.commit(`pushItemToArrayOfApprovedPosts`, item);
            //here may be a POST requests to a server
        },
        moveToRejected(item) {
            const currentStatus = this.$store.state.selectedPostStatus;
            if (currentStatus == `pending`) this.$store.commit(`removeItemFromArrayOfPendingPosts`, item);
            if (currentStatus == `approved`) this.$store.commit(`removeItemFromArrayOfApprovedPosts`, item);

            this.$store.commit(`pushItemToArrayOfRejectedPosts`, item);
            //here may be a POST requests to a server
        }
    },
}
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style-type: none;
    }
    .post{
        box-shadow: 0 2px 4px #adadad;
        border-radius: 3px;
        background: #ffffff;
        display: grid;
    }
    header {
        display: grid;
        grid-template-columns: auto auto;
        grid-column-gap: .5rem;
        padding: 1rem;
        justify-content: start;
    }
    header img {
        grid-row: span 2;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
    }
    header a {
        color: #43a1ff;
    }
    .post-image {
        position: relative;
        overflow: hidden;
    }
    .post-image img {
        width: 100%;
        transition: .15s;
    }
    .post-image-caption {
        position: absolute;
        width: 100%;
        height: 99%;
        top: 0;
        left: 0;
        color: #ffffff;
        display: grid;
        grid-template-columns: 1fr;
        padding: 1rem;
        background: rgba(0,0,0,0.5);
        opacity: 0;
        transition: .15s;
    }
    .post-image-caption p {
        text-transform: uppercase;
    }
    .post-image:hover .post-image-caption {
        opacity: 1;
    }
    .post-statistic {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 1rem;
    }
    .post-statistic h5 {
        color: #b6b6b6;
        text-transform: uppercase;
        font-size: 1.15rem;
    }
    .post-statistic h3 {
        font-size: 2rem;
    }
    nav {
        display: grid;
        grid-template-columns: auto auto;
        grid-column-gap: 2rem;
        border-top: 1px solid #d8d7d7;
        padding: 1rem;
        justify-content: start;
    }
    nav button {
        display: inline-block;
        background: none;
        border: none;
        cursor: pointer;
        text-transform: uppercase;
        font-size: 1rem;
        font-weight: 600;
        letter-spacing: .05rem;
    }
    .approve-button {
        color: #43a1ff;
    }
</style>