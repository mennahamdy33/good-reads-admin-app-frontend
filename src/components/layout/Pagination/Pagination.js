import React, { useState } from "react";

import 'bootstrap/dist/css/bootstrap.css';
import Pagination from 'react-bootstrap/Pagination';
function PaginationBasic(props){
const  [active,setActive] = useState(1);

let items = [];

for (let number = 1; number <= props.pages.value; number++) {
  items.push(
    <Pagination.Item onClick={()=>{setActive(number);
     props.activated(number);
     }} key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}

return (
  <div  >
   

    <Pagination className="justify-content-center"  size="lg">{items}</Pagination>
   

     </div>
);

}
export default PaginationBasic;