import { useState } from 'react';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (res.status === 201) {
      alert('Пользователь зарегистрирован!');
      window.location.href = '/'; // Перенаправление на главную
    } else if (res.status === 409) {
      alert('Пользователь с таким email уже существует');
    } else {
      alert('Ошибка при регистрации');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h2>Регистрация</h2>
      <input
        name="name"
        placeholder="Имя"
        value={form.name}
        onChange={handleChange}
        required
      /><br /><br />
      <input
        name="surname"
        placeholder="Фамилия"
        value={form.surname}
        onChange={handleChange}
        required
      /><br /><br />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      /><br /><br />
      <input
        name="password"
        type="password"
        placeholder="Пароль"
        value={form.password}
        onChange={handleChange}
        required
      /><br /><br />
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}
