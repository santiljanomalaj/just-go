<template>
  <default-layout>
    <div class="content-wrapper">
      <form>
        <label>Name</label>
        <input 
          type="text" 
          v-model="name"
          name="name"
          placeholder="Your Name"
        >
        <label>Email</label>
        <input 
          type="email" 
          v-model="email"
          name="email"
          placeholder="Your Email"
          >
        <label>Message</label>
        <textarea 
          name="message"
          v-model="message"
          cols="30" rows="5"
          placeholder="Message">
        </textarea>
        
        <input type="submit" value="Send">
      </form>
    </div>
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout';
export default {
  name: 'contact-us',
  components: {
    DefaultLayout
  }
}
</script>

<style lang="scss" scoped>
* {box-sizing: border-box;}

.content-wrapper {
  display: block;
  margin:auto;
  text-align: center;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  max-width: 600px;
}

label {
  float: left;
}

input[type=text], [type=email], textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}
</style>