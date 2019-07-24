<template>
  <el-form @submit.prevent>
    <el-table
      style="width:100%"
      :data="works"
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
        :page-count="totalPages"
        :current-page.sync="currentPage"
      />
      <el-input
        placeholder="검색하기"
        :value="searchKeyword"
        class="input-with-select"
        @input="setSearchKeyword"
      >
      <el-button slot="append" icon="el-icon-search" @click="getWorks"></el-button>
      </el-input>
    </el-form-item>
    <el-form-item style="margin:20px;">
      <el-button type="primary" @click="$router.push('/edit/work')">새로 작성하기</el-button>
      <el-button type="danger" @click="onDelete">선택한 항목 삭제하기</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { WORK_ACTIONS, WORK_MUTATIONS } from '@/store/modules/work';

export default {
  data: () => ({
    chosenIds: [],
  }),
  computed: {
    ...mapState('work', ['works', 'totalPages', 'page', 'searchKeyword']),
    currentPage: {
      get() {
        return this.pages;
      },
      set(newPage) {
        return this.setPage(newPage);
      },
    },
  },
  beforeMount() {
    if (this.works.length === 0) this.getWorks();
  },
  methods: {
    ...mapMutations({
      setSearchKeyword: `work/${WORK_MUTATIONS.SET_SEARCH_KEYWORD}`,
    }),
    ...mapActions({
      getWorks: `work/${WORK_ACTIONS.getWorks}`,
      setPage: `work/${WORK_ACTIONS.setPage}`,
      setSort: `work/${WORK_ACTIONS.setSort}`,
      deleteWorks: `work/${WORK_ACTIONS.deleteWorks}`
    }),
    onSortChange(sort) {
      const { column, prop, order } = sort;
      const ORDERS = {
        ascending: 'asc',
        descending: 'desc',
      };
      this.setSort({ prop, order: ORDERS[order] });
    },
    onSelectionChange(selection) {
      this.chosenIds = selection.map(s => s._id);
    },
    onRowClick(row, column, event) {
      this.$router.push(`/edit/work/${row._id}`);
    },
    onDelete() {
      this.deleteWork(this.chosenIds);
    },
  },
};
</script>

<style>
</style>
