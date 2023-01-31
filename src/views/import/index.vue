<template>
  <upload-excel :on-success="success" />
</template>

<script>
import EmployeeEnum from '@/constant/employees'
import { importRole } from '@/api/employees'
import { formatData } from '@/filters'
const { mapKeyPath } = EmployeeEnum
export default {
  methods: {
    success({ header, results }) {
      const arr = results.map(obj => {
        const userInfo = {}
        for (const key in obj) {
          if (mapKeyPath[key] === 'timeOfEntry' || mapKeyPath[key] === 'correctionTime') {
            userInfo[mapKeyPath[key]] = formatData(obj[key], '/')
          } else { userInfo[mapKeyPath[key]] = obj[key] }
        }
        return userInfo
      })
      importRole(arr).then(() => {
        this.$message.success('导入成功')
        this.$router.back()
      })
    }
    // // 转换excel日期格式
    // formatDate(numb, format) {
    //   const time = new Date((numb - 1) * 24 * 3600000 + 1)
    //   time.setYear(time.getFullYear() - 70)
    //   const year = time.getFullYear() + ''
    //   const month = time.getMonth() + 1 + ''
    //   const date = time.getDate() - 1 + ''
    //   if (format && format.length === 1) {
    //     return year + format + month + format + date
    //   }
    //   return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    // }
  }
}
</script>

<style>

</style>
