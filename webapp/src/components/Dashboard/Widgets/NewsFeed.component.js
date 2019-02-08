import React, { Component } from "react";
import Parser from 'rss-parser'
import { Collapsible, CollapsibleItem } from 'react-materialize'
import M from 'materialize-css'
import request from 'request'
import cheerio from 'cheerio'
import feed from 'feed-read'
import ta from 'time-ago'
import NewsAPI from 'newsapi'




class NewsFeed extends Component {
    constructor(props) {
        super(props)
        this.iframeId = Math.random()
    }
    componentWillMount = () => {
        this.setState({
            feed: { items: [] },
            newsapi: new NewsAPI('6518591a014846529815780fd3f59d72'),
            toRefresh: 0
        })
        setTimeout(() => {
            var elems = document.querySelectorAll('.collapsible');
            var instances = M.Collapsible.init(elems, {});

        }, 200);
    }
    componentDidMount = () => {
        this.getFeed()

        const intervalId = setInterval(this.getFeed, 1000 * 60 * 5)
        this.setState({ intervalId })
    }
    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    componentWillReceiveProps = (nextProps) => {
        // this.setState({ toRefresh: new Date() })
        this.getFeed()
    }

    getFeed = async () => {
        const { newsapi } = this.state
        const { display, orderBy: sortBy, category, country, keyphrase: q } = this.props.settings
        console.log({ display, sortBy, category, country, q })
        if (display === 0) {
            let params = { country: countries[country] }
            if (category !== 'all') params.category = category

            newsapi.v2.topHeadlines(params)
                .then(response => {
                    console.log(response)
                    this.setState({ feed: {totalResults: response.totalResults, items: response.articles } })
                });
        } else {
            newsapi.v2.everything({
                q,
                from: new Date(),
                to: new Date() - 3 * 24 * 3600,
                language: 'en',
                sortBy,
            }).then(response => {
                console.log(response);
                this.setState({ feed: {...feed,  items: response.articles } })
            });
        }


    }


    render() {
        const styleDiv = {
            width: "100%",
            height: "calc(100% - 20px)",
            position: "absolute",
            backgroundColor: "#fff",
            overflowY: 'scroll'
        }
        console.log(this.state)

        return (

            <React.Fragment>
                <div style={styleDiv}>
                    <h5>News feed</h5>
                    <ul className="collapsible">
                        {this.state.feed.items.map(el => (
                            <li style={{ position: 'relative' }} key={el.url}>
                                <div className="collapsible-header"><img src={el.urlToImage} style={{ height: "48px", marginTop: "20px", marginRight: "20px" }} />
                                    <span className="truncate"
                                        style={{ width: "calc(100% - 150px)", display: "inline-block" }}>

                                        {el.title}
                                    </span>
                                    <span style={{ top: 0, right: "20px", position: "absolute" }} className="right-align">{ta.ago(el.publishedAt)}
                                    </span>
                                    <label style={{ position: "absolute", left: "calc(100% - 120px)", top: "50px" }}>by {el.source.name}</label>
                                </div>
                                <div className="collapsible-body"><span>
                                    {el.description} <a taget="_blank" href={el.url} style={{ paddingLeft: "10px" }}>Read full</a>
                                </span></div>
                            </li>
                        ))}
                        {this.state.feed.totalResults == 0? (
                            <h6>Sorry, there's no articles for that keyphrase, please try without tags or in diffrent category</h6>
                        ):''}
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

export default NewsFeed;
{/*  */ }

const countries = {
    'United Arab Emirates': 'ae',
    'Argentina': 'ar',
    'Austria': 'at',
    'Australia': 'au',
    'Belgium': 'be',
    'Bulgaria': 'bg',
    'Brazil': 'br',
    'Canada': 'ca',
    'Switzerland': 'ch',
    'China': 'cn',
    'Colombia': 'co',
    'Cuba': 'cu',
    'Czechia': 'cz',
    'Germany': 'de',
    'Egypt': 'eg',
    'France': 'fr',
    'United Kingdom': 'gb',
    'Hong Kong': 'hk',
    'Hungary': 'hu',
    'Indonesia': 'id',
    'Ireland': 'ie',
    'Israel': 'il',
    'India': 'in',
    'Italy': 'it',
    'Japan': 'jp',
    'Korea, Republic of': 'kr',
    'Lithuania': 'lt',
    'Latvia': 'lv',
    'Morocco': 'ma',
    'Mexico': 'mx',
    'Malaysia': 'my',
    'Nigeria': 'ng',
    'Netherlands': 'nl',
    'Norway': 'no',
    'New Zealand': 'nz',
    'Philippines': 'ph',
    'Poland': 'pl',
    'Portugal': 'pt',
    'Romania': 'ro',
    'Serbia': 'rs',
    'Russian Federation': 'ru',
    'Saudi Arabia': 'sa',
    'Singapore': 'sg',
    'Slovenia': 'si',
    'Slovakia': 'sk',
    'Thailand': 'th',
    'Turkey': 'tr',
    'Taiwan': 'tw',
    'Ukraine': 'ua',
    'United States': 'us',
    'Venezuela': 've',
    'South Africa': 'za',
}