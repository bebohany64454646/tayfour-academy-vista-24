
import { useState } from "react";
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
import { Plus, Edit, Trash2, Image as ImageIcon, GraduationCap, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CourseRegistrationForm from "@/components/CourseRegistrationForm";

interface Course {
  id: number;
  name: string;
  image: string;
  price: number;
  status: 'مفتوح' | 'مغلق';
}

const CoursesManagement = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const [newCourse, setNewCourse] = useState<{
    name: string;
    image: string;
    price: number;
    status: 'مفتوح' | 'مغلق';
  }>({
    name: '', image: '', price: 0, status: 'مفتوح'
  });
  
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [registrationFormOpen, setRegistrationFormOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type.includes('image/png') || file.type.includes('image/jpeg'))) {
      setSelectedImage(file);
      setNewCourse({...newCourse, image: file.name});
    }
  };

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.price > 0) {
      const course = {
        id: courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1,
        ...newCourse
      };
      setCourses([...courses, course]);
      setNewCourse({ name: '', image: '', price: 0, status: 'مفتوح' });
      setSelectedImage(null);
      setIsDialogOpen(false);
    }
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setNewCourse({
      name: course.name,
      image: course.image,
      price: course.price,
      status: course.status
    });
    setIsDialogOpen(true);
  };

  const handleUpdateCourse = () => {
    if (editingCourse) {
      setCourses(courses.map(c => c.id === editingCourse.id ? { ...editingCourse, ...newCourse } : c));
      setEditingCourse(null);
      setNewCourse({ name: '', image: '', price: 0, status: 'مفتوح' });
      setSelectedImage(null);
      setIsDialogOpen(false);
    }
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const handleRegisterForCourse = (course: Course) => {
    setSelectedCourse(course);
    setRegistrationFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground font-cairo">إدارة الدورات التدريبية</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => {
              setEditingCourse(null);
              setNewCourse({ name: '', image: '', price: 0, status: 'مفتوح' });
              setSelectedImage(null);
            }}>
              <Plus className="h-5 w-5 ml-2" />
              إضافة دورة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-cairo">
                {editingCourse ? 'تعديل الدورة' : 'إضافة دورة جديدة'}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="name" className="font-cairo">اسم الدورة</Label>
                <Input
                  id="name"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                  className="font-cairo"
                  placeholder="مثال: دورة البرمجة للمبتدئين"
                />
              </div>
              <div>
                <Label htmlFor="image" className="font-cairo">صورة الدورة</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleImageChange}
                  className="font-cairo"
                />
                {newCourse.image && (
                  <p className="text-sm text-muted-foreground mt-2 font-cairo">
                    الصورة المحددة: {newCourse.image}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price" className="font-cairo">السعر</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({...newCourse, price: Number(e.target.value)})}
                    className="font-cairo"
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label className="font-cairo">الحالة</Label>
                  <Select 
                    value={newCourse.status} 
                    onValueChange={(value: 'مفتوح' | 'مغلق') => setNewCourse({...newCourse, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="مفتوح">مفتوح</SelectItem>
                      <SelectItem value="مغلق">مغلق</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button 
                onClick={editingCourse ? handleUpdateCourse : handleAddCourse}
                className="bg-primary hover:bg-primary/90 font-cairo"
              >
                {editingCourse ? 'تحديث الدورة' : 'إضافة الدورة'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Courses Display */}
      {courses.length === 0 ? (
        <Card className="glass-effect border-border">
          <CardContent className="text-center py-12">
            <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2 font-cairo">لا توجد دورات حالياً</h3>
            <p className="text-muted-foreground font-cairo">ابدأ بإضافة دورة تدريبية جديدة</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="glass-effect border-border hover-lift">
              <CardHeader>
                <CardTitle className="font-cairo text-lg">{course.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground font-cairo">{course.image}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-foreground font-cairo">
                    {course.price} ل.س
                  </span>
                  <Badge variant={course.status === 'مفتوح' ? 'default' : 'secondary'} className="font-cairo">
                    {course.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleEditCourse(course)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 ml-2" />
                    تعديل
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {course.status === 'مفتوح' && (
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 font-cairo"
                    onClick={() => handleRegisterForCourse(course)}
                  >
                    <UserPlus className="h-4 w-4 ml-2" />
                    تسجيل في هذه الدورة
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Registration Form */}
      {selectedCourse && (
        <CourseRegistrationForm
          isOpen={registrationFormOpen}
          onClose={() => {
            setRegistrationFormOpen(false);
            setSelectedCourse(null);
          }}
          courseName={selectedCourse.name}
          courseId={selectedCourse.id}
        />
      )}
    </div>
  );
};

export default CoursesManagement;
