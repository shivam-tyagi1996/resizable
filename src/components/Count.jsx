import React from 'react';

function Count(props) {
    const { count: { created, updated }, count } = props;
    console.log('count', count)
    return (
        <div>
            <h3>Add count : {created}</h3>
            <h3>Edit count : {updated}</h3>
        </div>
    )
}

export default Count;

