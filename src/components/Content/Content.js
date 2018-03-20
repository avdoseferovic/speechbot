import React, { Component } from 'react';
import './Content.css';
import SweetAlert from 'sweetalert2-react';

class Content extends Component{

constructor(props){
  super(props)
  this.state = {
	  active: true,
	  show: true,
  }
}

toggleClass = () => {
  const currentState = this.state.active;
	  this.setState({ active: !currentState });
	  this.props.onClickChange();
}

render(){
	return(
		<div className="main">
	  <div>
		  <SweetAlert
			show={this.state.show}
			title="How to use:"
			type= "warning"
			text= "https://dialogflow.com/docs/reference/small-talk"
			onConfirm={() => this.setState({ show: false })}
		  />
	</div>
			<div className="centerit">
				<p onClick={this.toggleClass} className={this.state.active ? 'startButton': 'stopButton'}> </p>
				<h2>{this.props.message}</h2>
			</div>
		</div>
		);
  }
}


export default Content;