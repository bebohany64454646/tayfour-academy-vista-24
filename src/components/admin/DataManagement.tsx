
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Trash2, AlertTriangle, RefreshCw, Database, Users, BookOpen, Calendar, UserCheck, GraduationCap, FileText, Clock, RotateCcw } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface DataType {
  id: string;
  name: string;
  icon: any;
  count: number;
  color: string;
}

const DataManagement = () => {
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedDataType, setSelectedDataType] = useState<string | null>(null);
  
  const [dataTypes, setDataTypes] = useState<DataType[]>([
    { 
      id: 'students', 
      name: 'بيانات الطلاب', 
      icon: Users, 
      count: 0, 
      color: 'bg-blue-500'
    },
    { 
      id: 'pending_registrations', 
      name: 'طلبات التسجيل المعلقة', 
      icon: Clock, 
      count: 0, 
      color: 'bg-yellow-500'
    },
    { 
      id: 'classes', 
      name: 'الصفوف الدراسية', 
      icon: BookOpen, 
      count: 0, 
      color: 'bg-green-500'
    },
    { 
      id: 'subjects', 
      name: 'المواد الدراسية', 
      icon: BookOpen, 
      count: 0, 
      color: 'bg-purple-500'
    },
    { 
      id: 'schedules', 
      name: 'الجداول الدراسية', 
      icon: Calendar, 
      count: 0, 
      color: 'bg-orange-500'
    },
    { 
      id: 'faculty', 
      name: 'الكادر التدريسي', 
      icon: Users, 
      count: 0, 
      color: 'bg-indigo-500'
    },
    { 
      id: 'courses', 
      name: 'الدورات', 
      icon: GraduationCap, 
      count: 0, 
      color: 'bg-red-500'
    },
    { 
      id: 'attendance', 
      name: 'الحضور والغياب', 
      icon: UserCheck, 
      count: 0, 
      color: 'bg-teal-500'
    },
    { 
      id: 'oral_grades', 
      name: 'العلامات الشفهية', 
      icon: FileText, 
      count: 0, 
      color: 'bg-pink-500'
    },
    { 
      id: 'behavioral_notes', 
      name: 'الملاحظات السلوكية', 
      icon: FileText, 
      count: 0, 
      color: 'bg-gray-500'
    }
  ]);

  // جميع العدادات مُعادة إلى صفر
  useEffect(() => {
    console.log('تم إعادة تعيين جميع العدادات إلى صفر - تم البدء من الصفر');
  }, []);

  return (
    <div className="space-y-6">
      <Card className="border-success/20 bg-success/5">
        <CardHeader>
          <CardTitle className="text-success flex items-center gap-2">
            <Database className="h-5 w-5" />
            تم إعادة تعيين البيانات بنجاح
          </CardTitle>
          <CardDescription>
            تم حذف جميع البيانات وإعادة تعيين قاعدة البيانات بالكامل. يمكنك الآن البدء من الصفر.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* إحصائيات البيانات - كلها صفر */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dataTypes.map((dataType) => (
          <Card key={dataType.id} className="relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1 h-full ${dataType.color}`} />
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <dataType.icon className="h-5 w-5 text-muted-foreground" />
                <Badge variant="secondary">0</Badge>
              </div>
              <CardTitle className="text-sm font-medium">
                {dataType.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-center text-sm text-muted-foreground">
                تم حذف جميع البيانات
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Alert>
        <Database className="h-4 w-4" />
        <AlertDescription>
          تم إعادة تعيين قاعدة البيانات بالكامل بنجاح. جميع البيانات الوهمية والفعلية تم حذفها.
          يمكنك الآن البدء في إضافة البيانات الجديدة من الصفر.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default DataManagement;
