<template>
  <v-app>
    <!-- Enhanced Welcome Modal -->
    <v-dialog v-model="isWelcomeModalVisible" max-width="900">
      <v-card>
        <!-- Header Section with Icon and Title -->
        <v-card-text class="headline d-flex align-center justify-center">
          <v-icon color="green-darken-2" size="48" class="mr-3"
            >mdi-wrench-outline</v-icon
          >
          <h3>Welcome to Tricraft, a Handcrafts Shop!</h3>
        </v-card-text>

        <!-- Main Content Section -->
        <v-card-text>
          <!-- About Section -->
          <section class="mb-6">
            <h2 class="text-h5">About Us</h2>
            <p>
              At Handcrafts Shop, we believe in the beauty of individuality and the charm
              of authentic craftsmanship. Every product in our collection is a labor of
              love, thoughtfully created by skilled artisans who pour their heart and soul
              into their work.
            </p>
            <p>
              Our mission is to celebrate the art of handmade creations and connect you
              with unique items that tell a story. Discover the passion behind every
              creation and bring home a piece of artistry that resonates with you.
            </p>
          </section>

          <!-- Highlights Section -->
          <section class="mb-6">
            <h2 class="text-h5">Why Shop With Us?</h2>
            <div class="ml-5">
              <ul>
                <li>🌟 Authentic, handcrafted products made by talented artisans.</li>
                <li>🌟 A curated selection of home decor, fashion, gifts, and more.</li>
                <li>🌟 Support local creators and small businesses.</li>
                <li>🌟 Eco-friendly and sustainable products.</li>
                <li>🌟 Products that carry a story and unique charm.</li>
              </ul>
            </div>
          </section>

          <!-- Testimonials Section -->
          <section class="mb-6">
            <h2 class="text-h5">What Our Customers Say</h2>
            <blockquote class="mb-4">
              "I absolutely love the handcrafted items I purchased from this shop. They're
              unique and add a touch of charm to my home!" – <em>Jessica R.</em>
            </blockquote>
            <blockquote>
              "The craftsmanship is superb, and I love knowing that my purchase supports
              local artisans." – <em>Michael L.</em>
            </blockquote>
            <blockquote>
              "Every piece feels so special, and I always find the perfect gift here." –
              <em>Sophia M.</em>
            </blockquote>
          </section>

          <!-- Developers Section -->
          <section class="mb-6 text-center">
            <h2 class="text-h5">Meet the Developers</h2>
            <p>This shop is brought to life by our talented team of developers:</p>
            <ul class="text-subtitle-1" style="list-style-type: none; padding: 0">
              <li>👨‍💻 Marc Niño C. Salundaguit</li>
              <li>👨‍💻 Edison B. Tamayo</li>
              <li>👨‍💻 John Mark A. Sumaylo</li>
            </ul>
          </section>

          <!-- Call to Action -->
          <section class="text-center">
            <p class="text-subtitle-1 mb-3">
              Ready to explore our collection and find something truly special?
            </p>
            <v-btn
              color="green-darken-2"
              large
              text
              @click="isWelcomeModalVisible = false"
            >
              Explore the Shop Now
            </v-btn>
          </section>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Navbar -->
    <v-app-bar
      app
      color="hsla(160, 100%, 37%, 1)"
      elevate-on-scroll
      sticky
      style="z-index: 20"
    >
      <v-toolbar-title>
        <div class="d-flex align-center">
          <v-icon size="24" color="white">mdi-wrench-outline</v-icon>
          <span
            class="font-weight-bold"
            style="
              color: white;
              margin-left: 8px;
              font-size: 0.9rem;
              white-space: normal;
              overflow: visible;
            "
          >
            Tricraft
          </span>
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- Page Content -->
    <v-main>
      <v-container fluid>
        <v-row class="responsive-height">
          <!-- Left: Profile Section -->
          <v-col cols="12" md="4" class="profile-section">
            <div class="profile-sidebar">
              <!-- User Avatar -->
              <div class="profile-avatar text-center">
                <v-avatar size="128" color="white">
                  <v-icon size="128">mdi-account</v-icon>
                </v-avatar>
              </div>

              <!-- User Info -->
              <div class="profile-info mt-4">
                <!-- Email Section -->
                <v-row align="center" dense>
                  <v-col>
                    <p class="text-subtitle-1 m-0"><b>Email: </b>{{ user.email }}</p>
                  </v-col>
                </v-row>
                <!-- Name Section -->
                <v-row align="center" dense>
                  <v-col>
                    <h4 class="m-0">
                      Name:
                      <b>{{ user.fullname || `${user.firstname} ${user.lastname}` }}</b>
                    </h4>
                  </v-col>
                </v-row>

                <div class="logout-button lg:mt-12 lg:pt-12">
                  <v-btn block dark @click="openEditModal">Edit User Profile</v-btn>
                </div>
              </div>

              <!-- View Orders Button -->
              <div class="logout-button lg:mt-12 lg:pt-12">
                <v-btn block color="green" dark @click="openModal(product)">
                  View Orders
                </v-btn>
              </div>

              <!-- Logout Button -->
              <div class="logout-button lg:mt-12 lg:pt-12">
                <v-btn block color="error" dark @click="logout">Logout</v-btn>
              </div>
            </div>

            <!-- Edit Profile Modal -->
            <v-dialog v-model="isEditModalOpen" max-width="600">
              <v-card>
                <v-card-title>Edit Profile</v-card-title>
                <v-card-text>
                  <v-form ref="editForm" v-model="isFormValid">
                    <v-text-field
                      v-model="editData.firstname"
                      label="First Name"
                      :rules="[rules.required]"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="editData.lastname"
                      label="Last Name"
                      :rules="[rules.required]"
                      required
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="isEditModalOpen = false">Cancel</v-btn>
                  <v-btn color="primary" text @click="saveProfile">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- View Orders Modal -->
            <v-dialog v-model="isModalOpen" max-width="600">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Your Orders</span>
                </v-card-title>
                <v-card-text>
                  <v-list>
                    <v-list-item v-for="order in userOrders" :key="order.id">
                      <v-list-item-content>
                        <div><b>Order ID:</b> {{ order.id }}</div>
                        <div><b>Total Amount:</b> ${{ order.totalAmount }}</div>
                        <div>
                          <b>Ordered Date:</b>
                          {{ new Date(order.createdAt).toLocaleString() }}
                        </div>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="red" text @click="isModalOpen = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>

          <!-- Right: Handcrafts Section -->
          <v-col cols="12" md="8" class="recipe-section">
            <v-card-title
              ><b><h3>Products to Shop</h3></b></v-card-title
            >
            <hr />

            <div class="recipe-container mt-5">
              <v-row dense>
                <v-col
                  v-for="product in filteredProducts"
                  :key="product.id"
                  cols="12"
                  md="10"
                  lg="6"
                >
                  <v-card class="pa-4" outlined>
                    <!-- Image -->
                    <v-img
                      :src="product.image_url"
                      alt="Product Image"
                      height="200"
                      class="mb-4"
                    ></v-img>
                    <!-- Product Attributes -->
                    <v-card-text class="font-weight-bold">
                      <h3>{{ product.name }}</h3>
                    </v-card-text>
                    <v-card-text>{{ product.description }}</v-card-text>
                    <v-card-subtitle>${{ product.price }}</v-card-subtitle>
                    <!-- Buttons -->
                    <div class="d-flex flex-column flex-md-row justify-space-evenly mt-4">
                      <!-- Buy Now Button -->
                      <v-btn
                        color="green"
                        dark
                        :disabled="product.isBought"
                        class="mb-2 mb-md-0"
                        @click="buyProduct(product)"
                      >
                        {{ product.isBought ? "Already Bought" : "Buy Now" }}
                      </v-btn>

                      <!-- Cancel Order Button (Visible Only When Status === BOUGHT) -->
                      <v-btn
                        v-if="product.isBought"
                        color="blue"
                        dark
                        @click="abortProduct(product)"
                      >
                        Cancel Order
                      </v-btn>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "@/supabase";
