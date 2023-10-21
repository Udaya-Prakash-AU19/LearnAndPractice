import React from 'react';
import Axios from 'axios';

class Posts extends React.Component {
  constructor() {
    super();
    this.state = {
      isShowPosts: true,
      loading: false,
      posts: [],
      message: 'My First message',
      count: 0
    }
    console.log('constructor');
  }

  fetchComments = () => {
    this.setState({
      loading: true
    })

    Axios.get("http://localhost:3001/api/v1/posts").then((response) => {
      console.log(response);

      this.setState({
        posts: response.data,
        loading: false
      })
    });
  }

  static getDerivedStateFromProps(props, states) {
    console.log('getDerivedStateFromProps')
    return { message: props.customMessage }
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.fetchComments()
  }

  handleOnClick = () => {
    this.setState((prevState) => ({
      isShowPosts: !prevState.isShowPosts
    }))
  }

  render() {
    const { posts, isShowPosts, loading, message, count } = this.state;
    console.log('render');
    return (
      <div>
        <div>{ message } { count }</div>
        <div className="d-inline-flex justify-content-between flex-nowrap">
          <button type="button" class="btn btn-success" onClick={ () => this.setState({ count: count+1 })}>Increment</button>
          <button type="button" class="btn btn-danger" onClick={ () => this.setState({ count: count-1 })}>Decrement</button>
          <button type="button" className="btn btn-primary" onClick={ this.handleOnClick }>Show posts</button>
        </div>
        
        { isShowPosts ? (!loading ? (
            <div className="bg-success p-3">
              <div className="bg-warning d-flex justify-content-start flex-wrap">
                  { posts.slice(0, 10).map((post, index) => (
                  <div className="card m-3" style={ { width: "300px" } }>
                    <div className="card-header">
                      { post.title }
                    </div>
                    <p key={index} className={"card-text p-3"}>
                      { post.body }
                    </p>
                  </div>
              )) }
            </div>
          </div>
           ) : <div className="alert alert-secondary" role="alert">Loading...</div>) : ''
        }
      </div>
    );
  }
}

export default Posts;
