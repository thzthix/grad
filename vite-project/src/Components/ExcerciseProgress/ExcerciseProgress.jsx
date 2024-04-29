import React from 'react'
import Card from 'react-bootstrap/Card';
import './ExcerciseProgress.css'; 
const ExcerciseProgress = ({title,children, className}) => {
  return (
    <Card className={`exercise-progress-card ${className}`}>
         <div className="title-holder">
        <h5>{title}</h5>
      </div>
   {children}
  </Card>
  )
}

export default ExcerciseProgress