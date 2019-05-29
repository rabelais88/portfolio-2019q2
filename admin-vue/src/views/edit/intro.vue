<template>
  <div class="intro">
    <el-form>
      <el-form-item>
        <editor v-model="newIntro" style="height:80vh;" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="!isChanged" @click.prevent="saveIntro(newIntro)">save</el-button>
        <el-button type="secondary" @click.prevent="restore">restore</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'codemirror/lib/codemirror.css';
import { Editor } from '@toast-ui/vue-editor';
import { mapActions, mapState, mapMutations } from 'vuex';
import { getIntro } from '@/api/editing';

export default {
  name: 'EditIntro',
  components: {
    Editor,
  },
  data: () => ({
    newIntro: ''
  }),
  computed: {
    ...mapState('editing', ['intro']),
    isChanged() {
      return this.newIntro !== this.intro;
    },
  },
  beforeMount() {
    getIntro().then((res) => {
      this.setIntro(res);
      this.newIntro = res;
    });
  },
  methods: {
    ...mapActions({
      getIntro: 'editing/getIntro',
      saveIntro: 'editing/saveIntro'
    }),
    ...mapMutations({
      setIntro: 'editing/SET_INTRO',
    }),
    restore() {
      this.newIntro = this.intro;
    },
  },
};
</script>

<style>
.intro {
  margin: 30px;
}
</style>
