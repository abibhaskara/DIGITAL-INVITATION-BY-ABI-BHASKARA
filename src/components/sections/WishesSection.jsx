import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { TEMPLATE_CONTENT } from '../../config';
import { fadeInUp } from '../../utils/animations';
import { SectionWrapper } from '../ui/SectionWrapper';

const WISHES_API_URL = import.meta.env.VITE_API_URL || '';

export const WishesSection = () => {
    const cached = (() => { try { return JSON.parse(localStorage.getItem('cached_wishes') || 'null'); } catch { return null; } })();
    const [wishes, setWishes] = useState(cached || []);
    const [form, setForm] = useState({ name: '', message: '' });
    const [isLoading, setIsLoading] = useState(!cached);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const { wishes: wishesConfig } = TEMPLATE_CONTENT;

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${WISHES_API_URL}/api/wishes`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (data.success) {
                    setWishes(data.data);
                    localStorage.setItem('cached_wishes', JSON.stringify(data.data));
                }
            } catch (err) {
                console.error('Failed to load wishes:', err);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.message || isSubmitting) return;
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            const res = await fetch(`${WISHES_API_URL}/api/wishes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            if (data.success) {
                setWishes(prev => {
                    const updated = [data.data, ...prev];
                    localStorage.setItem('cached_wishes', JSON.stringify(updated));
                    return updated;
                });
                setForm({ name: '', message: '' });
            } else {
                throw new Error(data.error || 'Gagal mengirim ucapan');
            }
        } catch (err) {
            console.error('Submit error:', err);
            setSubmitError('Gagal mengirim ucapan. Silakan coba lagi.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const scrollWishes = useMemo(
        () => wishes.length > 0 ? [...wishes, ...wishes] : [],
        [wishes]
    );

    return (
        <SectionWrapper title={wishesConfig.sectionTitle} subtitle={wishesConfig.sectionSubtitle} id="wishes">
            <div className="space-y-12">
                <motion.div variants={fadeInUp} className="relative overflow-hidden h-[450px] border border-gray-100 bg-gray-50/50 rounded-sm">
                    <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

                    {isLoading ? (
                        <div className="flex items-center justify-center h-full"><div className="text-gray-400 text-sm uppercase tracking-widest">Loading wishes...</div></div>
                    ) : wishes.length === 0 ? (
                        <div className="flex items-center justify-center h-full"><div className="text-gray-400 text-sm uppercase tracking-widest">Be the first to send wishes!</div></div>
                    ) : (
                        <motion.div className="flex flex-col gap-6 px-6 pt-6" animate={{ y: ["0%", "-50%"] }} transition={{ repeat: Infinity, ease: "linear", duration: Math.max(25, wishes.length * 5) }}>
                            {scrollWishes.map((wish, idx) => (
                                <div key={`${idx}-${wish.id || wish.name}`} className="bg-white p-8 text-center border border-gray-100 shadow-sm shrink-0 rounded-sm">
                                    <p className="font-serif italic text-xl mb-4 text-gray-700 leading-relaxed">"{wish.message}"</p>
                                    <span className="text-[10px] uppercase tracking-widest text-gray-400">— {wish.name}</span>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </motion.div>

                <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="w-full sm:max-w-md mx-auto space-y-6 sm:space-y-8 pt-4 sm:pt-6">
                    <div className="text-center mb-8"><span className="text-xs uppercase tracking-widest text-gray-400">{wishesConfig.formTitle}</span></div>
                    <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full py-4 border-b border-gray-200 focus:border-black outline-none bg-transparent transition-colors font-serif text-xl text-center placeholder:text-gray-300" placeholder={wishesConfig.placeholderName} disabled={isSubmitting} />
                    <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full py-4 border-b border-gray-200 focus:border-black outline-none bg-transparent transition-colors font-light text-base text-center resize-none placeholder:text-gray-300 leading-relaxed" rows="2" placeholder={wishesConfig.placeholderMsg} disabled={isSubmitting} />
                    {submitError && (
                        <motion.p
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center text-xs text-red-500 tracking-wide"
                        >
                            {submitError}
                        </motion.p>
                    )}
                    <div className="text-center pt-4">
                        <button type="submit" disabled={isSubmitting} className="px-10 py-4 bg-black text-white text-[10px] uppercase tracking-[0.25em] hover:bg-gray-800 transition-all duration-300 flex items-center gap-3 mx-auto disabled:opacity-50 disabled:cursor-not-allowed">
                            <span>{isSubmitting ? 'Sending...' : wishesConfig.submitButton}</span><Send size={14} />
                        </button>
                    </div>
                </motion.form>
            </div>
        </SectionWrapper>
    );
};
