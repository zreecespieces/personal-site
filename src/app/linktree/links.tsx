import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import PaletteIcon from '@mui/icons-material/Palette';
import DescriptionIcon from '@mui/icons-material/Description';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { LinkItemProps } from './page';

export const links: LinkItemProps[] = [
    {
      icon: <GitHubIcon />,
      title: 'GitHub',
      url: 'https://github.com/zreecespieces',
    },
    {
      icon: <SchoolIcon />,
      title: 'Courses',
      url: 'https://www.udemy.com/user/zacharyreece/',
    },
    {
      icon: <LanguageIcon />,
      title: 'Projects',
      subtitle: "Coming soon",
      url: '',
    },
    {
      icon: <SportsKabaddiIcon />,
      title: 'BJJ & Judo',
      url: 'https://smoothcomp.com/en/profile/979762',
    },
    {
      icon: <HistoryEduIcon />,
      title: 'Blog',
      subtitle: "Coming soon",
      url: '',
    },
    {
      icon: <PaletteIcon />,
      title: 'AI Art',
      url: '/art',
    },
    {
      icon: <DescriptionIcon />,
      title: 'Resume',
      subtitle: 'Last updated: March 2025',
      url: '/resume.pdf',
    },
];

export const contactInfo = [
  {
    icon: <InstagramIcon />,
    title: 'Instagram',
    url: 'https://www.instagram.com/zacharydreece/',
  },
  {
    icon: <LinkedInIcon />,
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/zachary-reece-b587811a8/',
  },
  {
    icon: <EmailIcon />,
    title: 'Contact Me',
    url: 'mailto:zachdreece@gmail.com',
  }
]