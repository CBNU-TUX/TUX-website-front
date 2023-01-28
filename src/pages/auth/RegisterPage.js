import { useCallback, useState } from "react";

function RegisterPage() {
    // 아이디, 학번, 이름, 비밀번호, 이메일
    const [userid, setUserid] = useState('');
    const [studentId, setStudentId] = useState('');
    const [name, setName] = useState('');
    const [userpw, setUserpw] = useState('');
    // 비밀번호 확인을 위한 state는 필요 없는 것으로 판단.. onChangeCheckpw() 에서 지역 변수로 처리
    const [email, setEmail] = useState('');

    // 오류메시지 상태 저장
    const [useridMessage, setUseridMessage] = useState('');
    const [studentIdMessage, setStudentIdMessage] = useState('');
    const [userpwMessage, setUserpwMessage] = useState('');
    const [checkpwMessage, setCheckpwMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');

    // 유효성 검사
    const [isUserid, setIsUserid] = useState(false);
    const [isStudentId, setIsStudentId] = useState(false);
    const [isUserpw, setIsUserpw] = useState(false);
    const [isCheckpw, setIsCheckpw] = useState(false);
    const [isEmail, setIsEmail] = useState(true); // 필수 입력란이 아니므로

    // userid
    const onChangeUserid = useCallback((e) => {
        const useridRegex = /^(?=.*[a-zA-Z])(?=.*[a-zA-Z0-9]).{2,20}$/
        const useridRegex2 = /^(?=.*[^a-zA-Z])(?=.*[^a-zA-Z0-9]).{2,20}$/ // 이거 제외하고 다른 것 들어왔을 때, 에러 처리 하기 위해
        const useridCurrent = e.target.value;
        setUserid(useridCurrent);

        if (!useridRegex.test(useridCurrent) || useridRegex2.test(useridCurrent)) {
            setUseridMessage('아이디는 영문자 또는 영문자와 숫자의 조합으로 2~20자 작성해야 합니다.');
            setIsUserid(false);
        }
        else {
            // if 중복된 아이디가 아니라면 {
            setUseridMessage('');
            setIsUserid(true);
            // }
            // else setUseridMessage('이미 사용 중인 아이디 입니다.');
        }
    }, [])


    // student id(학번)
    const onChangeStudentId = useCallback((e) => {
        const studentIdRegex = /^(?=.*[0-9]).{2,20}$/
        const studentIdRegex2 = /^(?=.*[^0-9]).{2,20}$/
        const studentIdCurrent = e.target.value;
        setStudentId(studentIdCurrent);

        if (!studentIdRegex.test(studentIdCurrent) || studentIdRegex2.test(studentIdCurrent)) {
            setStudentIdMessage('올바른 학번 형식이 아닙니다.');
            setIsStudentId(false);
        }
        else {
            setStudentIdMessage('');
            setIsStudentId(true);
        }
    }, [])

    const onChangeUserpw = useCallback((e) => {
        const userpwRegex = /^(?=.*[a-zA-Z])(?=.*[!?*@#$%^&+=-])(?=.*[0-9]).{8,30}$/
        const userpwCurrent = e.target.value;
        setUserpw(userpwCurrent);

        if (!userpwRegex.test(userpwCurrent)) {
            setUserpwMessage('비밀번호는 영문, 숫자, 특수문자(!, @, #, $, %, ^, &, +, =)의 조합으로 8~30자 작성해야 합니다.');
            setIsUserpw(false);
        } else {
            setUserpwMessage('');
            setIsUserpw(true);
        }
    }, [])

    const onChangeCheckpw = useCallback((e) => {
        const checkpwCurrent = e.target.value;

        if (userpw === checkpwCurrent) {
            setCheckpwMessage('');
            setIsCheckpw(true);
        } else {
            setCheckpwMessage('입력하신 비밀번호와 일치하지 않습니다.');
            setIsCheckpw(false);
        }
    }, [userpw])

    // 이메일
    const onChangeEmail = useCallback((e) => {
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const emailCurrent = e.target.value;
        setEmail(emailCurrent);

        if (!emailRegex.test(emailCurrent)) {
            setEmailMessage('올바른 이메일 형식이 아닙니다.');
            setIsEmail(false);
            if (emailCurrent === '') { // 필수 입력란이 아니므로..
                setEmailMessage('');
                setIsEmail(true);
            }
        } else {
            setEmailMessage('');
            setIsEmail(true);
        }
    }, [])

    return (
        <div className='min-h-[83.99vh] p-20'>
            <div>
                <div className='text-5xl font-black'>CBNU TUX</div>
                <div className="text-lg">TUX에 오신 것을 환영합니다</div>
            </div>

            <div className="mt-10 mx-auto w-[370px]">
                <div className="relative">
                    <div className="absolute top-[12px] inset-x-auto w-full h-[1px] bg-gray-300 -z-10"></div>
                    <div className="bg-white w-20 mx-auto text-center">
                        <span className="box-border">회원가입</span>
                    </div>
                </div>

                <div className="text-sm text-start mt-10">
                    <span className="text-[#E95420]">*</span> 는 필수 입력 사항입니다.
                </div>

                {/* form */}
                <form className="mt-3"
                    onSubmit={() => { }}>

                    <lebel>
                        <input type="text"
                            name="userid"
                            className="border border-x-gray-300 rounded px-4 py-2 w-[92%]
                                focus:outline-none focus:ring focus:ring-[#E95420]"
                            onChange={(e) => { onChangeUserid(e); }}
                            placeholder="아이디(영문자 또는 영문자 숫자 조합 2-20자)"
                            autoFocus />
                        <span className="w-[10%] pl-4 text-[#E95420]">*</span>
                        <div className={`text-sm text-justify text-[#E95420]`}>{useridMessage}</div>
                    </lebel>
                    <lebel>
                        <input type="text"
                            name="studentId"
                            className="border border-x-gray-300 rounded px-4 py-2 w-[92%] mt-3
                        focus:outline-none focus:ring focus:ring-[#E95420]"
                            onChange={(e) => { onChangeStudentId(e); }}
                            placeholder="학번 (20XXXXXXXX)" />
                        <span className="w-[10%] pl-4 text-[#E95420]">*</span>
                        <div className={`text-sm text-justify text-[#E95420]`}>{studentIdMessage}</div>
                    </lebel>
                    <lebel>
                        <input type="text"
                            name="name"
                            className="border border-x-gray-300 rounded px-4 py-2 w-[92%] mt-3
                        focus:outline-none focus:ring focus:ring-[#E95420]"
                            onChange={(e) => { setName(e.target.value); }}
                            placeholder="이름" />
                        <span className="w-[10%] pl-4 text-[#E95420]">*</span>
                    </lebel>

                    <lebel>
                        <input type="password"
                            name="userpw"
                            className="border border-x-gray-300 rounded px-4 py-2 w-[92%] mt-9
                        focus:outline-none focus:ring focus:ring-[#E95420]"
                            onChange={(e) => { onChangeUserpw(e); }}
                            placeholder="비밀번호(영문, 숫자, 특수문자 8-30자)" />
                        <span className="w-[10%] pl-4 text-[#E95420]">*</span>
                        <div className={`text-sm text-justify text-[#E95420]`}>{userpwMessage}</div>
                    </lebel>
                    <lebel>
                        <input type="password"
                            name="checkpw"
                            className="border border-x-gray-300 rounded px-4 py-2 w-[92%] mt-3
                        focus:outline-none focus:ring focus:ring-[#E95420]"
                            onChange={(e) => { onChangeCheckpw(e); }}
                            placeholder="비밀번호 확인" />
                        <span className="w-[10%] pl-4 text-[#E95420]">*</span>
                        <div className={`text-sm text-justify text-[#E95420]`}>{checkpwMessage}</div>
                    </lebel>

                    <div>
                        <input type="email"
                            name="email"
                            className="border border-x-gray-300 rounded px-4 py-2 w-full mt-9
                        focus:outline-none focus:ring focus:ring-[#E95420]"
                            onChange={(e) => { onChangeEmail(e); }}
                            placeholder="이메일" />
                        <div className={`text-sm text-justify text-[#E95420]`}>{emailMessage}</div>
                    </div>
                    <div>
                        <input type="tel"
                            name="tel"
                            className="border border-x-gray-300 rounded px-4 py-2 w-full mt-3
                        focus:outline-none focus:ring focus:ring-[#E95420]"
                            onChange={(e) => { }}
                            placeholder="전화번호" />
                    </div>

                    {/* 버튼 */}
                    <button className="bg-[#efefef] hover:bg-gray-200 rounded py-2 w-full mt-6
                        disabled:opacity-75 disabled:hover:bg-[#efefef]"
                        disabled={!(isUserid && isUserpw && isCheckpw && isEmail)} >
                        회원가입
                    </button>
                    <div className="text-xs mt-3 justify-center flex">
                        <div className="mr-1">이미 게정이 있으신가요?</div>
                        <a href={process.env.PUBLIC_URL + '/login'} className="text-[#E95420] hover:underline" >로그인</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;