import React from 'react';
import { connect } from 'react-redux';
import { fetchBlogs, editBlog } from '../../actions';

class BlogEdit extends React.Component {
    constructor() {
        super();
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = { title: '', content: '' }
    }

    componentDidMount() {

        this.props.fetchBlogs()
            .then(() => {
                this.setState({
                    title: this.props.blog.title,
                    content: this.props.blog.content
                });
            })
            .catch(ex => { console.log(ex) });
    };

    onChangeTitle(e) {
        this.setState({ title: e.target.value });
    }

    onChangeContent(e) {
        this.setState({ content: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.props.userId === this.props.blog.user._id) {
            const blog = {
                title: this.state.title,
                content: this.state.content,
                userId: this.props.userId
            };

            this.props.editBlog(this.props.match.params.id, blog);
        } else {
            alert('Only the author of this blog can edit this blog');
        }

    }

    renderHelper() {
        if (!this.props.blog) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <form onSubmit={this.onSubmit} className="ui form">
                        <div className="field">
                            <label>Title: </label>
                            <input
                                value={this.state.title}
                                type="text"
                                onChange={this.onChangeTitle} />
                        </div>
                        <div className="field">
                            <label>Content: </label>
                            <textarea
                                value={this.state.content}
                                onChange={this.onChangeContent} />
                        </div>
                        <button className="ui button" type="submit">Submit</button>
                    </form>
                </div>
            );
        }

    }
    render() {
        return (
            <div>
                {this.renderHelper()}
            </div>
        );
    };
}
const mapStateToProps = (state, ownProps) => {
    return {
        blog: state.blogs[ownProps.match.params.id],
        isSignedIn: state.auth.isSignedIn,
        userId: state.auth.userId
    };
};
export default connect(mapStateToProps, { fetchBlogs, editBlog })(BlogEdit);
