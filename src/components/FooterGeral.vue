<template>
  <div class="footer">
    <p>Copyright EasyD@ta (C) 2022 -  <a href="https://github.com/paulojunior-ufla/easydata"><b-icon icon="github"/></a> <b-icon icon="question-circle" role="button"/></p>
  </div>
</template>

<script>
export default {
  name: 'FooterGeral',
  props: {
    msg: String
  }
}
</script>

<style>
.footer {
  max-width: 76rem;
  padding: .9rem 1rem;
  margin: 0 auto;
  font-family: sans-serif;
  font-size: 14px;
  line-height: 12px;
  text-align: center;
}
.footer a {
  color: initial;
}
</style>
