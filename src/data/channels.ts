export type Channel = {
  name: string;
  url: string;
  icon: 'facebook' | 'linkedin' | 'instagram' | 'x' | 'github' | 'whatsapp' | 'telegram' | 'discord';
  blurb: string;
};

export const CHANNELS: Channel[] = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/devallianceforge',
    icon: 'facebook',
    blurb: 'Follow & join the conversation'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/dev-alliance-forge',
    icon: 'linkedin',
    blurb: 'Follow & join the conversation'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/devallianceforge',
    icon: 'instagram',
    blurb: 'Follow & join the conversation'
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/devallianceforg',
    icon: 'x',
    blurb: 'Follow & join the conversation'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/devallianceforge',
    icon: 'github',
    blurb: 'Contribute to open-source projects'
  },
  {
    name: 'WhatsApp',
    url: 'https://chat.whatsapp.com/Ez8UW8h7vVw8j0OH1g2OQp',
    icon: 'whatsapp',
    blurb: 'Chat with the community'
  },
  {
    name: 'Telegram',
    url: 'https://t.me/devallianceforge__',
    icon: 'telegram',
    blurb: 'Announcements & discussion'
  },
  {
    name: 'Discord',
    url: 'https://discord.gg/uje6kkBkkg',
    icon: 'discord',
    blurb: 'The main community hub'
  }
];
