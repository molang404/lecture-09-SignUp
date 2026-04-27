import styled from "styled-components";
import { useState } from "react";

export const Wrap = styled.div`
    min-height: 100dvh;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f6fa;
`;

const Card = styled.form`
    background-color: white;
    padding: 40px;
    border-radius: 16px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Title = styled.h1`
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 24px;
    text-align: center;
`;

const Input = styled.input`
    padding: 14px;
    border-radius: 10px;
    border: 1px solid #ddd;
    transition: all 0.5s;
    
    &:focus {
        outline: none;
        border: 1px solid #6c5ce7;
    }
`;

const Button = styled.button`
    padding: 14px;
    background-color: #6c5ce7;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    margin-top: 20px;
`;

const ErrorText = styled.div`
    color: #d63031;
    font-size: 12px;
    magin-top: 4px;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

type ErrorType = {
    // 프로퍼티가 몇 개가 될진 모르겠지만 그 프로퍼티의 key는 string이고, 그 프로퍼티의 값들 모두 다 string이다
    [key: string]: string;
}

function Home() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [error, setError] = useState<ErrorType>([]);

    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();



        // 모든 값들을 통과하면, 그 입력한 값들을 백앤드에게 전송
    };

    const validate = () => {
        // 전송하기 전, 유효성 검사를 먼저 진행하고서 사용자를 이동
        // 1. username이 올바른가?
        if (!username.trim()) setError({ username: "아이디는 필수 입력 항목입니다." });
        // 2. 비밀번호는 입력이 되었는가?
        if (!password.trim()) setError({ password: "비밀번호는 필수 입력 항목입니다." });
        else if (password.length < 6) setError({ password: "비밀번호는 최소 6자 이상이여야 합니다." });
        // 3. 이름이 입력 되었는가?
        if (!name.trim()) setError({ name: "이름은 필수 입력 항목입니다." });
        // 4. 이메일이 입력 되었는가?
        if (!email.trim()) setError({ email: "이메일은 필수 입력 항목입니다." });
        else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email))
            setError({ email: "이메일 형식이 올바르지 않습니다." });
        // 이메일은 꼭 중간에 @가 들어갔는지, .이 있는지 확인해줘야 함
        // 어쩌구@어쩌구.어쩌구    => 뭔가 규칙성을 갖고 있는 string에 대한 검증을 할 때에는 "정규식"을 사용

        return
    };

    return (
        <Wrap>
            <Card onSubmit={onSubmit}>
                <Title>회원가입</Title>
                <InputGroup>
                    <Input
                        placeholder={"아이디"}
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />
                    {/* 아이디에 대해 검사하고 실패한 내용을 출력해줘야 함 */}
                    {error.username && <ErrorText>{error.username}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"비밀번호"} type={"password"}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                    {/* 비밀번호에 대해 검사하고 실패한 내용을 출력해줘야 함 */}
                    {error.password && <ErrorText>{error.password}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"이름"}
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
                    {error.name && <ErrorText>{error.name}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"이메일"} type={"email"}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                    {error.email && <ErrorText>{error.email}</ErrorText>}
                </InputGroup>
                <Button type={"submit"}>회원 가입</Button>
            </Card>
        </Wrap>
    );
}

export default Home;