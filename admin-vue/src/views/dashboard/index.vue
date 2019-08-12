<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <h2>welcome, {{ name }}</h2>
      <ul>
        <li>email: {{ email }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Dashboard',
  computed: {
    ...mapState('user', ['name', 'email']),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
