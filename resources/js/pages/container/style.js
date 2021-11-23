const styles = theme => ({
    selectedPackagings: {
        '& .packaging-row': {
            display: 'flex',
            '& .packaging-name': {
                flex: 5,
                alignSelf: 'flex-start'
            },
            '& .packaging-action': {
                flex: 1,
                alignSelf: 'flex-end'
            }
        }
    }
});

export default styles;
