import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  const usersPath = path.join(process.cwd(), 'public', 'users.json');
  const { name, surname, email, password } = req.body;

  // Если файла нет — создаём пустой массив
  const users = fs.existsSync(usersPath)
    ? JSON.parse(fs.readFileSync(usersPath, 'utf8'))
    : [];

  // Проверка на существование email
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ error: 'Пользователь уже существует' });
  }

  // Добавляем нового пользователя
  users.push({ name, surname, email, password });
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

  res.status(201).json({ message: 'Пользователь зарегистрирован' });
}
