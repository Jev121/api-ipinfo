<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <!-- <router-link class="navbar-item" to="/"> -->
        <!-- <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"> -->
        <!-- </router-link> -->

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
          @click="toggleNavMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" :class="{ 'is-active': isNavMenuActive }" class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">IP Lookup</router-link>
          <router-link class="navbar-item" to="/asn">ASN Lookup</router-link>
          <router-link class="navbar-item" to="/documentation">Documentation</router-link>

          <div class="navbar-item has-dropdown" :class="{ 'is-active': isMoreDropdownActive }"
            @click="toggleMoreDropdown">
            <a class="navbar-link">
              More
            </a>

            <div class="navbar-dropdown">
              <router-link class="navbar-item" to="/about">About</router-link>
              <!-- <router-link class="navbar-item" to="/jobs">Jobs</router-link> -->
              <router-link class="navbar-item" to="/contact">Contact</router-link>
              <!-- <hr class="navbar-divider"> -->
              <!-- <a class="navbar-item">Report an issue</a> -->
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <!-- <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light">
                Log in
              </a>
            </div> -->
          </div>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isNavMenuActive: false,
      isMoreDropdownActive: false,
    };
  },
  methods: {
    toggleNavMenu() {
      this.isNavMenuActive = !this.isNavMenuActive;
    },
    toggleMoreDropdown() {
      this.isMoreDropdownActive = !this.isMoreDropdownActive;
    },
  },
};
</script>

<style></style>
