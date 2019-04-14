<template>
  <div>
    <div class="image" v-if="photo" v-bind:key="photo._id">
      <router-link :to="{ name: 'photo', params: { id: photo._id }}">
        <img :src="photo.path">
      </router-link>
      <p class="photoTitle">{{photo.title}}</p>
      <p class="photoDate">
        <span v-if="photo.user.name">{{photo.user.name}},</span>
        {{formatDate(photo.created)}}
      </p>
      <p>{{photo.description}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "photo",

  async created() {
    await this.$store.dispatch("getOnePhoto", {
      id: this.$route.params.id
    });
  }
};
</script>