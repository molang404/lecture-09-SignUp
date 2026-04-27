import styled from "styled-components";
import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router";
import { Title, Wrap } from "../components/Components.tsx";

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
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    margin-top: 20px;
`;

const ErrorText = styled.span`
    color: #d63031;
    font-size: 12px;
    margin-top: 4px;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

type ErrorType = {
    // 프로퍼티가 몇 개가 될진 모르겠지만, 그 프로퍼티의 key는 string이고 그 프로퍼티의 값들 모두 다 string이다
    [key: string]: string;
};

function Home() {
    // 1. 화면에 사용자가 입력해야 할 로그인 폼을 작성
    // --- styled-components의 힘을 빌어서 화면 디자인

    // 2. 그에 대해 사용자가 입력 처리를 끝내면
    // --- 각 input에 대한 useState를 작성
    // --- input과 useState를 연결 (4개 input에 onChange 작성)
    // -- 사용자가 엔터를 칠 때 또는 회원가입 버튼을 눌렀을 때 onSubmit 작성

    // 3. 유효성 검사를 한 후 사용자를 이동 시킨다.
    // --- if 처리를 통해 내가 생각한, 전송에서 탈락해야 할 조건을 작성

    // 4. 단, 유효성 검사에 실패하면 에러 메세지를 화면에 출력시키고 끝낸다.
    // --- useState를 또다시 만들 필요가 있음
    // --- 여러 개의 에러를 관리할 useState를 만들어도 되고, 하나의 useState를 사용할 수도 있음
    // --- 하나의 useState를 쓴다면, function 안에서 여러 번의 setState가 동작되려면
    // -- function 내에서 한 번만 setState 처리를 하기 위해, 새로운 object를 작성하였음


    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const [error, setError] = useState<ErrorType>({});

    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        // 1. 기존 form 태그의 onSubmit 기능 무력화
        event.preventDefault();

        // 2. 유효성 검사
        const result = validate(); // 유효성 검사에 성공하면 true, 실패하면 false
        if (!result) return;

        // 3. 백엔드에게 전송
        const data = { username, password, email, name };
        const queryString = new URLSearchParams(data).toString(); // 객체를 쿼리스트링을 만들어서 string으로 형변환
        navigate(`/result?${queryString}`);
    };

    const validate = () => {
        const newErrors: ErrorType = {};

        // 전송하기 전, 유효성 검사를 먼저 진행하고서 사용자를 이동
        // 1. username이 올바른가?
        if (!username.trim()) newErrors.username = "아이디는 필수 입력 항목입니다.";
        // 2. 비밀번호는 입력이 되었는가?
        if (!password.trim()) newErrors.password = "비밀번호는 필수 입력 항목입니다.";
        else if (password.length < 6) newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
        // 3. 이름이 입력이 되었는가?
        if (!name.trim()) newErrors.name = "이름은 필수 입력 항목입니다.";
        // 4. 이메일이 입력이 되었는가?
        if (!email.trim()) newErrors.email = "이메일은 필수 입력 항목입니다.";
        else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email))
            newErrors.email = "이메일 형식이 올바르지 않습니다.";
        // 이메일은 꼭 중간에 @가 들어갔는지 .이 있는지 확인해줘야 함
        // 어쩌구@어쩌구.어쩌구    => 뭔가 규칙성을 갖고 있는 string에 대한 검증을 할 때에는 "정규식"을 사용

        setError(newErrors);

        // 리턴은 true, false로 검증이 성공했는지 실패했는지만 반환
        // error라고 하는 객체에 항목이 있으면 실패
        // Object.keys(객체) => 매개변수로 넣은 객체의 프로퍼티 key들을 뽑아내는 메서드. 반환값은 array
        // 집어넣는 객체가 { username: "실패" } 라면 Object.keys(객체) 의 반환값은 ["username"]
        return Object.keys(newErrors).length === 0;
    };

    return (
        <Wrap>
            <Card onSubmit={onSubmit}>
                <Title>회원가입</Title>
                <InputGroup>
                    <Input
                        placeholder={"아이디"}
                        onChange={event => {
                            setUsername(event.target.value);
                        }}
                    />
                    {error.username && <ErrorText>{error.username}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"비밀번호"}
                        type={"password"}
                        onChange={event => {
                            setPassword(event.target.value);
                        }}
                    />
                    {error.password && <ErrorText>{error.password}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"이름"}
                        onChange={event => {
                            setName(event.target.value);
                        }}
                    />
                    {error.name && <ErrorText>{error.name}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"이메일"}
                        type={"email"}
                        onChange={event => {
                            setEmail(event.target.value);
                        }}
                    />
                    {error.email && <ErrorText>{error.email}</ErrorText>}
                </InputGroup>
                <Button type={"submit"}>회원가입</Button>
            </Card>
        </Wrap>
    );
}

export default Home;