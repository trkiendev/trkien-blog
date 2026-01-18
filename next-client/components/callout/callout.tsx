import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import calloutCss from './callout.module.css';

type CalloutProps = {
      children: React.ReactNode
}

export default function Callout({ children }: CalloutProps) {
      return (
            <div className={ calloutCss.callout } >
                  <FontAwesomeIcon icon={faQuoteLeft} />
                  <span className={ calloutCss.content }>
                        {children}
                  </span>
                  <FontAwesomeIcon icon={faQuoteRight} />
            </div>
      )
}