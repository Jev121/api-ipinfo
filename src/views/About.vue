<template>
  <div class="about">
    <section class="section">
      <div class="container">
        <h1 class="title">About IP Address Lookup Project</h1>
        <div class="content">
          <p>
            Welcome to the IP Address Lookup project! This project allows you to find detailed information about any IP
            address.
          </p>
          <p>
            We provide information such as the IP's location, timezone, ISP, and more. It's a valuable tool for network
            administrators, developers, and anyone interested in learning more about IP addresses.
          </p>
          <p>
            To use the IP Address Lookup, simply enter an IP address in the input field on the home page and click the
            "Lookup" button. The results will be displayed below the input field.
          </p>
          <p>
            This project is built using Vue.js for the front-end and Axios for making API requests. Bulma CSS is used for
            styling, giving it a clean and user-friendly interface.
          </p>
          <p>
            If you have any questions or suggestions, please feel free to <router-link to="/contact">contact
              us</router-link>. We'd love to hear from you!
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'About',
};
</script>

<style scoped>
.about {
  margin-top: 2rem;
}

.title {
  margin-bottom: 1.5rem;
}</style>
