<template>
  <div id="user-info">
      <a href="#">
          <div class="login">
              <div>
                <span>登录/注册</span>
              </div>
             <div class="phone">
                <span>暂无绑定手机号</span>
             </div>
          </div>
      </a>
  </div>
</template>

<script>
export default {
    name:'UserInfo'
}

</script>
<style scoped>
#user-info {
    background-color: var(--color-tint);
    padding: 15px;
}

.login {
    color: #fff;
    margin: 5px 0 0 10px;
}

.phone {
    font-size: 13px;
    margin-top: 5px;
    font-weight: 300;
}
</style>