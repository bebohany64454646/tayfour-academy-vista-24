
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, GraduationCap, BookOpen, School } from 'lucide-react';

interface Stats {
  totalStudents: number;
  totalTeachers: number;
  totalSubjects: number;
  totalClasses: number;
  totalSchedules: number;
  totalCourses: number;
  totalOralGrades: number;
  totalBehavioralNotes: number;
}

const OverviewStats = () => {
  const [stats, setStats] = useState<Stats>({
    totalStudents: 0,
    totalTeachers: 0,
    totalSubjects: 0,
    totalClasses: 0,
    totalSchedules: 0,
    totalCourses: 0,
    totalOralGrades: 0,
    totalBehavioralNotes: 0
  });

  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // تعيين كل الإحصائيات إلى صفر
  const resetStats = () => {
    setStats({
      totalStudents: 0,
      totalTeachers: 0,
      totalSubjects: 0,
      totalClasses: 0,
      totalSchedules: 0,
      totalCourses: 0,
      totalOralGrades: 0,
      totalBehavioralNotes: 0
    });
    setLastUpdated(new Date());
    console.log('تم إعادة تعيين جميع الإحصائيات إلى صفر');
  };

  useEffect(() => {
    // إعادة تعيين الإحصائيات إلى صفر عند تحميل المكون
    resetStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">📊 نظرة عامة</h2>
        <p className="text-sm text-muted-foreground">
          آخر تحديث: {lastUpdated.toLocaleTimeString('ar-SA')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-effect hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">👥 إجمالي الطلاب</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">طالب وطالبة</p>
          </CardContent>
        </Card>

        <Card className="glass-effect hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">👨‍🏫 الكادر التدريسي</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalTeachers}</div>
            <p className="text-xs text-muted-foreground">معلم ومعلمة</p>
          </CardContent>
        </Card>

        <Card className="glass-effect hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">📚 المواد الدراسية</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalSubjects}</div>
            <p className="text-xs text-muted-foreground">مادة دراسية</p>
          </CardContent>
        </Card>

        <Card className="glass-effect hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">🏫 الصفوف</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalClasses}</div>
            <p className="text-xs text-muted-foreground">صف دراسي</p>
          </CardContent>
        </Card>

        <Card className="glass-effect hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">📅 الجداول الدراسية</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalSchedules}</div>
            <p className="text-xs text-muted-foreground">حصة دراسية</p>
          </CardContent>
        </Card>

        <Card className="glass-effect hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">🏆 الدورات التدريبية</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalCourses}</div>
            <p className="text-xs text-muted-foreground">دورة تدريبية</p>
          </CardContent>
        </Card>

        <Card className="glass-effect hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">📋 العلامات الشفهية</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalOralGrades}</div>
            <p className="text-xs text-muted-foreground">علامة شفهية</p>
          </CardContent>
        </Card>

        <Card className="glass-effect hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">💬 الملاحظات السلوكية</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalBehavioralNotes}</div>
            <p className="text-xs text-muted-foreground">ملاحظة سلوكية</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewStats;
