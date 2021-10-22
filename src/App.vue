<template>
  <router-view> </router-view>
</template>

<script>
export default {};
</script>

<style lang="scss">
// @import url("https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
* {
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {
  overflow: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
::selection{
  background-color: #1e852b;
}
.payment {
  position: fixed;
  top: 150px;
  z-index: 150;
  left: 50%;
  transform: translateX(-50%);
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 149;
  background: rgba(0, 0, 0, 0.274);
}
::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
.custom-container {
  max-width: 768px;
  margin-inline: auto;
}
.spin-icon {
  animation: b-icon-animation-spin 1.5s linear infinite normal;
}
.slide-fade-complete-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-complete-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-complete-enter, .slide-fade-complete-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(100%);
  opacity: 0;
}

.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 0px;
}

.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}
@keyframes b-icon-animation-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.animate-image {
  position: fixed;
  z-index: 1000;
  transition: all 0.3s ease;
  height: 80px;
  width: 80px;
  animation: add-to-cart 0.8s ease-in-out normal;
}
@keyframes add-to-cart {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0.3;
    left: 48%;
    top: calc(100% - 160px);
  }
}

.err {
  color: red;
}

.scale-slide-enter-active,
.scale-slide-leave-active {
  position: absolute;
  transition: all 0.85s ease;
}

.list-slide-in {
  &-move {
    transition: opacity 0.5s linear, transform 0.5s ease-in-out;
  }

  &-leave-active {
    transition: opacity 0.4s linear,
      transform 0.4s cubic-bezier(0.5, 0, 0.7, 0.4); //cubic-bezier(.7,0,.7,1);
    transition-delay: calc(0.1s * (var(--total) - var(--i)));
  }

  &-enter-active {
    transition: opacity 0.5s linear,
      transform 0.5s cubic-bezier(0.2, 0.5, 0.1, 1);
    transition-delay: calc(0.1s * var(--i));
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &-enter {
    transform: translateY(1em);
  }
  &-leave-to {
    transform: translateY(1em);
  }
}
//GOOGLE MAPS LIST STYLING
.pac-container{
  border-radius: 10px;
  box-shadow: 0px 2px 4px #e9e9e9;
}
.pac-item {
  padding: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
}
.pac-matched {
  font-size: 18px;
  font-weight: 600;
}
.pac-container:after{
  content:none !important;
}
.modal-open {
  //overflow: hidden;
  //height: 100vh;
}

.bg-gradient-success {
  background: linear-gradient(349deg, #5e72e4 0, #52a3de 100%) !important;
}
.card .table td,
.card .table th {
  padding: 12px 0;
}
</style>
