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
        })
        setTimeout(() => {
            var elems = document.querySelectorAll('.collapsible');
            var instances = M.Collapsible.init(elems, {});

        }, 200);
    }
    componentDidMount = () => {
        this.getFeed()
    }

    getFeed = async () => {
        const { newsapi } = this.state
        // newsapi.v2.everything({
        //     q: ['bitcoin', 'crypto'],
        //     from: new Date(),
        //     to: new Date() - 3 * 24 * 3600,
        //     language: 'en',
        //     sortBy: 'publishedAt'

        // }).then(response => {
        //     console.log(response);
        //     this.setState({ feed: { items: response.articles } })
        // });
        newsapi.v2.topHeadlines({
            category: 'sports', 
            from: new Date(),
            to: new Date() - 3 * 24 * 3600,
            country: 'pl',
            sortBy: 'publishedAt'

        }).then(response => {
            console.log(response);
            this.setState({ feed: { items: response.articles } })
        });
    }


    render() {
        const styleDiv = {
            width: "100%",
            height: "calc(100% - 20px)",
            position: "absolute",
            backgroundColor: "#fff",
            overflowY: 'scroll'
        }

        return (

            <React.Fragment>
                <div style={styleDiv}>
                    <h5>News feed</h5>
                    <ul class="collapsible">
                        {this.state.feed.items.map(el => (
                            <li style={{ position: 'relative' }}>
                                <div class="collapsible-header"><img src={el.urlToImage} style={{height: "48px", marginTop: "20px", marginRight: "20px"}}/>
                                    <span className="truncate"
                                        style={{ width: "calc(100% - 150px)", display: "inline-block" }}>
                                        
                                        {el.title}
                                    </span>
                                    <span style={{ top: 0, right: "20px", position: "absolute" }} class="right-align">{ta.ago(el.publishedAt)}
                                    </span>
                                    <label style={{position: "absolute", right: "30px", top: "50px"}}>by {el.source.name}</label>
                                </div>
                                <div class="collapsible-body"><span>
                                    {el.description} <a taget="_blank" href={el.url} style={{paddingLeft: "10px"}}>Read full</a>
                                </span></div>
                            </li>
                        ))}
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

export default NewsFeed;