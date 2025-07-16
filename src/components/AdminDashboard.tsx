
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { LogOut, BarChart3, Users, UserPlus, School, BookOpen, Calendar, GraduationCap, Award, UserCheck, FileText, MessageSquare, Database, ClipboardList } from 'lucide-react';
import StudentsManagement from "@/components/admin/StudentsManagement";
import PendingRegistrations from "@/components/admin/PendingRegistrations";
import ClassesManagement from "@/components/admin/ClassesManagement";
import SubjectsManagement from "@/components/admin/SubjectsManagement";
import ScheduleManagement from "@/components/admin/ScheduleManagement";
import FacultyManagement from "@/components/admin/FacultyManagement";
import CoursesManagement from "@/components/admin/CoursesManagement";
import CourseRequestsManagement from "@/components/admin/CourseRequestsManagement";
import AttendanceManagement from "@/components/admin/AttendanceManagement";
import GradesManagement from "@/components/admin/GradesManagement";
import NotesManagement from "@/components/admin/NotesManagement";
import DataManagement from "@/components/admin/DataManagement";
import OverviewStats from "@/components/admin/OverviewStats";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const menuItems = [
    { id: 'overview', label: '📊 نظرة عامة', icon: BarChart3 },
    { id: 'students', label: '👥 إدارة الطلاب', icon: Users },
    { id: 'pending', label: '📝 طلبات إنشاء الحسابات', icon: UserPlus },
    { id: 'classes', label: '🏫 الصفوف والشُعب', icon: School },
    { id: 'subjects', label: '📚 المواد الدراسية', icon: BookOpen },
    { id: 'schedule', label: '📅 الجدول الأسبوعي', icon: Calendar },
    { id: 'faculty', label: '👨‍🏫 الكادر التدريسي', icon: GraduationCap },
    { id: 'courses', label: '🏆 الدورات التدريبية', icon: Award },
    { id: 'course-requests', label: '📋 طلبات الدورات', icon: ClipboardList },
    { id: 'attendance', label: '✅ الحضور والغياب', icon: UserCheck },
    { id: 'grades', label: '📋 العلامات الشفهية', icon: FileText },
    { id: 'notes', label: '💬 الملاحظات السلوكية', icon: MessageSquare },
    { id: 'data-management', label: '🗄️ إدارة البيانات', icon: Database }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewStats />;
      case 'students':
        return <StudentsManagement />;
      case 'pending':
        return <PendingRegistrations />;
      case 'classes':
        return <ClassesManagement />;
      case 'subjects':
        return <SubjectsManagement />;
      case 'schedule':
        return <ScheduleManagement />;
      case 'faculty':
        return <FacultyManagement />;
      case 'courses':
        return <CoursesManagement />;
      case 'course-requests':
        return <CourseRequestsManagement />;
      case 'attendance':
        return <AttendanceManagement />;
      case 'grades':
        return <GradesManagement />;
      case 'notes':
        return <NotesManagement />;
      case 'data-management':
        return <DataManagement />;
      default:
        return <OverviewStats />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border glass-effect">
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              {/* Fixed Logo Container */}
              <div className="relative bg-primary/10 rounded-xl p-2 border border-primary/20">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/8860d291-d798-4f21-ab51-5a3d278c150e.png" 
                    alt="Logo" 
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              </div>
              <div>
                <h2 className="font-bold text-foreground">🎛️ لوحة التحكم</h2>
                <p className="text-sm text-muted-foreground">مشرف النظام</p>
              </div>
            </div>
          </div>
          
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <header className="bg-card border-b border-border p-4 glass-effect">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-foreground">
                {menuItems.find(item => item.id === activeTab)?.label}
              </h1>
              <Button onClick={onLogout} variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                🚪 تسجيل الخروج
              </Button>
            </div>
          </header>
          
          <main className="p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
