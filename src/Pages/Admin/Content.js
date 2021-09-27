import { HashRouter, Route, Switch } from 'react-router-dom'

import Dashboard from '../../Components/Dashboard'
import HomePageRoutes from '../../Components/HomePageConfig'
import AttributesGrouping from '../../Components/AttributesGrouping'
import Templating from '../../Components/Templating'
import Categories from '../../Components/Categories'
import Business from '../../Components/BusinessEnquiry'
import Ingestion from '../../Components/Ingestion'
import Personalization from '../../Components/Personalization'
import PromotionPage from '../../Components/Promotions'
import CouponPage from '../../Components/CouponPage'
import BankOffers from '../../Components/BankOffers'
import Insurance from '../../Components/Insurance'
import PriceMatchCoupon from '../../Components/PriceMatchCoupon'
import FAQ from '../../Components/FAQ'
import SearchFilter from '../../Components/SearchFilter'
import MenuSetup from '../../Components/MenuSetup'
import SearchDB from './../../Components/SearchDB/index'
import Banners from '../../Components/Banners'
import Advertise from '../../Components/Advertise'
import Help from '../../Components/Help'
import CustomerHelp from '../../Components/CustomerHelp'
import NotificationScheduler from '../../Components/NotificationScheduler'
import DolphinsBot from '../../Components/Chatbot'
import Returns from '../../Components/Screens/Returns'
import ReturnPolicy from '../../Components/Screens/ReturnPolicy'
import ShippingPolicy from '../../Components/Screens/ShippingPolicy'
// import WhatsappChat from "../../Components/Whatsapp";

const Content = () => {
	return (
		<div>
			<HashRouter>
				<Switch>
					<Route exact path='/' component={Dashboard} />
					<Route path='/hpconfig' component={HomePageRoutes} />
					<Route path='/banners' component={Banners} />
					<Route path='/advertise' component={Advertise} />
					<Route
						exact
						path='/attributesGrouping'
						component={AttributesGrouping}
					/>
					<Route path='/templating' component={Templating} />
					<Route path='/searchdb' component={SearchDB} />
					<Route exact path='/categories' component={Categories} />
					<Route exact path='/businessEnquiry' component={Business} />
					<Route exact path='/faq' component={FAQ} />
					<Route path='/ingestion' component={Ingestion} />
					<Route path='/personalization' component={Personalization} />
					<Route path='/CoupensDashboard' component={CouponPage} />
					<Route path='/BankOffersDashboard' component={BankOffers} />
					<Route path='/InsuranceDashboard' component={Insurance} />
					<Route path='/pmcoupon' component={PriceMatchCoupon} />
					<Route path='/promotions' component={PromotionPage} />
					<Route path='/help' component={Help} />
					<Route path='/customer-help' component={CustomerHelp} />
					<Route
						path='/notificationScheduler'
						component={NotificationScheduler}
					/>
					<Route path='/returns-refunds' component={Returns} />
					<Route path='/return-policy' component={ReturnPolicy} />
					<Route path='/shipping-policy' component={ShippingPolicy} />
					{/* <Route path="/whatsapp-chat" component={WhatsappChat} /> */}

					<Route path='/searchFilters' component={SearchFilter} />
					<Route path='/menuSetup' component={MenuSetup} />
					<Route path='/chatbot-configurations' component={DolphinsBot} />
				</Switch>
			</HashRouter>
		</div>
	)
}
export default Content
