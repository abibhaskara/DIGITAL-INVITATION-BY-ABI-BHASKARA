import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { TEMPLATE_CONTENT } from '../../config';
import { fadeInUp, staggerContainer, scaleIn } from '../../utils/animations';
import { SectionWrapper } from '../ui/SectionWrapper';

export const DresscodeSection = () => {
    const [copiedIndex, setCopiedIndex] = useState(null);
    const { attire } = TEMPLATE_CONTENT;

    const handleCopy = (hex, index) => {
        navigator.clipboard.writeText(hex);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <SectionWrapper title={attire.sectionTitle} subtitle={attire.sectionSubtitle} id="dresscode">
            <div className="text-center">
                <motion.p variants={fadeInUp} className="mb-12 font-light text-gray-600 leading-loose text-lg">{attire.description}</motion.p>
                <motion.div variants={staggerContainer} className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-16">
                    {attire.colors.map((color, idx) => (
                        <motion.div key={idx} variants={scaleIn} className="flex flex-col items-center gap-4 cursor-pointer group" onClick={() => handleCopy(color.hex, idx)}>
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full border border-gray-200 shadow-md transition-transform group-hover:scale-110" style={{ backgroundColor: color.hex }} />
                                <AnimatePresence>
                                    {copiedIndex === idx && (
                                        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full text-white">
                                            <Check size={20} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <span className="text-[10px] uppercase tracking-wider text-gray-500 group-hover:text-black transition-colors">{color.name}</span>
                        </motion.div>
                    ))}
                </motion.div>
                <motion.div variants={fadeInUp} className="border-t border-b border-gray-100 py-10">
                    <span className="block font-serif text-2xl italic mb-3">{attire.noteTitle}</span>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{attire.noteDetail}</p>
                </motion.div>
            </div>
        </SectionWrapper>
    );
};
