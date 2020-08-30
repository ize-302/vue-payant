<template>
  <button v-if="!embed" class="payButton" @click="payWithPayant">
    <slot>Make Payment</slot>
  </button>
  <div v-else id="payantEmbedContainer" />
</template>

<script type="text/javascript">
export default {
  props: {
    payantkey: { type: String, required: true },
    reference: { type: String, required: true },
    client: {
      company_name: { type: String },
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String },
      type: { type: String },
      settlement_bank: { type: String },
      account_number: { type: String },
    },
    client_id: { type: String, required: true },
    due_date: { type: String, required: true },
    fee_bearer: { type: String, required: true },
    items: {
      type: Array,
      default: () => [],
    },
    tokenize: { type: Boolean },
    payment_methods: {
      type: Array,
      validator: (prop) => ["card", "bank", "phone", "qr"].includes(prop),
    },
    callback: { type: Function, required: true, default: function() {} },
    close: { type: Function, required: true, default: function() {} },
    disabled: { type: Boolean },
  },
  data() {
    return {
      scriptLoaded: null,
    };
  },
  created() {
    this.scriptLoaded = new Promise((resolve) => {
      this.loadScript(() => {
        resolve();
      });
    });
  },
  mounted() {
    if (this.embed) {
      this.payWithPayant();
    }
  },
  methods: {
    loadScript(callback) {
      const script = document.createElement("script");
      script.src = "https://api.payant.ng/assets/js/inline.min.js";
      document.getElementsByTagName("head")[0].appendChild(script);
      if (script.readyState) {
        // IE
        script.onreadystatechange = () => {
          if (
            script.readyState === "loaded" ||
            script.readyState === "complete"
          ) {
            script.onreadystatechange = null;
            callback();
          }
        };
      } else {
        // Others
        script.onload = () => {
          callback();
        };
      }
    },

    payWithPayant() {
      this.scriptLoaded &&
        this.scriptLoaded.then(() => {
          const payantOptions = {
            key: this.payantkey,
            reference_code: this.reference,
            client: this.client,
            client_id: this.client_id,
            due_date: this.due_date,
            fee_bearer: this.fee_bearer,
            items: this.items,
            tokenize: this.tokenize,
            payment_methods: this.payment_methods,
            callback: (response) => {
              this.callback(response);
            },
            onClose: () => {
              this.close();
            },
            fee_bearer: this.fee_bearer,
          };

          if (this.embed) {
            payantOptions.container = "payantEmbedContainer";
          }

          const handler = window.Payant.invoice(payantOptions);
          if (!this.embed) {
            handler.openIframe();
          }
        });
    },
  },
};
</script>
