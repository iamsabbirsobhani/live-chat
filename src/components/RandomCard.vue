<template>
  <div class="rand-card">
    <el-card :style="styleObject" v-if="jokes" class="box-card">
      <h3>Jokes</h3>
      <div class="text item">
        <p>{{ jokes }}</p>
        {{ currentDate }}
      </div>
    </el-card>

    <el-skeleton v-else :style="styleObject" class="skeleton"/>

    <el-card :style="styleObject" v-if="quotesText" class="box-card box-two">
      <h3>Quotes</h3>
      <div class="text item">
        <p>{{ quotesText }}</p>
        <p>{{ quotesAuthor }}</p>
      </div>
    </el-card>

    <el-skeleton class="skeleton" :style="styleObject" v-else />

    <!-- <el-card v-for="art in articles" :key="art" class="box-card"> -->
    <!-- <div class="text item"> -->
    <!-- <img src="https://picsum.photos/200/350" alt="" /> -->
    <!-- <img style="max-width: 310px;" :src="art.urlToImage" alt=""> -->
    <!-- <p >{{ art.title }}</p>
        <p style="color: rgb(83, 83, 83);">{{ art.description }}</p>
        {{ new Date(art.publishedAt).toLocaleString() }}
        <a :href="art.url" target="_blank">Full article</a>
      </div> -->
    <!-- </el-card> -->

    <!-- <div v-for="art of article" :key="art.title">
      <div>
        <img style="max-width: 310px;" :src="art.urlToImage" alt="" />
        <p>{{ art.title }}</p>
        <p style="color: rgb(83, 83, 83);">{{ art.description }}</p>
        {{ new Date(art.publishedAt).toLocaleString() }}
        <a :href="art.url" target="_blank">Full article</a>
      </div>
    </div> -->
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  setup() {
    const jokes = ref(null);
    const quotesText = ref(null);
    const quotesAuthor = ref(null);
    const article = ref(null);

    const windWidth = ref(null);
    const styleObject = ref(null);

    onMounted(() => {
      windWidth.value = window.innerWidth;
      if (windWidth.value > 600) {
        styleObject.value = {
          width: `550px`,
          // height: `240px`,
        };
      } else if (600 > windWidth.value) {
        styleObject.value = {
          width: `320px`,
          // height: `240px`,
        };
      }

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

      fetch(
        "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=bad8d364f1f54cdbbd00e1008005d826"
      )
        .then((res) => res.json())
        .then((data) => {
          // enter you logic when the fetch is successful
          //   console.log(data[0].text, data[0].author);
          console.log(data.articles);
          article.value = data.articles;
        })
        .catch((error) => {
          // enter your logic for when there is an error (ex. error toast)
          console.log(error);
        });
    });

    return {
      jokes,
      quotesText,
      quotesAuthor,
      article,
      styleObject,
    };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Patua+One&display=swap");
h3 {
  font-family: "Patua One", cursive;
  color: orangered;
}
p {
  font-family: "Patua One", cursive;
  // color: olivedrab;
}
.skeleton {
    margin: auto;
}

// .text {
//     width: 100%;
//     background-image: url("../assets/JokesCircle.svg");
//     background-repeat: no-repeat;
//     background-position: center;

// }
// .text {
//   p {
//   }
// }
.rand-card {
  margin: auto;
}

.box-card {
  margin: auto;
  border-radius: 10px;
  margin-top: 10px;

  background-image: url("../assets/JokesCircle.svg");
  background-repeat: no-repeat;
  background-position: -350% 37%;
  background-color: rgba(228, 157, 75, 0.055);
}

.box-two {
    background-image: url("../assets/quotesCircle.svg");
  background-repeat: no-repeat;
  background-position: -380% 37%;
  background-color: rgba(75, 228, 164, 0.055);
}
.box-two {
  h3 {
    color: gray;
  }
}
// .time {
//   font-size: 13px;
//   color: #999;
// }

// .bottom {
//   margin-top: 13px;
//   line-height: 12px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }

// .button {
//   padding: 0;
//   min-height: auto;
// }

// .image {
//   width: 100%;
//   display: block;
// }

// .box-card {
//   margin-top: 15px;
// }
@media (max-width: 600px) {
  .box-card {
    background-position: 90% 40%;
  }
  .box-two {
    background-position: 100% 40%;
  }
}
</style>
