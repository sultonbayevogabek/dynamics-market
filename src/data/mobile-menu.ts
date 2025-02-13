import { MobileMenuItem } from '../app/shared/interfaces/mobile-menu-item';

export const mobileMenu: MobileMenuItem[] = [
  {
    type: 'link', label: 'homepage', url: '/'
  },
  {
    type: 'link', label: 'Categories', url: '/shop/catalog', children: [
      {
        type: 'link', label: 'Power Tools', url: '/shop/catalog', children: [
          { type: 'link', label: 'Engravers', url: '/shop/catalog' },
          { type: 'link', label: 'Wrenches', url: '/shop/catalog' },
          { type: 'link', label: 'Wall Chaser', url: '/shop/catalog' },
          { type: 'link', label: 'Pneumatic Tools', url: '/shop/catalog' }
        ]
      },
      {
        type: 'link', label: 'Machine Tools', url: '/shop/catalog', children: [
          { type: 'link', label: 'Thread Cutting', url: '/shop/catalog' },
          { type: 'link', label: 'Chip Blowers', url: '/shop/catalog' },
          { type: 'link', label: 'Sharpening Machines', url: '/shop/catalog' },
          { type: 'link', label: 'Pipe Cutters', url: '/shop/catalog' },
          { type: 'link', label: 'Slotting machines', url: '/shop/catalog' },
          { type: 'link', label: 'Lathes', url: '/shop/catalog' }
        ]
      }
    ]
  },

  {
    type: 'link', label: 'about.us', url: '/about-us'
  },
  {
    type: 'link', label: 'news', url: '/news'
  },

  {
    type: 'link', label: 'contacts', url: '/contact-us'
  },
  {
    type: 'link', label: 'privacy.policy', url: '/terms'
  },

  {
    type: 'link', label: 'faq', url: '/faq'
  },

  {
    type: 'button', label: 'language', children: [
      { type: 'button', label: 'O\'zbek', data: { language: 'uz' } },
      { type: 'button', label: 'Русский', data: { language: 'ru' } },
      { type: 'button', label: 'English', data: { language: 'en' } },
    ]
  }
];
