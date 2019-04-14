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

    <br>
    <p>Comments</p>

    <div>
      <div class="comment" v-for="comment in comments" v-bind:key="comment._id">
        <form class="pure-form" v-on:submit.prevent>
          <p class="commentString">{{comment.commentString}}</p>
          <p class="commentDate">
            <span v-if="comment.user.name">{{comment.user.name}},</span>
            {{formatDate(comment.created)}}
          </p>
        </form>
      </div>
    </div>

    <form v-if="user" class="pure-form" v-on:submit.prevent>
      <fieldset class="pure-group">
        <textarea class="pure-input-1" v-model="commentString" placeholder="Comment"></textarea>
      </fieldset>

      <button
        type="submit"
        class="pure-button pure-input-1-2 pure-button-primary"
        v-on:click="addComment()"
      >Submit</button>
    </form>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "photo",
  data() {
    return {
      commentString: ""
    };
  },
  computed: {
    photo() {
      return this.$store.state.photo;
    },
    user() {
      return this.$store.state.user;
    },
    comments() {
      return this.$store.state.comments;
    }
  },
  async created() {
    await this.$store.dispatch("getOnePhoto", {
      id: this.$route.params.id
    });
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getComments", {
      photo: this.$store.state.photo
    });
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), "days") < 15)
        return moment(date).fromNow();
      else return moment(date).format("d MMMM YYYY");
    },
    async addComment() {
      if (this.commentString === "") return;
      try {
        let response = await this.$store.dispatch("postComment", {
          photo: this.$store.state.photo,
          commentString: this.commentString
        });
        this.commentString = "";
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.photoTitle {
  margin: 0px;
  font-size: 1.2em;
}

.photoDate {
  margin: 0px;
  font-size: 0.9em;
  font-weight: normal;
}

p {
  margin: 0px;
}

.image {
  margin: auto;
  width: 100%;
  text-align: center;
}

.image img {
  max-width: 600px;
  max-height: 600px;
  image-orientation: from-image;
}

form {
  border: 1px solid #ccc;
  background-color: #eee;
  border-radius: 4px;
  padding: 20px;
}
</style>