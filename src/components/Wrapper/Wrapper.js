import React from 'react';
import './Wrapper.css';
class Wrapper extends React.Component {

    constructor() {
    super()
    this.state = {}
  }
    render(){
    return(
           <div className="wrapper">
          <div className="page-header section-dark" style={{backgroundImage: 'url("http://www.tokkoro.com/picsup/1469809-mountain.jpg")'}}>
            <div className="filter" />
            <div className="content-center">
              <div className="container">
                <div className="title-brand">
                  <h1 className="presentation-title">Friendly Chat :)</h1>
                  <div className="fog-low">
                    <img src="https://cdn.rawgit.com/creativetimofficial/paper-kit/bootstrap4-development/assets/img/fog-low.png" alt="img"/>
                  </div>
                  <div className="fog-low right">
                    <img src="https://cdn.rawgit.com/creativetimofficial/paper-kit/bootstrap4-development/assets/img/fog-low.png" alt="img"/>
                  </div>

                </div>
                <h2 className="presentation-subtitle text-center">Scroll down and click the record button to get started!</h2>
              </div>
            </div>
            <div className="moving-clouds" style={{backgroundImage: 'url("https://cdn.rawgit.com/creativetimofficial/paper-kit/bootstrap4-development/assets/img/clouds.png")'}}>
            </div>
          </div>
        </div>
        );
}

}
export default Wrapper;