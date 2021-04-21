import React,{useState,useEffect} from "react";
import {useParams} from "react-router"
import Header from "../components/headers/light";
import axios from 'axios';
import '../assets/eventcss/event.css'
export default function EventDetail() {
const [event,setEvent] = useState({}); 

const {id}=useParams()
useEffect(() => {
axios.get('http://localhost:5000/event/'+id).then(Response =>{
setEvent(Response.data);
})
},[])

    return (
      <>
    <Header />
    {/* <p>{event.location}</p> */}
    <a id="button"><i className="fas fa-angle-up fa-2x"></i></a>
    <div className="container-fluid">
        <div className="tm-site-header tm-mb-1">
            <div className="tm-site-name-container tm-bg-color-1">
                <h1 className="tm-text-white">Comparto</h1>
            </div>
            <div className="tm-nav-container tm-bg-color-8">
                <nav className="tm-nav" id="tm-nav">
                    <ul>
                        <li className="tm-nav-item current">
                            <a href="#about" className="tm-nav-link">
                                <span className="tm-mb-1">.01</span>
                                <span>About</span>
                            </a>
                        </li>
                        <li className="tm-nav-item">
                            <a href="#services" className="tm-nav-link">
                                <span className="tm-mb-1">.02</span>
                                <span>Services</span>
                            </a>
                        </li>
                        <li className="tm-nav-item">
                            <a href="#gallery" className="tm-nav-link">
                                <span className="tm-mb-1">.03</span>
                                <span>Gallery</span>
                            </a>
                        </li>
                        <li className="tm-nav-item">
                            <a href="#contact" className="tm-nav-link">
                                <span className="tm-nav-text tm-mb-1">.04</span>
                                <span className="tm-nav-text">Contact</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <section className="tm-mb-1" id="about">
            <div className="tm-row tm-about-row">
                <div className="tm-section-1-l">
                    {/* <img src="img/comparto-image-01.jpg" alt="About image" className="tm-img-responsive"> */}
                </div>
                <article className="tm-section-1-r tm-bg-color-8">
                    <h2 className="tm-mb-2 tm-title-color">.01 Comparto CSS Layout</h2>
                    <p><a rel="nofollow" href="https://templatemo.com/tm-544-comparto" target="_parent">Comparto</a> is a custom light-weight CSS layout for your website. You can easily adapt and use this for your commercial or personal websites. Feel free to use it.</p>
                    <p>You cannot redistribute this template ZIP file in any template collection website. Please <a rel="nofollow" href="https://templatemo.com/contact" target="_parent">contact TemplateMo</a> if you have any question.</p>
                    <p>Nunc sed gravida elit. Curabitur rutrum elit id lobortis viverra. Fusce at libero dui.</p>
                    
                    <a href="#services" className="tm-btn tm-btn-1 tm-link-to-services">More Detail</a>
                </article>
            </div>
        </section>
        <div className="tm-bg-color-1 tm-mb-1 tm-row tm-social-row">
            <div className="tm-icon">
                <div className="tm-icon-inner">
                    <a href="#services">
                        <i className="fas fa-synagogue fa-4x tm-mb-1"></i>
                        <p>Aenean vel est id massa condimentum</p>
                    </a>
                </div>
            </div>
            <div className="tm-icon">
                <div className="tm-icon-inner">
                    <a href="#gallery">
                        <i className="fas fa-chart-bar fa-4x tm-mb-1"></i>
                        <p>Suspendisse interdum lectus purus</p>
                    </a>
                </div>
            </div>
            <div className="tm-icon">
                <div className="tm-icon-inner">
                    <a href="#contact">
                        <i className="fas fa-images fa-4x tm-mb-1"></i>
                        <p>Nulla ac sodales est vel iaculis purus</p>
                    </a>
                </div>
            </div>
        </div>
        {/* <section className="tm-mb-1 tm-row tm-services-row" id="services">
            <div className="tm-section-2-l">
                <article className="tm-bg-color-6 tm-box-pad tm-mb-1">
                    <h2 className="tm-mb-2">.02 Aliquam pretium hendrerit</h2>
                    <p>Cras tempus, velit amet facilisis venenatis, erat felis imperdiet lectus, at posuere elit metus. Title #333 BG #F2F2F2</p>
                    <p className="tm-mb-0">Nam iaculis, urna ut laoreet aliquam, massa magna dapibus. Text #666</p>
                </article>
                <div className="tm-bg-color-7 tm-em-box">
                    <p className="tm-text-color-2">Nam iaculis, urna ut laoreet aliquam, massa magna dapibus nibh, at pellentesque lectus odio non risus. Nulla ac sodales est, vel iaculis. Text #333 . BG #DDD</p>
                    <a href="#gallery" className="tm-btn tm-btn-2">Read More</a>
                </div>
            </div>
            <div className="tm-section-2-r">
                <img src="img/comparto-image-02.jpg" alt="Services image" className="tm-img-responsive">
            </div>
        </section> */}
        {/* <section className="tm-bg-color-4 tm-mb-3 tm-gallery-section" id="gallery">
            <div className="tm-gallery-header">
                <h2 className="tm-mb-1 text-right">.03 The Gallery Section</h2>
                <ul className="tm-gallery-filter tabs clearfix filters-button-group">
                    <li><a role="button" href="#" className="active" data-filter="*">Show All</a></li>
                    . <li><a role="button" href="#" data-filter=".nature">Nature</a></li>
                    . <li><a role="button" href="#" data-filter=".animals">Animals</a></li>
                    . <li><a role="button" href="#" data-filter=".people">People</a></li>
                </ul>
            </div>
            <div className="tm-gallery-outer">
                <div className="tm-gallery" id="tm-gallery">
                    <div className="tm-gallery-item nature">
                        <figure className="effect-bubba">
                            <img src="img/gallery/gallery-item-01.jpg" alt="Gallery item" className="tm-img-responsive" />
                            <figcaption>
                                <h2>Too <span>CSS</span></h2>
                                <p>It is a great blog you should explore.</p>
                                <a href="#">View more</a>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="tm-gallery-item animals">
                        <figure className="effect-bubba">
                            <img src="img/gallery/gallery-item-02.jpg" alt="Gallery item" className="tm-img-responsive" />
                            <figcaption>
                                <h2>Templates</h2>
                                <p>best templates come from TemplateMo website.</p>
                                <a href="#">View more</a>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="tm-gallery-item nature">
                        <figure className="effect-bubba">
                            <img src="img/gallery/gallery-item-03.jpg" alt="Gallery item" className="tm-img-responsive" />
                            <figcaption>
                                <h2>Web <span>Design</span></h2>
                                <p>This is our special design work.</p>
                                <a href="#">View more</a>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="tm-gallery-item nature">
                        <figure className="effect-bubba">
                            <img src="img/gallery/gallery-item-04.jpg" alt="Gallery item" className="tm-img-responsive" />
                            <figcaption>
                                <h2>Free <span>HTML</span></h2>
                                <p>HTML layouts are easy to edit.</p>
                                <a href="#">View more</a>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="tm-gallery-item animals">
                        <figure className="effect-bubba">
                            <img src="img/gallery/gallery-item-05.jpg" alt="Gallery item" className="tm-img-responsive" />
                            <figcaption>
                                <h2>Just <span>Art</span></h2>
                                <p>You can create your own art website.</p>
                                <a href="#">View more</a>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="tm-gallery-item animals">
                        <figure className="effect-bubba">
                            <img src="img/gallery/gallery-item-06.jpg" alt="Gallery item" className="tm-img-responsive" />
                            <figcaption>
                                <h2>Pro <span>Display</span></h2>
                                <p>You can make your artwork gallery.</p>
                                <a href="#">View more</a>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="tm-gallery-item peopl">
                        <figure className="effect-bubba">
                            <img src="img/gallery/gallery-item-07.jpg" alt="Gallery item" className="tm-img-responsive" />
                            <figcaption>
                                <h2>The <span>Nature</span></h2>
                                <p>You can create your own HTML website.</p>
                                <a href="#">View more</a>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="tm-gallery-item people">
                        <figure className="effect-bubba">
                            <img src="img/gallery/gallery-item-08.jpg" alt="Gallery item" className="tm-img-responsive" />
                            <figcaption>
                                <h2>Color <span>Art</span></h2>
                                <p>You can create your own CSS website.</p>
                                <a href="#">View more</a>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="tm-gallery-item people">
                        <figure className="effect-bubba">
                            <img src="img/gallery/gallery-item-09.jpg" alt="Gallery item" className="tm-img-responsive" />
                            <figcaption>
                                <h2>Take it <span>easy</span></h2>
                                <p>You can create your own art gallery.</p>
                                <a href="#">View more</a>
                            </figcaption>
                        </figure>
                    </div>
                    <div className="tm-gallery-item people">
                        <figure className="effect-bubba">
                            <img src="img/gallery/gallery-item-10.jpg" alt="Gallery item" className="tm-img-responsive" />
                            <figcaption>
                                <h2>Share <span>This</span></h2>
                                <p>You can make your own image gallery.</p>
                                <a href="#">View more</a>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </section>  */}
        {/* <section id="contact" className="tm-bg-color-5 tm-mb-3">
            <h2 className="tm-text-white tm-contact-title">.04 Contact Us</h2>
            <div className="tm-bg-color-white tm-contact-main">
                <div className="map-outer">
                    <div className="gmap-canvas">

                        <iframe width="100%" height="400" id="gmap-canvas"
                            src="https://maps.google.com/maps?q=Av.+Lúcio+Costa,+Rio+de+Janeiro+-+RJ,+Brazil&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                    </div>
                </div>
                <div className="contact-form-outer">
                    <form id="contact-form" action="" method="POST" className="tm-bg-color-6 tm-contact-form">
                        <div className="form-group">
                            <input type="text" name="name" className="form-control" placeholder="Name" required="" />
                        </div>
                        <div className="form-group">
                            <input type="email" name="email" className="form-control" placeholder="Email" required="" />
                        </div>
                        <div className="form-group">
                            <textarea rows="4" name="message" className="form-control" placeholder="Message..."
                                required=""></textarea>
                        </div>
                        <div>
                            <button type="submit" className="ml-auto tm-btn tm-btn-3">
                                Send
                            </button>
                        </div>
                    </form>
                </div>
                <div className="contact-info-outer">
                    <div className="tm-bg-color-6 contact-info">
                        <p>Pellentesque egestas odio sed tellus dictum, vel lobortis ante vehicula.</p>
                        <p>Morbi eget accumsan libero, non tincidunt felis.</p>
                        <p className="tm-mb-0">Tel: <a href="tel:0100200990">010-020-0990</a></p>
                        <p>Email: <a href="mailto:info@company.com">info@company.com</a></p>
                    </div>
                </div>
            </div>
        </section> */}
    </div>
      </>
    );
}

