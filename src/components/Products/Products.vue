<template>
  <div id="nav-scroller" class="product-categories">
    <!-- Single Category -->
    <div
      v-for="(category, i) in { ...sections, ...categoryProducts }"
      :id="`${normalizeId(category.category)}`"
      :key="i"
      class="product-category"
    >
      <!-- Header -->
      <div class="category-title d-flex justify-content-between">
        <div class="header-name d-flex">
          <h3>{{ category.category }}</h3>
        </div>
      </div>
      <div class="category-products">
        <div v-if="category.products.length <= 0" class="my-4">
          <h3>No Products Yet</h3>
        </div>
        <b-row v-else>
          <b-col
            xl="3"
            lg="4"
            md="6"
            sm="4"
            cols="6"
            v-for="(product, index) in sortCategoryProduct(category.products)"
            :key="index"
            class="category-product-wrapper"
          >
            <Product
              :product="product"
              :index="index"
              :category="category"
              @toggleCartItem="toggleCartItem"
              @addCartItem="addCartItem"
            />
          </b-col>
        </b-row>
      </div>
      <!-- Header -->
    </div>
    <!-- Single Category -->
  </div>
</template>

<script>
import Product from './Product';

export default {
  props: ['categoryProducts', 'sections', 'categories'],
  components: {
    Product
  },
  methods: {
    categoryName(id) {
      return this.categories.find(category => category._id === id).name;
    },
    addCartItem(product, ev, section, index) {
      this.$gtag.event('add_to_cart', {
        items: [
          {
            name: product.title,
            category: this.categoryName(product.categories[0]),
            list_position: index + 1,
            list_name: section + ' Section Browse Page',
            quantity: 1,
            price: product.salePrice ? product.salePrice : product.price,
          },
        ],
      });

      const img = document.createElement('img');
      img.src = product.img;
      img.classList.add('animate-image');
      img.style.top = ev.target.getBoundingClientRect().top + 'px';
      img.style.left = ev.target.getBoundingClientRect().left + 'px';

      document.body.appendChild(img);

      setTimeout(() => {
        this.$store.commit('updateCartItems', product);
        document.body.removeChild(img);
      }, 800);
    },
    toggleCartItem(product, section, index) {
      this.$gtag.event('view_item', {
        items: [
          {
            name: product.title,
            category: this.categoryName(product.categories[0]),
            list_position: index + 1,
            list_name: section + ' Section Browse Page',
            quantity: 1,
            price: product.salePrice ? product.salePrice : product.price,
          },
        ],
      });
      this.$emit('toggleCartItem', product);
    },
    nextSectionId(index, id) {
      let sections = {...this.sections, ...this.categoryProducts};
      let secIds = Object.keys(sections);
      let idIndex = secIds.indexOf(id);
      let nextSecid = secIds[idIndex + 1];

      return nextSecid
          ? this.normalizeId(sections[nextSecid].category)
          : '';
    },
  }
};
</script>

<style lang="scss" scoped>
.el-main {
  padding: 0;
}
.product-categories {
  padding-bottom: 100px;
  margin-left: 329px;
  margin-top: 200px;

  .product-category {
    margin-bottom: 30px;
    scroll-margin-top: 200px;

    .category-title {
      padding: 0;
      align-items: center;
      position: relative;

      .header-name {
        align-items: center;

        h3 {
          font-weight: bold;
          font-size: 30px;
          line-height: 35px;
          color: #646363;
          margin-bottom: 0;
        }

        span {
          transform: translateY(-3px);
          display: inline-block;
        }
      }

      a {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        transition: 0.3s;
        cursor: pointer;

        img {
          max-width: 60%;
          width: 100%;
          object-fit: cover;
          transform: rotate(90deg);
        }

        &:hover {
          background-color: #d3d3d3;
        }
      }
    }

    .category-products {
      padding-top: 30px;
      width: 100%;

      .category-product-wrapper {
        margin-bottom: 20px;
      }
    }
  }

  @media screen and (max-width: 767px) {
    margin-left: 0;
    margin-top: 370px;

    .product-category {
      scroll-margin-top: 370px;

      .category-title {
        border-bottom: 1px solid #23A334;
        padding-bottom: 8px;

        .header-name {
          h3 {
            font-size: 22px;
            line-height: 26px;
          }
        }
      }

      .category-products {
        padding-top: 28px;
        width: 100%;

        .row {
          margin: 0 !important;
        }

        .category-product-wrapper {
          margin-bottom: 10px;
        }
      }
    }
  }

  @media screen and (max-width: 575px) {
    .product-category {
      .category-title {
        .header-name {
          h3 {
            font-size: 14px;
            line-height: 16px;
          }
        }
      }
    }
  }
}
</style>
