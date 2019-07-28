<template>
<div class="social-media-selector-wrapper">
    <div class="social-media-selector">
        <router-link
                tag="li"
                :to="'/'+sourceName""
                v-for="sourceName in socialMedias"
                v-bind:key="sourceName"
                :class="{'active': $store.state.mediaSource == sourceName}"
            >
            <button>{{sourceName}}</button>
            </router-link>
        
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            socialMedias: [
                `instagram`,
                `youtube`,
                `facebook`,
                `twitter`,
            ],
        };
    },
}
</script>
<style scoped>
    .social-media-selector {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
        grid-gap: .1rem .1rem;
        justify-content: start;
        margin: 30px;
    }
    .social-media-selector li{
        display: block;
        box-shadow: 0px 1px 5px #b6b6b6;
        cursor: pointer;
        border-radius: 2px;
        text-align: center;
        padding: 12px 4px;
    }
    .social-media-selector li.active{
        background: #1e90ff;
        color: #ffffff;
    }

    button{
        font-size: 16px;
     font-weight: 600;
      color: #000000;      
      text-transform: uppercase;
      outline: 0;
      border: none;
      background-color: #ffffff;
    }

      .social-media-selector li.active button{
        background: #1e90ff;
        color: #ffffff;
    }
 </style>