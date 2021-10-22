<template>
  <div class="profile-page container">
    <div v-if="loading" class="loader">
      <b-icon
        animation="spin"
        class="spin-icon"
        font-scale="2.2"
        icon="arrow-clockwise"
      ></b-icon>
    </div>
    <template>
      <div class="mb-6">
        <!-- Welcome Text -->
        <div class="welcome-title">
          <h1 class="title">Hi, {{ dName }}</h1>
          <p class="subtitle">Welcom Back</p>
        </div>
        <!-- Welcome Text -->

        <!--        START::Referral code-->
        <div class="profile-card">
          <h1 class="card-title">Referrals</h1>
          <p class="desc">
            Get $10 for each friend you bring to Just Go. Just tell them to use
            your referral Link to get $5 off their first 2 orders.
          </p>
          <div class="referral-code">
            <h4>Your Link</h4>
            <!-- <h2>{{profileData.uid.substr(18)}}</h2> -->
            <textarea
              type="text"
              spellcheck="false"
              id="referral"
              :value="
                domainLink + '/login?referral=' + profileData.uid.substr(18)
              "
            >
            </textarea>
            <span class="share" @click="copy">
              <i class="bi bi-share"></i>
              <ShareNetwork
                network="whatsapp"
                url="http://localhost:8080/login?referral=1213"
                title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
                description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
              >
                Share
              </ShareNetwork>
            </span>
            <span class="copy" @click="copy">
              <i class="bi bi-clipboard"></i>
              Copy</span
            >
          </div>
        </div>

        <!--        END::Referral code-->

        <!-- Account Details -->

        <div class="profile-card">
          <h1 class="card-title">Account Details</h1>
          <div class="flex">
            <div class="profile-input">
              <p class="profile-input-label">First Name</p>
              <input
                class="input"
                placeholder="Johnny"
                v-model="profileData.fname"
              />
            </div>
            <div class="profile-input">
              <p class="profile-input-label">Last Name</p>
              <input
                class="input"
                placeholder="Appleseed"
                v-model="profileData.sname"
              />
            </div>
          </div>
          <div
            class="save-btn"
            :class="{ disabled: saving }"
            @click="updateUser"
          >
            <b-icon
              v-if="saving"
              animation="spin"
              class="spin-icon"
              font-scale="1.8"
              icon="arrow-clockwise"
            ></b-icon>
            Save
          </div>
        </div>

        <!-- <div class="container"> -->
        <div class="logout-btn" @click="logout">Logout</div>
        <!-- </div> -->
      </div>

      <!-- Account Details -->
      <BottomNav :nav-links="navLinks" />
    </template>
  </div>
</template>

<script>
import { navLinks } from "../../data/Navlinks";
import BottomNav from "../../components/Products/BottomNav.vue";
import { mapActions } from "vuex";

