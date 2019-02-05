import React, { Component } from "react";
import Parser from 'rss-parser'
import { Collapsible, CollapsibleItem } from 'react-materialize'
import M from 'materialize-css'
import request from 'request'
import cheerio from 'cheerio'
import feed from 'feed-read'
import ta from 'time-ago'

class TechnicalAnalisis extends Component {
    constructor(props) {
        super(props)
        this.iframeId = Math.random()
    }
    componentWillMount = () => {
        this.setState({ feed: { items: [] } })
        this.getFeed()
        setTimeout(() => {
            var elems = document.querySelectorAll('.collapsible');
            var instances = M.Collapsible.init(elems, {});
        }, 200);
    }


    getFeed = async () => {
        let parser = new Parser();
        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
        let feed = await parser.parseURL(CORS_PROXY + 'https://pl.investing.com/rss/market_overview_Technical.rss')
        console.log(feed.title);

        feed.items.forEach(item => {
            console.log(item)

        });

        this.setState({ feed })
    }
    getFeed1 = async () => {
        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
        feed(CORS_PROXY + 'https://pl.investing.com/rss/market_overview_Technical.rss', (err, articles) => {
            console.log(articles)
        })
        
    }

    render() {
        this.getFeed1()
        const styleDiv = {
            width: "100%",
            height: "calc(100% - 20px)",
            position: "absolute",
            backgroundColor: "#fff",
            overflowY: 'scroll'
        }

        const { feed } = this.state
        return (

            <React.Fragment>
                <div style={styleDiv}>
                    <h5>News feed</h5>
                    <ul class="collapsible">
                        {feed.items.map(el => (
                            <li style={{position: 'relative'}}>
                                <div class="collapsible-header"> <span className="truncate" style={{width: "calc(100% - 110px)", display:"inline-block"}}>{el.title}</span> <span style={{top: 0, right: "20px", position: "absolute"}} class="right-align">{ta.ago(el.pubDate)}</span></div>
                                <div class="collapsible-body"><span>
                                    <a href={el.link} target="_blank" rel="noopener noreferrer" >
                                    Open in new tab </a>
                                </span></div>
                            </li>
                        ))}
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

export default TechnicalAnalisis;