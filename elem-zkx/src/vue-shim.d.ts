import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'

declare module 'vue/types/vue' {
  interface Vue {
    $modal: any
    $extend: any
    $router: VueRouter
    $route: Route
  }
}