export default {
  name: "UserProfile",
  components: {
    BottomNav,
  },
  data() {
    return {
      navLinks,
      profileData: {
        fname: "",
        sname: "",
      },
      dName: "",
      loading: false,
      saving: false,
    };
  },
  methods: {
    ...mapActions(["SAVE_USER", "LOGOUT"]),
    updateUser() {
      this.saving = true;
      this.SAVE_USER(this.profileData)
        .then((res) => {
          this.saving = false;
          this.dName = this.profileData.fname;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    logout() {
      this.LOGOUT().then((res) => {
        this.$router.push("/browse");
      });
    },
    copy(ev) {
      let testingCodeToCopy = document.querySelector("#referral");
      testingCodeToCopy.setAttribute("type", "text");
      testingCodeToCopy.select();
      document.querySelector(".copy").innerText = "Copied!";
      setTimeout(() => {
        document.querySelector(
          ".copy"
        ).innerHTML = ` <i class="bi bi-clipboard"></i>
              Copy`;
      }, 3000);
      try {
        var successful = document.execCommand("copy");
      } catch (err) {
        alert("Oops, unable to copy");
      }

      /* unselect the range */
      // testingCodeToCopy.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges();
    },
  },
  computed: {
    domainLink() {
      return window.location.origin;
    },
  },

  created() {
    let user = this.$store.getters.getUser;
    this.profileData = user;
    this.dName = user.fname;

    this.$gtag.pageview(this.$route);
  },
};
</script>

<style lang="scss" scoped>
.profile-page {
  margin: auto;
  min-height: 100vh;
  overflow: scroll;
  padding-bottom: 40px;
  .loader {
    min-height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .welcome-title {
    padding-top: 2.5rem;
    margin: 0 1rem;
    .title {
      margin-bottom: 0.5rem;
      font-size: 2rem;
      color: #000;
      font-weight: 700;
    }
    .subtitle {
      color: #828282;
      margin: 0 0 1rem;
      line-height: 1.5rem;
    }
  }
  .profile-card {
    background: #fff;
    border: 1px solid #ececec;
    border-radius: 0.5rem;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
    padding: 2rem 1rem;
    margin-bottom: 1rem;
    @media (min-width: 600px) {
      margin: 1rem;
    }
    .card-title {
      margin: 0;
      font-weight: 700;
      font-size: 1.5rem;
      color: #000;
    }
    .referral-code {
      padding: 24px;
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='34' ry='34' stroke='%23388622FF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
      border-radius: 34px;
      position: relative;
      textarea {
        resize: none;
        background: none;
        pointer-events: none;
      }
      h4 {
        font-size: 16px;
        font-weight: 600;
        color: #737373;
      }
      h2 {
        color: #1e852b;
        font-size: 32px;
      }
      .share,
      .copy {
        position: absolute;

        border-radius: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px 16px;
        border: 1px solid #737373;
        cursor: pointer;
        column-gap: 8px;
        color: #0a0a0a;
        background-color: #fff;
        @media (max-width: 990px) {
          right: 55%;
          bottom: -25px;
        }
        @media (min-width: 991px) {
          right: 24px;
          top: 16px;
        }
        a {
          color: #0a0a0a;
        }
        &.copy {
          @media (min-width: 991px) {
            bottom: 16px;
            right: 24px;

            top: unset;
            left: unset;
          }
          @media (max-width: 990px) {
            left: 60%;
            top: unset;
            bottom: -25px;
            right: unset;
          }
        }
      }
    }
    .desc {
      font-size: 16px;
      font-weight: 500;
      color: #737373;
    }
    .flex {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      flex-wrap: wrap;
      column-gap: 1rem;
      @media (max-width: 600px) {
        flex-direction: column;
      }
    }
  }
}
.save-btn,
.logout-btn {
  &.disabled {
    opacity: 0.8;
    pointer-events: none;
  }
  background: #23a534;
  border-radius: 0.5rem;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  color: #fff;
  padding: 1rem 2rem;
  font-weight: 500;
  max-width: 20rem;
  margin: auto;
  cursor: pointer;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: 0.3s;
  font-weight: 700;
  border: 2px solid #23a534;
  &:hover {
    background-color: transparent;

    color: #000;
    box-shadow: none;
  }
}
.logout-btn {
  background: #dd4b39;
  border-color: #dd4b39;
  
  @media (max-width: 576px) {
  max-width: 17rem !important;
    
  }
}
.profile-input {
  flex: 1 1;
  text-align: left;
  margin-bottom: 20px;

  .profile-input-label {
    color: #737373;
    font-size: 0.85rem;
    margin: 1.3rem 0 1rem;
    box-sizing: border-box;
    font-weight: 600;
  }
}
.address-flex {
  position: relative;
  box-sizing: border-box;
  .input-clear {
    height: 95%;
    position: absolute;
    bottom: 1px;
    right: 0;
    color: #000;
    display: none;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    // background: #fff;
    padding-left: 0.5rem;
    opacity: 0;
    cursor: pointer;
    padding-right: 0.5rem;
    border-radius: 0 5px 5px 0;
    font-size: 1.25rem;
    &.visible {
      display: flex;
      opacity: 1;
    }
  }
}
input,
textarea {
  font-size: 1.2rem;
  width: 100%;
  border: none;
  transition: all 0.3s;
  border-radius: 0;
  box-sizing: border-box;
  background: #ececec;
  padding: 1rem;
  &:focus {
    outline: none;
  }
  @media (max-width: 600px) {
    padding: 0.5rem;
    font-size: 1rem;
  }
  &textarea {
    height: 100px;
  }
}
</style>
