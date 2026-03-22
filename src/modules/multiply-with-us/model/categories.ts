export type MultiplyCategoryId = 'media-buyers' | 'businesses' | 'partners'

export type MultiplyCategory = {
  id: MultiplyCategoryId
  label: string
}

export type MultiplyCategoryContent = {
  lead: string
  highlight: string
}

const API_TITLE_TO_ID: Record<string, MultiplyCategoryId> = {
  for_media_buyers: 'media-buyers',
  for_businesses: 'businesses',
  for_partners: 'partners',
}

const ID_TO_LABEL: Record<MultiplyCategoryId, string> = {
  'media-buyers': 'For Media Buyers',
  businesses: 'For Businesses',
  partners: 'For Partners',
}

export function titleToCategoryId(title: string): MultiplyCategoryId | undefined {
  return API_TITLE_TO_ID[title]
}

export function labelForId(id: MultiplyCategoryId): string {
  return ID_TO_LABEL[id]
}

const CTA_LABEL_BY_ID: Record<MultiplyCategoryId, string> = {
  'media-buyers': 'Join the team',
  businesses: 'Launch now',
  partners: 'Partner up',
}

/** Текст основной кнопки в карточке (CubicButton сам делает uppercase) */
export function ctaLabelForId(id: MultiplyCategoryId): string {
  return CTA_LABEL_BY_ID[id]
}

/** Порядок и подписи по умолчанию, пока нет ответа API или при ошибке */
export const DEFAULT_CATEGORIES: MultiplyCategory[] = [
  { id: 'media-buyers', label: labelForId('media-buyers') },
  { id: 'businesses', label: labelForId('businesses') },
  { id: 'partners', label: labelForId('partners') },
]

/** Запасной текст, если запрос откис */
export const FALLBACK_CONTENT: Record<MultiplyCategoryId, MultiplyCategoryContent> = {
  'media-buyers': {
    lead: 'Got experience with sweepstakes and large ad budgets? Looking for a team where you can grow and scale without limits?',
    highlight:
      'Multiply your profits with MULTICPA — we provide the budget, all the tools and high profit shares',
  },
  businesses: {
    lead: 'Scaling offers and need reliable payouts, analytics, and a partner who speaks your language?',
    highlight:
      'MULTICPA connects you with vetted traffic and transparent reporting — grow revenue with a team that moves fast.',
  },
  partners: {
    lead: 'Building products or funnels and want a CPA network that protects your brand and margins?',
    highlight:
      'Partner with MULTICPA for co-marketing, dedicated support, and terms that reward long-term collaboration.',
  },
}
