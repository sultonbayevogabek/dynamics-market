import { NavigationLink } from '@shared/interfaces/navigation-link';

export const navigation: NavigationLink[] = [
  /*{
    label: 'Home', url: '/', menu: {
      type: 'menu',
      items: [
        { label: 'Home 1', url: '/' },
        { label: 'Home 2', url: '/home-two' },
        { label: 'Offcanvas Cart', url: '/offcanvas-cart' }
      ]
    }
  },
  {
    label: 'Megamenu', url: '/products/catalog', menu: {
      type: 'megamenu',
      size: 'nl',
      columns: [
        {
          size: 6, items: [
            {
              label: 'Power Tools', url: '/products/catalog', items: [
                { label: 'Engravers', url: '/products/catalog' },
                { label: 'Wrenches', url: '/products/catalog' },
                { label: 'Wall Chaser', url: '/products/catalog' },
                { label: 'Pneumatic Tools', url: '/products/catalog' }
              ]
            },
            {
              label: 'Machine Tools', url: '/products/catalog', items: [
                { label: 'Thread Cutting', url: '/products/catalog' },
                { label: 'Chip Blowers', url: '/products/catalog' },
                { label: 'Sharpening Machines', url: '/products/catalog' },
                { label: 'Pipe Cutters', url: '/products/catalog' },
                { label: 'Slotting machines', url: '/products/catalog' },
                { label: 'Lathes', url: '/products/catalog' }
              ]
            }
          ]
        },
        {
          size: 6, items: [
            {
              label: 'Hand Tools', url: '/products/catalog', items: [
                { label: 'Screwdrivers', url: '/products/catalog' },
                { label: 'Handsaws', url: '/products/catalog' },
                { label: 'Knives', url: '/products/catalog' },
                { label: 'Axes', url: '/products/catalog' },
                { label: 'Multitools', url: '/products/catalog' },
                { label: 'Paint Tools', url: '/products/catalog' }
              ]
            },
            {
              label: 'Garden Equipment', url: '/products/catalog', items: [
                { label: 'Motor Pumps', url: '/products/catalog' },
                { label: 'Chainsaws', url: '/products/catalog' },
                { label: 'Electric Saws', url: '/products/catalog' },
                { label: 'Brush Cutters', url: '/products/catalog' }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    label: 'Shop', url: '/products/catalog/power-tools', menu: {
      type: 'menu',
      items: [
        {
          label: 'Shop Grid', url: '/products/catalog/power-tools', items: [
            { label: '3 Columns Sidebar', url: '/products/catalog/power-tools' },
            { label: '4 Columns Full', url: '/products/category-grid-4-columns-full' },
            { label: '5 Columns Full', url: '/products/category-grid-5-columns-full' }
          ]
        },
        { label: 'Shop List', url: '/products/category-list' },
        { label: 'Shop Right Sidebar', url: '/products/category-right-sidebar' },
        {
          label: 'Product', url: '/products/product-standard', items: [
            { label: 'Product', url: '/products/product-standard' },
            { label: 'Product Alt', url: '/products/product-columnar' },
            { label: 'Product Sidebar', url: '/products/product-sidebar' }
          ]
        },
        { label: 'Cart', url: '/products/cart' },
        { label: 'Checkout', url: '/products/cart/checkout' },
        { label: 'Order Success', url: '/products/cart/checkout/success' },
        { label: 'Wishlist', url: '/products/wishlist' },
        { label: 'Compare', url: '/products/compare' },
        { label: 'Track Order', url: '/products/track-order' }
      ]
    }
  },
  {
    label: 'Account', url: '/account', menu: {
      type: 'menu',
      items: [
        { label: 'Login', url: '/account/login' },
        { label: 'Dashboard', url: '/account/dashboard' },
        { label: 'Edit Profile', url: '/account/profile' },
        { label: 'Order History', url: '/account/orders' },
        { label: 'Order Details', url: '/account/orders/5' },
        { label: 'Address Book', url: '/account/addresses' },
        { label: 'Edit Address', url: '/account/addresses/5' },
        { label: 'Change Password', url: '/account/password' }
      ]
    }
  },
  {
    label: 'Blog', url: '/blog', menu: {
      type: 'menu',
      items: [
        { label: 'Blog Classic', url: '/blog/category-classic' },
        { label: 'Blog Grid', url: '/blog/category-grid' },
        { label: 'Blog List', url: '/blog/category-list' },
        { label: 'Blog Left Sidebar', url: '/blog/category-left-sidebar' },
        { label: 'Post Page', url: '/blog/post-classic' },
        { label: 'Post Without Sidebar', url: '/blog/post-full' }
      ]
    }
  },
  {
    label: 'Pages', url: '/site', menu: {
      type: 'menu',
      items: [
        { label: 'About Us', url: '/site/about-us' },
        { label: 'Contact Us', url: '/site/contact-us' },
        { label: 'Contact Us Alt', url: '/site/contact-us-alt' },
        { label: '404', url: '/site/not-found' },
        { label: 'Terms And Conditions', url: '/site/terms' },
        { label: 'FAQ', url: '/site/faq' },
        { label: 'Components', url: '/site/components' },
        { label: 'Typography', url: '/site/typography' }
      ]
    }
  },*/
  {
    label: 'homepage',
    url: '/',
    external: false
  },
  {
    label: 'about.us',
    url: '/about-us',
    external: false
  },
  {
    label: 'news',
    url: '/news',
    external: false
  },
  {
    label: 'contacts',
    url: '/contact-us',
    external: false
  },
  {
    label: 'privacy.policy',
    url: '/terms',
    external: false
  },
  {
    label: 'faq',
    url: '/faq',
    external: false
  }
];
