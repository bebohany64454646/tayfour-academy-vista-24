
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, LogIn, Users, Shield, AlertCircle } from "lucide-react";
import { authenticateUser, saveRememberToken, getUserByRememberToken, initializeDatabase } from "@/lib/database";

interface LoginFormProps {
  accountType: 'student' | 'admin';
  onBack: () => void;
  onLogin: (credentials: any) => void;
  onCreateAccount: () => void;
}

const LoginForm = ({ accountType, onBack, onLogin, onCreateAccount }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // تهيئة قاعدة البيانات
    initializeDatabase();
    
    // التحقق من وجود رمز تذكر محفوظ
    const checkRememberToken = async () => {
      const savedToken = localStorage.getItem(`remember_token_${accountType}`);
      if (savedToken) {
        const user = await getUserByRememberToken(savedToken);
        if (user && user.type === accountType) {
          onLogin({ 
            username: user.username, 
            password: user.password, 
            type: accountType,
            userData: user 
          });
        } else {
          localStorage.removeItem(`remember_token_${accountType}`);
        }
      }
    };
    
    checkRememberToken();
  }, [accountType, onLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await authenticateUser(username, password, accountType);
      
      if (user) {
        // إذا كان المستخدم يريد تذكر بياناته
        if (rememberMe) {
          const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          await saveRememberToken(username, token);
          localStorage.setItem(`remember_token_${accountType}`, token);
        }
        
        onLogin({ 
          username, 
          password, 
          type: accountType,
          userData: user 
        });
      } else {
        setError('اسم المستخدم أو كلمة المرور غير صحيحة أو الحساب غير مفعل');
      }
    } catch (error) {
      console.error('خطأ في تسجيل الدخول:', error);
      setError('حدث خطأ في تسجيل الدخول. حاول مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const isStudent = accountType === 'student';

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {/* Floating Particles */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Enhanced Floating Neon Dots */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="neon-dot neon-dot-1"></div>
        <div className="neon-dot neon-dot-2"></div>
        <div className="neon-dot neon-dot-3"></div>
        <div className="neon-dot neon-dot-4"></div>
        <div className="neon-dot neon-dot-5"></div>
        <div className="neon-dot neon-dot-6"></div>
        <div className="neon-dot neon-dot-7"></div>
        <div className="neon-dot neon-dot-8"></div>
      </div>

      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 enhanced-gradient-bg opacity-10"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5 ml-2" />
          العودة
        </Button>

        <Card className="glass-effect border-border shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="mb-4 pulse-glow inline-block p-4 rounded-full bg-primary/10">
              {isStudent ? (
                <Users className="h-12 w-12 text-primary mx-auto" />
              ) : (
                <Shield className="h-12 w-12 text-accent mx-auto" />
              )}
            </div>
            <CardTitle className="text-2xl font-bold text-foreground font-cairo">
              🔐 تسجيل الدخول - {isStudent ? '🎓 طالب' : '👨‍💼 مشرف'}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <span className="text-destructive font-cairo">{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground font-cairo">
                  {isStudent ? '📝 اسم المستخدم أو رقم الطالب' : '👤 اسم المستخدم'}
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground"
                  placeholder={isStudent ? 'أدخل اسم المستخدم أو رقم الطالب' : 'أدخل اسم المستخدم'}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-cairo">
                  🔒 كلمة المرور
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground"
                  placeholder="أدخل كلمة المرور"
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  disabled={loading}
                />
                <Label htmlFor="remember" className="text-sm font-cairo cursor-pointer">
                  💾 تذكرني (حفظ بيانات الدخول)
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-cairo font-semibold py-3 pulse-glow"
                disabled={loading}
              >
                <LogIn className="h-5 w-5 ml-2" />
                {loading ? '🔄 جاري تسجيل الدخول...' : '✅ تسجيل الدخول'}
              </Button>

              {isStudent && (
                <div className="text-center pt-4">
                  <Button 
                    type="button"
                    variant="link" 
                    onClick={onCreateAccount}
                    className="text-primary hover:text-primary/80 font-cairo"
                    disabled={loading}
                  >
                    ➕ إنشاء حساب طالب جديد
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
