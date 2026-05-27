import type { IconType } from 'react-icons';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

interface ContactLink {
  label: string;
  href: string;
  icon: IconType;
}

export const CONTACT_LINKS: ContactLink[] = [
  { label: 'ippnsj@gmail.com', href: 'mailto:ippnsj@gmail.com', icon: FiMail },
  { label: 'GitHub', href: 'https://github.com/ippnsj', icon: FiGithub },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/gloria-sojung-lee-52201713b',
    icon: FiLinkedin,
  },
];
