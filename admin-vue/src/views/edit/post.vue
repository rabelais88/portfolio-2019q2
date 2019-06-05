<template>
  <el-form></el-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions({
      getPost: 'editing/getPost',
    }),
  },
  beforeMount() {
    const { postid } = this.$route.params;
    if (postid) this.getPost(postid);
  },
};
</script>

<style>
</style>
