<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->

    </base-header>
    <b-container class="mt--7" fluid>
      <b-row>
        <b-col>
          <light-table :categories="categories" :products="products" @deleteProduct="deleteProduct"/>
        </b-col>
      </b-row>

    </b-container>
    <modal ref="modal" :show="show" size="sm">
      <h2>Do you want to delete this product?</h2>
    </modal>
  </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex';
import {Dropdown, DropdownItem, DropdownMenu, Table, TableColumn} from 'element-ui';
import LightTable from './Table/LightTable';

export default {
  components: {
    LightTable,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      products: [],
      show: false
    };
  },
  methods: {
    ...mapActions(['FETCH_PRODUCTS', 'DELETE_PRODUCT']),
    deleteProduct(data) {
      this.show=true
      this.$refs.modal.$refs['app-modal'].$once('hide', (bvEvt) => {
        this.show=false;

        if(bvEvt.trigger==='ok'){
          this.DELETE_PRODUCT(data).then(res => {
            this.FETCH_PRODUCTS().then(prods => {
              this.products = [...prods];
            });

          }).catch(err => {
          });
        }
      });

    },
  },
  computed: {
    ...mapGetters({
      categories: 'getCategories'
    })
  },
  created() {
    this.FETCH_PRODUCTS().then(prods => {
      this.products = [...prods];
    });
  },
};
</script>
<style>
.el-table.table-dark {
  background-color: #172b4d;
  color: #f8f9fe;
}

.el-table.table-dark th,
.el-table.table-dark tr {
  background-color: #172b4d;
}

.el-table.table-dark td,
.el-table.table-dark th.is-leaf {
  border-bottom: none;
}
</style>
