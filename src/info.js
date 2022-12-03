import React, { Component } from 'react';
import './index.css';

class Info extends Component {
    render() {
        return (
            <section className="greygradiant text-white" id="myinfo">

                <div className="container px-5 pb-6">
                    <div className="row gx-5 margin_move_up">
                        <div className="col-lg-4 mb-5 mb-lg-0">
                            <div className="feature bg-warning bg-gradient text-white rounded-2 mb-5 margin_l10"><i className="fa-solid fa-coins text-black"></i></div>
                            <h2 className="display-5 fs-3 text-white">Supported Coins</h2>
                            <p>Due to the fact that there are way to many coins to support. We have chosen Ethereum for our lotteries. There will be special lotteries like the current Shiba Inu Coin Burn Lottery where you have to spend that specific token to buy the ticket.</p>

                        </div>
                        <div className="col-lg-4 mb-5 mb-lg-0">
                            <div className="feature bg-warning bg-gradient text-white rounded-2 mb-5 margin_l10"><i class="fa-solid fa-trophy text-black"></i></div>
                            <h2 className="display-5 fs-3 text-white">Odds Of Winning</h2>
                            <p>With Dcrypto Lottery your odds of winning are amazing compared to the standard lotteries out there. Most lotteries odds are very large due to the large number combinations that make up the winning numbers. Where as here your odds depend on the amount of tickets sold which drasticly betters your odds of winning.</p>

                        </div>
                        <div className="col-lg-4">
                            <div className="feature bg-warning bg-gradient text-white rounded-2 mb-5 margin_l10"><i class="fa-solid fa-ticket text-black"></i>  </div>
                            <h2 className="display-5 fs-3 text-white">Free Tickets</h2>
                            <p>For our lottery, free tickets are given out after a number of tickets are sold. The more you pay for a ticket the greater the chance of winning a free ticket. Free tickets are given out for the current lottery (Not the next lottery) and will be added to your ticket list below.</p>

                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

export default Info;
