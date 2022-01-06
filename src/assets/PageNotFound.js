import React from "react";
import PropTypes from "prop-types";

function PageNotFound({content }) {
    return <p>{content}</p>;
}

PageNotFound.propTypes = {
    content: PropTypes.string,
};

export default PageNotFound;