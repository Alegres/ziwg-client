<template>
  <div class="not-found">
    <h1>404 - {{ $t('not_found') }}</h1>
    <h2>{{ $t('not_found_explanation') }}</h2>
  </div>
</template>

<style scoped>
.not-found {
  margin: 0 auto;
  width: 70%;
  border-radius: 10px;
  padding: 20px;
  background: #d4d4d4;
  margin-top: 20px;
}
h1, h2 {
  margin: 0 auto;
  text-align: center;
}
</style>
