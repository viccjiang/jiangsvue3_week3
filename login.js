import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

const app = createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io',
      user: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    login() {
      const api = `${this.apiUrl}/admin/signin`;
      axios.post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data;
            document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;

            window.location = 'products.html';
          } else {
            alert(res.data.message);
          }
        })
    }
  }
});
app.mount('#app');