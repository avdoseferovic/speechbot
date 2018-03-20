import React, {Component} from 'react';

class Header extends Component {
  render(){
    return (
      <div>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <title>Friendly Bot</title>
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
        <meta name="viewport" content="width=device-width" />
        {/* Bootstrap core CSS     */}
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
        <link href="https://cdn.rawgit.com/creativetimofficial/paper-kit/bootstrap4-development/assets/css/paper-kit.css" rel="stylesheet" />
        {/*     Fonts and icons     */}
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,300,700" rel="stylesheet" type="text/css" />
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet" />
        <link href="https://cdn.rawgit.com/creativetimofficial/paper-kit/bootstrap4-development/assets/css/nucleo-icons.css" rel="stylesheet" />
        <nav className="navbar navbar-expand-md fixed-top navbar-transparent" color-on-scroll={500}>
          <div className="container">
            <div className="navbar-translate">
              <button className="navbar-toggler navbar-toggler-right navbar-burger" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-bar" />
                <span className="navbar-toggler-bar" />
                <span className="navbar-toggler-bar" />
              </button>
              <a className="navbar-brand" href="">Avdo</a>
            </div>
            <div className="collapse navbar-collapse" id="navbarToggler">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" rel="tooltip" title="Follow us on Twitter" data-placement="bottom" href="https://twitter.com/CreativeTim">
                    <i className="fa fa-twitter" />
                    <p className="d-lg-none">Twitter</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" rel="tooltip" title="Like us on Facebook" data-placement="bottom" href="https://www.facebook.com/CreativeTim">
                    <i className="fa fa-facebook-square" />
                    <p className="d-lg-none">Facebook</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" rel="tooltip" title="Follow us on Instagram" data-placement="bottom" href="https://www.instagram.com/CreativeTimOfficial">
                    <i className="fa fa-instagram" />
                    <p className="d-lg-none">Instagram</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" rel="tooltip" title="Star on GitHub" data-placement="bottom" href="https://www.github.com/CreativeTimOfficial/paper-kit">
                    <i className="fa fa-github" />
                    <p className="d-lg-none">GitHub</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        </div>
    );
  }
}
export default Header;