<template>
  <div class="account-pages">
    <el-row>
      <el-col :span="12" :offset="6">
        <el-card>
          <template slot="title">123</template>
          <div class="text-center">
            <h1 class="text-error">
              4
              <el-icon type="smile" :rotate="180" />
              4
            </h1>
            <h4 class="text-uppercase text-danger mt-3">Page Not Found</h4>
            <p class="text-muted mt-3">
              It's looking like you may have taken a wrong turn. Don't worry...
              it happens to the best of us. Here's a little tip that might help
              you get back on track.
            </p>

            <a class="btn btn-info mt-3" href="index.html">
              <i class="mdi mdi-reply"></i>
              Return Home
            </a>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
html {
  position: relative;
  min-height: 100%;
}

body.authentication-bg {
  background-image: url(../../assets/bg-pattern-light.svg);
  background-size: cover;
  background-position: center;
}

.account-pages {
  margin-bottom: 4rem !important;
  margin-top: 4rem !important;
}

.text-center {
  text-align: center;
  .text-error {
    color: #3688fc;
    text-shadow: rgba(54, 136, 252, 0.3) 5px 1px,
      rgba(54, 136, 252, 0.2) 10px 3px;
    font-size: 5.25rem;
    line-height: 5.625rem;
  }
  .text-danger {
    color: #fa6767 !important;
  }
  .text-uppercase {
    text-transform: uppercase !important;
  }
}
</style>
