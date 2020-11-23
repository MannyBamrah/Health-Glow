import React from 'react';
import { Header, Grid, Container, Menu ,Segment,Sticky,Sidebar,
  Responsive, Card, Icon, Image} from 'semantic-ui-react';
  import {Link} from 'react-router-dom';


export const ProductDet=({line})=>{
return(
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '0.5px solid rgba(78, 78, 78, 0.4)', padding: 20 }}>
        <div className="card h-100 product">
            <table align='right'>
                <tr>    
                    {line.skuTag!=null && line.skuTag==="BEST_SELLERS"&&<td><Icon name='clipboard list'/></td>}
                     {line.skuTag==null || line.skuTag!="BEST_SELLERS"&&<td></td>}
                    <td><Icon name='heart outline'/></td>
                </tr>
            </table>
            <Link to={`/`} className="product__link"><img
                className="card-img-top product__img" src={line.skuImageUrl} alt={"L'Oreal Paris Rouge Signature Lip Colour I Choose 121"} style={{scaled: {
                transform: 'scale(0.7)'}}} />
            </Link>
            <div className="card-body product__text">
                <h4 className="card-title product__title">
                    {line.skuName}}
                </h4>
                <table width ='100%'>
                <tr>    
                    <td width='50%'><Icon name='rupee sign'>{line.listPrice}</Icon></td>
                    {line.skuAverageRating!=0 &&<td width='50%' align='right'><Icon name='star'/>{line.skuAverageRating}</td>}
                    {line.skuAverageRating==0 &&<td width='50%' align='right'></td>}
                </tr>
            </table>
            </div>
        </div>
    </div>
);
};

/*xport const ProductDet=({...props})=>{
    return(
    <Card>
    <Image src='https://storage.googleapis.com/hng-static/plp/552187_1.jpg' wrapped ui={false} />
    <Card.Content>
      <Card.Header>L'Oreal Paris Rouge Signature Lip Colour I Choose 121</Card.Header>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='rupee sign' />
        650
      </a>
    </Card.Content>
  </Card>
    );
}*/