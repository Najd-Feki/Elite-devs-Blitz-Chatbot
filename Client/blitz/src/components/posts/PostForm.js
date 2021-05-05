import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

import tw, { css } from 'twin.macro';

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  return (
    <>
      <Container>
        <Content>
          <div className='post-form'>
            <div className='profile-grid'>
              <h3 className='f_p f_size_20 t_color3'>Say Something...</h3>
            </div>
            <form
              className='form my-1'
              onSubmit={(e) => {
                e.preventDefault();
                addPost({ text });
                setText('');
              }}
            >
              <div className='col-md-12 form-group'>
                <textarea
                  className='form-control message'
                  placeholder='Create a post'
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                ></textarea>
              </div>

              <input
                type='submit'
                className='btn btn-dark my-1'
                value='Submit'
              />
            </form>
          </div>
        </Content>
      </Container>
    </>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
