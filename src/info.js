import React, { Component } from 'react';
import coininfo from "./assets/coininfo2.gif"
import oddsinfo from "./assets/coininfo.gif"
import ticketsinfo from "./assets/ticketinfo.gif"
import './index.css';

class Info extends Component {
    render() {
        return (
            <section className="minfoholder greygradiant text-white" id="myinfo">

                <div className="container px-5 pb-6 infocontainer">
                    <div className="row gx-5 margin_move_up">
                        <div className="col-lg-4 mb-5 mb-lg-0">
                            <div className=""><img alt="" className="coininfo" src={coininfo} /></div>
                            <h2 className="display-5 fs-3 text-white">Supported Coins</h2>
                            <p>
                                We chose Ethereum for purchasing tickets, but our team plans to incorporate other coins. Special lotteries like the Shiba Inu Burn require spending specific tokens for ticket purchase.</p>

                        </div>
                        <div className="col-lg-4 mb-5 mb-lg-0">
                            <div className=""><img alt="" className="coininfo" src={oddsinfo} /></div>
                            <h2 className="display-5 fs-3 text-white">Odds Of Winning</h2>
                            <p>Our Lottery offers incredible winning odds compared to standard lotteries, as your chances increase with the number of tickets sold.</p>

                        </div>
                        <div className="col-lg-4">
                            <div className=""><img alt="" className="coininfo" src={ticketsinfo} /></div>
                            <h2 className="display-5 fs-3 text-white">Free Tickets</h2>
                            <p>
                                Free tickets are awarded based on the number of tickets sold in our lottery. Higher-priced tickets increase your chances of winning a free ticket.</p>

                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

export default Info;