import { useRouter } from "vue-router";

const router = useRouter();

// Reactive State
const filteredProducts = ref([]);
const userOrders = ref([]);
const drawer = ref(false);
const isModalOpen = ref(false);
const isAddReviewModalOpen = ref(false);
const isEditModalOpen = ref(false);
const isFormValid = ref(false);
const isWelcomeModalVisible = ref(false);
const user = ref({
  fullname: "",
  phone: "",
  email: "",
});
const editData = ref({
  firstname: "",
  lastname: "",
});
const dialog = ref({
  visible: false,
  field: "",
  value: "",
  userId: null,
});
const rules = {
  required: (value) => !!value || "This field is required.",
};

// Lifecycle Hook: Mounted
onMounted(() => {
  fetchUserDetails();
  fetchProducts();
  isWelcomeModalVisible.value = true;
});

const abortProduct = async (product) => {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) throw new Error("User not authenticated.");

    const { data: userInfo, error: userInfoError } = await supabase
      .from("users_info")
      .select("id")
      .eq("auth_users_id", user.id)
      .single();

    if (userInfoError) throw new Error("Failed to fetch user info.");
    const userId = userInfo.id;

    const { data: userOrderData, error: userOrderError } = await supabase
      .from("user_orders")
      .select("order_id")
      .eq("product_id", product.id)
      .single();

    if (userOrderError || !userOrderData)
      throw new Error("No order found for this product.");
    const orderId = userOrderData.order_id;

    const { error: deleteUserOrderError } = await supabase
      .from("user_orders")
      .delete()
      .eq("order_id", orderId);

    if (deleteUserOrderError) throw new Error("Failed to delete order from user_orders.");

    const { error: deleteOrderError } = await supabase
      .from("orders")
      .delete()
      .eq("id", orderId);

    if (deleteOrderError) throw new Error("Failed to delete order from orders.");

    product.isBought = false; // Update the UI
    alert("Order cancelled successfully!");
  } catch (error) {
    console.error("Error cancelling order:", error.message);
    alert("Failed to cancel the order. Please try again.");
  }
};

