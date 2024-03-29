/* eslint-disable*/

import './App.css'
import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './NotFound';

import { Header, Footer, PrivateRoute } from './components';
import Main from './pages/Main';
import AdministratorPage from './pages/AdministratorPage'
import Sitemap from './pages/Sitemap'

import { LoginPage, RegisterPage, SuccessfulSignup, MyPage } from "./pages/auth";
import { Tuxinfo01, Tuxinfo02, Tuxinfo03 } from "./pages/tuxinfo";

import PostView from './pages/post/Postview';

import PreviousExamination from "./pages/exam/PreviousExamination";
import ExamPage from './pages/exam/ExamPage';
import WritePage_exam from './pages/exam/WritePage_exam';

import PreviousGallery from "./pages/gallery/PreviousGallery";
import GalleryPage from "./pages/gallery/GalleryPage";
import WritePage_gall from './pages/gallery/WritePage_gall';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (localStorage.cbnu_tux_userid === 'admin' || sessionStorage.cbnu_tux_userid === 'admin') {
      setIsAdmin(true);
    }
    else {
      setIsAdmin(false);
    }
  }, [isLogin]);

  return (
    <div className='App'>
      <BrowserRouter>
        <Header isLogin={isLogin} setIsLogin={setIsLogin} />


        <Routes>
          <Route path="/" element={
            // 로그인 한 사용자의 id가 'admin'일 경우, 관리자 페이지로 route
            <PrivateRoute isThatTrue={isAdmin} isTrue={<AdministratorPage />} isFalse={<Main />} />
          } />
          <Route path="/sitemap" element={<Sitemap isLogin={isLogin} />}></Route>


          {/* auth pages */}
          <Route path="/login" element={
            // 이미 로그인 되어 있는 상태라면, login page에 접근 불가 -> NotFound page로 route
            <PrivateRoute isThatTrue={isLogin} isTrue={<NotFound />} isFalse={<LoginPage isLogin={isLogin} setIsLogin={setIsLogin} />} />
          } />
          <Route path="/signup" element={
            <PrivateRoute isThatTrue={isLogin} isTrue={<NotFound />} isFalse={<RegisterPage />} />
          } />
          <Route path="/signup/successful" element={
            <PrivateRoute isThatTrue={isLogin} isTrue={<NotFound />} isFalse={<SuccessfulSignup />} />
          } />
          <Route path="/mypage" element={
            // 로그인 하지 않은 사용자는, mypage에 접근할 수 없음
            <PrivateRoute isThatTrue={isLogin} isTrue={<MyPage />} isFalse={<NotFound />} />
          } />


          {/* TUX 개요 */}
          <Route path="/tuxinfo01" element={<Tuxinfo01 />}></Route>
          <Route path="/tuxinfo02" element={<Tuxinfo02 />}></Route>
          <Route path="/tuxinfo03" element={<Tuxinfo03 />}></Route>


          {/* 커뮤니티 */}
          {/* <Route path="/community01" element={<Community01 />}></Route>
          <Route path="/community02" element={<Community02 />}></Route>
          <Route path="/community03" element={<Community03 />}></Route>
          <Route path="/community04" element={
            // 잡담방(private)
            <PrivateRoute isThatTrue={isLogin} isTrue={<Community04 />} isFalse={<NotFound />} />
          } /> */}


          {/* 자료실 */}
          <Route path="/gallery" element={<PreviousGallery />}></Route>
          <Route path="/write_page_gall" element={<WritePage_gall />}></Route>
          <Route path="/gallery/*" element={<GalleryPage />}></Route>

          {/* 족보(private) */}
          <Route path="/exam" element={
            <PrivateRoute isThatTrue={isLogin} isTrue={<PreviousExamination />} isFalse={<NotFound />} />
          } />
          <Route path="/write_page" element={
            <PrivateRoute isThatTrue={isLogin} isTrue={<WritePage_exam />} isFalse={<NotFound />} />
          } />
          <Route path="/exam/*" element={
            <PrivateRoute isThatTrue={isLogin} isTrue={<ExamPage />} isFalse={<NotFound />} />
          } />


          <Route path='/postView/:no' component={<PostView />} />

          {/* 엘리먼트의 상단에 위치하는 라우트들의 규칙을 모두 확인하고, 일치하는 라우트가 없다면 이 라우트가 화면에 나타나게 됩니다. */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>



        <Footer />
      </BrowserRouter>
    </div>
  );
};





export default App;