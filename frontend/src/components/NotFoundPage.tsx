import { Link } from 'react-router-dom';

// Styles
import './NotFoundPage.css';

export default function Custom404() {
  return (
    <div className="not-found-wrapper">
      <p className="not-found-text1">Error</p>
      <p className="not-found-text2">404</p>
      <p className="not-found-text3">Sorry, the page you were looking for doesn't exist.</p>
      <Link className="return-button" to="/home">
        Return to Landingpage
      </Link>
    </div>
  );
}
