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
    ...mapState('editing', [
      'works',
      'worksTotalPages',
      'workPage',
      'workSearch',
    ]),
  },
  beforeMount() {
    if (this.works.length === 0) this.getWorks();
  },
  methods: {

  },
}
</script>

<style>

</style>
