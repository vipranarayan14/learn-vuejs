const { Vue } = window;

const app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    description: "A pair of warm, fuzzy socks.",
    selectedVariant: 0,
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
        quantity: 8,
      },
      {
        id: 2,
        color: "blue",
        image: "./assests/vmSocks-blue-onWhite.jpg",
        quantity: 0,
      },
    ],
    cart: 0,
  },
  methods: {
    addToCart() {
      let cart = this.cart + 1;

      this.cart = cart > this.inventory ? this.inventory : cart;
    },
    removeFromCart() {
      let cart = this.cart - 1;

      this.cart = cart <= 0 ? 0 : cart;
    },
    showVariant(index) {
      this.selectedVariant = index;
    },
  },
  computed: {
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inventory() {
      return this.variants[this.selectedVariant].quantity;
    },
  },
});
