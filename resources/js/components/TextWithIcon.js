const container = {
    display: 'flex'
}

const TextWithIcon = function({items}) {
    return(
        <div>
            {items.map((item, index) => (
                <div style={container} key={index}>
                    <span>{item.icon}</span><span style={{marginLeft: '10px'}}>{item.text}</span>
                </div>
            ))}
        </div>
    )
}

export default TextWithIcon;
