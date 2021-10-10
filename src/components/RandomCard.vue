<template>
  <div class="rand-card">
    <el-card class="box-card">
          <h3>Jokes</h3>
      <div class="text item">
        <!-- <img src="https://picsum.photos/200/350" alt="" /> -->
        <p>{{ jokes }}</p>
        {{ currentDate }}
      </div>
    </el-card>
    <el-card class="box-card">
          <h3>Quotes</h3>
      <div class="text item">
        <!-- <img src="https://picsum.photos/200/350" alt="" /> -->
        <p>{{ quotesText }}</p>
        <p>{{ quotesAuthor }}</p>
        {{ currentDate }}
      </div>
    </el-card>

    <el-card v-for="art in articles" :key="art.publishedAt" class="box-card">
      <div class="text item">
        <!-- <img src="https://picsum.photos/200/350" alt="" /> -->
        <img style="max-width: 310px;" :src="art.urlToImage" alt="">
        <p >{{ art.title }}</p>
        <p style="color: rgb(83, 83, 83);">{{ art.description }}</p>
        {{ new Date(art.publishedAt).toLocaleString() }}
        <a :href="art.url" target="_blank">Full article</a>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default {
  setup() {
    const currentDate = ref(new Date().toLocaleTimeString());
    const jokes = ref(null);
    const quotesText = ref(null);
    const quotesAuthor = ref(null);
    const articles = ref(null);


    onMounted(() => {
      fetch("https://api.chucknorris.io/jokes/random")
        .then((res) => res.json())
        .then((data) => {
          // enter you logic when the fetch is successful
        //   console.log(data.value);
          jokes.value = data.value;
        })
        .catch((error) => {
          // enter your logic for when there is an error (ex. error toast)
          console.log(error);
        });

        const getRand = Math.random();
        const random = Math.round(getRand * 1640);

      fetch("https://type.fit/api/quotes")
        .then((res) => res.json())
        .then((data) => {
          // enter you logic when the fetch is successful
        //   console.log(data[0].text, data[0].author);
        //   console.log(Object.keys(data).length);
          quotesText.value = data[random].text;
          quotesAuthor.value = data[random].author;
        })
        .catch((error) => {
          // enter your logic for when there is an error (ex. error toast)
          console.log(error);
        });

      fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=bad8d364f1f54cdbbd00e1008005d826")
        .then((res) => res.json())
        .then((data) => {
          // enter you logic when the fetch is successful
        //   console.log(data[0].text, data[0].author);
          console.log(data.articles[0])
          articles.value = data.articles
        })
        .catch((error) => {
          // enter your logic for when there is an error (ex. error toast)
          console.log(error);
        });
    });

    return {
      currentDate,
      jokes,
      quotesText,
      quotesAuthor,
        articles
    };
  },
}
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Patua+One&display=swap");
.text {
  p {
    font-family: "Patua One", cursive;
  }
}
.rand-card {
  max-width: 350px;
  margin: auto;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}

.box-card{
    margin-top: 15px;
}
</style>
