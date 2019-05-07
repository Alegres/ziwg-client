<template>
  <div class="hello">
   <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">{{ $t('app_title') }}</h1>
      <p class="lead">{{ $t('app_description') }}</p>
    </div>

    <div class="container">
    </div>
  </div>
</template>

<script>
import { LanguageRouter } from '@/plugins/LanguageRouter';

export default {
  name: 'Home',
  methods: {
    signUpForFree: function() {
      LanguageRouter.pushToPath('/register')
    },
    contactUs: function() {
      LanguageRouter.pushToPath('/about')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.popular_links {
  margin-top: 4rem;
}
</style>
