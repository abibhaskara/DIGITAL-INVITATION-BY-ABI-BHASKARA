import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { EASE_SMOOTH } from '../../utils/animations';

export const Lightbox = ({ selectedImage, onClose, images, onNavigate, isOpen }) => {
    const [isZooming, setIsZooming] = useState(true);
    const currentIndex = images.indexOf(selectedImage);

    useEffect(() => {
        if (!isOpen) return;
        setIsZooming(true);
        const timer = setTimeout(() => {
            setIsZooming(false);
            setTimeout(() => onNavigate?.(images[(currentIndex + 1) % images.length]), 500);
        }, 4000);
        return () => clearTimeout(timer);
    }, [currentIndex, images, onNavigate, isZooming, isOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.button className="absolute top-8 right-8 text-black/70 hover:text-black z-10" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <X size={32} />
                    </motion.button>
                    <motion.img
                        key={selectedImage}
                        src={selectedImage}
                        alt="Full view"
                        className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl"
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: isZooming ? 1 : 0.9, opacity: isZooming ? 1 : 0 }}
                        transition={{ duration: isZooming ? 4 : 0.5, ease: EASE_SMOOTH }}
                        onClick={e => e.stopPropagation()}
                    />
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                        {images?.map((img, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-colors ${img === selectedImage ? 'bg-white' : 'bg-white/30'}`}
                                onClick={(e) => { e.stopPropagation(); onNavigate?.(img); }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
