const { Vue } = window;

const eventBus = new Vue();

Vue.component("product", {
  props: {
    premiumUser: {
      type: Boolean,
      isRequired: true,
    },
    updateCart: {
      type: Function,
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

        <button
          @click="updateCart(1)"
          :disabled="inventory === 0"
          :class="{disabledButton: inventory === 0}"
        >
          Add to cart
        </button>
        
        <button
          @click="updateCart(-1)"
          :disabled="inventory === 0"
          :class="{disabledButton: inventory === 0}"
        >
          Remove from cart
        </button>

        </div>

        <review-tabs :reviews="reviews"/>
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
      reviews: [],
    };
  },
  methods: {
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
  mounted() {
    eventBus.$on("review-submitted", (review) => {
      this.reviews.push(review);
    });
  },
});

Vue.component("review-tabs", {
  props: {
    reviews: {
      type: Array,
      isRequired: true,
    },
  },
  template: `
  <div>
    <span
      v-for="(tab, index) in tabs"
      :class="{ activeTab: selectedTab === tab }"
      @click="selectedTab = tab"
      :key="index"
    > {{ tab }} </span>

    <div v-show="selectedTab === 'Reviews'">
      <p v-if="!reviews.length">There are no reviews yet.</p>
      <ul>
        <li v-for="review in reviews">
          <p><b>{{ review.name }}</b></p>
          <p>Ratings: {{ review.ratings }}</p>
          <p>{{ review.review }}</p>
        </li>
      </ul>
    </div>

    <product-review v-show="selectedTab === 'Make a Review'"/>
  </div>
  `,
  data() {
    return {
      tabs: ["Reviews", "Make a Review"],
      selectedTab: "Reviews",
    };
  },
});

Vue.component("product-review", {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>

    <p>
      <label>
        Name 
        <input type="text" v-model="name">
      </label>
    </p>

    <p>
      <label>
        Review 
        <textarea v-model="review"></textarea>
      </label>
    </p>
    
    <p>
      <label>
        Ratings
        <select v-model.number="ratings">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </label>
    </p>

    <p>
    Would you recommend this product? 
      <label>
        <input type="radio" value="Yes" v-model="recommended">
        Yes
      </label>
      <label>
        <input type="radio" value="No" v-model="recommended">
        No
      </label>
    </p>
    
    <p>
      <input type="submit" value="Submit">
    </p>
  </form>
  `,
  data() {
    return {
      name: "",
      review: "",
      ratings: null,
      recommended: "",
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      // Send product review to parent
      const { name, review, ratings, recommended } = this;
      const productReview = {
        name,
        review,
        ratings,
        recommended,
      };

      this.errors = [];

      if (!name || !review || !ratings || !recommended) {
        if (!name) this.errors.push("Name required.");
        if (!review) this.errors.push("Review required.");
        if (!ratings) this.errors.push("Ratings required.");
        return;
      }

      eventBus.$emit("review-submitted", productReview);

      //Reset form fields
      this.name = "";
      this.review = "";
      this.ratings = 5;
    },
  },
});

const app = new Vue({
  el: "#app",
  data: {
    premiumUser: true,
    cart: 0,
  },
  methods: {
    updateCart(quantity) {
      const cart = this.cart + quantity;

      this.cart = cart < 0 ? 0 : cart;
    },
  },
});
