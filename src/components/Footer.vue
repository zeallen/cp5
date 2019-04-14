<template>
  <footer id="sticky">sticky footer content</footer>
</template>

<script>
export default {
  name: "ImageGallery"
};
</script>

<style scoped>
#sticky {
  width: 100%;
  height: 44px;
  padding-top: 20px;
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