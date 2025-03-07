import { Link } from "react-router-dom";
import { Text } from "../atoms/Text";
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react";
import { FooterTexts } from "../particles/Data";
import { List } from "../atoms/List";
import { useCallback } from "react";
import logoGym from '../../assets/Logogym.png';

const Footer = () => {

    const renderIcon = useCallback((element: number) => {
        switch (element) {
            case 0:
                return <MapPin size={20} color="currentColor" />;
            case 1:
                return <EnvelopeSimple size={20} color="currentColor" />;
            case 2:
                return <Phone size={20} color="currentColor" />;
            default:
                return null;
        }
    }, []);

    return (
        <footer className="w-full bg-zinc-900 flex flex-col border-t border-zinc-700">
            <main className="w-full lg:pt-20 lg:pb-12 pt-16 pb-12 px-6 grid md:grid-cols-3 lg:gap-12 md:gap-8 gap-8 lg:px-32">
                {/* Logo y descripción */}
                <div className="flex flex-col gap-4 items-center">
                    <Link to={`/`} className="font-extrabold flex items-center justify-center relative">
                        <img 
                            src={logoGym} 
                            alt="Logo Gym" 
                            className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg rounded-full w-28 h-28" 
                        />
                    </Link>
                    <Text as="p" className="text-zinc-400 text-center text-sm leading-relaxed max-w-xs">
                        {FooterTexts.underLogoText}
                    </Text>
                </div>

                {/* Horarios */}
                <div className="flex flex-col items-center gap-6">
                    <Text as="h1" className="text-2xl font-bold text-[#7a0707] relative inline-block">
                        Horarios
                        <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-gradient-to-r from-[#690b0b] to-black transform translate-y-1"></span>
                    </Text>
                    <ul className="flex flex-col gap-3 text-zinc-300 text-center">
                        <li className="text-md">Lunes a Viernes: 7:00 AM - 11:00 PM</li>
                        <li className="text-md">Sábados: 10:00 AM - 2:00 PM</li>
                    </ul>
                </div>

                {/* Contactos rápidos */}
                <div className="flex flex-col items-center gap-6">
                    <Text as="h1" className="text-2xl font-bold text-[#7a0707] relative inline-block">
                        {FooterTexts.contacts.caption}
                        <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-gradient-to-r from-[#690b0b] to-black transform translate-y-1"></span>
                    </Text>
                    <ul className="flex flex-col gap-4">
                        {
                            FooterTexts.contacts.names.map((name, index) => (
                                <List className="text-zinc-400 flex items-center gap-3" key={index}>
                                    <Text as="span" className="text-[#a81a1a]">
                                        {renderIcon(index)}
                                    </Text>
                                    <Text as="span" className="text-sm">{name.name}</Text>
                                </List>
                            ))
                        }
                    </ul>
                </div>
            </main>
            {/* Copyright */}
            <div className="text-center py-4 bg-gradient-to-r from-[#690b0b] to-black">
                <Text as="p" className="text-zinc-100 text-sm font-medium">
                    {FooterTexts.copyright}
                </Text>
            </div>
        </footer>
    );
}

export default Footer;