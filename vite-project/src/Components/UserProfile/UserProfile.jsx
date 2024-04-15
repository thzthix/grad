import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';
import "./UserProfile.css"
const UserProfile = () => {
  return (
    <section className="user-profile">
       <Container fluid>
       <Card style={{ width: '18rem' }}>
       <div className="image-holder">
       <Image src="https://randomuser.me/api/portraits/med/women/75.jpg" roundedCircle />
       </div>
      {/* <Card.Img variant="top" src="https://randomuser.me/api/portraits/med/women/75.jpg" /> */}
      <Card.Body>
        <Card.Title>saltgrown</Card.Title>
        <div className='profile-details-holder'>
          <div className='profile-details'>
            {/* <div className='profile-titles'>
              <span className='detail-title'>Height</span>
              <span className='detail-title'>&#47;</span>
              <span className='detail-title'>Weight</span>
            </div> */}
            <div className='profile-contents'>

            <span className='detail-content'>170cm</span>
            <span className="detail-content">&#47;</span>
              <span className='detail-content'>56kg</span>
              
            </div>
          </div>

          <div className='achievement-holder'>
            <p className='achievement-title'>Achivements</p>
           <div className="achievements">
           <div className='achievement'></div>
            <div className='achievement'></div>
            <div className='achievement'></div>
           </div>
          </div>
        </div>
       <a href="/mypage" className='show-detail-btn'>Show more<i className="bi bi-arrow-right"></i></a>
      </Card.Body>
    </Card>
    </Container>
    </section>
  )
}

export default UserProfile