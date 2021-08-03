import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface Login extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }

  interface Window {
    axiosCancel: Array<any>
    axiosPending: Array<any>
    isRouterGenerated: boolean
  }

  interface VueRouter {
    matcher: any
  }
}
