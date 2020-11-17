import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createBlog } from '../../actions';

class BlogCreate extends React.Component {
    renderError = (meta) => {
        if (meta.touched && meta.error) {
            return (
                <div className="ui error message">
                    <div className="header">
                        {meta.error}
                    </div>
                </div>
            );
        }
    };
    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    };


    onSubmit = (formValues) => {
        this.props.createBlog(formValues);
    };

    render() {
        return (
            <form
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                className="ui form error">
                <Field name="title" component={this.renderInput} label="Title: " />
                <Field name="content" component={this.renderInput} label="Content: " />
                <button type="submit" className="ui button primary">Submit</button>
            </form>
        )
    }

}
const validate = formValues => {
    const errors = {};
    if (!formValues.title) {
        errors.title = "You must enter a title";
    }
    if (!formValues.content) {
        errors.content = 'You must enter a content'
    } else if (formValues.content.length < 5) {
        errors.content = 'Content must have minimum 5 characters'
    }
    return errors;
};


const decoratedComponent = connect(null, { createBlog })(BlogCreate);

export default reduxForm({
    form: 'BlogCreate',
    validate
})(decoratedComponent);
