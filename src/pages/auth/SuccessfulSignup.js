import { useNavigate } from 'react-router';

function SuccessfulSignup() {
    const navigate = useNavigate();

    return (
        <div className='min-h-screen md:p-20 px-3 py-10'>
            <div>
                <div className='text-5xl font-black'>CBNU TUX</div>
                <div className="text-lg">Linux study club, since 2020</div>
            </div>

            <div className="mt-32 mx-auto md:w-[600px] w-full">
                <div className="text-6xl">
                    환영합니다!
                </div>

                <p className='mt-10 text-3xl'>🎉</p>

                <div className="mt-10 text-lg">
                    <p>CBNU TUX 홈페이지에 성공적으로 회원가입 되셨습니다.</p>
                    <p>해당 계정으로 로그인 하시면, 회원으로서 활동하실 수 있습니다.</p>
                </div>

                <button className="mt-32 bg-[#efefef] hover:bg-gray-200 rounded py-2 w-full"
                    onClick={() => navigate('/login')}>
                    로그인 페이지로 이동
                </button>
            </div>
        </div>
    );
}

export default SuccessfulSignup;