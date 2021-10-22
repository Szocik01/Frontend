
const ButtonShow = props =>{
    return (
        <button className={props.className} type={props.type} onClick={props.onClick} id={props.id}>{props.children}</button>
    );
};

export default ButtonShow;