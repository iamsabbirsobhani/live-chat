<template>
  <div class="lc-card">
    <div
      class="card text-white bg-danger mb-3 mx-auto"
      style="max-width: 40rem;"
    >
      <h2> Warning</h2>
      <div class="card-body">
        <h4 class="card-title">Site closure notice</h4>
        <p class="card-text">
          This site may be closed within the following period.
        </p>
        <p class="time-count">Time left: {{ timeCount }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  setup() {
    const timeCount = ref(null);

    onMounted(() => {
      // Set the date we're counting down to
      var countDownDate = new Date("Dec 1, 2021 15:37:25").getTime();

      // Update the count down every 1 second
      var x = setInterval(function() {
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        // document.getElementById("demo").innerHTML =
        //   days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        timeCount.value = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        // If the count down is over, write some text
        if (distance < 0) {
          clearInterval(x);
          timeCount.value = `EXPIRED`;
          //   document.getElementById("demo").innerHTML = "EXPIRED";
        }
      }, 1000);
    });
    return { timeCount };
  },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap');
.lc-card {
  max-width: 500px;
  background: rgb(216, 15, 15);
  color: white;
  margin: 10px auto;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 1px 0px 5px red;
//   font-family: 'Roboto', sans-serif;
  font-family: 'Rajdhani', sans-serif;
//   border-top: 5px solid gray;
}
.time-count {
  text-align: center;
  font-size: 20px;
  font-weight: 500;
}
h2 {
    padding: 4px;
    border-bottom: 1px solid white;
}
@media (max-width: 500px) {
  .lc-card {
    max-width: 320px;
    background: red;
    color: white;
    margin: 10px auto;
  }
}
</style>
