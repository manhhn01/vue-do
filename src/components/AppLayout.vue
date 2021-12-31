<template>
  <header>
    <div class="left">
      <router-link class="flex-ac btn" :to="{ name: 'Home' }">
        <div class="logo-img">
          <img :src="logo" alt="VueDo" />
        </div>
        <div class="name">VueDo</div>
      </router-link>
    </div>
    <div class="right">
      <div class="menu-icon btn" @click="setSideNavStatus(true)">
        <fa-icon icon="bars" class="fa-lg" />
      </div>
      <transition name="sidenav">
        <div
          class="side-nav-wrapper"
          @click="setSideNavStatus(false)"
          v-if="sideNavStatus"
        >
          <ul class="side-nav" @click.stop>
            <li>
              <router-link :to="{ name: 'Home' }" class="btn">Home</router-link>
            </li>
            <div class="separator"></div>
            <li>
              <router-link class="btn" to="ongoing">Ongoing</router-link>
            </li>
            <li>
              <router-link class="btn" to="completed">Completed</router-link>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </header>
  <main>
    <slot></slot>
  </main>
</template>

<script>
import logo from "@/assets/32px.png";
import psc from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { mapState, mapMutations } from "vuex";

export default {
  name: "AppLayout",
  mounted() {
    this.setPsc(new psc("main"));
  },
  data() {
    return {
      logo,
    };
  },
  computed: {
    ...mapState(["psc", "sideNavStatus"]),
  },
  methods: {
    ...mapMutations(["setPsc", "setSideNavStatus"]),
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: $header-height;
  padding: {
    left: 10px;
    right: 10px;
  }
  align-items: center;
  justify-content: space-between;
  background-color: $background;
  z-index: 500;

  .left {
    display: flex;
    align-items: center;

    .logo-img {
      padding: 5px;

      img {
        width: 30px;
        height: 30px;
      }
    }

    .name {
      font-weight: bolder;
      font-size: 1.1rem;
      color: green;
    }
  }
  .right {
    display: flex;
    .menu-icon {
      padding: 5px;
      color: rgb(149, 163, 154);
    }

    .side-nav-wrapper {
      position: fixed;
      right: 0;
      top: 0;
      bottom: 0;
      left: 0;
      overflow: hidden;
      background-color: rgba(0, 0, 0, 0.3);

      .side-nav {
        position: absolute;
        top: 0;
        right: 0;
        overflow: auto;
        bottom: 0;
        margin: 0;
        padding: 15px 5px;
        background-color: $background;
        list-style-type: none;
        width: 280px;
        max-width: 80%;

        li {
          a {
            display: block;
            padding: 10px 20px;
            transition: background-color 200ms ease;
            border-radius: 5px;

            &:active {
              background-color: rgba(0, 0, 0, 0.1);
            }

            &.router-link-exact-active {
              font-weight: 600;
              background-color: rgba(0, 0, 0, 0.06);
            }
          }

          & + li {
            margin-top: 5px;
          }
        }

        .separator {
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          margin: 10px 0;
          width: 100%;
        }
      }

      //sidenav-wrapper transition
      &.sidenav-enter-active {
        transition: background-color 350ms ease-in-out;
      }
      &.sidenav-leave-active {
        transition: background-color 350ms ease-in-out;
      }

      &.sidenav-enter-from,
      &.sidenav-leave-to {
        background-color: rgba(0, 0, 0, 0);
      }

      &.sidenav-enter-active .side-nav {
        transition: transform 350ms ease-in-out;
      }
      &.sidenav-leave-active .side-nav {
        transition: transform 350ms ease-in-out;
      }

      &.sidenav-enter-from .side-nav,
      &.sidenav-leave-to .side-nav {
        transform: translateX(100%);
      }
    }
  }
}

main {
  position: relative;
  height: 100%;
  padding: {
    left: 15px;
    right: 15px;
  }
}
</style>
