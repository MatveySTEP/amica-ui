<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand">Home</router-link>
    <div>
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Войти</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/register" class="nav-link">Зарегистрироваться</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Nav'
}
</script>
