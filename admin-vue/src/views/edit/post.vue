<template>
  <el-form label-position="top" style="margin-left:20px; margin-right:20px;">
    <el-form-item label="title">
      <el-input v-model="title" />
    </el-form-item>
    <el-form-item label="content">
      <editor v-model="content" style="height:80vh;" />
    </el-form-item>
    <el-form-item v-if="currentPost.createdAt" label="생성일" >
      {{ currentPost.createdAt | readableTime }}
    </el-form-item>
    <el-form-item v-if="currentPost.updatedAt" label="편집일">
      {{ currentPost.updatedAt | readableTime }}
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">저장하기</el-button>
      <el-button type="secondary" @click="$router.push('/edit/posts')">
        취소
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'codemirror/lib/codemirror.css';
import { mapActions, mapState, mapMutations } from 'vuex';
import { Editor } from '@toast-ui/vue-editor';
import _pick from 'lodash/pick';

export default {
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
    content: '',
    images: [],
  }),
  computed: {
    ...mapState('editing', ['currentPost']),
  },
  watch: {
    '$route.params.postid': {
      handler: 'onPostIdChange',
      immediate: true,
    },
  },
  methods: {
    ...mapMutations({
      SET_POST: 'editing/SET_POST',
    }),
    ...mapActions({
      getPost: 'editing/getPost',
      createPost: 'editing/createPost',
      modifyPost: 'editing/modifyPost',
    }),
    onPostIdChange(postid) {
      if (postid) {
        this.getPost(postid).then(() => {
          this.title = this.currentPost.title;
          this.content = this.currentPost.content;
          this.image = this.currentPost.image;
        });
      } else {
        this.SET_POST({});
      }
    },
    onSubmit() {
      const { title, content, images } = this;
      const newPost = { title, content, images };
      if (this.currentPost._id) { // create new post
        newPost._id = this.currentPost._id;
        this.modifyPost(newPost).then(() => {
          this.$router.push('/edit/posts');
        });
      } else { // modify existing post
        this.createPost(newPost).then(() => {
          this.$router.push('/edit/posts');
        });
      }
    },
  },
};
</script>

<style>
</style>
