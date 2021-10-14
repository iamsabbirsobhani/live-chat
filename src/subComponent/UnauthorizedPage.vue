<template>
  <div>
    <el-card class="my-card" shadow="never">
      <i class="fas fa-lock"></i>
      <p>Unauthorised access</p>
      <p>Please come to this page again by entering the right password.</p>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.my-card {
  font-family: "Rajdhani", sans-serif;
  max-width: 600px;
  margin: 20vh auto;
  background-color: red;
  border-radius: 10px;
  p {
    text-align: center;
    color: white;
    font-size: 20px;
    font-weight: 700;
  }
  .fa-lock {
    color: white;
    font-size: 20px;
  }
}
</style>
