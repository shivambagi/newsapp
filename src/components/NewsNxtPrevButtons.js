import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class NewsNxtPrevButtons extends Component {
    static defaultProps ={
        country: 'in',
        pageSize: 6,
        category: 'general'
    }
    static propTypes ={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props);
        // console.log("Constructor News");
        this.state ={
            articles: [],
            loading: false,
            page: 1
        }
        document.title = "News Shorts - " + this.capitalizeFirstLetter(this.props.category);
    }

updateNews = async () =>{
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=115f405d344f4655bd2f8cab5fde1f4a&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    console.log("Update " + this.state.page);
    this.setState({articles: parsedData.articles, totalArticles: parsedData.totalResults,loading: false})
}

async componentDidMount(){
    // // console.log("cdm");
    // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=115f405d344f4655bd2f8cab5fde1f4a&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // // console.log(parsedData);
    // this.setState({articles: parsedData.articles, totalArticles: parsedData.totalResults,loading: false})
    this.updateNews();
}

handlePrevClick = async() =>{
    // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=115f405d344f4655bd2f8cab5fde1f4a&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // // console.log(parsedData);    
    // this.setState({
    //     page: this.state.page - 1,
    //     articles: parsedData.articles,
    //     loading: false
    // })
    this.setState({page: this.state.page - 1})
    this.updateNews();
}

    handleNextClick = async () =>{
    //     if(this.state.page + 1 > Math.ceil(this.state.totalArticles/this.props.pageSize)){

    //     }else{    
    //     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=115f405d344f4655bd2f8cab5fde1f4a&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
    //     this.setState({loading: true})
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     // console.log(parsedData);    
    //     this.setState({
    //         page: this.state.page + 1,
    //         articles: parsedData.articles,
    //         loading: false
    //     })
    // }
    this.setState({page: this.state.page + 1})
    this.updateNews();
}

    render() {
        // console.log("render");
        return (
            <div className="container my-3">
                <h1 className="text-center">Top News - {this.capitalizeFirstLetter(this.props.category)}</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element)=>{
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div>    
                    })}                
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>           
            </div>
        )
    }
}

export default NewsNxtPrevButtons
