import React, { Component } from 'react';
import './index.css';

class Info extends Component {
    render() {
        return (
            <section className="bg_grey py-5 text-white" id="myinfo">
                <div className="container px-5 pb-6">
                    <div className="row gx-5 margin_move_up">
                        <div className="col-lg-4 mb-5 mb-lg-0">
                            <div className="feature bg-warning bg-gradient text-white rounded-2 mb-5 margin_l10"><i className="bi bi-coin"></i></div>
                            <h2 className="display-5 fs-3 text-white">Supported Coins</h2>
                            <p>Due to the fact that there are way to many coins to support. We have chosen a small slected few to use with our lotteries. There will be special lotteries like the current Shiba Inu Coin Burn Lottery where you have to spend that specific token to buy the ticket.</p>

                        </div>
                        <div className="col-lg-4 mb-5 mb-lg-0">
                            <div className="feature bg-warning bg-gradient text-white rounded-3 mb-5 margin_l10"><i className="bi bi-shift"></i></div>
                            <h2 className="display-5 fs-3 text-white">Odds Of Winning</h2>
                            <p>With Dcrypto Lottery your odds of winning are amazing compared to the standard lotteries out there. For example odds for winning the powerball lottery is 1 in 292 million. Loto 649 odds are better at 1 in 14 million. Most lotteries odds are very large due to the large number combinations that can be the winning numbers. Where as here your odds depend on the amount of tickets sold which drasticly betters your odds of winning.</p>

                        </div>
                        <div className="col-lg-4">
                            <div className="feature bg-warning bg-gradient text-white rounded-3 mb-5 margin_l10"><i className="bi bi-receipt"></i></div>
                            <h2 className="display-5 fs-3 text-white">Dcrypto NFT's</h2>
                            <p>For our lottery tickets we use NFT's. All tickets purchased are in the form of NFT's and are sent to your wallet. Besides every ticket purchased you can get different NFT's such as Free Tickets & Golden Tickets. Golden Tickets are special. In certain Lottery Draws a litmited number of golden tickets are won, which automaticly puts the winner into each of the monthly special draws.</p>

                        </div>
                    </div>
                </div>

            </section>

        );
    }
}

export default Info;
