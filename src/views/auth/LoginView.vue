<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "@/supabase";
import { useRouter } from "vue-router";

const theme = ref("light");
const email = ref("");
const password = ref("");
const router = useRouter();
const errorMessage = ref("");

// Modal visibility control
const isWelcomeModalVisible = ref(false);

function onClick() {
  theme.value = theme.value === "light" ? "dark" : "light";
}
async function login() {
  try {
    errorMessage.value = ""; // Clear previous error messages

    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      throw error;
    }

    // Redirect to a specific page upon successful login
    router.push("/dashboard");
  } catch (err) {
    errorMessage.value = err.message;
  }
}

// Automatically show the welcome modal when the page loads
onMounted(() => {
  isWelcomeModalVisible.value = true;
});
</script>

<template>
  <!-- Enhanced Welcome Modal -->
  <v-dialog v-model="isWelcomeModalVisible" max-width="900">
    <v-card>
      <!-- Header Section with Icon and Title -->
      <v-card-text class="headline d-flex align-center justify-center">
        <v-icon color="green-darken-2" size="48" class="mr-3">mdi-wrench-outline</v-icon>
        <h3>Welcome to Tricraft, a Handcrafts Shop!</h3>
      </v-card-text>

      <!-- Main Content Section -->
      <v-card-text>
        <!-- About Section -->
        <section class="mb-6">
          <h2 class="text-h5">About Us</h2>
          <p>
            At Handcrafts Shop, we believe in the beauty of individuality and the charm of
            authentic craftsmanship. Every product in our collection is a labor of love,
            thoughtfully created by skilled artisans who pour their heart and soul into
            their work.
          </p>
          <p>
            Our mission is to celebrate the art of handmade creations and connect you with
            unique items that tell a story. Discover the passion behind every creation and
            bring home a piece of artistry that resonates with you.
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
          <v-btn color="green-darken-2" large text @click="isWelcomeModalVisible = false">
            Explore the Shop Now
          </v-btn>
        </section>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-3" color="green-darken-2">
        <v-spacer></v-spacer>

        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          text="Toggle Theme"
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>

      <v-main>
        <v-container>
          <v-row>
            <v-col cols="12" md="6" class="mx-auto pt-16">
              <v-card
                class="mx-auto"
                prepend-icon="mdi-wrench"
                subtitle="We find ways!"
                color="green-darken-2"
              >
                <template v-slot:title>
                  <span class="font-weight-black">Login to Tri-Craft</span>
                </template>

                <v-card-text class="bg-surface-light pt-4">
                  <v-form fast-fail @submit.prevent="login">
                    <v-text-field
                      v-model="email"
                      label="E-mail"
                      variant="outlined"
                    ></v-text-field>

                    <v-text-field
                      v-model="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                    ></v-text-field>

                    <v-btn class="mt-2" type="submit" block>Login</v-btn>

                    <v-alert v-if="errorMessage" type="error" class="mt-3">
                      {{ errorMessage }}
                    </v-alert>
                  </v-form>
                  <v-divider class="my-5">
                    <h5 class="text-center">
                      Don't have account?
                      <RouterLink class="text-success" to="/register"
                        >Click here to Register</RouterLink
                      >
                    </h5>
                  </v-divider>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <v-footer color="green-darken-2" border="true" app="true"
        >2024 - Tricraft | All Rights Reserved</v-footer
      >
    </v-app>
  </v-responsive>
</template>
