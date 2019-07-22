<template>
  <div>
    <el-form>
      <el-table
        :data="stacks"
        style="width:100%"
        @row-click="onRowClick"
        @selection-change="onSelectionChange"
      >
        <el-table-column type="selection" />
        <el-table-column prop="name" label="제목" sortable />
        <!-- <el-table-column prop="icon" label="아이콘" /> -->
        <el-table-column prop="createdAt" label="작성일" sortable />
        <el-table-column prop="updatedAt" label="수정일" sortable />
      </el-table>
      <el-form-item style="margin:20px;">
        <el-button type="primary" @click="openNewStack">새로 추가하기</el-button>
        <el-button type="danger" @click="onDelete">선택한 항목 삭제하기</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="편집" :visible="editingStack" :before-close="() => SET_EDITING_STACK(false)">
      <el-form>
        <el-form-item label="이름">
          <el-input v-model="stackName" />
        </el-form-item>
        <el-form-item label="설명">
          <el-input v-model="stackDesc" type="textarea" autosize />
        </el-form-item>
        <el-form-item label="아이콘">
          <el-upload
            ref="uploader"
            action="uploadUrl"
            :http-request="httpReq"
            :limit="1"
            list-type="picture"
            :file-list="stackIcon"
          >
            <el-button size="small" type="primary">Click to upload</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="SET_EDITING_STACK(false)">Cancel</el-button>
        <el-button type="primary" @click="onSubmit">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import request from '@/utils/request';
import { uploadRequest } from '@/utils';

export default {
  data: () => ({
    chosenIds: [],
  }),
  computed: {
    httpReq: () => uploadRequest(request),
    uploadUrl: () => `${process.env.VUE_APP_BASE_API}/upload`,
    ...mapState('editing', ['stacks', 'newStack', 'editingStack']),
    stackIcon() {
      if (!this.newStack.icon) return [];
      return [
        {
          name: this.newStack.icon,
          url: `${process.env.VUE_APP_BASE_API}/public/${this.newStack.icon}`,
        },
      ];
    },
    stackName: {
      get() {
        return this.newStack.name;
      },
      set(v) {
        this.editStackByKey({ name: v });
      },
    },
    stackDesc: {
      get() {
        return this.newStack.desc;
      },
      set(v) {
        this.editStackByKey({ desc: v });
      },
    },
  },
  beforeMount() {
    if (this.stacks.length === 0) this.getStacks();
  },
  methods: {
    ...mapActions({
      getStacks: 'editing/getStacks',
      editStackByKey: 'editing/editStackByKey',
      openNewStack: 'editing/openNewStack',
      openStack: 'editing/openStack',
      createStack: 'editing/createStack',
      deleteStacks: 'editing/deleteStacks',
      modifyStack: 'editing/modifyStack',
    }),
    ...mapMutations({ SET_EDITING_STACK: 'editing/SET_EDITING_STACK' }),
    onRowClick(row, column, event) {
      console.log(row, column, event);
      this.openStack(row._id);
    },
    onSelectionChange(selection) {
      this.chosenIds = selection.map(s => s._id);
    },
    onDelete() {
      this.deleteStacks(this.chosenIds);
    },
    onSubmit() {
      const { uploadFiles } = this.$refs.uploader;
      let newUrl = this.newStack.icon;
      if (uploadFiles.length >= 1) {
        newUrl = uploadFiles[0].response;
      }
      if (!this.newStack._id) return this.createStack(newUrl);
      this.modifyStack(newUrl);
    },
  },
};
</script>

<style>
</style>
