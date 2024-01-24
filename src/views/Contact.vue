<template>
  <div class="contact">
    <section class="section">
      <div class="container">
        <h1 class="title">Contact</h1>
        <div class="columns">
          <div class="column is-half">
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input class="input" type="text" placeholder="Your Name">
              </div>
            </div>

            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input class="input" type="email" placeholder="Email Address">
              </div>
            </div>

            <div class="field">
              <label class="label">Message</label>
              <div class="control">
                <textarea class="textarea" placeholder="Your Message"></textarea>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <button class="button is-primary">Submit</button>
              </div>
            </div>
          </div>
          <div class="column is-half">
            <div class="content">
              <p>If you have any questions, feel free to reach out to us.</p>
              <p>You can contact us through the following channels:</p>
              <ul>
                <li>Email: example@example.com</li>
                <li>Phone: 123-456-7890</li>
                <li>Address: 1234 Random Street, City, Country</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Contact',
};
</script>

<style scoped>
.contact {
  margin-top: 2rem;
}

.title {
  margin-bottom: 1.5rem;
}

.columns {
  margin-top: 2rem;
}

.field {
  margin-bottom: 1.5rem;
}

.button.is-primary {
  margin-top: 1rem;
}
</style>
