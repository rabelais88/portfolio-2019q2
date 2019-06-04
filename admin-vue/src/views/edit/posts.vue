<template>
  <el-form>
    <el-table :data="posts" style="width:100%">
      <el-table-column type="selection" />
      <el-table-column prop="title" label="제목" />
      <el-table-column prop="createdAt" label="작성일" sortable />
      <el-table-column prop="createdAt" label="수정일" sortable />
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="postTotalPages"
      :current-page.sync="postPage"
      @current-change="onCurrentChange"
    >
    </el-pagination>
    <el-button>새로 쓰기</el-button>
  </el-form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState('editing', ['posts', 'postTotalPages', 'postPage'])
  },
  methods: {
    ...mapActions({
      getPosts: 'editing/getPosts',
      setPostPage: 'editing/setPostPage',
    }),
    onCurrentChange() {
      this.setPostPage();
    },
  },
  beforeMount() {
    if (this.posts.length === 0) this.getPosts();
  },
};
</script>

<style>

</style>
