
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Phone, MessageCircle, X } from "lucide-react";

const ContactWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {isOpen && (
        <Card className="mb-2 glass-effect border-border shadow-xl animate-scale-in">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-cairo font-semibold text-foreground">تواصل معنا</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <a 
              href="https://www.facebook.com/share/g/1857bqjMrP/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 hover:scale-105"
            >
              <Facebook className="h-5 w-5" />
              <span className="font-cairo">KodCraft</span>
            </a>
            
            <a 
              href="tel:+963996899161"
              className="flex items-center gap-3 p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 hover:scale-105"
            >
              <Phone className="h-5 w-5" />
              <div className="text-right">
                <div className="font-cairo text-sm">إدارة المدرسة</div>
                <div className="font-mono text-xs">+963 996 899 161</div>
              </div>
            </a>
          </CardContent>
        </Card>
      )}
      
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 pulse-glow"
        title="تواصل معنا"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default ContactWidget;
