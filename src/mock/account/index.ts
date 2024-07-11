import { ref } from 'vue';
import Mock from 'mockjs';

interface IUser {
  username: string;
  password: string;
}

const userList = ref<IUser[]>([]);

const readUserList = () => {
  userList.value = JSON.parse(localStorage.getItem('userList') || '[]');
};

readUserList();

//api

Mock.mock('/api/login', 'post', (request: any) => {
  const { username, password } = JSON.parse(request.body);
  if (userList.value.find((user: IUser) => user.username === username && user.password === password)) {
    return {
      code: 200,
      message: '登录成功',
      token: Mock.Random.guid(),
    };
  } else {
    return {
      code: 401,
      message: '用户名或密码错误',
    };
  }
});

Mock.mock('/api/register', 'post', (request: any) => {
  const { username, password } = JSON.parse(request.body);
  if (userList.value.find((user: IUser) => user.username === username)) {
    return {
      code: 401,
      message: '用户名已存在',
    };
  } else {
    userList.value.push({ username, password });
    localStorage.setItem('userList', JSON.stringify(userList.value));
    return {
      code: 200,
      message: '注册成功',
    };
  }
});
