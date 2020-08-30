<template>
  <div class="App">
    <payant
      :client_id="client_id"
      :due_date="due_date"
      :fee_bearer="fee_bearer"
      :email="email"
      :first_name="first_name"
      :last_name="last_name"
      :phone="phone"
      :address="address"
      :type="type"
      :settlement_bank="settlement_bank"
      :account_number="account_number"
      :payantkey="payantkey"
      :reference="reference"
      :items="items"
      :tokenize="tokenize"
      :payment_methods="payment_methods"
      :callback="callback"
      :close="close"
      :disabled="disabled"
    >
      Make Payment
    </payant>
  </div>
</template>

<script type="text/javascript">
import payant from "../../src";
export default {
  components: {
    payant,
  },
  data() {
    return {
      client_id: "",
      due_date: "",
      fee_bearer: "",
      payantkey: "pk_test_xxxxxxxxxxxxxxxxxxxxxxx",
      first_name: "Foo",
      lastn_ame: "Bar",
      email: "foobar@example.com",
      reference: "example-reference",
    };
  },
  computed: {
    genReference() {
      let text = "";
      let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    },
  },
  methods: {
    callback: function(response) {
      console.log(response);
    },
    close: function() {
      console.log("Payment closed");
    },
  },
};
</script>

<style>
.App {
  text-align: center;
}

.payButton {
  font-size: 16px;
  background: #183055;
  padding: 10px 25px;
  color: white;
  border-radius: 3px;
  border: 0;
}
</style>
