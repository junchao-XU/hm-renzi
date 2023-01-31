<template>
  <div class="tags-view-container">
    <el-scrollbar class="scrollbar-item" native>
      <el-tag
        v-for="tag in tags"
        :key="tag.name"
        class="tag-item"
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
  props: ['tags', 'name'],
  data() {
    return {
      tagss: this.tags || [],
      namee: this.name
    }
  },
  methods: {
    // 点击删除当前路由
    closeFn(name) {
      console.log(name)
      this.tagss = this.tagss.filter((item) => {
        return item.name !== name
      })
      if (this.tagss.length > 0 && this.name === name) {
        this.namee = this.tagss[this.tagss.length - 1].name
        this.$emit('update:name', this.namee)
      }
      this.$emit('update:tags', this.tagss)
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
    }
  }
}
</style>
