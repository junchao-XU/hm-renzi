<template>
  <section class="app-main">
    <breadcrumb class="brd" :name.sync="name" />
    <transition name="fade-transform" mode="out-in">
      <router-view :to="{name}" />
    </transition>
  </section>
</template>

<script>
import breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'AppMain',
  components: { breadcrumb },
  data() {
    return {
    }
  },
  computed: {
    name: {
      get() {
        return this.$route.path.replace('/', '')
      },
      set(val) {
        this.$router.push(`/${val}`)
      }
    }
  }
  // watch: {
  //   // 监视当前路由得变化
  //   $route: {
  //     immediate: true,
  //     handler(route) {
  //       if (!route.meta.icon) return
  //       const index = this.tags.findIndex((item) => {
  //         return item.name === route.path.replace('/', '')
  //       })
  //       if (index === -1) this.tags.push({ name: route.path.replace('/', ''), title: route.meta.title })
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
  .scrollbar-item {
    padding-left: 10px;
    .tag-item {
      margin-top: 4px;
      height: 26px;
      line-height: 26px;
      border-radius: 0;
      margin-left: 5px;
    }
  }
}
.brd{
  position: fixed;
  z-index: 2;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
