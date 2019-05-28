<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <h1>welcome, {{ name }}</h1>
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
