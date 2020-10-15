import React from 'react'
import {Card} from 'react-bootstrap';

export default function Job({job}) {
    return (
        <Card>
            <Card.Body>
                {job.title}
            </Card.Body>
            
        </Card>
    )
}
