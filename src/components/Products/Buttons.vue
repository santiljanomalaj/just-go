<template>
  <div class="btns">
    <b-link
      :href="'#' + normalizeId(cat)"
      class="category-link"
      v-for="(cat, i) in categories"
      :key="i"
    >
      {{ cat }}
    </b-link>
  </div>
</template>

<script>
export default {
  props: ["categories"],
};
</script>

<style lang="scss" scoped>
.btns {
  // padding: 0 1rem;
  display: flex;
  flex-wrap: nowrap;
  column-gap: 16px;
  overflow-x: scroll;
  overflow-y: hidden;
  width: inherit;
  padding-top: 14px;
  border-top: 1px solid #ddd;
  .category-link {
    height: 1.4rem;
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    background: none;
    border: none;
    outline: none;
    transition: all 0.2s ease;
    font-family: "Lato", sans-serif;
    text-transform: uppercase;
    font-weight: 600;
    line-height: 1.2;
    text-decoration: none;
    color: #0a0a0a;
    white-space: nowrap;
    &:hover,
    &.active {
      border-bottom: 2px solid;
    }
  }
}
</style>