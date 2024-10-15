import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { Header } from './components/layout/Header/Header';
import { Footer } from './components/layout/Footer/Footer';
import { AuthProvider } from './components/Context/AuthContext';
interface AppProps {
  children?: React.ReactNode; // dấu hỏi là kiểu tuỳ chọn 
  //Điều này sẽ loại bỏ yêu cầu bắt buộc phải truyền children
  //và TypeScript sẽ không báo lỗi nếu bạn không truyền children.
}
export const App: React.FC<AppProps> = (props) => {
  return (
    <div>
      <AuthProvider>
        <Header />
        <section>
          <div className="container">
            <div className="row">
              {props.children}
            </div>
          </div>
        </section>
        <Footer />
      </AuthProvider>
    </div>
  )
}
export default App;
