# Vue-Payant

A Vue package for Payant payment gateway.

## Installation

```
npm install vue vue-payant --save
# OR
yarn add vue-payant
```

### Example

```vue
<template>
  <payant
    :first_name="first_name"
    :last_name="last_name"
    :email="email"
    :payantkey="payantkey"
    :reference="reference"
    :callback="callback"
    :close="close"
    :embed="false"
  >
    Make Payment
  </payant>
</template>

<script type="text/javascript">
import payant from "vue-payant";
export default {
  components: {
    payant,
  },
  data() {
    return {
      payantkey: "pk_test_xxxxxxxxxxxxxxxxxxxxxxx",
      first_name: "Adavize",
      laset_name: "Ozorku",
      email: "adavizeozorku@gmail.com", // Customer email
    };
  },
  computed: {
    reference() {
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
```

Please checkout [Payant Documentation](https://www.payant.dev/docs/accept-payment/inline-payment) for other available options you can add to the tag

## How to contribute ✨

1. Fork it!
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Some commit message'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request 😉😉

[follow me on twitter](https://twitter.com/ozorku)!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
