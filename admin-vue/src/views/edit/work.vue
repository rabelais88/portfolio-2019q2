<template>
  <el-form label-position="top" style="margin-left:20px; margin-right:20px;">
    <el-form-item label="title">
      <el-input v-model="title" placeholder="input your title here" />
    </el-form-item>
    <el-form-item label="url">
      <el-input v-model="url" placeholder="https://abcd.com"/>
    </el-form-item>
    <el-form-item label="caption">
      <editor v-model="caption" style="height:80vh;" />
    </el-form-item>
    <el-form-item label="images">
      <el-upload
        ref="uploader"
        action="uploadUrl"
        :http-request="httpReq"
        list-type="picture"
        :file-list="postImages"
      >
        <el-button size="small" type="primary">Click to upload</el-button>
      </el-upload>
    </el-form-item>

    <el-form-item
      v-if="currentWork.createdAt"
      label="생성일"
    >{{ currentWork.createdAt | readableTime }}</el-form-item>
    <el-form-item
      v-if="currentWork.updatedAt"
      label="편집일"
    >{{ currentWork.updatedAt | readableTime }}</el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">저장하기</el-button>
      <el-button type="secondary" @click="$router.push('/edit/works')">취소</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'codemirror/lib/codemirror.css';
import { mapActions, mapState, mapMutations } from 'vuex';
import { WORK_MUTATIONS, WORK_ACTIONS } from '@/store/modules/work';
import { Editor } from '@toast-ui/vue-editor';

import request from '@/utils/request';
import { uploadRequest } from '@/utils';

export default {
  name: 'Work',
  components: {
    Editor,
  },
  filters: {
    readableTime(time) {
      return new Date(time).toLocaleString();
    },
  },
  data: () => ({
    title: '',
    caption: '',
    url: '',
    images: [],
    relatedStacks: [],
  }),
  computed: {
    ...mapState('work', ['currentWork']),
    httpReq: () => uploadRequest(request),
    uploadUrl: () => `${process.env.VUE_APP_BASE_API}/upload`,
    postImages() {
      if (!this.images) return [];
      if (!this.images.length === 0) return [];
      return this.images.map(imgFileName => ({
        name: `${process.env.VUE_APP_BASE_API}/public/${imgFileName}`,
        url: `${process.env.VUE_APP_BASE_API}/public/${imgFileName}`,
      }));
    },
  },
  watch: {
    '$route.params.workid': {
      handler: 'onWorkIdChange',
      immediate: true,
    },
  },
  methods: {
    ...mapMutations({
      setCurrentWork: `work/${WORK_MUTATIONS.SET_CURRENT_WORK}`,
    }),
    ...mapActions('work', {
      getWork: WORK_ACTIONS.getWork,
      createWork: WORK_ACTIONS.createWork,
      modifyWork: WORK_ACTIONS.modifyWork,
    }),
    onWorkIdChange(workid) {
      if (workid) {
        this.getWork(workid).then(() => {
          this.title = this.currentWork.title;
          this.caption = this.currentWork.caption;
          this.url = this.currentWork.url;
          this.images = this.currentWork.images;
          this.relatedStacks = this.currentWork.relatedStacks;
        });
      } else {
        this.setCurrentWork({});
      }
    },
    onSubmit() {
      const { title, caption, images, relatedStacks, url } = this;
      const newWork = { title, caption, images, relatedStacks, url };
      const { uploadFiles } = this.$refs.uploader;
      const fileUrls = uploadFiles.map(file => file.response || file.url);
      newWork.images = fileUrls;
      if (this.currentWork._id) {
        // create new post
        newWork._id = this.currentWork._id;
        this.modifyWork(newWork).then(() => {
          this.$router.push('/edit/works');
        });
      } else {
        // modify existing post
        this.createWork(newWork).then(() => {
          this.$router.push('/edit/works');
        });
      }
    },
  },
};
</script>

<style>
</style>
