<script setup>


</script>

<template>
  <nav class="navbar navbar-expand-lg bg-light mb-5">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Form</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'dataTable'}" class="nav-link">Data Table</router-link>
          </li>

        </ul>

      </div>
    </div>
  </nav>

  <div class="p-5">
    <router-view></router-view>
  </div>

</template>

<style>

</style>
