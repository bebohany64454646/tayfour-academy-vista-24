
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Search, RefreshCw } from "lucide-react";
import { getAllStudents, createStudent, updateStudent, deleteStudent } from "@/lib/database";

interface Student {
  id: number;
  username: string;
  student_number: string;
  full_name: string;
  grade: string;
  class_section: string;
  phone: string;
  parent_phone: string;
  password?: string;
}

const StudentsManagement = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [newStudent, setNewStudent] = useState({
    username: '', password: '123456', studentNumber: '', fullName: '', grade: '', classSection: '', phone: '', parentPhone: ''
  });
  
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const grades = ['سابع', 'ثامن', 'تاسع'];
  const sections = ['1', '2', '3', '4', '5', '6', '7'];

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await getAllStudents();
      const formattedData: Student[] = data.map((row: any) => ({
        id: row.id as number,
        username: row.username as string,
        student_number: row.student_number as string,
        full_name: row.full_name as string,
        grade: row.grade as string,
        class_section: row.class_section as string,
        phone: row.phone as string,
        parent_phone: row.parent_phone as string,
      }));
      setStudents(formattedData);
    } catch (error) {
      console.error('خطأ في جلب الطلاب:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student =>
    student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.student_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = async () => {
    if (newStudent.username && newStudent.fullName && newStudent.grade && newStudent.classSection && newStudent.phone) {
      try {
        await createStudent(newStudent);
        await fetchStudents(); // إعادة تحميل البيانات
        setNewStudent({ username: '', password: '123456', studentNumber: '', fullName: '', grade: '', classSection: '', phone: '', parentPhone: '' });
        setIsDialogOpen(false);
        console.log('تم إضافة الطالب بنجاح');
      } catch (error) {
        console.error('خطأ في إضافة الطالب:', error);
      }
    }
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setNewStudent({
      username: student.username,
      password: '123456',
      studentNumber: student.student_number,
      fullName: student.full_name,
      grade: student.grade,
      classSection: student.class_section,
      phone: student.phone,
      parentPhone: student.parent_phone
    });
    setIsDialogOpen(true);
  };

  const handleUpdateStudent = async () => {
    if (editingStudent) {
      try {
        await updateStudent(editingStudent.id, newStudent);
        await fetchStudents(); // إعادة تحميل البيانات
        setEditingStudent(null);
        setNewStudent({ username: '', password: '123456', studentNumber: '', fullName: '', grade: '', classSection: '', phone: '', parentPhone: '' });
        setIsDialogOpen(false);
        console.log('تم تحديث الطالب بنجاح');
      } catch (error) {
        console.error('خطأ في تحديث الطالب:', error);
      }
    }
  };

  const handleDeleteStudent = async (id: number) => {
    try {
      await deleteStudent(id);
      await fetchStudents(); // إعادة تحميل البيانات
      console.log('تم حذف الطالب بنجاح');
    } catch (error) {
      console.error('خطأ في حذف الطالب:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-foreground font-cairo">إدارة الطلاب</h2>
        <div className="text-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">جاري تحميل البيانات من Turso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground font-cairo">إدارة الطلاب</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => {
              setEditingStudent(null);
              setNewStudent({ username: '', password: '123456', studentNumber: '', fullName: '', grade: '', classSection: '', phone: '', parentPhone: '' });
            }}>
              <Plus className="h-5 w-5 ml-2" />
              إضافة طالب جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-cairo">
                {editingStudent ? 'تعديل الطالب' : 'إضافة طالب جديد'}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username" className="font-cairo">اسم المستخدم</Label>
                  <Input
                    id="username"
                    value={newStudent.username}
                    onChange={(e) => setNewStudent({...newStudent, username: e.target.value})}
                    className="font-cairo"
                  />
                </div>
                <div>
                  <Label htmlFor="studentNumber" className="font-cairo">رقم الطالب</Label>
                  <Input
                    id="studentNumber"
                    value={newStudent.studentNumber}
                    onChange={(e) => setNewStudent({...newStudent, studentNumber: e.target.value})}
                    className="font-cairo"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="fullName" className="font-cairo">الاسم الكامل</Label>
                <Input
                  id="fullName"
                  value={newStudent.fullName}
                  onChange={(e) => setNewStudent({...newStudent, fullName: e.target.value})}
                  className="font-cairo"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-cairo">الصف</Label>
                  <Select value={newStudent.grade} onValueChange={(value) => setNewStudent({...newStudent, grade: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الصف" />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map((grade) => (
                        <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="font-cairo">الشعبة</Label>
                  <Select value={newStudent.classSection} onValueChange={(value) => setNewStudent({...newStudent, classSection: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الشعبة" />
                    </SelectTrigger>
                    <SelectContent>
                      {sections.map((section) => (
                        <SelectItem key={section} value={section}>شعبة {section}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="font-cairo">هاتف الطالب</Label>
                  <Input
                    id="phone"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                    className="font-cairo"
                  />
                </div>
                <div>
                  <Label htmlFor="parentPhone" className="font-cairo">هاتف ولي الأمر</Label>
                  <Input
                    id="parentPhone"
                    value={newStudent.parentPhone}
                    onChange={(e) => setNewStudent({...newStudent, parentPhone: e.target.value})}
                    className="font-cairo"
                  />
                </div>
              </div>
              <Button 
                onClick={editingStudent ? handleUpdateStudent : handleAddStudent}
                className="bg-primary hover:bg-primary/90 font-cairo"
              >
                {editingStudent ? 'تحديث الطالب في Turso' : 'إضافة الطالب إلى Turso'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="البحث في الطلاب..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10 bg-secondary/50 border-border font-cairo"
          />
        </div>
        <Button onClick={fetchStudents} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          تحديث من Turso
        </Button>
      </div>

      {/* Students Table */}
      <Card className="glass-effect border-border">
        <CardHeader>
          <CardTitle className="font-cairo">قائمة الطلاب في قاعدة بيانات Turso</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-cairo">اسم المستخدم</TableHead>
                <TableHead className="font-cairo">رقم الطالب</TableHead>
                <TableHead className="font-cairo">الاسم الكامل</TableHead>
                <TableHead className="font-cairo">الصف</TableHead>
                <TableHead className="font-cairo">الشعبة</TableHead>
                <TableHead className="font-cairo">هاتف الطالب</TableHead>
                <TableHead className="font-cairo">هاتف ولي الأمر</TableHead>
                <TableHead className="font-cairo">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-cairo">{student.username}</TableCell>
                  <TableCell className="font-cairo">{student.student_number}</TableCell>
                  <TableCell className="font-cairo">{student.full_name}</TableCell>
                  <TableCell className="font-cairo">{student.grade}</TableCell>
                  <TableCell className="font-cairo">{student.class_section}</TableCell>
                  <TableCell className="font-cairo">{student.phone}</TableCell>
                  <TableCell className="font-cairo">{student.parent_phone}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleEditStudent(student)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteStudent(student.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredStudents.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              لا توجد بيانات طلاب في قاعدة البيانات
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsManagement;
