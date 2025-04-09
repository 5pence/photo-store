// ArchetypeModal.js
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ArchetypeModal({ isOpen, onClose, archetype }) {
  const backdropRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const backdrop = backdropRef.current;
    const modal = modalRef.current;
  
    if (isOpen && backdrop && modal) {
      gsap.set([backdrop, modal], { clearProps: "all" });
  
      // Backdrop fade-in
      gsap.fromTo(
        backdrop,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power1.out" }
      );
  
      // Modal bloom-in
      gsap.fromTo(
        modal,
        {
          scale: 0.5,
          opacity: 0,
          rotate: -4,
          y: 20,
        },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        }
      );
    }
  
    if (!isOpen && backdrop && modal) {
      // Safe fade out
      gsap.to([backdrop, modal], {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: onClose,
      });
    }
  }, [isOpen, onClose]);
  
  
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-[#2E3D3A]/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        ref={modalRef}
        className="absolute top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-[#F1EBE5] p-6 rounded-2xl shadow-lg border border-[#6A7D76] text-[#2E3D3A] font-serif"
      >
        <h2 className="text-xl font-semibold mb-2">{archetype.name}</h2>
        <p className="text-sm leading-relaxed italic">{archetype.description}</p>

        <button
          className="mt-4 px-4 py-1 rounded bg-[#6A7D76] text-white text-sm hover:bg-[#5a6d66] transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
