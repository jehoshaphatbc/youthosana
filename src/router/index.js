import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase";
// import routes from "./routes";
import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Login from "@/pages/Login.vue";
import Profile from "@/pages/Profile.vue";
import indexFellow from "@/pages/Fellow/index.vue";
import createFellow from "@/pages/Fellow/create.vue";
import listFellow from "@/pages/Fellow/list.vue";
import editFellow from "@/pages/Fellow/edit.vue";
import SignUp from "@/pages/SignUp.vue";
import Typography from "@/pages/Typography.vue";
import TableList from "@/pages/TableList.vue";
Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  routes : [
	  {
	    path: "/",
	    component: DashboardLayout,
	    redirect: "/dashboard",
	    meta: {
          requiresAuth: true
        },
	    children: [
	      {
	        path: "dashboard",
	        name: "dashboard",
	        component: Dashboard
	      },
	      {
	        path: "stats",
	        name: "stats",
	        component: UserProfile
	      },
	      {
	        path: "profile",
	        name: "profile",
	        component: Profile
	      },
	      {
	        path: "fellow",
	        component: indexFellow,
	        children: [
		        {
		        	path: "fellow-create",
			        name: "create fellow",
			        component: createFellow
		        },
		        {
		        	path: "fellow-list",
			        name: "list fellow",
			        component: listFellow
		        },
		        {
		        	path: ":id/fellow-edit",
			        name: "Edit fellow",
			        component: editFellow
		        }
	        ]
	      },
	      {
	        path: "notifications",
	        name: "notifications",
	        component: Notifications
	      },
	      {
	        path: "icons",
	        name: "icons",
	        component: Icons
	      },
	      {
	        path: "maps",
	        name: "maps",
	        component: Maps
	      },
	      {
	        path: "typography",
	        name: "typography",
	        component: Typography
	      },
	      {
	        path: "table-list",
	        name: "table-list",
	        component: TableList
	      }
	    ]
	  },
	  {
	    path: "/login",
	    name: "login",
	    component: Login
	  },
	  {
	    path: "/signup",
	    name: "signup",
	    component: SignUp
	  },
	  {
        path: "*",
        redirect: "/login"
      },
      {
        path: "/",
        redirect: "/login"
      },
	  { path: "*", component: NotFound }
  ],
  // routes, // short for routes: routes
  linkActiveClass: "active"
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next("login");
  else if (!requiresAuth && currentUser) next("profile");
  else next();
});

export default router;
