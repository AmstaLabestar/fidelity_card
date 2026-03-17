import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Hero from '@/src/components/landing/Hero';

// Mock next-intl translations
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => `translated_${key}`,
}));

// Mock custom next-intl Link
vi.mock('@/src/i18n/navigation', () => ({
  Link: ({ children, href, className }: any) => (
    <a href={href} className={className} data-testid="mocked-link">
      {children}
    </a>
  ),
}));

describe('Hero Component', () => {
  it('renders translations correctly', () => {
    render(<Hero />);
    
    // Check if basic elements with translation keys are rendered
    expect(screen.getByText('translated_badge')).toBeInTheDocument();
    expect(screen.getByText('translated_title')).toBeInTheDocument();
    expect(screen.getByText('translated_subtitle')).toBeInTheDocument();
    
    // Check CTA links
    const primaryCta = screen.getAllByText('translated_primaryCta');
    expect(primaryCta.length).toBeGreaterThan(0);
    
    const secondaryCta = screen.getByText('translated_secondaryCta');
    expect(secondaryCta).toBeInTheDocument();
    expect(secondaryCta.closest('a')).toHaveAttribute('href', '#how-it-works');
  });

  it('contains the preorder link', () => {
    render(<Hero />);
    
    const links = screen.getAllByTestId('mocked-link');
    const preorderLink = links.find(link => link.getAttribute('href') === '/register?intent=preorder');
    
    expect(preorderLink).toBeInTheDocument();
  });

  it('renders decorative elements', () => {
    const { container } = render(<Hero />);
    // Check if the card decorative structural elements are rendered
    const staticCardText = screen.getByText('SMARTCARD');
    expect(staticCardText).toBeInTheDocument();
  });
});
