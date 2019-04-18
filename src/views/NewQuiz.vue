<template>
<div>
  <h1>Create a new quiz</h1>
  <form @submit.prevent="makeQuiz" class="pure-form pure-form-aligned">
    <fieldset>
      <p class="pure-form-message-inline">The field is required.</p>

      <div class="pure-control-group">
        <label for="title">Title</label>
        <input v-model="title" type="text" placeholder="Name">
      </div>

      <div class="pure-controls">
        <button type="submit" class="pure-button pure-button-primary">Submit</button>
      </div>
    </fieldset>
  </form>
  <p v-if="error" class="error">{{error}}</p>
</div>
</template>

<script>
export default {
  name: 'newquiz',
  data() {
    return {
      title: '',
    }
  },
  methods: {
    async makeQuiz() {
      try {
        this.error = await this.$store.dispatch("postQuiz", {
          title: this.title
        });
        if (this.error === "")
          this.$router.push('mypage');
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
form {
  border: 1px solid #ccc;
  background-color: #eee;
  border-radius: 4px;
  padding: 20px;
}

.pure-controls {
  display: flex;
}

.pure-controls button {
  margin-left: auto;
}
</style>