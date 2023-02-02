import { useState } from "react";
import { BsQuestionCircleFill } from 'react-icons/bs';
import gnbIsLogin from "../static/jsons/gnbIsLogin.json"
import gnbIsNotLogin from "../static/jsons/gnbIsNotLogin.json"

const GnbSub = ({ sub }) => {
    return (
        <li>
            <a href={process.env.PUBLIC_URL + sub.subHref}
                className="md:w-[30vw] w-[90vw] block py-4 px-auto hover:bg-[#efefef] border-2">
                {sub.subName}
            </a>
        </li>
    )
};

const GnbBox = ({ gnb, isLogin }) => {
    return (
        <div className="mx-2">
            <a href={process.env.PUBLIC_URL + gnb.subInfo[0].subHref}
                className="md:w-[30vw] w-[90vw] block py-4 px-auto text-xl font-bold bg-[#efefef] hover:bg-gray-200">
                {gnb.gnbName}</a>
            <ul>
                {
                    isLogin
                        ?
                        gnbIsLogin.map((ele) =>
                            ele.subInfo.map((subEle) =>
                                ele.gnbName === gnb.gnbName ? <GnbSub key={subEle.subName} sub={subEle} /> : ''
                            )
                        )
                        :
                        gnbIsNotLogin.map((ele) =>
                            ele.subInfo.map((subEle) =>
                                ele.gnbName === gnb.gnbName ? <GnbSub key={subEle.subName} sub={subEle} /> : ''
                            )
                        )
                }
            </ul>
        </div>
    )
};

function Sitemap() {
    const [isLogin, setIsLogin] = useState(true);
    // localStorage로부터 user info를 받아와서 처리해야 하는듯 하지만? 일단 간단하게 처리

    return (
        <div className='min-h-screen md:p-20 px-3 py-10'>
            <div>
                <div className='text-3xl font-black'>CBNU TUX</div>
                <div className="text-3xl">사이트 맵</div>
            </div>

            <div className="mt-10 flex md:flex-row flex-col gap-3 md:justify-center items-start">
                {
                    gnbIsLogin.map((ele) => <GnbBox key={ele.gnbName} gnb={ele} isLogin={isLogin} />)
                }
            </div>

            <div className="mt-20 px-[25vw]">
                <BsQuestionCircleFill size={20} style={{ margin: 'auto' }} />
                <div className="text-left mt-2">
                    <p>사이트 맵이란?</p>
                    <p className="text-justify">시스템 구조를 바탕으로 사이트에 표시할 콘텐츠들을 한 눈에 알아볼 수 있도록, 메뉴별로 구분하여 설계한 것을 말합니다.</p>
                </div>
            </div>
        </div>
    );
}

export default Sitemap;