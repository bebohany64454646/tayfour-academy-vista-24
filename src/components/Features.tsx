
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Trophy, Globe, Microscope, Calculator, Palette, Music } from "lucide-react";

const Features = () => {
  const subjects = [
    { name: "اللغة العربية", icon: BookOpen, color: "bg-red-500" },
    { name: "الرياضيات", icon: Calculator, color: "bg-blue-500" },
    { name: "العلوم", icon: Microscope, color: "bg-green-500" },
    { name: "اللغة الإنجليزية", icon: Globe, color: "bg-purple-500" },
    { name: "التربية الفنية", icon: Palette, color: "bg-pink-500" },
    { name: "التربية الموسيقية", icon: Music, color: "bg-orange-500" },
  ];

  const features = [
    {
      title: "تعليم عالي الجودة",
      description: "منهج حديث ومطور يواكب أحدث الطرق التعليمية العالمية",
      icon: Trophy,
    },
    {
      title: "كادر تدريسي متميز",
      description: "فريق من أفضل المعلمين والمعلمات المتخصصين في كافة المجالات",
      icon: Users,
    },
    {
      title: "بيئة تعليمية محفزة",
      description: "مرافق حديثة ومجهزة بأحدث التقنيات التعليمية",
      icon: BookOpen,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-amiri font-bold text-royal-blue-800 mb-6">
            لماذا تختار مدرستنا؟
          </h2>
          <p className="text-xl text-gray-600 font-cairo max-w-3xl mx-auto">
            نحن نقدم تعليماً متميزاً يجمع بين الأصالة والحداثة، لإعداد جيل قادر على مواجهة تحديات المستقبل
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="bg-royal-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-royal-blue-600 transition-colors duration-300">
                  <feature.icon className="h-10 w-10 text-royal-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold font-cairo text-royal-blue-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-cairo leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subjects Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-amiri font-bold text-royal-blue-800 mb-6">
            المواد الدراسية
          </h3>
          <p className="text-lg text-gray-600 font-cairo">
            نقدم منهجاً شاملاً ومتكاملاً يغطي جميع المجالات التعليمية
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {subjects.map((subject, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className={`${subject.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <subject.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-cairo font-semibold text-gray-800 text-sm">
                  {subject.name}
                </h4>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
