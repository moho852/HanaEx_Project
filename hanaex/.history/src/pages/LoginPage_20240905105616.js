import React, { useState } from "react";
import axios from "axios";
import {
  Text,
  Input
} from "@chakra-ui/react";

const LoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get("http://localhost:8082/api/login", {
        params: {
          id,
          password,
        },
      });

      if (response.status === 200) {
        // 성공적인 로그인 처리
        alert("로그인 성공!");
      } else {
        // 에러 처리
        setErrorMessage("로그인 실패: " + response.data.message);
      }
    } catch (error) {
      setErrorMessage("서버 에러가 발생했습니다.");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="w-[960px] bg-slate-500 flex flex-col py-1 px-10 mt-10">
      <div className="bg-slate-400 rounded-2xl px-10 py-8 my-10 mx-60">
        <Text className='font-semibold text-2xl'>로그인</Text>
        <form onSubmit={handleSubmit}>
          <div>
            <Input
              placeholder='아이디를 입력해 주세요'
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <Input
              placeholder='아이디를 입력해 주세요'
              type="password"
              id="password"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p>{errorMessage}</p>}
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
