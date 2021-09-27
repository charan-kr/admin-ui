import React from 'react'
import { Divider } from 'primereact/divider'
import { Panel } from 'primereact/panel'
import noImage from '../../static/media/images/no_image_available.jpg'
import './returns-refunds.css'

const Returns = () => {
    const faqTopics = [
        {
            ques: 'Can I return an item that I bought online to a club?',
            ans:
                "Most purchases made on SamsClub.com may be returned to any Sam's  Club location in the United States. If an item purchased online  cannot be returned to a Sam's Club location, it will be noted on                                the product page.Golf carts and vending machines are examples of                                items purchased online that cannot be returned to a local Sam's Club.",
        },
        {
            ques:
                'Can I use the online returns process for an item that I bought in a club?',
            ans:
                'Unfortunately, SamsClub.com is unable to process returns for purchases made in a club.',
        },
        {
            ques: 'How do I request a return through SamsClub.com?',
            ans:
                "To start a return through SamsClub.com, go to  under your account, then select Return Item. Print the return label, attach to package and send.Alternatively, you can call the Member Service Center at 1-888-746-7726, and we'll be ready to assist you. Please have your membership number and order number available.",
        },
        {
            ques: 'Will shipping and delivery charges be refunded?',
            ans:
                'Shipping and delivery charges will be refunded or credited only if the return is a result of an error by Sam’s Club or if the item was damaged during shipping.',
        },
        {
            ques: "What if I don't have a receipt?",
            ans:
                'We prefer your original receipt or printed order, but if that’s not available, we’ll do our best to process your return without it.',
        },
        {
            ques:
                'Do I need to return the packaging and everything that came with the product?',
            ans:
                'To obtain a full refund, you may be required to return the product with all product and order contents, including packaging (boxes, manuals, warranty cards, etc.), parts and accessories. This includes promotional gifts, gift cards or shopping cards provided with the purchase. There are some instances in which we may have to deny the refund in full or provide a partial refund if only part of the purchase is returned.',
        },
        {
            ques: 'How will I receive my refund?',
            ans:
                "For items returned to a Sam’s Club location, you’ll receive credit or cash in the original form of payment or a Sam’s Club shopping card unless prohibited or restricted by law or regulations.            For items returned through SamsClub.com, you'll receive credit to the account that was charged at the time of purchase.",
        },
        {
            ques: 'What is considered a bulk/volume purchase? Is it returnable?',
            ans:
                'A bulk/volume purchase is defined as a single order of ten (10) units or more of the same item within a 24-hour period; multiple orders of ten (10) units or more of the same item within a 24-hour period; orders of two or more units that exceed $10,000; or five-hundred (500) orders within a rolling twelve (12) month period. Bulk/volume purchases cannot be returned, except in the case of manufacturer defects or damage. All damages must be submitted with photos to  within 72 hours after delivery for online purchases. Sam’s Club members who request online orders to ship to a third-party facility or to a freight forwarder are responsible for auditing and ensuring their orders arrive complete and free of damage.',
        },
    ]
    const template = options => {
        const { question } = options.props
        const toggleIcon = options.collapsed
            ? 'pi pi-chevron-down chevron-icon'
            : 'pi pi-chevron-up chevron-icon'
        return (
            <>
                <div className='p-p-3 faq-headers'>
                    <button
                        className={options.togglerClassName}
                        onClick={options.onTogglerClick}
                    >
                        <span className={toggleIcon}></span>
                    </button>
                    <span className='p-px-2 p-mx-1 p-my-3 faq-font'>{question}</span>
                </div>
            </>
        )
    }

    return (
        <div className='container p-ml-3'>
            <header>
                <h1>Returns</h1>
                <span>If your purchase isn’t quite right, we want to help.</span>
            </header>
            <section className='p-card card  p-my-4'>
                <div className='p-grid card-body p-py-4 p-jc-center p-col-12 p-md-6 p-lg-12 '>
                    <div className='card-width p-text-center'>
                        <h1>
                            You’re covered by our <br />
                            100% Satisfaction Guarantee.
                        </h1>
                        <span>
                            If you’re a current member and not satisfied with a purchase made
                            online or in club, we’re happy to issue a refund or replace it,
                            with a few exceptions.
                        </span>
                    </div>
                </div>
            </section>
            <body className='body-details p-col-12 p-md-6 p-lg-12 p-sm-6 '>
                <h1>Here’s what you can return.</h1>
                <span>
                    Take a look to see limitations and exceptions. Certain items have
                    specific policies. Check the item’s description page for details.
                </span>
                <div className='card-body-1 p-card card-1-font p-mt-4'>
                    <div className='p-grid p-ai-center p-jc-center '>
                        <div className='p-col-3 '>
                            <span className='card-side-heading'>Return at any time</span>
                        </div>
                        <div className='p-col-6'>
                            <p className='p-ml-4'>Most items, unless noted below</p>
                        </div>
                    </div>
                    <Divider />
                    <div className='p-grid p-ai-center p-jc-center'>
                        <div className='p-col-3'>
                            <span className='card-side-heading'>Within 90 days</span>
                        </div>
                        <div className='p-col-6'>
                            <p>
                                <ul>
                                    <li>Electronics</li>
                                    <li>Major Appliances</li>
                                </ul>
                            </p>
                        </div>
                    </div>
                    <Divider />
                    <div className='p-grid p-ai-center p-jc-center'>
                        <div className='p-col-3'>
                            <span className='card-side-heading'>Within 30 days</span>
                        </div>
                        <div className='p-col-6'>
                            <p>
                                <ul>
                                    <li>Commercial heavy equipment</li>
                                    <li>Motorsports items</li>
                                </ul>
                            </p>
                        </div>
                    </div>
                    <Divider />
                    <div className='p-grid p-ai-center p-jc-center'>
                        <div className='p-col-3'>
                            <span className='card-side-heading'>Within 13 days</span>
                        </div>
                        <div className='p-col-6'>
                            <p>
                                <ul>
                                    <li>Cell phones (prepaid, postpaid and no contract)</li>
                                </ul>
                            </p>
                        </div>
                    </div>
                    <Divider />
                    <div className='p-grid p-ai-center p-jc-center'>
                        <div className='p-col-3'>
                            <span className='card-side-heading'>No returns</span>
                        </div>
                        <div className='p-col-6'>
                            <p>
                                <ul>
                                    <li>Gift cards and prepaid cards</li>
                                    <li>Tickets</li>
                                    <li>Custom-made items, like personalized gifts and photos</li>
                                    <li>
                                        Purchases made through the Sam's Club Wholesale Trading
                                        Program
                                    </li>
                                    <li>Prescriptions</li>
                                </ul>
                            </p>
                        </div>
                    </div>
                    <Divider />
                    <div className='p-grid p-jc-center'>
                        <div className='p-col-3 p-mt-3'>
                            <span className='card-side-heading '>Check with your club</span>
                        </div>
                        <div className='p-col-6'>
                            <p>
                                <ul>
                                    <li>Beer, wine and spirits</li>
                                    <li>Automotive tires and batteries</li>
                                    <li>Cigarettes and tobacco</li>
                                    <li>Eyeglasses</li>
                                    <li>Hearing aids</li>
                                </ul>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='card-body-2'>
                    <h1>3 easy ways to return items</h1>
                    <div className='p-card card-2-font p-mt-4'>
                        <div className='p-grid p-ai-center p-jc-center '>
                            <div className='p-col-5'>
                                <img src={noImage} alt='no_image' />
                            </div>
                            <div className='p-col-6'>
                                <label className='card-2-font-label'>Bring it to a club.</label>
                                <p>
                                    Return your item with your receipt to the Member Services desk
                                    at any Sam's Club location. Your refund will be issued as cash
                                    or credit, depending on your original form of payment.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='p-card card-2-font p-mt-4'>
                        <div className='p-grid p-ai-center p-jc-center'>
                            <div className='p-col-5'>
                                <img src={noImage} alt='no_image' />
                            </div>
                            <div className='p-col-6'>
                                <label className='card-2-font-label'>Ship it back.</label>
                                <p>
                                    To start the return process for items you ordered online, go
                                    to in your account or visit the . Be sure to also return any
                                    accessories and packing slips that came with your original
                                    package. Your refund will be issued as cash or credit,
                                    depending on your original form of payment. Items purchased at
                                    a Sam's Club location can't be shipped back.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='p-card card-2-font p-mt-4'>
                        <div className='p-grid p-ai-center p-jc-center'>
                            <div className='p-col-5'>
                                <img src={noImage} alt='no_image' />
                            </div>
                            <div className='p-col-6'>
                                <label className='card-2-font-label'>Call us.</label>
                                <p>
                                    Call (888) 746-7726 with your order number. A Member Services
                                    Associate will be happy to help.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='faq-body'>
                    <h1>Frequently asked questions</h1>
                    {faqTopics.map(faq => (
                        <div>
                            <Panel
                                headerTemplate={template}
                                question={faq.ques}
                                collapsed={true}
                                toggleable
                            >
                                <p>{faq.ans}</p>
                            </Panel>
                            <Divider />
                        </div>
                    ))}
                </div>
                <div className='body-footer p-pt-2'>
                    <p>
                        Returns of certain products and services may be governed by law.
                        Some services and products may be offered with their own return
                        policy, product-specific warranties, limitations, restrictions
                        and/or requirements, including but not limited to automotive tires
                        and batteries, protection plans, services such as subscriptions and
                        travel, and contact lenses ordered online. Other limitations,
                        restrictions, requirements and policies may apply and may vary by
                        product or club. See for full policy.
                    </p>
                </div>
            </body>
        </div>
    )
}

export default Returns
