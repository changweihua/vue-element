<template>
  <!-- <a-spin :spinning="contentSpinning" :tip="$t('loading')">
    <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
    <router-view @content_spinning="toggleContentSpinning" />
  </a-spin> -->
  <router-view @content_spinning="toggleContentSpinning" />
</template>

<script>
export default {
  name: 'Holder',
  data() {
    return {
      contentSpinning: false
    }
  },
  methods: {
    toggleContentSpinning(spinning) {
      // console.log('toggleContentSpinning')
      // this.contentSpinning = spinning
      this.$emit('content_spinning', spinning)
    }
  }
}
</script>
