<template>
  <div>
    <a class="sc-btn" href="https://short-chat.vercel.app/">
      Secure chat
    </a>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=VT323&display=swap");
.sc-btn {
  position: absolute;
  left: 0;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: #04785793;
  font-family: "VT323", monospace;
  color: rgba(255, 255, 255, 0.39);
  text-align: center;
  padding: 7px;
  padding-top: 10px;
  box-shadow: 1px 0px 50px 0.5px gray;
  text-decoration: none;
  transition: all 0.34s;
}
.sc-btn:hover {
  background-color: #047857;
  color: white;
}
</style>
