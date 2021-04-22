import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';

import Header from 'components/headers/light';
import Fade from 'react-reveal/Fade';
import tw from 'twin.macro';
import Features from 'components/features/TwoColWithButton';
import Footer from 'components/footers/SimpleFooter';

const Subheading = tw.div`uppercase  font-bold text-primary-500`;
const HighlightedText = tw.div`text-primary-500 `;
const Legend = tw.span` block italic text-primary-100 text-center`;
const LegendTitle = tw.span` block font-bold text-lg text-primary-500 text-center`;
const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;

/******** */
const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <>
      <Header />
      <Fragment>
        <Fade>
          <h1 className='large text-primary'>Posts</h1>
          <p className='lead'>
            <i className='fas fa-user' /> Welcome to the community
          </p>
          <DividerTextContainer>
            <PostForm />
            <div className='posts'>
              {posts.map((post) => (
                <PostItem key={post._id} post={post} />
              ))}
            </div>
          </DividerTextContainer>
        </Fade>
      </Fragment>
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
