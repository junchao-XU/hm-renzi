<template>
  <div class="tags-view-container">
    <el-scrollbar class="scrollbar-item" native>
      <el-tag
        v-for="tag in tags"
        :key="tag.name"
        class="tag-item"
        :class="name === tag.name ? 'active':''"
        closable
        disable-transitions
        :effect="name === tag.name ? 'dark' : 'plain'"
        @click="jumpRouter(tag.name)"
        @close="closeFn(tag.name)"
      >
        {{ tag.title }}
      </el-tag>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: ['name'],
  data() {
    return {
      // tagss: this.tags || [],
      namee: '',
      tags: []
    }
  },
  watch: {
    // 监视当前路由得变化
    $route: {
      immediate: true,
      handler(route) {
        if (!route.meta.icon) return
        this.namee = route.path.replace('/', '')
        const index = this.tags.findIndex((item) => {
          return item.name === route.path.replace('/', '')
        })
        if (index === -1) this.tags.push({ name: route.path.replace('/', ''), title: route.meta.title })
      }
    }
  },
  methods: {
    // 点击删除当前路由
    closeFn(name) {
      this.tags = this.tags.filter((item) => {
        return item.name !== name
      })
      if (this.tags.length > 0 && this.namee === name) {
        this.namee = this.tags[this.tags.length - 1].name
        console.log(this.namee)
        this.$emit('update:name', this.namee)
      }
    },
    // 点击跳转路由
    jumpRouter(name) {
      this.$router.push(`/${name}`)
    }
  }
}
</script>

<style lang="scss" scoped>
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
       &.active {
        color: #fff;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
}

</style>
