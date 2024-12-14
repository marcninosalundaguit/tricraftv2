<script setup>
import { supabase } from "@/supabase";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const theme = ref("light");
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();
// Modal visibility control
const isWelcomeModalVisible = ref(false);

function onClick() {
  theme.value = theme.value === "light" ? "dark" : "light";
}

async function signup() {
  try {
    // Sign up the user using Supabase auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (authError) throw authError;

    // Insert additional user data into the users_info table
    const { error: insertError } = await supabase.from("users_info").insert({
      auth_users_id: authData.user.id, // Use the user's ID from auth data
      firstname: firstName.value,
      lastname: lastName.value,
      email: email.value,
    });

    if (insertError) throw insertError;

    alert("Sign-up successful!");
    // Redirect to the login page or another page
    router.push("/");
  } catch (error) {
    console.error("Sign-up error:", error.message);
    alert("An error occurred during sign-up: " + error.message);
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
                  <span class="font-weight-black">Sign Up for Tri-Craft</span>
                </template>

                <v-card-text class="bg-surface-light pt-4">
                  <v-form fast-fail @submit.prevent="signup">
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="firstName"
                          label="First Name"
                          variant="outlined"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="lastName"
                          label="Last Name"
                          variant="outlined"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-text-field
                      v-model="email"
                      label="E-mail"
                      variant="outlined"
                      type="email"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      required
                    ></v-text-field>

                    <v-btn class="mt-2" type="submit" block>Sign Up</v-btn>
                  </v-form>

                  <v-divider class="my-5">
                    <h5 class="text-center">
                      Already have an account?
                      <RouterLink class="text-success" to="/"
                        >Click here to login</RouterLink
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
