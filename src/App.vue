<template>
  <component :is="layoutComponent">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in" @after-enter="psc.update()">
        <component :is="Component" />
      </transition>
    </router-view>
  </component>
</template>

<script>
import AppLayout from "./components/AppLayout.vue";
import "@/assets/style/scss/app.scss";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    AppLayout,
  },
  computed: {
    layoutComponent() {
      return this.$router.meta?.layout || AppLayout;
    },
    ...mapState(["psc"]),
  },
  methods: {
    test() {
      console.log("test");
    },
  },
};
</script>

<style lang="scss" scoped></style>
