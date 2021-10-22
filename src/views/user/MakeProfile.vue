<template>
  <section class="login">
    <!-- Page content -->
    <b-container v-if="!loading" class="mt-1 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card class="bg-none border-0 mb-0" no-body>
            <b-card-body class="px-lg-3 py-lg-5">
              <div class="logo">
                <img src="@/assets/images/logo/logo.png" />
              </div>
              <template>
                <div class="text-center mb-4">
                  <h3 class="text-lg text-white">Add Information</h3>
                </div>

                <b-form role="form" @submit.prevent="onSubmit">
                  <div class="form-item mb-2">
                    <span>
                      <i class="bi bi-chat-left"></i>
                    </span>
                    <input
                      v-model="fname"
                      name="fname"
                      placeholder="First Name"
                    />
                  </div>
                  <div class="form-item">
                    <span>
                      <i class="bi bi-chat-left"></i>
                    </span>
                    <input
                      v-model="sname"
                      name="sname"
                      placeholder="Last Name"
                    />
                  </div>

                  <div
                    v-if="err"
                    class="invalid-feedback"
                    style="display: block"
                  >
                    {{ err }}
                  </div>

                  <div class="text-center mt-2">
                    <b-button
                      :disabled="loading"
                      class="my-2 btn"
                      native-type="submit"
                      type="primary"
                    >
                      <b-icon
                        v-if="loading"
                        animation="spin"
                        class="spin-icon"
                        font-scale="1.8"
                        icon="arrow-clockwise"
                      ></b-icon>
                      Add
                    </b-button>
                  </div>
                </b-form>
              </template>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      fname: "",
      sname: "",
      err: "",
      loading: false,
    };
  },
  methods: {
    ...mapActions(["SAVE_USER", "VERIFY_LOGIN"]),
    onSubmit() {
      this.err = "";
      this.loading = true;
      this.SAVE_USER({ fname: this.fname, sname: this.sname })
        .then((res) => {
          this.$router.push("/browse");
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;

          this.err = err;
        });
    },
  },
  created() {
    this.loading = true;

    this.VERIFY_LOGIN()
      .then((user) => {
        if (user.fname || user.sname)
          if (user.role === "user") this.$router.push("/browse");
          else if (user.role === "admin") this.$router.push("/admin");
          else if (user.role === "rider") this.$router.push("/rider");

        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
      });

      this.$gtag.screenview({
      app_name: "Just Go",
      screen_name: "MakeProfile",
    });
  },
};
</script>


<style lang="scss" scoped>
.login {
  background: linear-gradient(#2dce89, #2dcecc) !important;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .logo {
    padding: 60px 0;

    img {
      max-width: 200px;
      width: 100%;
      display: block;
      margin: 0 auto;
    }
  }

  .link {
    color: #000 !important;

    &:hover {
      text-decoration: underline;
    }
  }

  .bg-none {
    background: none;
  }

  .form-item {
    display: grid;
    grid-template-columns: 50px 1fr;
    background: #51b094;
    border-radius: 12px;
    align-items: center;
    height: 58px;

    span {
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 24px;
        color: #fff;
      }
    }

    input {
      font-size: 1.1rem;
      background: none;
      color: #fff;
      height: 100%;
      width: 100%;
      border: none;
      padding-bottom: 4px;

      &::-webkit-input-placeholder {
        /* Edge */
        color: #fff;
      }

      &:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #fff;
      }

      &::placeholder {
        color: #fff;
      }

      &:focus {
        outline: none;
      }
    }
  }

  button {
    width: 100%;
    background: #23a534;
    border: none;
    outline: none;
    transition: 0.3s;
    font-style: normal;
    font-weight: bold;
    box-shadow: none;
    color: #fff;
    border: 1px solid #23a534;

    &:active,
    &:hover {
      background: #1e852b;
    }
  }
}
</style>
