<template>
  <div class="home">
    <image-gallery :photos="photos"/>
    <footer id="sticky">  <a href="https://github.com/BYU-CS-260-Winter-2019/lab-5-zeallen">Github</a></footer>
  </div>
</template>

<script>
// @ is an alias to /src
import ImageGallery from "@/components/ImageGallery.vue";
import Footer from "@/components/Footer.vue";

//random
export default {
  name: "home",
  components: {
    ImageGallery
  },
  computed: {
    photos() {
      return this.$store.state.photos;
    }
  },
  async created() {
    await this.$store.dispatch("getAllPhotos");
  }
};
</script>

<style scoped>
#sticky {
  width: 100%;
  height: 44px;
  padding-top: 10px;
  background: black;
  color: white;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  position: fixed; /*Here's what sticks it*/
  bottom: 0; /*to the bottom of the window*/
  left: 0; /*and to the left of the window.*/
}
</style>
