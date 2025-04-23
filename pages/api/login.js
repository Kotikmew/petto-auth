import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не поддерживается' });
  }

  const usersPath = path.join(process.cwd(), 'public', 'users.json');
  const { email, password } = req.body;

  if (!fs.existsSync(usersPath)) {
    return res.status(500).json({ error: 'Файл users.json не найден' });
  }

  const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Неверный логин или пароль' });
  }

  res.status(200).json({ name: user.name });
}
