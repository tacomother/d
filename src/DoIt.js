import React, { Component } from 'react';
import axios from 'axios';

import APIKey from './config';
import Nav from './components/Nav';
import Gall from './components/Gall';
import SearchForm from './components/SearchForm';

class Container extends Component {

  // Initialize state
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      url: props.url,
      loading: true
    };
  }

  componentDidMount() {
    this.performSearch();
  }

  // Fetch data with Axios from Flickr API
  // Show photo's based on keyword props or by search input
  performSearch = (query = this.props.keyword) => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${APIKey}&tags=${query}&per_page=12&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          photos: response.data.photos.photo,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    console.log(this.state.photos);

    // Only show search component when it match state url
    let searchForm;
    if (this.state.url === '/search') {
      searchForm = <SearchForm onSearch={this.performSearch} />;
    }

    return (
      <div className="container">

        {searchForm}

        <Nav />

        <Gall
          data={this.state.photos}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default Container;
