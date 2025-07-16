
import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, BookOpen } from "lucide-react";

const Faculty = () => {
  const teachers = [
    {
      name: "أ. محمد أحمد",
      subject: "اللغة العربية",
      experience: "15 سنة خبرة",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "أ. فاطمة حسن",
      subject: "الرياضيات",
      experience: "12 سنة خبرة",
      image: "https://images.unsplash.com/photo-1494790108755-2616c27bf8b2?w=400&h=400&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "أ. عمر سالم",
      subject: "العلوم",
      experience: "18 سنة خبرة",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "أ. آمنة علي",
      subject: "اللغة الإنجليزية",
      experience: "10 سنة خبرة",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      rating: 5,
    },
  ];

  return (
    <section id="faculty" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-amiri font-bold text-royal-blue-800 mb-6">
            الكادر التدريسي المتميز
          </h2>
          <p className="text-xl text-gray-600 font-cairo max-w-3xl mx-auto">
            فريق من المعلمين والمعلمات المتخصصين والمتميزين في مجالاتهم، يتمتعون بخبرة واسعة وشغف حقيقي للتعليم
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teachers.map((teacher, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-royal-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold font-cairo text-royal-blue-800 mb-2">
                    {teacher.name}
                  </h3>
                  <p className="text-royal-blue-600 font-semibold font-cairo mb-2">
                    {teacher.subject}
                  </p>
                  <p className="text-gray-500 font-cairo text-sm mb-3">
                    {teacher.experience}
                  </p>
                  <div className="flex justify-center gap-1">
                    {[...Array(teacher.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-royal-blue-50 rounded-2xl">
            <Award className="h-16 w-16 text-royal-blue-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold font-cairo text-royal-blue-800 mb-2">٥٠+</h3>
            <p className="text-royal-blue-600 font-cairo font-semibold">معلم متخصص</p>
          </div>
          <div className="text-center p-8 bg-green-50 rounded-2xl">
            <BookOpen className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold font-cairo text-green-800 mb-2">٩٨٪</h3>
            <p className="text-green-600 font-cairo font-semibold">معدل النجاح</p>
          </div>
          <div className="text-center p-8 bg-purple-50 rounded-2xl">
            <Star className="h-16 w-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold font-cairo text-purple-800 mb-2">٤.٨</h3>
            <p className="text-purple-600 font-cairo font-semibold">تقييم أولياء الأمور</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faculty;
