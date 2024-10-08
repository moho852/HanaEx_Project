import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:8082/api/login', {
        params: {
          id,
          password,
        },
      });

      if (response.status === 200) {
        // 성공적인 로그인 처리
        alert('로그인 성공!');
      } else {
        // 에러 처리
        setErrorMessage('로그인 실패: ' + response.data.message);
      }
    } catch (error) {
      setErrorMessage('서버 에러가 발생했습니다.');
      console.error('Error during login:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        <button type="submit" style={styles.button}>로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;