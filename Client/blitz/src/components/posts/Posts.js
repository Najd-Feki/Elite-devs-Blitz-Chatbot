import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';

import Footer from 'components/footers/SimpleFooter';
import { Card, Badge, Button, Collapse } from 'react-bootstrap';

import styled from 'styled-components';
import Header from 'components/headers/light';
import tw, { css } from 'twin.macro';

const Div = tw.div`transform scale-100 md:scale-75`;
const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl  py-16 lg:py-20`;

const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Card className='mt-auto'>
            <Card.Body>
              <div className='d-flex justify-content-between '>
                <div>
                  <Card.Title>
                    <i className='fas fa-user' /> Welcome to the
                    <span className='text-muted font-weight-light ml-1'>
                      COMMUNITY
                    </span>
                  </Card.Title>

                  <PostForm />
                  <div className=' profile-grid '>
                    {posts.map((post) => (
                      <PostItem key={post._id} post={post} />
                    ))}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Content>
      </Container>

      <Footer></Footer>
    </>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
