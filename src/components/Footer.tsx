import Link from 'next/link';
import Image from 'next/image';
import { CHANNELS } from '@/data/channels';
import { SITE } from '@/data/site';
import { ChannelIcon } from './icons';

export function Footer() {
  return (
    <footer className="relative z-[2] border-t border-border px-6 pb-8 pt-[72px]">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-14 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Dev Alliance Forge"
                width={1048}
                height={130}
                sizes="225px"
                className="h-7 w-auto"
              />
            </Link>
            <p className="mb-5 mt-4 max-w-[280px] text-[13.5px] text-text-muted">{SITE.description}</p>
            <div className="flex flex-wrap gap-2.5">
              {CHANNELS.map((c) => (
                <a
                  key={c.name}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={c.name}
                  className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-border text-text-muted transition-colors duration-300 ease-daf hover:border-mint hover:bg-mint/[0.08] hover:text-mint"
                >
                  <ChannelIcon icon={c.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="mb-4 font-mono text-xs uppercase tracking-wider text-text-dim">Navigate</h5>
            <div className="flex flex-col gap-3 text-[13.5px] text-text-muted">
              <Link href="/about" className="hover:text-mint">About</Link>
              <Link href="/events" className="hover:text-mint">Events</Link>
              <Link href="/workshops" className="hover:text-mint">Workshops</Link>
              <Link href="/community" className="hover:text-mint">Community</Link>
            </div>
          </div>

          <div>
            <h5 className="mb-4 font-mono text-xs uppercase tracking-wider text-text-dim">Connect</h5>
            <div className="flex flex-col gap-3 text-[13.5px] text-text-muted">
              <a href={`mailto:${SITE.email}`} className="hover:text-mint">Email Us</a>
              <a href="https://discord.gg/uje6kkBkkg" target="_blank" rel="noopener noreferrer" className="hover:text-mint">Discord</a>
              <a href="https://t.me/devallianceforge__" target="_blank" rel="noopener noreferrer" className="hover:text-mint">Telegram</a>
              <a href="https://chat.whatsapp.com/Ez8UW8h7vVw8j0OH1g2OQp" target="_blank" rel="noopener noreferrer" className="hover:text-mint">WhatsApp</a>
            </div>
          </div>

          <div>
            <h5 className="mb-4 font-mono text-xs uppercase tracking-wider text-text-dim">Legal</h5>
            <div className="flex flex-col gap-3 text-[13.5px] text-text-muted">
              <Link href="/legal/privacy" className="hover:text-mint">Privacy Policy</Link>
              <Link href="/legal/terms" className="hover:text-mint">Terms of Use</Link>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-7 font-mono text-[12.5px] text-text-dim">
          <span>&copy; {new Date().getFullYear()} Dev Alliance Forge. All rights reserved.</span>
          <span>Built for builders, in the dark.</span>
        </div>
      </div>
    </footer>
  );
}
