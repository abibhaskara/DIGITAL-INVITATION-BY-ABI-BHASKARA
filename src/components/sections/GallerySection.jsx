import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { TEMPLATE_CONTENT } from '../../config';
import { staggerContainer, fadeInUp } from '../../utils/animations';
import { SectionWrapper } from '../ui/SectionWrapper';

export const GallerySection = ({ onImageClick }) => {
    const { gallery } = TEMPLATE_CONTENT;
    return (
        <SectionWrapper title={gallery.sectionTitle} subtitle={gallery.sectionSubtitle} id="gallery">
            <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-4 sm:gap-6">
                {gallery.images.map((src, index) => (
                    <motion.div key={index} variants={fadeInUp} className="relative aspect-[3/4] overflow-hidden cursor-zoom-in group rounded-sm" whileHover={{ scale: 1.02 }} onClick={() => onImageClick(src)}>
                        <img src={src} alt="Gallery" loading="lazy" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Maximize2 className="text-white drop-shadow-md w-8 h-8" />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </SectionWrapper>
    );
};
