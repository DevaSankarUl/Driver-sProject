import React,{useEffect} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import './NotFound.css'

    const PageNotFound = () => {
		const Navigate = useNavigate()
		useEffect(() => {
			if (!localStorage.getItem('token')) {
			  Navigate('/login')
			}	
		  })
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