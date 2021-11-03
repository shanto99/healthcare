const container = {
    display: 'flex',
}

const TextWithIcon = function({items}) {
    return(
        <span style={{display: 'block'}}>
            {items.map((item, index) => (
                <span style={container} key={index}>
                    {item.icon ? <span>{item.icon}</span> : null}
                    <span style={item.icon ? {marginLeft: '10px'} : null}>{item.text}</span>
                </span>
            ))}
        </span>
    )
}

export default TextWithIcon;
