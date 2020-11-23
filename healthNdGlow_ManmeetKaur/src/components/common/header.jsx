import React ,{ Component }from 'react';
import { Header, Grid, Container, Menu ,Segment,Sticky,Sidebar,
  Responsive, Input,Icon, Button} from 'semantic-ui-react';
import {logo1} from '../../images/logo.png'
import '../../Index.css';


 export const HeaderBar =({len}) =>{
          return (
       <div >
     <Menu boderless>
        <Menu.Item 
        >
        <Icon name='bars'/>
        </Menu.Item>
        <Menu.Item
          name='Health&Glow'
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Icon name='search'  />
          </Menu.Item>
          <Menu.Item>
            <Icon name='cart'  />  
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <h4 align='center'> Loreal Products - {len} products</h4>
      
      </div>
   );
     
  
 }


/*export const HeaderBar = ({...props}) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <NavLink  to="/"><img src={logo1} alt="store" className="navbar-brand"/></NavLink>
                <div>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/cart"}><i className="fa fa-shopping-cart mr-2"
                                                                          aria-hidden="true" />Cart</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};*/

/*export default class HeaderBar extends Component{
render(){
    return(
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark px-sm-5">

            </nav>
        </div>
    )
    ;

}
};*/