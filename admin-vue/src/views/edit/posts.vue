<template>
  <el-form>
    <el-table :data="posts" style="width:100%">
      <el-table-column type="selection" />
      <el-table-column prop="title" label="제목" />
      <el-table-column prop="createdAt" label="작성일" sortable />
      <el-table-column prop="createdAt" label="수정일" sortable />
    </el-table>
    <el-button>새로 쓰기</el-button>
  </el-form>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState('editing', ['posts'])
  },
};
</script>

<style>

</style>
