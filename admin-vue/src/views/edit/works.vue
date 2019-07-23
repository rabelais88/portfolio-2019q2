<template>
  <el-form>
    
  </el-form>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  data: () => ({
    chosenIds: [],
  }),
  computed: {
    ...mapState('work', [
      'works',
      'totalPages',
      'page',
      'searchKeyword',
    ]),
  },
  beforeMount() {
    if (this.works.length === 0) this.getWorks();
  },
  methods: {
    ...mapActions({getWorks: 'work/getWorks'})
  },
}
</script>

<style>

</style>
