/* eslint-disable*/

import './components/markdown.scss';
import './components/Pagination.scss';
import './components/quill.snow.css';
import './App.css';

import React, { lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NotFound from './NotFound';

import { Header, Footer, PrivateRoute } from './components';

/* Lazy loading for code splitting */
const Main = lazy(() => import('./pages/Main'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'));
const SuccessfulSignup = lazy(() => import('./pages/auth/SuccessfulSignup'));
const MyPage = lazy(() => import('./pages/auth/MyPage'));
const AdministratorPage = lazy(() => import('./pages/AdministratorPage'));

const Tuxinfo01 = lazy(() => import('./pages/tuxinfo/Tuxinfo01'));
const Tuxinfo02 = lazy(() => import('./pages/tuxinfo/Tuxinfo02'));
const Tuxinfo03 = lazy(() => import('./pages/tuxinfo/Tuxinfo03'));

const Community = lazy(() => import('./pages/community/Community'));
const CommunityWrite = lazy(() => import('./pages/community/CommunityWrite'));
const CommunityDetail = lazy(() => import('./pages/community/CommunityDetail'));

const ReferenceRoom = lazy(() => import('./pages/referenceroom/ReferenceRoom'));
const ReferenceRoomDetail = lazy(() => import('./pages/referenceroom/ReferenceRoomDetail'));
const ReferenceRoomWrite = lazy(() => import('./pages/referenceroom/ReferenceRoomWrite'));
const Gallery = lazy(() => import('./pages/gallery/Gallery'));
const GalleryDetail = lazy(() => import('./pages/gallery/GalleryDetail'));
const GalleryWrite = lazy(() => import('./pages/gallery/GalleryWrite'));

const JoinPage = lazy(() => import('./pages/join/JoinPage'));
const ContactPage = lazy(() => import('./pages/join/ContactPage'));

const Sitemap = lazy(() => import('./pages/Sitemap'));

/* Dayjs */
import * as dayjs from 'dayjs';
import 'dayjs/locale/ko';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
dayjs().locale('ko');

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    if (localStorage.role)
      setRole(localStorage.role);
    if (sessionStorage.role)
      setRole(sessionStorage.role);

    if (role === 'ADMIN') {
      setIsAdmin(true);
    }
    else {
      setIsAdmin(false);
    }
  }, [isLogin]);

  function isLogined() {
    return (localStorage.cbnu_tux_userid || sessionStorage.cbnu_tux_userid);
  }

  function isNotGuest() {
    if (localStorage.role)
      return localStorage.role !== "GUEST";
    if (sessionStorage.role)
      return sessionStorage.role !== "GUEST";
    return false;
  }

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
            <PrivateRoute isThatTrue={isLogined()} isTrue={<NotFound />} isFalse={<LoginPage isLogin={isLogin} setIsLogin={setIsLogin} />} />
          } />
          <Route path="/signup" element={
            <PrivateRoute isThatTrue={isLogined()} isTrue={<NotFound />} isFalse={<RegisterPage />} />
          } />
          <Route path="/signup/successful" element={
            <PrivateRoute isThatTrue={isLogined()} isTrue={<NotFound />} isFalse={<SuccessfulSignup />} />
          } />
          <Route path="/mypage" element={
            // 로그인 하지 않은 사용자는, mypage에 접근할 수 없음
            <PrivateRoute isThatTrue={isLogined()} isTrue={<MyPage />} isFalse={<NotFound />} />
          } />


          {/* TUX 개요 */}
          <Route path="/tuxinfo01" element={<Tuxinfo01 />}></Route>
          <Route path="/tuxinfo02" element={<Tuxinfo02 />}></Route>
          <Route path="/tuxinfo03" element={<Tuxinfo03 />}></Route>


          {/* 커뮤니티 */}
          <Route path="/community" element={<Community />}></Route>
          <Route path="/community/:id" element={<CommunityDetail />}></Route>
          <Route path="/community/write" element={<CommunityWrite />}></Route>


          {/* 자료실 */}
          <Route path="/referenceroom" element={
            <PrivateRoute isThatTrue={isLogined() && isNotGuest()} isTrue={<ReferenceRoom />} isFalse={<Navigate to='/login' />} />
          } />
          <Route path="/referenceroom/:id" element={
            <PrivateRoute isThatTrue={isLogined() && isNotGuest()} isTrue={<ReferenceRoomDetail />} isFalse={<Navigate to='/login' />} />
          } />
          <Route path="/referenceroom/write" element={
            <PrivateRoute isThatTrue={isLogined() && isNotGuest()} isTrue={<ReferenceRoomWrite />} isFalse={<Navigate to='/login' />} />
          } />

          {/* 갤러리 */}
          <Route path="/gallery" element={
            <PrivateRoute isThatTrue={isLogined() && isNotGuest()} isTrue={<Gallery />} isFalse={<Navigate to='/login' />} />
          } />
          <Route path="/gallery/:id" element={
            <PrivateRoute isThatTrue={isLogined() && isNotGuest()} isTrue={<GalleryDetail />} isFalse={<Navigate to='/login' />} />
          } />
          <Route path="/gallery/write" element={
            <PrivateRoute isThatTrue={isLogined() && isNotGuest()} isTrue={<GalleryWrite />} isFalse={<Navigate to='/login' />} />
          } />

          {/* 지원하기 */}
          <Route path="/join" element={<JoinPage />}></Route>
          <Route path="/contact" element={<ContactPage />}></Route>

          {/* 사용안함: <Route path='/postView/:no' component={<PostView />} />*/}

          {/* 엘리먼트의 상단에 위치하는 라우트들의 규칙을 모두 확인하고, 일치하는 라우트가 없다면 이 라우트가 화면에 나타나게 됩니다. */}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>



        <Footer />
      </BrowserRouter>
    </div>
  );
};





export default App;