// Methods
const fetchUserDetails = async () => {
  try {
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) throw new Error("User not authenticated.");

    const { data, error } = await supabase
      .from("users_info")
      .select("id, firstname, lastname, email")
      .eq("auth_users_id", authUser.id)
      .single();

    if (error) throw error;

    user.value = {
      fullname: `${data.firstname} ${data.lastname}`, // Correct interpolation
      email: data.email,
    };
  } catch (err) {
    console.error("Error fetching user details:", err.message);
  }
};

const fetchProducts = async () => {
  try {
    const { data: products, error } = await supabase.from("products").select("*");

    if (error) throw error;

    // Fetch orders and merge bought status
    const { data: userOrders, error: orderError } = await supabase
      .from("user_orders")
      .select("product_id");

    if (orderError) throw orderError;

    const boughtProductIds = userOrders.map((order) => order.product_id);

    // Add isBought status to products
    filteredProducts.value = products.map((product) => ({
      ...product,
      isBought: boughtProductIds.includes(product.id),
    }));
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }
};

const openModal = async () => {
  try {
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !authUser) throw new Error("User not authenticated.");

    const { data: userInfo, error: userInfoError } = await supabase
      .from("users_info")
      .select("id")
      .eq("auth_users_id", authUser.id)
      .single();
    if (userInfoError) throw userInfoError;

    const userId = userInfo.id;

    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select("id, total_amount, created_at, user_orders(product_id, status)")
      .eq("users_info_id", userId);

    if (ordersError) throw ordersError;

    userOrders.value = orders.map((order) => ({
      id: order.id,
      totalAmount: order.total_amount,
      createdAt: order.created_at,
      products: order.user_orders.map((uOrder) => ({
        productId: uOrder.product_id,
        status: uOrder.status,
      })),
    }));

    isModalOpen.value = true;
  } catch (error) {
    console.error("Error fetching orders:", error.message);
  }
};

