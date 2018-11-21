import {capitalize} from '../../../utils/stringUtils.js';
import {getNextButtonAction} from '../../../utils/renderUtils.js';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeEligibility} from '../../actions/formActions.js';
import Description from './description.js';
import Field from './field.js';
import ActionButtons from './actionButtons.js';

const nextButtonActionConfig = {
    conditionalVals: [
        'military',
        'spouse',
        'child'
    ],
    conditionalDestination: 'eligibilityDetails',
    defaultDestination: 'policyHolder'
};

const mapDispatchToProps = dispatch => ({
    changeEligibility: payload => dispatch(changeEligibility(payload))
});

class Eligibility extends Component {

	constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            nextButton: {
                name: 'next',
                action: getNextButtonAction(this.props.eligibilityStatus, nextButtonActionConfig)
            }
        };
    }

    componentDidMount() {
        this.props.changeEligibility(this.props.eligibilityStatus);
    }

    handleInputChange({name, value}) {
        this.props.changeEligibility(value);
        this.setState({
            nextButton: {
                ...this.state.nextButton,
                action: getNextButtonAction(value, nextButtonActionConfig)
            }
        });
        this.props.handleInputChange({
            name,
            value
        });
    }
	
	render() {
        const {
            heading, 
            description,
            fields
        } = this.props.section;

        return (
            <form
                ref={form => this.formEl = form}
                onSubmit={e => this.props.handleSubmit(e, this.formEl, this.state.nextButton.action)}
                noValidate>
                <div className="wrapper">
                    <h1>{heading}</h1>
                    <Description 
                        description={description} />
                    <Field 
                        field={fields.eligibilityStatus}
                        type='radio'
                        modifierClass='field--large-radio'
                        handleInputChange={this.handleInputChange} />
                </div>
                <ActionButtons 
                    handleButtonClick={this.props.handleButtonClick}
                    buttons={[
                        this.state.nextButton
                    ]} />
            </form>
        );
	}
}

export default connect(null, mapDispatchToProps)(Eligibility);
