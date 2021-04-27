import React, { useState } from 'react'
import { Drawer, Button } from 'antd';

const CourseDetails = ({details}) => {
    const [state,setState] = useState({ visible: false, childrenDrawer: false })
  const showDrawer = () => {
    setState({
      visible: true,
    });
  };

  const onClose = () => {
    setState({
      visible: false,
    });
  };

  const showChildrenDrawer = () => {
    setState({
      childrenDrawer: true,
    });
  };

  const onChildrenDrawerClose = () => {
    setState({
      childrenDrawer: false,
    });
  };

  
    return (
      <>
        <Drawer
          title="Multi-level drawer"
          width={520}
          closable={false}
          onClose={onClose}
          visible={state.visible}
        >
          <Button type="primary" onClick={showChildrenDrawer}>
            Two-level drawer
          </Button>
          <Drawer
            title="Two-level Drawer"
            width={320}
            closable={false}
            onClose={onChildrenDrawerClose}
            visible={state.childrenDrawer}
          >
            This is two-level drawer
          </Drawer>
        </Drawer>
      </>
    );
  
}

export default CourseDetails
