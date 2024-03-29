"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});

var _slicedToArray = (function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance"
      );
    }
  };
})();

var _extends =
  Object.assign ||
  function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function Payant(props) {
  var initialState = _extends({}, props, {
    scriptLoaded: null,
    class: props.class || props.className || "",
  });

  var _useState = (0, _react.useState)(initialState),
    _useState2 = _slicedToArray(_useState, 2),
    payantState = _useState2[0],
    setPayantState = _useState2[1];

  var payWithPayant = (0, _react.useCallback)(
    function () {
      payantState.scriptLoaded &&
        payantState.scriptLoaded.then(function () {
          var payantOptions = {
            key: payantState.payantPublicKey,
            reference_code: payantState.reference,
            amount: payantState.amount,
            client: payantState.client,
            client_id: payantState.client_id,
            due_date: payantState.due_date,
            fee_bearer: payantState.fee_bearer,
            items: payantState.items,
            tokenize: payantState.tokenize,
            payment_methods: payantState.payment_methods,
            callback: function callback(response) {
              payantState.callback(response);
            },
            onClose: function onClose() {
              payantState.close();
            },
          };
          Object.freeze(payantOptions);
          var handler = window.Payant.invoice(payantOptions);
          handler.openIframe();
        });
    },
    [payantState]
  );

  var loadScript = function loadScript(callback) {
    var script = document.createElement("script");
    script.src = "https://api.payant.ng/assets/js/inline.min.js";
    document.getElementsByTagName("head")[0].appendChild(script);
    if (script.readyState) {
      // IE
      script.onreadystatechange = function () {
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
      script.onload = function () {
        callback();
      };
    }
  };

  var loadscriptAndUpdateState = (0, _react.useCallback)(
    function () {
      setPayantState(
        _extends({}, payantState, {
          scriptLoaded: new Promise(function (resolve) {
            loadScript(function () {
              resolve();
            });
          }),
        })
      );
    },
    [payantState]
  );

  (0, _react.useEffect)(
    (0, _react.useCallback)(
      function () {
        loadscriptAndUpdateState();
        if (payantState.scriptLoaded) {
          payWithPayant();
        }
      },
      [loadscriptAndUpdateState, payWithPayant, payantState.scriptLoaded]
    ),
    []
  );

  return _react2.default.createElement(
    "button",
    {
      className: payantState.class,
      onClick: payWithPayant,
      disabled: payantState.disabled,
    },
    payantState.text
  );
}

Payant.propTypes = {
  text: _propTypes2.default.string,
  class: _propTypes2.default.string,
  reference: _propTypes2.default.string,
  client: _propTypes2.default.shape({
    company_name: _propTypes2.default.string,
    first_name: _propTypes2.default.string.isRequired,
    last_name: _propTypes2.default.string.isRequired,
    email: _propTypes2.default.string.isRequired,
    phone: _propTypes2.default.string.isRequired,
    address: _propTypes2.default.string,
    type: _propTypes2.default.string,
    settlement_bank: _propTypes2.default.string,
    account_number: _propTypes2.default.string,
  }).isRequired,
  client_id: _propTypes2.default.string,
  due_date: _propTypes2.default.string.isRequired,
  fee_bearer: _propTypes2.default.string.isRequired,
  items: _propTypes2.default.arrayOf(
    _propTypes2.default.shape({
      item: _propTypes2.default.string.isRequired,
      description: _propTypes2.default.string.isRequired,
      unit_cost: _propTypes2.default.string.isRequired,
      quantity: _propTypes2.default.string.isRequired,
    })
  ).isRequired,
  tokenize: _propTypes2.default.bool,
  payment_methods: _propTypes2.default.arrayOf(
    _propTypes2.default.oneOf(["card", "bank", "phone", "qr"])
  ),
  payantPublicKey: _propTypes2.default.string.isRequired,
  callback: _propTypes2.default.func.isRequired,
  close: _propTypes2.default.func.isRequired,
  disabled: _propTypes2.default.bool,
};

Payant.defaultProps = {
  text: "Make Payment",
  disabled: false,
  embed: false,
  tokenize: false,
  payment_methods: ["card", "bank", "phone", "qr"],
};

exports.default = Payant;

//# sourceMappingURL=payant.min.js.map
