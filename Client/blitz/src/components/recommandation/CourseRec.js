import React, { useEffect } from 'react'
import { Carousel } from 'antd';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const CourseRec = ({recData}) => {
    if(recData){console.log(recData);}
    const display = recData.map((a) => {
        return  (
            <div>
                <img src={a.image_480x270} alt={a.title} style={{height:"20rem"}} />
            <h3  style={{height: '80px',
                color: '#fff',
                lineHeight: '60px',
                textAlign: 'center',
                background: '#364d79',} }>{a.title}</h3>
          </div>
        );
      });
    return  (
    <Carousel autoplay>
        {display}
  </Carousel>
    );
}

export default CourseRec
