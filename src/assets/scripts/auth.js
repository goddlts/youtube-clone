;(function handleLogin(w) {
  $('#form').on('submit', function () {
    http
      .post('/auth/login', $(this).serializeObject())
      .then(res => {
        // 登录成功记录 token
        // res => { success: true, data: 'token' }
        getMyInfo(res.data)
        // 跳转到首页
        window.location.href = '/index.html'
        // 提示
        Toastify({
          text: "登录成功",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)"
        }).showToast()
      })
    return false
  })

  // https://lg-youtube-api.herokuapp.com/api/v1/auth/me
  function getMyInfo (token) {
    http
      .get('/auth/me', {
        headers: {
          authorization: 'Bearer ' + token
        }
      })
      .then(res => {
        res.data.token = token
        localStorage.setItem('user', JSON.stringify(res.data))
      })
  }
}(window))