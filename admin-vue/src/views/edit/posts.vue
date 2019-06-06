<template>
  <el-form>
    <el-table
      :data="posts"
      style="width:100%"
      @row-click="onRowClick"
      @selection-change="onSelectionChange"
    >
      <el-table-column type="selection" />
      <el-table-column prop="title" label="제목" />
      <el-table-column prop="createdAt" label="작성일" sortable />
      <el-table-column prop="createdAt" label="수정일" sortable />
    </el-table>
    <el-form-item style="margin:20px;">
      <el-pagination
        layout="prev, pager, next"
        :page-count="postTotalPages"
        :current-page.sync="page"
      />
      <el-button type="primary" @click="$router.push('/edit/post')">새로 쓰기</el-button>
      <el-button type="danger" @click="onDelete">선택한 항목 삭제하기</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data: () => ({
    chosenIds: [],
  }),
  computed: {
    ...mapState('editing', ['posts', 'postTotalPages', 'postPage']),
    page: {
      get() {
        return this.postPage;
      },
      set(newVal) {
        return this.setPostPage(newVal);
      },
    },
  },
  beforeMount() {
    if (this.posts.length === 0) this.getPosts();
  },
  methods: {
    ...mapActions({
      getPosts: 'editing/getPosts',
      setPostPage: 'editing/setPostPage',
      deletePosts: 'editing/deletePosts',
    }),
    onRowClick(row, column, event) {
      // console.log(row, column, event);
      this.$router.push(`/edit/post/${row._id}`);
    },
    onSelectionChange(selection) {
      this.chosenIds = selection.map(s => s._id);
    },
    onDelete() {
      this.deletePosts(this.chosenIds);
    },
  },
};
</script>

<style>
</style>
