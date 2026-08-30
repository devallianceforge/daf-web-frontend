export type PartnerTier = {
  name: string;
  perks: string[];
};

export type Partner = {
  id: string;
  name: string;
  url: string;
};

// Real partners get appended here as they sign on. The /partners page shows an
// empty state (and no logo wall) until this array is non-empty — per PRD §7.1.
export const PARTNERS: Partner[] = [];

export const PARTNER_TIERS: PartnerTier[] = [
  {
    name: 'Community Ally',
    perks: ['Logo on the partners page', 'Community event mentions', 'Quarterly impact recap']
  },
  {
    name: 'Launch Partner',
    perks: ['Everything in Ally', 'Logo on event pages', 'Booth / session slot at one event per season']
  },
  {
    name: 'Title Partner',
    perks: ['Everything in Launch', 'Title branding on a flagship event', 'Access to builder showcases for hiring']
  }
];