import { CONTACT_LINKS } from '@/lib/contact';

export function Footer() {
  return (
    <footer className="mt-8 border-t border-gray-200 py-8">
      <nav className="flex gap-6" aria-label="Footer links">
        {CONTACT_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
            {...(link.href.startsWith('http') && {
              target: '_blank',
              rel: 'noopener noreferrer',
            })}
          >
            <link.icon size={14} />
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
