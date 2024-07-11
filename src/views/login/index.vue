<template>
  <div class="login-page">
    <section class="container">
      <main :class="{ 'slide-right': isSignedIn }">
        <section id="signUpForm" class="form-block">
          <h2>Create Account</h2>
          <form>
            <label for="user_email_signup">Account</label>
            <input id="user_email_signup" v-model="signUpForm.username" type="email" />

            <label for="user_password_signup">Password</label>
            <input id="user_password_signup" v-model="signUpForm.password" type="password" />

            <button type="submit" class="btn" @click="signUp">Sign Up</button>
          </form>
        </section>

        <section id="signInForm" class="form-block">
          <h2>Login</h2>
          <form>
            <label for="user_email_signin">Username</label>
            <input id="user_email_signin" v-model="signInForm.username" type="email" />

            <label for="user_password_signin">Password</label>
            <input id="user_password_signin" v-model="signInForm.password" type="password" />

            <button type="submit" class="btn" @click="signIn">Sign In</button>
          </form>
        </section>
      </main>
      <aside :class="{ 'slide-left': isSignedIn }">
        <section class="login-block">
          <h2>Already a User?</h2>

          <button id="login-btn" type="submit" class="btn" @click="isSignedIn = true">Sign In</button>
        </section>
        <section class="register-block">
          <h2>New User?</h2>

          <button id="register-btn" type="submit" class="btn" @click="isSignedIn = false">Sign Up</button>
        </section>
      </aside>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

import { register } from '@/api/account';
import useAccountStore from '@/store/account';

const router = useRouter();
const accountStore = useAccountStore();

const isSignedIn = ref(true);

//登录
const signInForm = ref({
  username: '',
  password: '',
});

const signIn = async () => {
  const result = await accountStore.login(signInForm.value);
  if (result.code === 200) {
    ElMessage.success(result.message);
    router.replace('/home');
  } else {
    ElMessage.warning(result.message);
  }
};

//注册
const signUpForm = ref({
  username: '',
  password: '',
});

const signUp = async () => {
  const result = await register(signUpForm.value);
  if (result.code === 200) {
    ElMessage.success(result.message);
    isSignedIn.value = true;
  } else {
    ElMessage.warning(result.message);
  }
};
</script>

<style scoped lang="scss">
.login-page {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #9a6de3;
}

.container {
  position: relative;
  width: min(90%, 960px);
  height: 600px;
  background-color: #f5f5f5;
  box-shadow: 0 0 1em #e5e5e5;
  font-family: sans-serif;
  border-radius: 16px;
  overflow: hidden;
}

main,
aside {
  position: absolute;
  top: 0;
  height: 100%;
  transform: translateX(0);
  transition: all 1s ease-in-out;
}

main {
  left: 0;
  width: 60%;
}

aside {
  right: 0;
  width: 40%;
  background-color: var(--primary-color);
}

/* form block */

.form-block {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form-block h2 {
  color: var(--primary-color);
  font-size: 2.5rem;
  margin-bottom: 1em;
}

form {
  width: 75%;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5em;
  font-size: 1.05rem;
}

input {
  width: 100%;
  height: 3em;
  margin-bottom: 1em;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  background-color: #e6e6e6;
}

.btn {
  text-transform: uppercase;
  font-size: 1.05rem;
  padding: 1em 3.5em;
  border-radius: 2em;
  background-color: var(--primary-color);
  color: #fff;
  cursor: pointer;
}

main button {
  border: none;
  margin: 1.5em 0;
  align-self: center;
}

aside button {
  border: 2px solid #fff;
}

/* Aside Section */

aside .login-block,
aside .register-block {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

aside h2 {
  font-size: 1.75rem;
  color: #fff;
}

/* Hiding one section */

main #signInForm,
aside .register-block {
  display: none;
}

/* Additional Classes */

main.slide-right {
  left: 100%;
  transform: translateX(-100%);
}

aside.slide-left {
  right: 100%;
  transform: translateX(100%);
}

main.slide-right #signInForm,
aside.slide-left .register-block {
  display: flex;
}

main.slide-right #signUpForm,
aside.slide-left .login-block {
  display: none;
}

@media (max-width: 576px) {
  .container {
    margin-top: 5em;
  }

  main,
  aside {
    width: 100%;
  }

  main {
    height: 70%;
    top: 0;
    left: 0;
  }

  aside {
    top: 100%;
    left: 0;
    transform: translateY(-100%);
    height: 30%;
  }

  .form-block h2 {
    font-size: 1.75rem;
  }

  aside h2 {
    font-size: 1.25rem;
  }

  input {
    font-size: 0.75rem;
  }

  .btn {
    font-size: 1rem;
  }

  /* animation classes */

  main.slide-right {
    top: 100%;
    left: 0;
    transform: translate(0, -100%);
  }

  aside.slide-left {
    top: 0;
    transform: translateY(0);
  }
}
</style>
