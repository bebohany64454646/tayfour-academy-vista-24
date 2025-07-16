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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2, FileText, Download } from "lucide-react";
import { db } from '@/lib/database';

interface Subject {
  id: number;
  name: string;
  code: string;
  grade: string;
  hours_per_week: number;
  created_at: string;
}

const SubjectsManagement = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState({
    name: '', code: '', grade: '', hours_per_week: 1
  });
  
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // جلب المواد من قاعدة البيانات
  const fetchSubjects = async () => {
    try {
      const result = await db.execute('SELECT * FROM subjects ORDER BY created_at DESC');
      setSubjects(result.rows as unknown as Subject[]);
    } catch (error) {
      console.error('خطأ في جلب المواد:', error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleAddSubject = async () => {
    if (newSubject.name && newSubject.code && newSubject.grade) {
      try {
        await db.execute({
          sql: `INSERT INTO subjects (name, code, grade, hours_per_week) VALUES (?, ?, ?, ?)`,
          args: [newSubject.name, newSubject.code, newSubject.grade, newSubject.hours_per_week]
        });
        await fetchSubjects();
        setNewSubject({ name: '', code: '', grade: '', hours_per_week: 1 });
        setIsDialogOpen(false);
      } catch (error) {
        console.error('خطأ في إضافة المادة:', error);
      }
    }
  };

  const handleEditSubject = (subject: Subject) => {
    setEditingSubject(subject);
    setNewSubject({
      name: subject.name,
      code: subject.code,
      grade: subject.grade,
      hours_per_week: subject.hours_per_week
    });
    setIsDialogOpen(true);
  };

  const handleUpdateSubject = async () => {
    if (editingSubject) {
      try {
        await db.execute({
          sql: `UPDATE subjects SET name = ?, code = ?, grade = ?, hours_per_week = ? WHERE id = ?`,
          args: [newSubject.name, newSubject.code, newSubject.grade, newSubject.hours_per_week, editingSubject.id]
        });
        await fetchSubjects();
        setEditingSubject(null);
        setNewSubject({ name: '', code: '', grade: '', hours_per_week: 1 });
        setIsDialogOpen(false);
      } catch (error) {
        console.error('خطأ في تحديث المادة:', error);
      }
    }
  };

  const handleDeleteSubject = async (id: number) => {
    try {
      await db.execute({
        sql: 'DELETE FROM subjects WHERE id = ?',
        args: [id]
      });
      await fetchSubjects();
    } catch (error) {
      console.error('خطأ في حذف المادة:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground font-cairo">إدارة المواد الدراسية</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => {
              setEditingSubject(null);
              setNewSubject({ name: '', code: '', grade: '', hours_per_week: 1 });
            }}>
              <Plus className="h-5 w-5 ml-2" />
              إضافة مادة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-cairo">
                {editingSubject ? 'تعديل المادة' : 'إضافة مادة جديدة'}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="name" className="font-cairo">اسم المادة</Label>
                <Input
                  id="name"
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
                  className="font-cairo"
                  placeholder="مثال: الرياضيات"
                />
              </div>
              <div>
                <Label htmlFor="code" className="font-cairo">رمز المادة</Label>
                <Input
                  id="code"
                  value={newSubject.code}
                  onChange={(e) => setNewSubject({...newSubject, code: e.target.value})}
                  className="font-cairo"
                  placeholder="مثال: MATH101"
                />
              </div>
              <div>
                <Label htmlFor="grade" className="font-cairo">الصف</Label>
                <Input
                  id="grade"
                  value={newSubject.grade}
                  onChange={(e) => setNewSubject({...newSubject, grade: e.target.value})}
                  className="font-cairo"
                  placeholder="مثال: السابع"
                />
              </div>
              <div>
                <Label htmlFor="hours" className="font-cairo">عدد الحصص الأسبوعية</Label>
                <Input
                  id="hours"
                  type="number"
                  min="1"
                  value={newSubject.hours_per_week}
                  onChange={(e) => setNewSubject({...newSubject, hours_per_week: parseInt(e.target.value) || 1})}
                  className="font-cairo"
                />
              </div>
              <Button 
                onClick={editingSubject ? handleUpdateSubject : handleAddSubject}
                className="bg-primary hover:bg-primary/90 font-cairo"
              >
                {editingSubject ? 'تحديث المادة' : 'إضافة المادة'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Subjects Table */}
      <Card className="glass-effect border-border">
        <CardHeader>
          <CardTitle className="font-cairo">قائمة المواد الدراسية ({subjects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {subjects.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              لا توجد مواد دراسية مضافة حالياً
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-cairo">اسم المادة</TableHead>
                  <TableHead className="font-cairo">رمز المادة</TableHead>
                  <TableHead className="font-cairo">الصف</TableHead>
                  <TableHead className="font-cairo">الحصص الأسبوعية</TableHead>
                  <TableHead className="font-cairo">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.map((subject) => (
                  <TableRow key={subject.id}>
                    <TableCell className="font-cairo">{subject.name}</TableCell>
                    <TableCell className="font-cairo">{subject.code}</TableCell>
                    <TableCell className="font-cairo">{subject.grade}</TableCell>
                    <TableCell className="font-cairo">{subject.hours_per_week}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleEditSubject(subject)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteSubject(subject.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SubjectsManagement;
