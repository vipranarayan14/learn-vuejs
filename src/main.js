const { Vue } = window;

Vue.component("product", {
  props: {
    premiumUser: {
      type: Boolean,
      isRequired: true,
    },
  },
  template: `
    <div class="product">
      <div class="product-image">
        <a :href="image">
          <img :src="image" :alt="description" />
        </a>
      </div>

      <div class="product-info">
        <h1>{{product}}</h1>

        <p>{{description}}I ❤️ {{product.toLowerCase()}}.</p>

        <p v-if="inventory > 10">In stock</p>
        <p v-else-if="inventory > 0">Almost sold out!</p>
        <p v-else>Out of stock</p>

        <p>Shipping: {{ premiumUser ? 'free' : '₹50' }}</p>

        <ul v-for="size in sizes" :key="size.relativeUnit">
          <li>{{size.relativeUnit}} ({{size.absoluteUnit}})</li>
        </ul>

        <div
          v-for="(variant, index) in variants"
          :key="variant.color"
          class="color-box"
          :style="{backgroundColor: variant.color}"
          @mouseover="showVariant(index)"
        ></div>

        <div class="cart">
          <p>Add to cart:</p>
          <button
            @click="addToCart"
            :disabled="inventory === 0"
            :class="{disabledButton: inventory === 0}"
          >
            +
          </button>
          <span>{{cart}}</span>
          <button
            @click="removeFromCart"
            :disabled="inventory === 0"
            :class="{disabledButton: inventory === 0}"
          >
            -
          </button>
        </div>
      </div>
    </div>
    `,
  data() {
    return {
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
    };
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

const app = new Vue({
  el: "#app",
  data: {
    premiumUser: true,
  },
});
