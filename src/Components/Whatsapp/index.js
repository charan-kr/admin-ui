import React from 'react';
import './whatsapp.css'

const WhatsappChat = () => {
    return (
        <div>
            <a
                href="https://wa.me/2348100000000"
                className="whatsapp_float"
                target="_blank"
                rel="noopener noreferrer"
            >
                <i className="fab fa-whatsapp whatsapp-icon p-mt-3" />
            </a>
            {/* <ReactWhatsapp number="1-212-736-5000" message="Hello World!!!" /> */}
        </div>
    )
}

export default WhatsappChat
