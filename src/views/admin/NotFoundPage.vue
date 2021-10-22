<template>
  <div>
    <b-container>
      <h1>404</h1>
      <h2>The page you are looking for is not doesn't exit!</h2>
      <router-link to="/browse">Browse Products</router-link>
    </b-container>
  </div>
</template>

<script>

export default {
  name: 'not-found'
};
</script>
<style lang="scss" scoped>
div{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
}
h1{
  font-family: 'Anton', sans-serif;
  font-size: 20vw;
  color: #23a534;
  text-align: center;
  margin-bottom: 40px;

  line-height: 1;
}
h2{
  color: #0a0a0a;
  font-size: 20px;
  text-align: center;
  margin-bottom: 40px;
}
a{
  text-decoration: none;
  width: 260px;
  color: #fff;
  background-color: #23a534;
  height: 50px;
  border-radius: 25px;
  padding: 10px 20px;
  margin: 0 auto;
  display: block;
  text-align: center;
}
</style>
