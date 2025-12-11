import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
    const year = new Date().getFullYear();

    const quickLinks = [
        { Icon: FaYoutube, link: 'https://www.youtube.com/c/FloodControlDistrict' },
        { Icon: FaLinkedinIn, link: 'https://www.linkedin.com/company/milehighflooddistrict' },
        { Icon: TiSocialInstagram, link: 'https://www.instagram.com/milehighflooddistrict' },
        { Icon: FaFacebookF, link: 'https://www.facebook.com/MileHighFloodDistrict' },
        { Icon: FaXTwitter, link: 'https://x.com/MHFloodDistrict' },
    ]

    
    return (
        <footer className="bg-mhfd-dark-blue text-white p-3 sm:p-4 flex items-center justify-center">
            <div className="flex flex-col md:flex-row w-full max-w-6xl">
                <div className="md:w-1/3 mb-4 md:mb-0">
                    <div className="flex space-x-2 p-2">
                        {quickLinks.map(({ Icon, link }) => (
                            <a key={link} href={link} target="_blank" rel="noopener noreferrer" className="text-mhfd-dark-blue bg-white p-1 rounded-full">
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>
                <div className="md:w-1/3 mb-4 md:mb-0 flex flex-col justify-center">
                        <p className="text-xs sm:text-sm">© {year} Mile High Flood District</p>
                </div>
                <div className="md:w-1/3 flex flex-col justify-center">
                    <p className="text-xs sm:text-sm">Privacy Policy</p>
                    <p className="text-xs sm:text-sm">Accessibility Statement</p>
                </div>
            </div>
        </footer>
    )
}