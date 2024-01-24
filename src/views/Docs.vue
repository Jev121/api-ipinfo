<template>
  <div class="documentation">
    <section class="section">
      <div class="container">
        <h1 class="title">IP Address Lookup Documentation</h1>
        <div class="content">
          <h2>Usage Instructions</h2>
          <p>
            The IP Address Lookup allows you to retrieve information about any IP address. Follow these steps to use the tool:
          </p>
          <ol>
            <li>Go to the <router-link to="/">Home</router-link> page.</li>
            <li>Enter the IP address you want to look up in the input field.</li>
            <li>Click the "Lookup" button. The results will be displayed below the input field.</li>
          </ol>

          <h2>Cookie Usage</h2>
          <p>
            This website uses cookies to enhance your experience and provide a personalized service. When you perform an IP address lookup, the IP address you entered will be stored in a cookie on your device.
          </p>
          <p>
            The cookie is used to remember your recent IP address lookups, making it easier for you to revisit the results without having to re-enter the IP address.
          </p>
          <p>
            You can clear your stored IP address data by clearing your browser's cookies.
          </p>

          <h2>Feedback and Support</h2>
          <p>
            If you have any feedback, questions, or need support, feel free to <router-link to="/contact">contact us</router-link>. We're here to help!
          </p>
          <h2>API Usage Examples</h2>
          <p>Here are some examples of how to use the IP Info API:</p>

          <ul>
            <li>
              <p>
                <strong>Query a Specific IP Address (1.1.1.1):</strong>
                <a href="https://api-ipinfo.pages.dev/api/1.1.1.1" target="_blank">https://api-ipinfo.pages.dev/api/1.1.1.1</a>
              </p>
            </li>
            <li>
              <p>
                <strong>Query Your Own IP Address:</strong>
                <a href="https://api-ipinfo.pages.dev/api/" target="_blank">https://api-ipinfo.pages.dev/api/</a>
              </p>
            </li>
            <li>
              <p>
                <strong>Query ASN (AS13335):</strong>
                <a href="https://api-ipinfo.pages.dev/api/as13335" target="_blank">https://api-ipinfo.pages.dev/api/as13335</a>
              </p>
            </li>
          </ul>

          <p>
            You can perform these API queries by making HTTP GET requests to the provided URLs. The API will return JSON data containing information about the queried IP address or ASN.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>


<style scoped>
.documentation {
  margin-top: 2rem;
}

.title {
  margin-bottom: 1.5rem;
}
</style>
