<template>
  <el-form @submit.prevent>
    <el-table
      :data="posts"
      style="width:100%"
      @row-click="onRowClick"
      @selection-change="onSelectionChange"
      @sort-change="onSortChange"
    >
      <el-table-column type="selection" />
      <el-table-column prop="title" label="제목" sortable />
      <el-table-column prop="createdAt" label="작성일" sortable />
      <el-table-column prop="updatedAt" label="수정일" sortable />
    </el-table>
    <el-form-item style="margin:20px;">
      <el-pagination
        layout="prev, pager, next"
        :page-count="postTotalPages"
        :current-page.sync="page"
      />
      <el-input
        placeholder="검색하기"
        :value="postSearch"
        class="input-with-select"
        @input="SET_POST_SEARCH"
      >
        <el-button slot="append" icon="el-icon-search" @click="getPosts"></el-button>
      </el-input>
    </el-form-item>
    <el-form-item style="margin:20px;">
      <el-button type="primary" @click="$router.push('/edit/post')">새로 쓰기</el-button>
      <el-button type="danger" @click="onDelete">선택한 항목 삭제하기</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
  data: () => ({
    chosenIds: [],
  }),
  computed: {
    ...mapState('post', [
      'posts',
      'postTotalPages',
      'postPage',
      'postSearch',
    ]),
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
      getPosts: 'post/getPosts',
      setPostPage: 'post/setPostPage',
      deletePosts: 'post/deletePosts',
      setSort: 'post/setSort',
    }),
    ...mapMutations({
      SET_POST_SEARCH: 'post/SET_POST_SEARCH',
    }),
    onRowClick(row, column, event) {
      this.$router.push(`/edit/post/${row._id}`);
    },
    onSelectionChange(selection) {
      this.chosenIds = selection.map(s => s._id);
    },
    onDelete() {
      this.deletePosts(this.chosenIds);
    },
    onSortChange(sort) {
      const { column, prop, order } = sort;
      const ORDERS = {
        ascending: 'asc',
        descending: 'desc',
      };
      this.setSort({ prop, order: ORDERS[order] });
    },
  },
};
</script>

<style>
</style>