const buyProduct = async (product) => {
  try {
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !authUser) throw new Error("User not authenticated.");

    const { data: userInfo, error: userInfoError } = await supabase
      .from("users_info")
      .select("id")
      .eq("auth_users_id", authUser.id)
      .single();
    if (userInfoError) throw userInfoError;

    const userId = userInfo.id;

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          users_info_id: userId,
          total_amount: product.price,
          created_at: new Date().toISOString(),
        },
      ])
      .select("id")
      .single();

    if (orderError) throw orderError;

    const orderId = orderData.id;

    const { error: userOrderError } = await supabase.from("user_orders").insert([
      {
        product_id: product.id,
        order_id: orderId,
        created_at: new Date().toISOString(),
        status: "BOUGHT",
      },
    ]);

    if (userOrderError) throw userOrderError;

    alert("Purchase successful!");

    // Refetch products to update the isBought status
    await fetchProducts();
  } catch (error) {
    console.error("Error in buyProduct:", error.message);
    alert("Failed to complete the purchase. Please try again.");
  }
};

const openEditModal = () => {
  editData.value.firstname = user.value.firstname;
  editData.value.lastname = user.value.lastname;
  isEditModalOpen.value = true;
};

const saveProfile = async () => {
  if (isFormValid.value) {
    try {
      await updateUserInfo(editData.value);
      user.value.fullname = `${editData.value.firstname} ${editData.value.lastname}`; // Correct interpolation with backticks
      isEditModalOpen.value = false;
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error.message);
    }
  } else {
    alert("Please ensure the form is valid before submitting.");
  }
};

const updateUserInfo = async (data) => {
  const {
    data: { user: authUser },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !authUser) throw new Error("User not authenticated.");

  const { error } = await supabase
    .from("users_info")
    .update({
      firstname: data.firstname,
      lastname: data.lastname,
    })
    .eq("auth_users_id", authUser.id);

  if (error) throw error;
};

const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    router.push("/");
    console.log("Logged out successfully.");
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
};
</script>

<style scoped>
.profile-avatar {
  margin-bottom: 20px;
}
.profile-info p,
.profile-info h4 {
  margin: 0;
}
.profile-section {
  background-color: #f4f4f4;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}

.profile-sidebar {
  width: 100%;
  padding-top: 60px;
}

.profile-avatar {
  margin-bottom: 16px;
}

.logout-button {
  margin-top: 16px;
  width: 100%;
}
/* For modern browsers (hide scrollbar visually) */
.v-application::-webkit-scrollbar {
  display: none; /* Hide scrollbar for WebKit browsers */
}

.v-application {
  -ms-overflow-style: none; /* Hide scrollbar for IE/Edge */
  scrollbar-width: none; /* Hide scrollbar for Firefox */
}

.recipe-section {
  height: 100%; /* Ensure it takes full column height */
}

.recipe-container {
  height: calc(100% - 32px); /* Adjust for padding if necessary */
  overflow-y: auto; /* Enable vertical scrolling */
  padding: 16px; /* Add padding for aesthetics */
  background-color: #fff; /* Optional: Set background for clarity */
  border-radius: 8px; /* Optional: Rounded edges */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow */
}

/* Hide scrollbar (optional) */
.recipe-container::-webkit-scrollbar {
  display: none;
}

.recipe-container {
  -ms-overflow-style: none; /* Hide scrollbar for IE/Edge */
  scrollbar-width: none; /* Hide scrollbar for Firefox */
}
.responsive-height {
  height: 90vh;
}

@media (max-width: 600px) {
  /* Adjust breakpoint as needed */
  .responsive-height {
    height: 60vh;
  }
  .profile-sidebar {
    padding-top: 0px;
  }
  .text-small {
    font-size: 0.8rem;
  }
  .profile-section {
    height: 100%;
  }
}
</style>
