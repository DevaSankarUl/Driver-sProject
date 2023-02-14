import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

    const PageNotFound = () => {
        return (
            <div id="notfound">
		<div className="notfound">
			<div className="notfound-404">
				<h1>Oops!</h1>
				<h2>404 - The Page can't be found</h2>
			</div>
			<button><Link to="/">Go TO Homepage</Link></button>
		</div>
	</div>
            
        )
    }
    
   

export default PageNotFound