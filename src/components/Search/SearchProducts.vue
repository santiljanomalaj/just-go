<template>
  <div class="main-search px-lg-4">
    <h2>{{ products.length }} results</h2>
    <div class="search-products">
      <b-row v-if="products.length <= 0" class="justify-content-center">
        <div class="my-4 mx-auto">
          <h3 class="text-center">No Products Yet</h3>
        </div>
      </b-row>
      <div
          v-for="(product, index) in products"
          v-else
          :key="product.id"
          class="product"
          @click="showProduct(product, index)"
      >
        <div class="image">
          <img :src="product.img" alt=""/>
          <div
              class="product-btn"
              @click.stop.prevent="addCartItem(product, $event, index)"
          >
            <i class="fas fa-plus"></i>
          </div>
        </div>
        <div class="details">
          <h3>{{ product.title }}</h3>
          <p>{{ product.details }}</p>
          <p class="default-price">
            {{
              formatPrice(product.salePrice ? product.salePrice : product.price)
            }}
          </p>
          <p :class="{ active: product.salePrice }" class="sale-price">
            {{ formatPrice(product.price) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchProducts',
  props: ['products', 'categories'],
  data() {
    return {};
  },
  methods: {
    showProduct(product, index) {
      this.$emit('showProduct', product);
      this.$gtag.event('view_item', {
        items: [
          {
            name: product.title,
            category: this.categoryName(product.categories[0]),
            list_position: index,
            list_name: 'Search Results',
            quantity: 1,
            price: product.salePrice ? product.salePrice : product.price,
          }
        ]
      });
    },
    categoryName(id) {
      return this.categories.find(category => category._id === id).name;
    },
    addCartItem(product, ev, index) {

      this.$gtag.event('add_to_cart', {
       items: [
         {
           name: product.title,
           category: this.categoryName(product.categories[0]),
           list_position: index,
           list_name: 'Search Results',
           quantity: 1,
           price: product.salePrice ? product.salePrice : product.price,
         }
       ]
      });

      const img = document.createElement('img');

      img.src = product.img;
      img.classList.add('animate-image');
      img.style.top = ev.target.getBoundingClientRect().top + 'px';
      img.style.left = ev.target.getBoundingClientRect().left + 'px';

      document.body.appendChild(img);

      setTimeout(() => {
        this.$emit('addCartItem', product);
        document.body.removeChild(img);
      }, 800);
    },
  },

};
</script>

<style lang="scss" scoped>
.main-search {
  margin-top: 24px;
  margin-left: 329px;

  h2 {
    margin-left: 12px;
    font-size: 1.4rem;
    font-weight: 700;
  }

  @media screen and (max-width: 767px) {
    margin-left: 0;
  }
}

.search-products {
  padding-bottom: 100px;
  margin-top: 2rem;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr;
  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
  }

  .product {
    display: flex;
    align-items: center;
    column-gap: 1rem;
    cursor: pointer;

    .image {
      position: relative;
      max-width: 7rem;
      @media (max-width: 600px) {
        max-width: 5rem;

        // max-height: 200px;
      }

      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
        margin: 0 auto;
        display: block;
        max-height: 150px;
        max-width: 150px;
      }

      .product-btn {
        cursor: pointer;
        pointer-events: auto;
        position: absolute;
        bottom: 0;
        right: 0;
        height: 2rem;
        width: 2rem;
        background: #23a534;
        color: #fff;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          height: 1.25rem;
          width: 1.25rem;
        }
      }
    }

    .details {
      h3 {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 0;
        text-transform: capitalize;
      }

      p {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 0;

        &.default-price {
          // margin-top: 1rem;
          // margin-bottom: 0.2rem;
          font-size: 1.2rem;
          font-weight: 400;
          color: #000;
        }

        &.sale-price {
          margin: 0;
          font-size: 1.2rem;
          opacity: 0;
          font-weight: 400;

          &.active {
            color: grey;
            text-decoration: line-through;
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
