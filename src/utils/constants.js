import { Heart, Calendar, Shirt, Image as ImageIcon, Mail } from 'lucide-react';
import { TEMPLATE_CONTENT } from '../config';

export const NAV_ITEMS = [
    { id: 'home', label: TEMPLATE_CONTENT.name.split(' ')[0], icon: Heart },
    { id: 'event', label: 'Event', icon: Calendar },
    { id: 'dresscode', label: 'Attire', icon: Shirt },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'wishes', label: 'Wishes', icon: Mail },
];
