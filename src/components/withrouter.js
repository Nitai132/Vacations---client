import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

// A simple component that shows the pathname of the current location
class ShowTheLocation extends React.Component {
    constructor(props) {
        super(props);
    };
static propTypes = {
    location: PropTypes.object.isRequired,
};

  render() {
    return (
        <div></div>
    )
  }


  shouldComponentUpdate(nextProps) {
      return this.props.location != nextProps.location
  }

  componentDidUpdate() { 
    const {location} = this.props;
    this.props.getLocation(location.pathname)
  }


}

// Create a new component that is "connected" (to borrow redux
// terminology) to the router.
const ShowTheLocationWithRouter = withRouter(ShowTheLocation);

export default ShowTheLocationWithRouter