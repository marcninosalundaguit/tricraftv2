import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import UserDashboard from '@/views/auth/UserDashboard.vue'
import { supabase } from "@/supabase"; // Import Supabase client

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/dashboard',
      name: 'UserDashboard',
      component: UserDashboard,
      meta: { requiresAuth: true }, // Add metadata to protect this route
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const { data: { user } } = await supabase.auth.getUser(); // Check if user is logged in

  if (to.matched.some((record) => record.meta.requiresAuth)) {
      // Route requires authentication
      if (!user) {
          console.log("Redirecting to /login (authentication required)");
          return next("/");
      }
  } else {
      // Routes accessible without authentication
      if (user && ["/", "/register"].includes(to.path)) {
          console.log("Redirecting to /home (user is logged in)");
          return next("/dashboard");
      } else if (!user && to.path === "/butnotregisteredpath") {
          console.log("Redirecting to / (unauthenticated user on restricted path)");
          return next("/");
      }
  }

  next(); // Proceed to the requested route
});

export default router
