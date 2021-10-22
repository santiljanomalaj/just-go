<template>
  <div class="profile-page">
    <div v-if="loading" class="loader">
      <b-icon
        animation="spin"
        class="spin-icon"
        font-scale="2.2"
        icon="arrow-clockwise"
      ></b-icon>
    </div>
    <div v-else>
      <div class="profile-card referral">
        <h1 class="card-title">Referrals</h1>
        <p class="desc">
          Get $10 for each friend you bring to Just Go. Just tell them to use
          your referral Link to get $5 off their first 2 orders.
        </p>
        <div class="referral-code d-flex align-items-center">
          <input
            class="input custom-input text-center"
            type="text"
            spellcheck="false"
            id="referral"
            :value="
              domainLink + '/login?referral=' + profileData.uid.substr(18)
            "
            disabled
            @click="copy"
          />
          <ShareNetwork
            network="whatsapp"
            url="http://localhost:8080/login?referral=1213"
            title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
            description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
          >
            <div class="referral-share">
              <img src="@/assets/images/profile/share.svg" />
            </div>
          </ShareNetwork>
        </div>
      </div>
      <div class="profile-card">
        <h1 class="card-title">Account Details</h1>
        <div>
          <div class="profile-input">
            <img src="@/assets/images/profile/user.svg" />
            <input
              class="input custom-input"
              placeholder="Johnny"
              v-model="profileData.fname"
            />
          </div>
          <div class="profile-input">
            <img src="@/assets/images/profile/email.svg" />
            <input
              class="input custom-input"
              placeholder="Appleseed"
              v-model="profileData.sname"
            />
          </div>
        </div>
        <div class="profile-form-btns">
          <div
            class="save-btn default-btn"
            :class="{ disabled: saving }"
            @click="updateUser"
          >Save</div>
          <div
            class="logout-btn link-btn"
            @click="logout"
          >Logout</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "UserProfile",
  data() {
    return {
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
        this.$emit("dialogToggle", false);
        window.location.reload();
      });
    },
    copy(ev) {
      let testingCodeToCopy = document.querySelector("#referral");
      testingCodeToCopy.setAttribute("type", "text");
      testingCodeToCopy.select();

      try {
        var successful = document.execCommand("copy");
        this.$toast.open({
          message: "Copied!",
          type: "default",
          duration: 5000,
          position: "top",
          dismissible: true
        })
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
  overflow: auto;

  .loader {
    min-height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .profile-card {
    &.referral {
      padding-bottom: 50px;
      margin-bottom: 30px;
      border-bottom: 1px solid #C4C4C4;
    }

    .card-title {
      font-weight: 500;
      font-size: 20px;
      line-height: 23px;
      color: #646363;
      margin: 0 0 20px;
    }

    .desc {
      font-weight: normal;
      font-size: 14px;
      line-height: 137.19%;
      color: #C4C4C4;
      margin-bottom: 24px;
    }
    
    .referral-code {
      #referral:disabled {
        pointer-events: visible;
      }
      .referral-share {
        display: inline-flex;
        background: #23A334;
        padding: 10px;
        border-radius: 10px;
        margin-left: 8px;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .profile-card {
      &.referral {
        padding-bottom: 0;
        border: none;
      }

      .card-title {
        margin: 0 0 10px;
      }
    }
  }
}

.profile-form-btns {
  margin-top: 22px;

  & > div {
    max-width: 316px;
    margin: 0 auto;
    padding: 9px 20px;
  }
}

.profile-input {
  display: flex;
  align-items: center;
  padding: 8px 0;

  img {
    margin-right: 12px;
  }
}
</style>
