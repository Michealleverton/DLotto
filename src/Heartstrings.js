import React, { Component } from 'react';

class Heartstrings extends Component {
    render() {
        return (
            <section className="bg_white mypy-6" id="specialdraws">
                <div className="container px-5 my-5 px-5">
                    <div className="text-center mb-5">
                        <h2 className="titleSpacing fw-bolder turntextblack">Heart Strings Testimonial</h2>
                        <p className="textBodyLineHeight textBodySpacing mb-0 justify-content-center turntextblack">Our team loves to hear heart warming messages from our customers <br />Imagine how Decentraliz Lottery can change your life too.</p>
                    </div>
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-6">

                            <div className="card heartcarddetails mb-4" data-aos="fade-right"
                                data-aos-offset="200"
                                data-aos-delay="20"
                                data-aos-duration="800"
                                data-aos-easing="ease-in-out">
                                <div className="card-body p-4">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0"><i className="bi bi-bookmark-heart text-danger fs-1"></i></div>
                                        <div className="ms-4">
                                            <p className="textBodyLineHeight textBodySpacing mb-1 turntextblack">Thank you for putting together such a great Lottery. I won $500,000 in Ethereum. Since then I have bought a house for my family and been able to give them a better life.</p>
                                            <div className="textBodyLineHeight textBodySpacing small text-muted">- Not Real Person , Canada</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card heartcarddetails mb-4" data-aos="fade-left"
                                data-aos-offset="200"
                                data-aos-delay="20"
                                data-aos-duration="800"
                                data-aos-easing="ease-in-out">
                                <div className="card-body p-4">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0"><i className="bi bi-bookmark-heart text-danger fs-1"></i></div>
                                        <div className="ms-4">
                                            <p className="textBodyLineHeight textBodySpacing mb-1">My business was failing and I was going to have to close things up, but won $225,000 Shiba Inu which saved my buiness get through this Covid pandemic. Thanks Dcrypto Lottery!</p>
                                            <div className="textBodyLineHeight textBodySpacing small text-muted">- Not Real Person, USA</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="textBodySpacing mt-5 mb-0 text-center justify-content-center turntextblack">* Site just launched, so testimonials are fake for now</p>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

        );
    }
}

export default Heartstrings;
