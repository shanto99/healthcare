const styles = theme => ({
    protocolPage: {
        width: '100%',
        maxWidth: '900px',
        margin: '50px auto'
    },
    protocolHeader: {
        width: '100%',
        border: '2px solid',
        '& .companyHeader': {
            display: 'flex',
            height: '50px',
            '& .companyLogo' : {
                flexBasis: '60px !important',
                display: 'flex',
                padding: '5px'
            },
            '& div:not(:first-child)': {
                flex: '1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderLeft: '2px solid'
            }
        },
        '& .productHeader': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderTop: '2px solid',
            height: '40px'
        },
        '& .strengthHeader': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderTop: '2px solid',
            height: '40px'
        }
    },
    pGroup: {
        '& p': {
            margin: '3px 0'
        }
    },
    borderedCell: {
        border: '2px solid rgba(224, 224, 224, 1)'
    }
});

export default styles;
