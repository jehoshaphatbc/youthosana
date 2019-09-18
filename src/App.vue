<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
    <notifications></notifications>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.vue-notifyjs.notifications {
  .alert {
    z-index: 10000;
  }
  .list-move {
    transition: transform 0.3s, opacity 0.4s;
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active {
    transition: transform 0.2s ease-in, opacity 0.4s ease-in;
  }
  .list-leave-active {
    transition: transform 1s ease-out, opacity 0.4s ease-out;
  }

  .list-enter {
    opacity: 0;
    transform: scale(1.1);
  }
  .list-leave-to {
    opacity: 0;
    transform: scale(1.2, 0.7);
  }
}
</style>

<style type="text/css">
  .card-header h3 {
    margin: 0px !important; 
  }
  .menu-right {
    float: right;
    display: flex;
  }
  .menu-left {
    display: flex;
    float: left;
  }
  .btn-create {
    margin-left: 10px !important;
  }
  .search-date {
    width: 100% !important;
    margin-right: 10px;
  }
  .search-date .el-range-separator {
    width: 10% !important;
  }
</style>
