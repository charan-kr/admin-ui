import React from 'react'
import { Divider } from 'primereact/divider'
import './return-policy.css'

const ReturnPolicy = () => {
	return (
		<div className='return-policy-container'>
			<header>
				<h1>Return and Cancellation Policy</h1>
			</header>
			<body className='policy-body'>
				<div>
					<h2>Return Policy</h2>
					<p>
						Products can be returned within 15 days from the date of delivery.
						Payment Refunds are applicable only in case of damaged products or
						delivery of incorrect size (size other than that ordered). In all
						other cases, replacement or eVoucher (1 year validity) is available.
					</p>
					<p>
						Returns and Replacements are done free of cost if wrong products
						(incomplete sets or incorrect style), wrong sizes (size other than
						that ordered) or damaged products are received by the customer.
						However, the Company reserves the right to levy shipping charges on
						cases that come under legal scrutiny.
					</p>
					<p>Exchange is allowed with the same or different products</p>
					<p>
						<b>Return Intimation:</b> You can either call our Support Number
						011-41169005 or Email Us at customercare@bibaindia.com within 15
						days from date of delivery. The details of the return (Order number,
						courier docket No or AWB No, and Reason for Return) should be shared
						with the Customer Support by email.
					</p>
					<p>
						Guidelines for a valid return: <br /> Product & Accessories, if any,
						should be in original condition Tags should be retained and returned
					</p>
					<p>
						Returns and Replacements are done free of cost if wrong products
						(incomplete sets or incorrect style), wrong sizes (size other than
						that ordered) or damaged products are received by the customer.
					</p>
				</div>
				<div>
					<h2>Cancellation Policy</h2>
					<p>
						An easy cancellation process is available for all our esteemed
						customers. You can cancel your online order before the product has
						been shipped. Your entire order amount will be refunded.
					</p>
					<p>You can cancel an order in an easy step:</p>
					<p>
						call us on our support Number 011-41169005 email us on
						customercare@bibaindia.com
					</p>
					<p>
						Please note that the complete order needs to be canceled. We do not
						accept Partial order cancellation requests.
					</p>
				</div>
				<div>
					<h2>Refund Policy</h2>
					<p>
						Your refund will be initiated by us within 2 business days of
						receiving the refund request and authorization of the refund.
					</p>
					<p>
						Your refund is estimated to be credited in the account, used for
						order payment, between 4-8 days after initiating the refund. Please
						note that the timing of the actual account credit is dependent on
						multiple external agencies such as banks, payment gateways and
						external couriers (for cheques).
					</p>
					<h3>Mode of Refund</h3>
					<p>
						For both cancelled orders & returned products (due to incomplete
						sets, incorrect style, wrong sizes, or defective products
						delivered), the refund amount will be credited back into the same
						account (online banking, credit card, debit card) that was used to
						make the purchase. In case of Cash On Delivery (COD) orders, refund
						will be done through NEFT.
					</p>
					<p>
						<b>
							{' '}
							We require product images and tags in the below mentioned cases:
						</b>
						<ol>
							<li>Defective product received – Only product image required.</li>
							<li>
								Wrong product received – Both product & Tag images required.
							</li>
							<li>Wrong size received - Both product & Tag images required.</li>
							<li>
								Unhappy with colour, i.e. Faded/Blurred - Only product image
								required.
							</li>
							<li>
								Product different from website/doesn’t look the same - Only
								product image required.
							</li>
							<li>Incomplete order received – Only Tag image is required.</li>
						</ol>
					</p>
					<p>
						Your refund will be initiated by us within 2 business days of
						receiving the refund request and authorization of the refund.
					</p>
					<p>
						Your refund is estimated to be credited in the account, used for
						order payment, between 4-8 days after initiating the refund. Please
						note that the timing of the actual account credit is dependent on
						multiple external agencies such as banks, payment gateways and
						external couriers (for cheques).
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
			</body>
			<Divider />
		</div>
	)
}

export default ReturnPolicy
