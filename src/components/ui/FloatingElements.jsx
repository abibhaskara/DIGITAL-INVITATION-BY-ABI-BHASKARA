import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Volume2, VolumeX, Heart } from 'lucide-react';
import { THEME_COLORS, TEMPLATE_CONTENT } from '../../config';

const BUTTON_STYLES = {
    floating: "w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center backdrop-blur-xl",
    floatingShadow: { boxShadow: "0 10px 40px -10px rgba(0,0,0,0.15)" }
};

export const ScrollProgress = ({ isVisible }) => {
    const { scrollYProgress } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            className="fixed top-0 left-0 right-0 h-[2px] z-[80] origin-left"
            style={{ scaleX, background: THEME_COLORS.accent }}
        />
    );
};

export const FloatingDecorations = ({ isVisible }) => {
    const { scrollYProgress } = useScroll();
    const t = {
        y1: useTransform(scrollYProgress, [0, 1], [0, -200]),
        y2: useTransform(scrollYProgress, [0, 1], [0, -350]),
        y3: useTransform(scrollYProgress, [0, 1], [0, -150]),
        r1: useTransform(scrollYProgress, [0, 1], [0, 180]),
        r2: useTransform(scrollYProgress, [0, 1], [0, -120])
    };
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
            {[
                { p: 'left-4 sm:left-10 top-1/4', y: t.y1, r: t.r1, c: <div className="w-2 h-2 rounded-full border border-gray-300" /> },
                { p: 'left-8 sm:left-20 top-1/2', y: t.y2, c: <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent" /> },
                { p: 'left-6 sm:left-16 top-3/4', y: t.y3, r: t.r2, c: <svg viewBox="0 0 24 24" fill={THEME_COLORS.accent} className="w-3 h-3 opacity-50"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg> },
                { p: 'right-4 sm:right-10 top-1/3', y: t.y2, r: t.r2, c: <div className="w-3 h-3 rounded-full border border-gray-200" /> },
                { p: 'right-8 sm:right-20 top-2/3', y: t.y1, c: <div className="w-px h-20 bg-gradient-to-b from-transparent via-gray-200 to-transparent" /> },
                { p: 'right-6 sm:right-14 top-[85%]', y: t.y3, r: t.r1, c: <svg viewBox="0 0 24 24" fill="none" stroke={THEME_COLORS.accent} strokeWidth="1" className="w-4 h-4 opacity-40"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg> }
            ].map((d, i) => (
                <motion.div key={i} className={`absolute ${d.p}`} style={{ y: d.y, rotate: d.r || 0, opacity }}>{d.c}</motion.div>
            ))}
        </div>
    );
};

export const FloatingHearts = ({ isVisible }) => {
    const [hearts, setHearts] = useState([]);
    const idCounter = useRef(0);

    const addHeart = () => {
        const id = idCounter.current++;
        setHearts(prev => [...prev, { id, x: Math.random() * 40 - 20 }]);
        setTimeout(() => setHearts(prev => prev.filter(h => h.id !== id)), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-10 z-40 flex flex-col items-center"
            style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
        >
            <div className="relative">
                <AnimatePresence>
                    {hearts.map(heart => (
                        <motion.div
                            key={heart.id}
                            initial={{ opacity: 1, y: 0, x: 0, scale: 0.5 }}
                            animate={{ opacity: 0, y: -150, x: heart.x, scale: 1.2 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute bottom-full mb-2 left-0 right-0 mx-auto pointer-events-none text-red-500"
                        >
                            <Heart fill="currentColor" size={18} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <motion.button whileTap={{ scale: 0.9 }} onClick={addHeart} className={`${BUTTON_STYLES.floating} text-red-500 hover:bg-red-50 transition-colors`} style={BUTTON_STYLES.floatingShadow}>
                <Heart size={16} className="sm:w-[18px] sm:h-[18px]" fill="currentColor" />
            </motion.button>
        </motion.div>
    );
};

export const FloatingAudio = ({ isPlaying, toggleMusic, isVisible }) => (
    <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        whileTap={{ scale: 0.8 }}
        onClick={toggleMusic}
        className={`fixed bottom-24 left-4 sm:left-10 z-40 ${BUTTON_STYLES.floating} hover:bg-gray-50 transition-colors`}
        style={{ pointerEvents: isVisible ? 'auto' : 'none', ...BUTTON_STYLES.floatingShadow }}
    >
        <AnimatePresence mode='wait'>
            {isPlaying ? (
                <motion.div key="playing" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <div className="relative">
                        <motion.div className="absolute inset-0 rounded-full border border-gray-300" animate={{ scale: [1, 1.5], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                        <Volume2 size={18} strokeWidth={1.5} color={THEME_COLORS.primary} />
                    </div>
                </motion.div>
            ) : (
                <motion.div key="muted" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <VolumeX size={18} strokeWidth={1.5} className="text-gray-400" />
                </motion.div>
            )}
        </AnimatePresence>
    </motion.button>
);

export const BackgroundAudio = ({ isPlaying }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = Object.assign(new Audio(TEMPLATE_CONTENT.musicUrl), { loop: true, volume: 0.5 });
        }
        const audio = audioRef.current;
        const toggle = () => document.hidden || !isPlaying ? audio.pause() : audio.play().catch(() => {});
        
        toggle();
        document.addEventListener('visibilitychange', toggle);
        return () => document.removeEventListener('visibilitychange', toggle);
    }, [isPlaying]);

    useEffect(() => () => audioRef.current?.pause(), []);
    return null;
};

export const SparkleCursor = () => {
    const [sparkles, setSparkles] = useState([]);
    const sparkleId = useRef(0), lastTime = useRef(0);

    useEffect(() => {
        const handleMove = (e) => {
            const x = e.clientX ?? e.touches?.[0]?.clientX;
            const y = e.clientY ?? e.touches?.[0]?.clientY;
            if (!x || !y || Date.now() - lastTime.current < 20) return;
            lastTime.current = Date.now();

            const newSparkles = Array.from({ length: 2 }, () => ({
                id: sparkleId.current++, x: x + (Math.random() - 0.5) * 30, y: y + (Math.random() - 0.5) * 30, size: Math.random() * 15 + 10
            }));
            
            setSparkles(p => [...p, ...newSparkles].slice(-20));
            setTimeout(() => setSparkles(p => p.filter(s => !newSparkles.find(n => n.id === s.id))), 800);
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleMove);
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleMove);
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
            <AnimatePresence>
                {sparkles.map(({ id, x, y, size }) => (
                    <motion.div
                        key={id}
                        initial={{ opacity: 1, scale: 0, rotate: 0 }}
                        animate={{ opacity: 0, scale: 1, rotate: 180 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ position: 'absolute', left: x, top: y, width: size, height: size, transform: 'translate(-50%, -50%)' }}
                    >
                        <svg viewBox="0 0 24 24" fill={THEME_COLORS.accent} className="w-full h-full drop-shadow-md">
                            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                        </svg>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
