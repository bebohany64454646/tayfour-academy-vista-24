
import React, { useState, useEffect } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import AccountTypeSelection from "@/components/AccountTypeSelection";
import LoginForm from "@/components/LoginForm";
import StudentRegistration from "@/components/StudentRegistration";
import StudentDashboard from "@/components/StudentDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import ContactWidget from "@/components/ContactWidget";
import { getUserByRememberToken, initializeDatabase } from "@/lib/database";

type AppState = 
  | 'welcome'
  | 'account-type'
  | 'login'
  | 'register'
  | 'student-dashboard'
  | 'admin-dashboard';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('welcome');
  const [accountType, setAccountType] = useState<'student' | 'admin'>('student');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    // التأكد من عدم تكرار عملية التحقق
    if (hasInitialized) return;
    
    const initializeApp = async () => {
      try {
        console.log('بدء تهيئة التطبيق...');
        await initializeDatabase();
        
        // التحقق من وجود رمز تذكر محفوظ للطلاب
        const studentToken = localStorage.getItem('remember_token_student');
        if (studentToken) {
          console.log('تم العثور على رمز تذكر للطالب');
          const user = await getUserByRememberToken(studentToken);
          if (user && user.type === 'student') {
            console.log('تم تسجيل دخول الطالب تلقائياً');
            setAccountType('student');
            setCurrentState('student-dashboard');
            setIsCheckingAuth(false);
            setHasInitialized(true);
            return;
          } else {
            console.log('رمز التذكر للطالب غير صالح، سيتم حذفه');
            localStorage.removeItem('remember_token_student');
          }
        }
        
        // التحقق من وجود رمز تذكر محفوظ للمشرفين
        const adminToken = localStorage.getItem('remember_token_admin');
        if (adminToken) {
          console.log('تم العثور على رمز تذكر للمشرف');
          const user = await getUserByRememberToken(adminToken);
          if (user && user.type === 'admin') {
            console.log('تم تسجيل دخول المشرف تلقائياً');
            setAccountType('admin');
            setCurrentState('admin-dashboard');
            setIsCheckingAuth(false);
            setHasInitialized(true);
            return;
          } else {
            console.log('رمز التذكر للمشرف غير صالح، سيتم حذفه');
            localStorage.removeItem('remember_token_admin');
          }
        }
        
        // إذا لم يكن هناك مصادقة محفوظة، اعرض صفحة الترحيب
        console.log('لا يوجد مصادقة محفوظة، عرض صفحة الترحيب');
        setIsCheckingAuth(false);
        setHasInitialized(true);
      } catch (error) {
        console.error('خطأ في تهيئة التطبيق:', error);
        setIsCheckingAuth(false);
        setHasInitialized(true);
      }
    };
    
    initializeApp();
  }, []); // إزالة hasInitialized من dependencies لتجنب الحلقة

  const handleStateChange = (newState: AppState) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentState(newState);
      setIsTransitioning(false);
    }, 200);
  };

  const handleWelcomeComplete = () => {
    handleStateChange('account-type');
  };

  const handleAccountTypeSelect = (type: 'student' | 'admin') => {
    setAccountType(type);
    handleStateChange('login');
  };

  const handleLogin = (credentials: any) => {
    console.log('Login attempt:', credentials);
    
    if (credentials.type === 'student') {
      handleStateChange('student-dashboard');
    } else {
      handleStateChange('admin-dashboard');
    }
  };

  const handleRegister = (data: any) => {
    console.log('Registration data:', data);
    handleStateChange('student-dashboard');
  };

  const handleLogout = () => {
    console.log('تسجيل الخروج...');
    localStorage.removeItem('remember_token_student');
    localStorage.removeItem('remember_token_admin');
    setHasInitialized(false);
    setIsCheckingAuth(false);
    handleStateChange('welcome');
  };

  // عرض شاشة التحميل أثناء التحقق من المصادقة مرة واحدة فقط
  if (isCheckingAuth && !hasInitialized) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
        {/* Enhanced Floating Neon Dots */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="neon-dot neon-dot-1"></div>
          <div className="neon-dot neon-dot-2"></div>
          <div className="neon-dot neon-dot-3"></div>
          <div className="neon-dot neon-dot-4"></div>
          <div className="neon-dot neon-dot-5"></div>
          <div className="neon-dot neon-dot-6"></div>
          <div className="neon-dot neon-dot-7"></div>
          <div className="neon-dot neon-dot-8"></div>
        </div>

        {/* Enhanced Floating Particles */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="floating-particles">
            <div className="particle enhanced-particle"></div>
            <div className="particle enhanced-particle"></div>
            <div className="particle enhanced-particle"></div>
            <div className="particle enhanced-particle"></div>
            <div className="particle enhanced-particle"></div>
          </div>
        </div>

        {/* Enhanced Gradient Background */}
        <div className="fixed inset-0 enhanced-gradient-bg opacity-10 z-0"></div>
        
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg font-cairo text-foreground">🔄 جاري التحقق من بيانات الدخول...</p>
        </div>
      </div>
    );
  }

  const renderCurrentScreen = () => {
    const screenProps = {
      className: `page-transition ${isTransitioning ? 'page-transition-exit' : ''}`
    };

    switch (currentState) {
      case 'welcome':
        return (
          <div {...screenProps}>
            <WelcomeScreen 
              onComplete={handleWelcomeComplete} 
            />
          </div>
        );
      
      case 'account-type':
        return (
          <div {...screenProps}>
            <AccountTypeSelection 
              onSelectType={handleAccountTypeSelect}
              onBack={() => handleStateChange('welcome')}
            />
          </div>
        );
      
      case 'login':
        return (
          <div {...screenProps}>
            <LoginForm 
              accountType={accountType}
              onBack={() => handleStateChange('account-type')}
              onLogin={handleLogin}
              onCreateAccount={() => handleStateChange('register')}
            />
          </div>
        );
      
      case 'register':
        return (
          <div {...screenProps}>
            <StudentRegistration 
              onBack={() => handleStateChange('login')}
              onRegister={handleRegister}
            />
          </div>
        );
      
      case 'student-dashboard':
        return (
          <div {...screenProps}>
            <StudentDashboard 
              onLogout={handleLogout}
            />
          </div>
        );
      
      case 'admin-dashboard':
        return (
          <div {...screenProps}>
            <AdminDashboard 
              onLogout={handleLogout}
            />
          </div>
        );
      
      default:
        return (
          <div {...screenProps}>
            <WelcomeScreen 
              onComplete={handleWelcomeComplete} 
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced Floating Neon Dots - عرض في جميع الصفحات */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="neon-dot neon-dot-1"></div>
        <div className="neon-dot neon-dot-2"></div>
        <div className="neon-dot neon-dot-3"></div>
        <div className="neon-dot neon-dot-4"></div>
        <div className="neon-dot neon-dot-5"></div>
        <div className="neon-dot neon-dot-6"></div>
        <div className="neon-dot neon-dot-7"></div>
        <div className="neon-dot neon-dot-8"></div>
      </div>

      {/* Enhanced Floating Particles - عرض في جميع الصفحات */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="floating-particles">
          <div className="particle enhanced-particle"></div>
          <div className="particle enhanced-particle"></div>
          <div className="particle enhanced-particle"></div>
          <div className="particle enhanced-particle"></div>
          <div className="particle enhanced-particle"></div>
        </div>
      </div>

      {/* Enhanced Gradient Background - عرض في جميع الصفحات */}
      <div className="fixed inset-0 enhanced-gradient-bg opacity-10 z-0"></div>
      
      <div className="relative z-10">
        {renderCurrentScreen()}
      </div>

      {/* Contact Widget */}
      <ContactWidget />
    </div>
  );
};

export default Index;
