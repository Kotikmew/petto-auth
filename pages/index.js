import { useState } from 'react';

export default function Home() {
  const [loginVisible, setLoginVisible] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    });

    if (res.ok) {
      const user = await res.json();
      localStorage.setItem('user', user.name);
      alert(`Добро пожаловать, ${user.name}`);
      setLoginVisible(false);
    } else {
      alert('Неверный логин или пароль');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Социальная сеть владельцев животных</h1>
      <button onClick={() => setLoginVisible(true)}>Войти</button>
      <br /><br />
      <a href="/register">Зарегистрироваться</a>

      {loginVisible && (
        <div style={{
          padding: 20, marginTop: 20,
          background: '#f0f0f0', borderRadius: 5, width: '300px'
        }}>
          <h3>Вход</h3>
          <input
            placeholder="Email"
            value={loginData.email}
            onChange={e => setLoginData({ ...loginData, email: e.target.value })}
            style={{ width: '100%', marginBottom: 10 }}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={loginData.password}
            onChange={e => setLoginData({ ...loginData, password: e.target.value })}
            style={{ width: '100%', marginBottom: 10 }}
          />
          <button onClick={handleLogin}>Войти</button>
          <button onClick={() => setLoginVisible(false)} style={{ marginLeft: 10 }}>Закрыть</button>
        </div>
      )}
    </div>
  );
}
