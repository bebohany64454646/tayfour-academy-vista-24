
import { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Check, X, FileText, User, Phone, GraduationCap, Calendar } from "lucide-react";

interface CourseRequest {
  id: number;
  courseId: number;
  courseName: string;
  studentName: string;
  fatherName: string;
  lastName: string;
  phoneNumber: string;
  grade: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

const CourseRequestsManagement = () => {
  const [requests, setRequests] = useState<CourseRequest[]>([]);

  useEffect(() => {
    // تحميل طلبات التسجيل من localStorage
    const storedRequests = JSON.parse(localStorage.getItem('courseRegistrations') || '[]');
    setRequests(storedRequests);
  }, []);

  const handleApproveRequest = (id: number) => {
    const updatedRequests = requests.map(request => 
      request.id === id ? { ...request, status: 'approved' as const } : request
    );
    setRequests(updatedRequests);
    localStorage.setItem('courseRegistrations', JSON.stringify(updatedRequests));
  };

  const handleRejectRequest = (id: number) => {
    const updatedRequests = requests.map(request => 
      request.id === id ? { ...request, status: 'rejected' as const } : request
    );
    setRequests(updatedRequests);
    localStorage.setItem('courseRegistrations', JSON.stringify(updatedRequests));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="font-cairo">قيد المراجعة</Badge>;
      case 'approved':
        return <Badge variant="default" className="font-cairo bg-green-600">مقبول</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="font-cairo">مرفوض</Badge>;
      default:
        return <Badge variant="secondary" className="font-cairo">غير محدد</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
          <FileText className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-foreground font-cairo">طلبات الدورات التدريبية</h2>
          <p className="text-muted-foreground font-cairo">إدارة طلبات التسجيل في الدورات التدريبية</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-100">
                <FileText className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {requests.filter(r => r.status === 'pending').length}
                </p>
                <p className="text-muted-foreground font-cairo text-sm">طلبات قيد المراجعة</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {requests.filter(r => r.status === 'approved').length}
                </p>
                <p className="text-muted-foreground font-cairo text-sm">طلبات مقبولة</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100">
                <X className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {requests.filter(r => r.status === 'rejected').length}
                </p>
                <p className="text-muted-foreground font-cairo text-sm">طلبات مرفوضة</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requests Table */}
      <Card className="glass-effect border-border">
        <CardHeader>
          <CardTitle className="font-cairo">قائمة طلبات التسجيل</CardTitle>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-cairo text-lg">لا توجد طلبات تسجيل</p>
              <p className="text-muted-foreground font-cairo text-sm">ستظهر الطلبات هنا عند تقديمها من الطلاب</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-cairo">اسم الدورة</TableHead>
                  <TableHead className="font-cairo">اسم الطالب</TableHead>
                  <TableHead className="font-cairo">اسم الأب</TableHead>
                  <TableHead className="font-cairo">الكنية</TableHead>
                  <TableHead className="font-cairo">رقم الهاتف</TableHead>
                  <TableHead className="font-cairo">الصف</TableHead>
                  <TableHead className="font-cairo">تاريخ التقديم</TableHead>
                  <TableHead className="font-cairo">الحالة</TableHead>
                  <TableHead className="font-cairo">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-cairo font-medium">{request.courseName}</TableCell>
                    <TableCell className="font-cairo">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {request.studentName}
                      </div>
                    </TableCell>
                    <TableCell className="font-cairo">{request.fatherName}</TableCell>
                    <TableCell className="font-cairo">{request.lastName}</TableCell>
                    <TableCell className="font-cairo">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        {request.phoneNumber}
                      </div>
                    </TableCell>
                    <TableCell className="font-cairo">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        {request.grade}
                      </div>
                    </TableCell>
                    <TableCell className="font-cairo">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{formatDate(request.submittedAt)}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      {request.status === 'pending' && (
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleApproveRequest(request.id)}
                          >
                            <Check className="h-4 w-4 ml-1" />
                            قبول
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleRejectRequest(request.id)}
                          >
                            <X className="h-4 w-4 ml-1" />
                            رفض
                          </Button>
                        </div>
                      )}
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

export default CourseRequestsManagement;
