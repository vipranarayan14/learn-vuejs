const { Vue } = window;

const app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    description: "A pair of warm, fuzzy socks.",
    image: "./assests/vmSocks-green-onWhite.jpg",
    inventory: 8,
    sizes: [
      {
        relativeUnit: "Big",
        absoluteUnit: "100cm",
      },
      {
        relativeUnit: "Medium",
        absoluteUnit: "50cm",
      },
      {
        relativeUnit: "Small",
        absoluteUnit: "1cm",
      },
    ],
    variants: [
      {
        id: 1,
        color: "green",
        image: "./assests/vmSocks-green-onWhite.jpg",
      },
      {
        id: 2,
        color: "blue",
        image: "./assests/vmSocks-blue-onWhite.jpg",
      },
    ],
    cart: 0,
  },
  methods: {
    addToCart: function() {
      let cart = this.cart + 1;

      this.cart = cart > this.inventory ? this.inventory : cart;
    },
    removeFromCart: function() {
      let cart = this.cart - 1;

      this.cart = cart <= 0 ? 0 : cart;
    },
    showVariant: function(image) {
      this.image = image;
    },
  },
});
