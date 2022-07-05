<template>
  <div class="footer">
    <p>© Copyright {{currentYear}} EasyD@ta | <a href="https://github.com/paulojunior-ufla/easydata">
        <b-icon icon="github" />
      </a>
      <b-icon icon="question-circle" role="button" />
    </p>
  </div>
</template>

<script>
export default {
  name: 'FooterGeral',
  props: {
    msg: String
  },
  data () {
    return {
      currentYear: new Date().getFullYear()
    }
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
  padding: 5px;
}
.footer p {
  margin-bottom: 0;
}
</style>
