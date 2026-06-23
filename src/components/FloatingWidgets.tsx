import { MessageCircle, MapPin } from "lucide-react";

export function FloatingWidgets() {
  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col gap-3">
      <a 
        href="https://maps.app.goo.gl/FF8mphjaHEt2PKtC7" 
        target="_blank" 
        rel="noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-charcoal text-cream rounded-full shadow-lg hover:scale-110 transition-transform hover:bg-mustard hover:text-charcoal"
        aria-label="Get Directions"
        title="Get Directions"
      >
        <MapPin size={28} />
      </a>
      <a 
        href="https://wa.me/919999739766" 
        target="_blank" 
        rel="noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform hover:bg-[#1ebe5d]"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}
