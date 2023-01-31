<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button v-if="startNumAndendNum.start > 1" @click="$emit('getPageNo', 1)">
      1
    </button>
    <button v-if="startNumAndendNum.start > 2">···</button>

    <button
      v-for="(page, index) in startNumAndendNum.end"
      v-show="page >= startNumAndendNum.start"
      :key="index"
      :class="{ active: pageNo == page }"
      @click="$emit('getPageNo', page)"
    >
      {{ page }}
    </button>

    <button v-if="startNumAndendNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndendNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == startNumAndendNum.end"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  // props: ['pageNo', 'pageSize', 'total', 'continues'],
  props: {
    pageNo: { type: [Number], require: true }, // 当前页
    pageSize: { type: [Number], default: 10 }, // 每一页的数据条数
    total: { type: [Number], require: true }, // 总数据条数
    continues: { type: [Number], default: 5 } // 连续分页
    /**
     * @getPageNo {自定义事件} 告诉用户当前是第几页
     */
  },
  computed: {
    // 当前的页码数
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算
    startNumAndendNum() {
      const { continues, pageNo, totalPage } = this
      let start = 0 // 起始
      let end = 0 // 结束
      if (continues > totalPage) {
        start = 1
        end = totalPage
      } else {
        /**
         * 1  2  3  4  5   (10)
         */
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        if (start < 1) {
          start = 1
          end = continues
        }
        if (end > totalPage) {
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return { start, end }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
