import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, CalendarPlus } from 'lucide-react';
import { TEMPLATE_CONTENT } from '../../config';
import { elegantFadeIn, elegantStagger } from '../../utils/animations';
import { SectionWrapper } from '../ui/SectionWrapper';
import { EventCard } from '../ui/EventCard';

const TARGET_DATE = new Date(
    TEMPLATE_CONTENT.dateTimeIso
        .split('/')[0]
        .replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:$6')
);

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hrs: 0, mins: 0, secs: 0 });

    useEffect(() => {
        const tick = () => {
            const diff = TARGET_DATE - Date.now();
            if (diff > 0) {
                setTimeLeft({
                    days: Math.floor(diff / 86400000),
                    hrs: Math.floor((diff / 3600000) % 24),
                    mins: Math.floor((diff / 60000) % 60),
                    secs: Math.floor((diff / 1000) % 60),
                });
            }
        };
        tick();
        const timer = setInterval(tick, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex justify-center gap-3 xs:gap-4 sm:gap-8">
            {Object.entries(timeLeft).map(([key, value]) => (
                <div key={key} className="flex flex-col items-center min-w-[3rem]">
                    <span className="font-serif text-2xl sm:text-3xl italic font-medium">{String(value).padStart(2, '0')}</span>
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 mt-2">{key}</span>
                </div>
            ))}
        </div>
    );
};

const { event: _event, name: _name, locationName: _locationName, dateTimeIso: _dateTimeIso } = TEMPLATE_CONTENT;
const EVENT_CALENDAR_URL = _event.calendarUrl ||
    `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Birthday: ${_name}`)}&dates=${_dateTimeIso}&details=${encodeURIComponent(String(TEMPLATE_CONTENT.quote))}&location=${encodeURIComponent(_locationName)}`;
const EVENT_MAP_URL = _event.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(_locationName)}`;

export const EventSection = () => {
    const { event, locationName, locationAddress } = TEMPLATE_CONTENT;

    return (
        <SectionWrapper title={event.sectionTitle} subtitle={event.sectionSubtitle} id="event">
            <motion.div variants={elegantStagger} className="space-y-8 sm:space-y-12">
                <motion.div variants={elegantFadeIn} whileHover={{ y: -5, transition: { duration: 0.4, ease: "easeOut" } }} className="flex flex-col items-center text-center p-8 sm:p-10 border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-shadow duration-500 rounded-sm">
                    <span className="uppercase tracking-[0.2em] text-xs text-gray-400 mb-6">{event.countdownLabel}</span>
                    <CountdownTimer />
                </motion.div>

                <motion.div variants={elegantStagger} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    <EventCard icon={Clock} title={event.timeTitle} desc={event.timeDetail} actionText={event.addToCalendar} actionIcon={CalendarPlus} href={EVENT_CALENDAR_URL} />
                    <EventCard icon={MapPin} title={locationName} desc={locationAddress} actionText={event.mapButton} onAction={() => window.open(EVENT_MAP_URL, '_blank')} />
                </motion.div>
            </motion.div>
        </SectionWrapper>
    );
};
