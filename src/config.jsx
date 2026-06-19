import React from 'react';
import { META } from './meta';

/**
 * ────────────────────────────────────────────────────────────
 * [ TEMPLATE CONFIGURATION ]
 * ────────────────────────────────────────────────────────────
 */
export const TEMPLATE_CONTENT = {
    // Data Utama
    name: META.name,
    date: META.shortDate,
    dateTimeIso: "20260630T180000/20260630T210000",
    locationName: META.venue,
    locationAddress: "Jl. Raya Nusa Dua Selatan, Bali",
    quote: <>Seventeen years of elegance,<br />grace, and dreams.</>,
    musicUrl: "/music/background.mp3",

    // Landing Page
    landing: {
        supTitle: "The 17th Birthday of",
        specialFor: "Special Invitation For",
        defaultGuest: "Honored Guest",
        openButton: "Open Invitation",
        heroImage: "https://res.cloudinary.com/dnbgczi9b/video/upload/v1781837390/0616_1_1_shza72.webm"
    },

    // Section: Home
    home: {
        supTitle: "The Sweet Seventeen",
        saveDateLabel: "Save The Date",
        scrollLabel: "Scroll",
        heroImage: "https://res.cloudinary.com/dnbgczi9b/video/upload/v1781837390/0616_1_1_shza72.webm"
    },

    // Section: Event
    event: {
        sectionTitle: "The Celebration",
        sectionSubtitle: "Details",
        countdownLabel: "The Big Day In",
        timeTitle: "Saturday Evening",
        timeDetail: "Start at 18:00 WIB",
        addToCalendar: "Save to Calendar",
        mapButton: "View Map",
        mapUrl: "https://maps.app.goo.gl/X4ZzTJsHKGJopQV37",
        calendarUrl: ""
    },

    // Section: Dresscode
    attire: {
        sectionTitle: "Attire Guide",
        sectionSubtitle: "Dress Code",
        description: <>We kindly request you to dress in<br /><span className="font-serif text-2xl italic text-black">"{META.dressCode}"</span></>,
        noteTitle: "Note",
        noteDetail: "Formal Suits & Evening Gowns",
        colors: [
            { hex: '#000000', name: 'Midnight Black' },
            { hex: '#ffffff', name: 'Pure White' },
            { hex: '#808080', name: 'Classic Grey' },
            { hex: '#D4AF37', name: 'Champagne Gold' }
        ]
    },

    // Section: Gallery
    gallery: {
        sectionTitle: "Captured Moments",
        sectionSubtitle: "Gallery",
        images: [
            "https://res.cloudinary.com/dnbgczi9b/image/upload/v1781612982/Untitled-1_hxh93l.webp",
            "https://res.cloudinary.com/dnbgczi9b/image/upload/v1781613022/Untitled-2_lgo20w.webp",
            "https://res.cloudinary.com/dnbgczi9b/image/upload/v1781613081/Untitled-4_wb814c.webp",
            "https://res.cloudinary.com/dnbgczi9b/image/upload/v1781613036/Untitled-3_dvx1p8.webp",
            "https://res.cloudinary.com/dnbgczi9b/image/upload/v1781613156/Untitled-5_udlz8f.webp",
            "https://res.cloudinary.com/dnbgczi9b/image/upload/v1781613164/Untitled-6_ygcotf.webp",
        ]
    },

    // Section: Wishes
    wishes: {
        sectionTitle: "Warm Wishes",
        sectionSubtitle: "From Friends & Family",
        formTitle: "Send your blessings",
        placeholderName: "Your Name",
        placeholderMsg: "Write a warm wish...",
        submitButton: "Send Message"
    },

    // Section: Thank You
    thankYou: {
        title: "Thank You",
        message: <>Your presence is the greatest gift of all.<br />We can't wait to share this beautiful evening with you.</>
    },

    // Footer
    footer: {
        credit: "Made with love by Me"
    }
};

// Theme Colors
export const THEME_COLORS = {
    primary: '#1a1a1a',
    secondary: '#f4f4f4',
    accent: '#D4AF37',
    glass: 'rgba(255, 255, 255, 0.90)',
    glassBorder: 'rgba(0, 0, 0, 0.05)',
};

// Global Styles
export const GlobalStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Montserrat:wght@200;300;400;500&display=swap');
        html { scroll-snap-type: y mandatory; }
        body { font-family: 'Montserrat', sans-serif; overflow-x: hidden; scroll-behavior: smooth; cursor: default; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
        h1, h2, h3, h4, .font-serif { font-family: 'Cormorant Garamond', serif; }
        section { scroll-snap-align: start; }
        ::-webkit-scrollbar { width: 0; background: transparent; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `}</style>
);
