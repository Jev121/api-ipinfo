<template>
  <div class="container asn is-fullhd">
    <div class="ip-lookup">
      <section class="section my-ip-lookup">
        <div class="container">
          <h1 class="title">ASN Lookup</h1>
          <div class="field">
            <div class="control">
              <input class="input" v-model="ipAddress" type="text" placeholder="Enter ASN"
                @keyup.enter="lookupIpAddress" />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-primary" @click="lookupIpAddress">Lookup</button>
            </div>
          </div>
          <div class="table-container">
            <h2 class="subtitle">ASN INFO</h2>
            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" v-if="ipInfo">
              <tbody>
                <tr v-for="(value, key) in ipInfo" :key="key">
                  <th style="text-transform: capitalize">{{ key }}</th>
                  <td>{{ removeJson(value) }}</td>
                </tr>
              </tbody>
            </table>
            <h2 class="subtitle">IPv4</h2>
            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" v-if="cidrv4">
              <thead>
                <tr>
                  <th>Netblock</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Size</th>
                  <th>Status</th>
                  <th>Domain</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(prefix, index) in cidrv4" :key="index">
                  <td>{{ removeJson(prefix.netblock) }}</td>
                  <td>{{ removeJson(prefix.id) }}</td>
                  <td>{{ removeJson(prefix.name) }}</td>
                  <td>{{ removeJson(prefix.country) }}</td>
                  <td>{{ removeJson(prefix.size) }}</td>
                  <td>{{ removeJson(prefix.status) }}</td>
                  <td>{{ removeJson(prefix.domain) }}</td>
                </tr>
              </tbody>
            </table>
            <h2 class="subtitle">IPv6</h2>
            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" v-if="cidrv6">
              <thead>
                <tr>
                  <th>Netblock</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Size</th>
                  <th>Status</th>
                  <th>Domain</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(prefix, index) in cidrv6" :key="index">
                  <td>{{ removeJson(prefix.netblock) }}</td>
                  <td>{{ removeJson(prefix.id) }}</td>
                  <td>{{ removeJson(prefix.name) }}</td>
                  <td>{{ removeJson(prefix.country) }}</td>
                  <td>{{ removeJson(prefix.size) }}</td>
                  <td>{{ removeJson(prefix.status) }}</td>
                  <td>{{ removeJson(prefix.domain) }}</td>
                </tr>
              </tbody>
            </table>
            <h2 class="subtitle">Peers</h2>
            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" v-if="peerinfo">
              <tbody>
                <tr v-for="(value, key) in removeJson(peerinfo)" :key="key">
                  <td>{{ key }}</td>
                  <!-- <td>{{ value }}</td> -->
                  <td>
                    <span v-html="parseValues(value)"></span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content is licensed
            <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      ipAddress: this.getASNAddressFromCookie() || "", // Use the stored ASN from the cookie
      ipInfo: null,
      cidrv4: null,
      cidrv6: null,
      peerinfo: null,
    };
  },
  created() {
    const url = new URL(window.location.href);
    if (url.searchParams.has("asn")) {
      this.ipAddress = url.searchParams.get("asn");
      this.hostname = window.location.hostname;
    }
    this.lookupIpAddress();
  },
  methods: {
    async lookupIpAddress() {
      try {
        if (this.ipAddress.toLowerCase().startsWith("as")) {
          this.ipAddress = this.ipAddress.substring(2);
        }
        const url = `https://ip.3k.free.hr/api/AS${this.ipAddress}`;
        const response = await axios.get(url);
        this.ipInfo = response.data;
        this.ipInfo = {
          asn: this.ipInfo.asn,
          name: this.ipInfo.name,
          country: this.ipInfo.country,
          allocated: this.ipInfo.allocated,
          registry: this.ipInfo.registry,
          domain: this.ipInfo.domain,
          num_ips: this.ipInfo.num_ips,
          type: this.ipInfo.type,
        };
        this.peerinfo = {
          peers: this.removeJson(response.data.peers),
          upstreams: this.removeJson(response.data.upstreams),
          downstreams: this.removeJson(response.data.downstreams),
        };
        this.cidrv4 = response.data.prefixes;
        this.cidrv6 = response.data.prefixes6;
        this.saveASNAddressToCookie(this.ipAddress);
      } catch (error) {
        console.error("Error fetching IP info:", error);
        this.ipInfo = null;
      }
    },
    saveASNAddressToCookie(ipAddress) {
      const now = new Date();
      now.setFullYear(now.getFullYear() + 1);
      document.cookie = `ASNAddress=${ipAddress}; expires=${now.toUTCString()}; path=/`;
    },
    getASNAddressFromCookie() {
      const cookie = document.cookie.split("; ").find((row) => row.startsWith("ASNAddress="));
      if (cookie) {
        return cookie.split("=")[1];
      }
      return null;
    },
    removeJson(item) {
      if (Array.isArray(item)) {
        item = item.filter((value) => value !== "" && value !== "[]");
        return item.join(", ");
      } else {
        if (item === "" || item === "[]") {
          return "-";
        }
        return item;
      }
    },
    parseValues(value) {
      const values = this.removeJson(value);
      if (Array.isArray(values)) {
        const links = values.map(val => `<a href="${val}" target="_blank">${val}</a>`);
        return links.join(", ");
      } else {
        return values;
      }
    },
  },
};
</script>
