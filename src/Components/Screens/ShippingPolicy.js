import React from 'react'
import './shipping-policy.css'

const ShippingPolicy = () => {
	return (
		<div className='shipping-policy-container'>
			<h1>Shipping Policy</h1>
			<div>
				<p>
					Biba.in utilizes the services of reputed courier service providers for
					offering shipping in India
				</p>
				<p>
					Biba.in offers free shipping within India on all products offered. We
					pay for shipping, octroi and other taxes. You only pay the value of
					the ordered product
				</p>
				<p>
					We strive to ensure timely delivery of Domestic orders within India in
					48 hours* to most of the cities
				</p>
				<p>International Shipping is also available on Biba.in</p>
			</div>
			<div>
				<h3>Processing Your Order</h3>
				<p>
					We try our best to ship goods to you as soon as possible. On an
					average, it takes us about 24 hours to ship goods out of our
					warehouses across India. However if the quantities ordered are more
					than 5 pieces per product per style, it may take longer to process
					your order. Should this happen, we will keep you informed by email.
				</p>
				<p>
					To calculate how much time it will take you to receive your Biba
					merchandize, please check delivery time for your pin code using “CHECK
					DELIVERY” option in the product details page.
				</p>
				<p>
					Usually for most of the locations we offer 48 hour delivery*. Add the
					shipping times to the 24 hour order processing period. Items are only
					delivered on business days. Apart from Sundays, there are certain
					holidays throughout the year that are not considered as business days.
					Deliveries will not happen on these days.
				</p>
			</div>
			<div className='table-body'>
				<h3>Delivery Methods, Times And Cost</h3>
				<div>
					<span className='dialog-title'>
						Orders of below mentioned cities are usually delivered in 48 hours*
					</span>
					<div className='scrollTable'>
						<table
							cellpadding='0'
							cellspacing='0'
							className='table-cities'
							width='100%'
						>
							<tbody>
								<tr>
									<td>Delhi</td>
									<td>Noida</td>
								</tr>
								<tr>
									<td>Mumbai</td>
									<td>Kaithal</td>
								</tr>
								<tr>
									<td>Hyderabad</td>
									<td>Rohtak</td>
								</tr>
								<tr>
									<td>Bangalore</td>
									<td>Jhajjar</td>
								</tr>
								<tr>
									<td>Kolkata</td>
									<td>Karnal</td>
								</tr>
								<tr>
									<td>Ahmedabad</td>
									<td>Panipat</td>
								</tr>
								<tr>
									<td>Chennai</td>
									<td>Bhiwani</td>
								</tr>
								<tr>
									<td>Pune</td>
									<td>Muzaffarnagar</td>
								</tr>
								<tr>
									<td>Gurgaon</td>
									<td>Rishikesh</td>
								</tr>
								<tr>
									<td>Jaipur</td>
									<td>Roorkee</td>
								</tr>
								<tr>
									<td>Ludhiana</td>
									<td>Baraut</td>
								</tr>
								<tr>
									<td>Dehradun</td>
									<td>Haridwar</td>
								</tr>
								<tr>
									<td>Meerut</td>
									<td>Saharanpur</td>
								</tr>
								<tr>
									<td>Ghaziabad</td>
									<td>Jind</td>
								</tr>
								<tr>
									<td>Mathura</td>
									<td>Bahadurgarh</td>
								</tr>
								<tr>
									<td>Aligarh</td>
									<td>Neemrana</td>
								</tr>
								<tr>
									<td>Faridabad</td>
									<td>Modinagar</td>
								</tr>
								<tr>
									<td>Hathras</td>
									<td>Narnaul</td>
								</tr>
								<tr>
									<td>Agra</td>
									<td>Bhiwadi</td>
								</tr>
								<tr>
									<td>Sonipat</td>
									<td>Gautam Budhnagar</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div>
				<h3>Customs And International Shipping</h3>
				<p>
					All of Biba orders are shipped internationally from our warehouses
					across India to your provided shipping address via FEDEX. Due to the
					nature of international shipping, occasionally a customer may have to
					pay additional import duties and taxes which are levied once a
					shipment reaches your country. The large majority of orders will not
					have to pay any additional fees. However, we are unable to calculate
					when and how much these infrequent customs duty charges will be
					levied. In the case where additional customs charges are assessed, you
					will be responsible for paying these additional fees. To make your
					shopping experience as seamless as possible, we have arranged with
					FEDEX to customs clear your goods for you and deliver them to your
					doorstep. If you are presented with an invoice from FEDEX for import
					duties and taxes, you will have to pay FEDEX directly at the time of
					delivery.
				</p>
				<p>
					In case of customer refuses to pay the custom duty or any additional
					import duties, then customer would be liable to bear the shipping
					charges and amount would be refund after deducting the shipping
					charges for the particular shipment.
				</p>
				<p>
					For more information about shipping and delivery, please see our
					Shipping FAQs.
				</p>
			</div>
			<div className='body-footer p-pt-6'>
				<div className='body-footer-center p-grid p-jc-evenly'>
					<div className='p-grid'>
						<img src='https://storage.sg.content-cdn.io/in-resources/6c57599f-2c43-4c82-806a-e07c3410f5d3/Images/userimages/group-31.svg' />
						<span>
							<label>
								Free <br />
								Shipping
							</label>
						</span>
					</div>
					<div className='p-grid'>
						<img src='https://storage.sg.content-cdn.io/in-resources/6c57599f-2c43-4c82-806a-e07c3410f5d3/Images/userimages/wallet.svg' />
						<span>
							<label>
								Secure
								<br />
								Payment
							</label>
						</span>
					</div>
					<div className='p-grid'>
						<img src='https://storage.sg.content-cdn.io/in-resources/6c57599f-2c43-4c82-806a-e07c3410f5d3/Images/userimages/return.svg' />
						<span>
							<label>
								Easy
								<br />
								Returns
							</label>
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ShippingPolicy
