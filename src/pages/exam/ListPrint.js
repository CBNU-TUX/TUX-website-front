import{
    Link,
  } from "react-router-dom";

function List({prop}){
    return(
        <div className="exam-list">
            <span>{prop.id}</span>
            <span className="exam-title"><Link to={"/exam/" + prop.id}>{prop.title}</Link></span>
            <span>{prop.name}<br></br>{prop.day}</span>
        </div>
    );
    //list ���� > id, ����, �ۼ���+��¥
}

function ListPrint({props}){
    return(
        <div>
            {
            props.map((prop) =>
                <List prop={prop}/> 
                )
            }
        </div>
    );
}

export default ListPrint;