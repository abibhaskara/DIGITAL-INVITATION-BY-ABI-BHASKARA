import React from 'react';
import { TEMPLATE_CONTENT } from '../../config';

export const Footer = () => (
    <footer className="py-10 bg-white border-t border-gray-50 text-center relative z-10 pb-32">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-300 font-light hover:text-gray-500 transition-colors cursor-default">{TEMPLATE_CONTENT.footer.credit}</p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-300 font-light mt-1">&copy; COPYRIGHT {new Date().getFullYear()} ABI BHASKARA | ALL RIGHTS RESERVED.</p>
    </footer>
);
