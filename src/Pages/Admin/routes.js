export const routes = [
	{
		name: 'General',
		subMenu: [
			{
				name: 'Dashboard',
				link: '/',
				icon: 'fa fa-th-large',
			},
		],
	},
	{
		name: 'Customer Portal',
		subMenu: [
			{
				name: 'HomePage Config',
				link: '/hpconfig',
				icon: 'fa fa-home',
			},
			{
				name: 'Banners',
				link: '/banners',
				icon: 'fa fa-images',
			},
			{
				name: 'Advertise',
				link: '/advertise',
				icon: 'fab fa-adversal',
			},
		],
	},
	{
		name: 'Attributes',
		subMenu: [
			{
				name: 'Attribute Groups',
				link: '/attributesGrouping',
				icon: 'fa fa-object-group',
			},
		],
	},
	{
		name: 'Search DB',
		subMenu: [
			{
				name: 'SearchDB',
				link: '/searchDB',
				icon: 'fa fa-search',
			},
		],
	},
	{
		name: 'Tempalting',
		subMenu: [
			{
				name: 'Email Tempalte',
				link: '/templating/emailTemplate',
				icon: 'fa fa-envelope',
			},
			{
				name: 'UI Tempalte',
				link: '/templating/uiTemplate',
				icon: 'fab fa-uikit',
			},
			{
				name: 'Footer Tempalte',
				link: '/templating/footerTemplate',
				icon: 'fab fa-trello',
			},
		],
	},
	{
		name: 'Notification scheduler',
		subMenu: [
			{
				name: 'Notification scheduler details',
				link: '/notificationScheduler/notification-scheduler-details',
				icon: 'fa fa-bell',
			},
		],
	},
	{
		name: 'Category/Subcategory',
		subMenu: [
			{
				name: 'Category/Subcategory',
				link: '/categories',
				icon: 'fa fa-home',
			},
			{
				name: 'Business Enquiries',
				link: '/businessEnquiry',
				icon: 'fa fa-suitcase',
			},
		],
	},
	{
		name: 'Ingestion',
		subMenu: [
			{
				name: 'Ingestion Pool',
				link: '/ingestion/ingestionPool',
				icon: 'fa fa-home',
			},

			{
				name: 'Ingestion Config',
				link: '/ingestion/ingestionConfig',
				icon: 'fa fa-home',
			},
			{
				name: 'Product Ingestion',
				link: '/ingestion/productIngestion',
				icon: 'fa fa-product-hunt',
			},
			{
				name: 'DVN Ingestion',
				link: '/ingestion/dvnIngestion',
				icon: 'fa fa-home',
			},
			{
				name: 'SKU Ingestion',
				link: '/ingestion/skuIngestion',
				icon: 'fa fa-home',
			},
			{
				name: 'Product Lang Config',
				link: '/ingestion/productLanguageConfiguration',
				icon: 'fa fa-language',
			},
			{
				name: 'DVN Lang Config',
				link: '/ingestion/dvnLanguageConfiguration',
				icon: 'fa fa-language',
			},
		],
	},
	{
		name: 'Personalization',
		subMenu: [
			{
				name: 'Personalization Configuration',
				link: '/personalization/personalizationConfiguration',
				icon: 'fa fa-home',
			},
		],
	},
	{
		name: 'Search',
		subMenu: [
			{
				name: 'Menu Setup',
				link: '/menuSetup',
				icon: 'fa fa-bars',
			},
			{
				name: 'Search Filters',
				link: '/searchFilters',
				icon: 'fa fa-search',
			},
		],
	},
	{
		name: 'Discounts',
		subMenu: [
			{
				name: 'Promotions',
				link: '/promotions',
				icon: 'fa fa-percent',
			},
			{
				name: 'Bank Offers',
				link: '/BankOffersDashboard',
				icon: 'fa fa-university',
			},
			{
				name: 'Insurance',
				link: '/InsuranceDashboard',
				icon: '',
			},
			{
				name: 'Coupons',
				link: '/CoupensDashboard',
				icon: 'fa fa-tags',
			},
		],
	},
	{
		name: 'FAQ',
		subMenu: [
			{
				name: 'FAQ',
				link: '/faq',
				icon: 'fa fa-question',
			},
		],
	},
	{
		name: 'Customer Care',
		subMenu: [
			{
				name: 'Price Match Coupon',
				link: '/pmcoupon',
				icon: 'fa fa-home',
			},
			{
				name: 'Customer Care',
				link: '/CustomerCare',
				icon: 'fa fa-user',
			},
		],
	},
	{
		name: 'Help',
		subMenu: [
			{
				name: 'Help',
				link: '/help',
				icon: 'fa fa-hands-helping',
			},
			{
				name: 'Customer Help',
				link: '/customer-help',
				icon: 'fa fa-hands-helping',
			},
		],
	},
	{
		name: 'Chatbot',
		subMenu: [
			{
				name: 'Chatbot Configurations',
				link: '/chatbot-configurations',
				icon: 'fa fa-comments',
			},
		],
	},

	{
		name: 'Returns',
		subMenu: [
			{
				name: 'Returns & Refunds',
				link: '/returns-refunds',
				icon: '',
			},
			{
				name: 'Return and Cancellation Policy',
				link: '/return-policy',
				icon: '',
			},
			{
				name: 'Shipping Policy',
				link: '/shipping-policy',
				icon: '',
			},
			{
				name: 'Help center',
				link: '/help-center',
				icon: '',
			},
			{
				name: 'Policies',
				link: '/policies',
				icon: '',
			},
		],
	},
]

export default routes
