
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Edit, Upload, Calendar, Image as ImageIcon, FileText } from 'lucide-react';
import { db } from '@/lib/database';

interface Schedule {
  id: number;
  name: string;
  file: string;
  grade: string;
  section: string;
  created_at: string;
}

const ScheduleManagement = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [newSchedule, setNewSchedule] = useState({
    name: '',
    file: '',
    grade: '',
    section: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const grades = ["سابع", "ثامن", "تاسع"];
  const sections = ["1", "2", "3", "4", "5", "6", "7"];

  // جلب البيانات من LocalStorage
  const fetchData = () => {
    try {
      const savedSchedules = localStorage.getItem('schedules');
      if (savedSchedules) {
        setSchedules(JSON.parse(savedSchedules));
      }
    } catch (error) {
      console.error('خطأ في جلب البيانات:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type.includes('image/') || file.type.includes('pdf'))) {
      setSelectedFile(file);
      setNewSchedule({...newSchedule, file: file.name});
    }
  };

  const handleAddSchedule = () => {
    if (newSchedule.name && newSchedule.grade && newSchedule.section && selectedFile) {
      const schedule = {
        id: schedules.length > 0 ? Math.max(...schedules.map(s => s.id)) + 1 : 1,
        ...newSchedule,
        created_at: new Date().toISOString()
      };
      
      const updatedSchedules = [...schedules, schedule];
      setSchedules(updatedSchedules);
      localStorage.setItem('schedules', JSON.stringify(updatedSchedules));
      
      setNewSchedule({ name: '', file: '', grade: '', section: '' });
      setSelectedFile(null);
    }
  };

  const handleDeleteSchedule = (id: number) => {
    const updatedSchedules = schedules.filter(s => s.id !== id);
    setSchedules(updatedSchedules);
    localStorage.setItem('schedules', JSON.stringify(updatedSchedules));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground font-cairo">الجداول الأسبوعية</h2>
        <Calendar className="h-8 w-8 text-primary" />
      </div>

      {/* عرض الجداول المضافة */}
      <Card className="glass-effect border-border">
        <CardHeader>
          <CardTitle className="font-cairo text-xl text-foreground">
            الجداول المضافة ({schedules.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {schedules.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              لا توجد جداول مضافة حالياً
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schedules.map(schedule => (
                <Card key={schedule.id} className="glass-effect border-border hover-lift">
                  <CardHeader>
                    <CardTitle className="font-cairo text-lg">{schedule.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      {schedule.file.toLowerCase().includes('.pdf') ? (
                        <FileText className="h-4 w-4 text-red-500" />
                      ) : (
                        <ImageIcon className="h-4 w-4 text-blue-500" />
                      )}
                      <span className="text-sm text-muted-foreground font-cairo">{schedule.file}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-cairo">
                        <span className="font-medium">الصف:</span> {schedule.grade}
                      </p>
                      <p className="text-sm font-cairo">
                        <span className="font-medium">الشعبة:</span> {schedule.section}
                      </p>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteSchedule(schedule.id)}
                      className="w-full text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 ml-2" />
                      حذف الجدول
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* نموذج إضافة جدول جديد */}
      <Card className="glass-effect border-border">
        <CardHeader>
          <CardTitle className="font-cairo text-xl text-foreground">
            إضافة جدول جديد
          </CardTitle>
          <CardDescription className="font-cairo">
            أضف جدول دراسي جديد مع إمكانية رفع صورة أو ملف PDF
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="font-cairo">اسم الجدول</Label>
              <Input
                id="name"
                value={newSchedule.name}
                onChange={(e) => setNewSchedule({...newSchedule, name: e.target.value})}
                placeholder="مثال: جدول الصف السابع - الشعبة 1"
                className="font-cairo"
              />
            </div>

            <div>
              <Label htmlFor="file" className="font-cairo">ملف الجدول</Label>
              <Input
                id="file"
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="font-cairo"
              />
              {newSchedule.file && (
                <p className="text-sm text-muted-foreground mt-2 font-cairo">
                  الملف المحدد: {newSchedule.file}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="grade" className="font-cairo">الصف</Label>
              <Select value={newSchedule.grade} onValueChange={(value) => setNewSchedule({...newSchedule, grade: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الصف" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map(grade => (
                    <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="section" className="font-cairo">الشعبة</Label>
              <Select value={newSchedule.section} onValueChange={(value) => setNewSchedule({...newSchedule, section: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الشعبة" />
                </SelectTrigger>
                <SelectContent>
                  {sections.map(section => (
                    <SelectItem key={section} value={section}>الشعبة {section}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4">
            <Button 
              onClick={handleAddSchedule} 
              className="bg-primary hover:bg-primary/90"
              disabled={!newSchedule.name || !newSchedule.grade || !newSchedule.section || !selectedFile}
            >
              <Upload className="h-4 w-4 ml-2" />
              إضافة الجدول
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleManagement;
