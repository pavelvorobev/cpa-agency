export type SocialVariant = 'instagram' | 'telegram' | 'linkedin'

export interface SocialItem {
  url: string
  icon: string
}


export const SOCIALS: Readonly<Record<SocialVariant, SocialItem>> = Object.freeze({
  instagram: {
    url: 'https://instagram.com/',
    icon: 'instagram'
  },
  telegram: {
    url: 'https://web.telegram.org/',
    icon: 'telegram'
  },
  linkedin: {
    url: 'https://www.linkedin.com/',
    icon: 'linkedin'
  },
})