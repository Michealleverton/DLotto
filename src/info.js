import React, { Component } from 'react';
import coininfo from "./assets/coininfo2.gif"
import oddsinfo from "./assets/coininfo.gif"
import ticketsinfo from "./assets/ticketinfo.gif"
import './css/index.css';
// import './Mymain.css';

class Info extends Component {
    render() {
        return (
            <section className="minfoholder greygradiant text-white" id="myinfo">

                <div className="container px-5 pb-6 infocontainer">
                    <div className="row gx-5 margin_move_up">
                    <p className="headerSpacing headersize fw-bolder text-center text-white mb-5">Lotto News Corner</p>
                        <div className="col-lg-4 mb-5 mb-lg-0">
                            <div className="mb-3"><img alt="" className="coininfo" src={coininfo} /></div>
                            <h2 className="titleSpacing display-5 fs-3 text-white mb-2">Supported Coins</h2>
                            <p className='textBodyLineHeight textBodySpacing'>
                                We chose Ethereum for purchasing tickets, but our team plans to incorporate other coins. Special lotteries like the Shiba Inu Burn require spending specific tokens to purchase tickets.</p>

                        </div>
                        <div className="col-lg-4 mb-5 mb-lg-0">
                            <div className="mb-3"><img alt="" className="coininfo" src={oddsinfo} /></div>
                            <h2 className="titleSpacing display-5 fs-3 text-white mb-2">Odds Of Winning</h2>
                            <p className='textBodyLineHeight textBodySpacing'>Our Lottery offers incredible winning odds compared to standard lotteries, because your chances of winning are based on the number of tickets sold not number combinations.</p>

                        </div>
                        <div className="col-lg-4">
                            <div className="mb-3"><img alt="" className="coininfo" src={ticketsinfo} /></div>
                            <h2 className="titleSpacing display-5 fs-3 text-white mb-2">Free Tickets</h2>
                            <p className='textBodyLineHeight textBodySpacing'>
                                Free tickets are awarded based on the number of tickets sold in our lottery. Higher priced tickets increase your chances of winning a free ticket and any special event tickets.</p>

                        </div>
                    </div>
                </div>
            </section>

        );
    }
}

export default Info;
