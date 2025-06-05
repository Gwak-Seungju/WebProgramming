import { useState } from 'react'
import axios from 'axios';
import './App.css'
import Login from './login';

function App() {
  const [form, setForm] = useState({ username: '1', email: '1', password: '1' });

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost/term/signup.php', {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      alert(res.data.success ? '회원가입 성공!' : res.data.message);
    } catch (err) {
      alert(`회원가입 중 오류가 발생했습니다: ${err}`);
      console.error(err); // 여기서 더 구체적인 오류 로그 확인 가능
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit">회원가입</button>
      </form>
      <Login />
    </>
  );
}

export default App
