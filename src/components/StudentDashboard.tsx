
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Calendar, 
  BarChart3, 
  FileText, 
  Users, 
  Award, 
  CheckCircle, 
  User,
  LogOut,
  Download,
  Phone,
  Mail,
  MapPin,
  Calendar as CalendarIcon,
  GraduationCap
} from "lucide-react";

interface StudentData {
  id?: number;
  username: string;
  full_name: string;
  student_number?: string;
  grade?: string;
  class_section?: string;
  phone?: string;
  parent_phone?: string;
  email?: string;
  address?: string;
  birth_date?: string;
  enrollment_date?: string;
}

interface StudentDashboardProps {
  onLogout: () => void;
  studentData: StudentData;
}

const StudentDashboard = ({ onLogout, studentData }: StudentDashboardProps) => {
  const [activeSection, setActiveSection] = useState('overview');

  const menuItems = [
    { id: 'overview', label: 'نظرة عامة', icon: BarChart3 },
    { id: 'subjects', label: 'المواد الدراسية', icon: BookOpen },
    { id: 'schedule', label: 'الجدول الدراسي', icon: Calendar },
    { id: 'grades', label: 'العلامات الشفهية', icon: BarChart3 },
    { id: 'notes', label: 'الملاحظات السلوكية', icon: FileText },
    { id: 'faculty', label: 'الكادر التدريسي', icon: Users },
    { id: 'courses', label: 'الدورات التدريبية', icon: Award },
    { id: 'attendance', label: 'الحضور والغياب', icon: CheckCircle },
    { id: 'profile', label: 'الملف الشخصي', icon: User },
  ];

  const subjects = [
    { name: 'الرياضيات', files: 5, lastUpdate: '2024-01-10' },
    { name: 'اللغة العربية', files: 8, lastUpdate: '2024-01-12' },
    { name: 'العلوم', files: 6, lastUpdate: '2024-01-08' },
    { name: 'التاريخ', files: 4, lastUpdate: '2024-01-05' },
    { name: 'الجغرافيا', files: 3, lastUpdate: '2024-01-07' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Floating Particles */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Header */}
      <header className="glass-effect border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground font-cairo">
                لوحة تحكم الطالب
              </h1>
              <p className="text-muted-foreground font-cairo">مرحباً {studentData.full_name}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={onLogout}
            className="text-muted-foreground hover:text-destructive border-border"
          >
            <LogOut className="h-5 w-5 ml-2" />
            تسجيل الخروج
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 glass-effect border-l border-border min-h-screen p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                className={`w-full justify-start font-cairo ${
                  activeSection === item.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <item.icon className="h-5 w-5 ml-2" />
                {item.label}
              </Button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeSection === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground font-cairo">نظرة عامة</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="glass-effect border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <BookOpen className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">12</p>
                        <p className="text-muted-foreground font-cairo">مادة دراسية</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-accent/10">
                        <BarChart3 className="h-8 w-8 text-accent" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">85%</p>
                        <p className="text-muted-foreground font-cairo">معدل العلامات</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-green-500/10">
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">92%</p>
                        <p className="text-muted-foreground font-cairo">نسبة الحضور</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-yellow-500/10">
                        <Award className="h-8 w-8 text-yellow-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">3</p>
                        <p className="text-muted-foreground font-cairo">دورات مكتملة</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeSection === 'subjects' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground font-cairo">المواد الدراسية</h2>
              
              <div className="grid gap-4">
                {subjects.map((subject, index) => (
                  <Card key={index} className="glass-effect border-border hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between font-cairo">
                        <div className="flex items-center gap-3">
                          <BookOpen className="h-6 w-6 text-primary" />
                          {subject.name}
                        </div>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          <Download className="h-4 w-4 ml-2" />
                          تحميل الملفات
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between text-sm text-muted-foreground font-cairo">
                        <span>{subject.files} ملف متاح</span>
                        <span>آخر تحديث: {subject.lastUpdate}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground font-cairo">الملف الشخصي</h2>
              
              <div className="grid lg:grid-cols-2 gap-6">
                {/* معلومات أساسية */}
                <Card className="glass-effect border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-cairo">
                      <User className="h-6 w-6 text-primary" />
                      المعلومات الأساسية
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                        <User className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground font-cairo">الاسم الكامل</p>
                          <p className="font-medium font-cairo">{studentData.full_name}</p>
                        </div>
                      </div>
                      
                      {studentData.student_number && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                          <GraduationCap className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground font-cairo">رقم الطالب</p>
                            <p className="font-medium font-cairo">{studentData.student_number}</p>
                          </div>
                        </div>
                      )}
                      
                      {(studentData.grade || studentData.class_section) && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                          <BookOpen className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground font-cairo">الصف والشعبة</p>
                            <p className="font-medium font-cairo">
                              {studentData.grade} {studentData.class_section && `- ${studentData.class_section}`}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {studentData.birth_date && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                          <CalendarIcon className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground font-cairo">تاريخ الميلاد</p>
                            <p className="font-medium font-cairo">{studentData.birth_date}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* معلومات الاتصال */}
                <Card className="glass-effect border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-cairo">
                      <Phone className="h-6 w-6 text-primary" />
                      معلومات الاتصال
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      {studentData.phone && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                          <Phone className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground font-cairo">هاتف الطالب</p>
                            <p className="font-medium font-cairo">{studentData.phone}</p>
                          </div>
                        </div>
                      )}
                      
                      {studentData.parent_phone && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                          <Phone className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="text-sm text-muted-foreground font-cairo">هاتف ولي الأمر</p>
                            <p className="font-medium font-cairo">{studentData.parent_phone}</p>
                          </div>
                        </div>
                      )}
                      
                      {studentData.email && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                          <Mail className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground font-cairo">البريد الإلكتروني</p>
                            <p className="font-medium font-cairo">{studentData.email}</p>
                          </div>
                        </div>
                      )}
                      
                      {studentData.address && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                          <MapPin className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground font-cairo">العنوان</p>
                            <p className="font-medium font-cairo">{studentData.address}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* معلومات أكاديمية */}
                <Card className="glass-effect border-border lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-cairo">
                      <BookOpen className="h-6 w-6 text-primary" />
                      المعلومات الأكاديمية
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                        <User className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground font-cairo">اسم المستخدم</p>
                          <p className="font-medium font-cairo">{studentData.username}</p>
                        </div>
                      </div>
                      
                      {studentData.enrollment_date && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                          <CalendarIcon className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground font-cairo">تاريخ التسجيل</p>
                            <p className="font-medium font-cairo">{studentData.enrollment_date}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Add other sections as needed */}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
